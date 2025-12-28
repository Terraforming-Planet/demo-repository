const WORKER_URL = "https://terraformingplwnetgenimg.terraforming-planet.workers.dev";

const stageSelect = document.getElementById("stage");
const planetSelect = document.getElementById("planet");
const styleSelect = document.getElementById("style");
const output = document.getElementById("output");
const button = document.getElementById("generate");

const styleMap = {
  cinematic: "Cinematic lighting, epic scale, high contrast.",
  science: "Scientific visualization, realistic data-driven rendering.",
  nasa: "NASA documentary style, photo-realistic, subtle color grading.",
};

const stageMap = {
  early: "Early stage: first atmosphere formation and water vapor.",
  mid: "Mid stage: stable atmosphere, shallow seas, emerging vegetation.",
  late: "Late stage: dense forests, oceans, thriving ecosystems.",
};

const planetMap = {
  rocky: "rocky",
  "mars-like": "mars-like",
  ocean: "oceanic",
  ice: "ice",
};

const setLoading = (isLoading) => {
  button.disabled = isLoading;
  button.textContent = isLoading ? "Generating..." : "Generate";
};

const renderMessage = (message) => {
  output.innerHTML = `<p class="muted">${message}</p>`;
};

const renderImage = (url) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Wizualizacja terraformowanego świata";
  output.innerHTML = "";
  output.appendChild(img);
};

const buildPrompt = (stage, planet, style) => `
Cinematic scientific visualization of a ${planetMap[planet]} planet.
Terraforming stage: ${stageMap[stage]}.
${styleMap[style]}
Atmosphere formation, water cycles, vegetation growth, advanced technology, realistic lighting, space view, no text.
`;

button.addEventListener("click", async () => {
  const stage = stageSelect.value;
  const planet = planetSelect.value;
  const style = styleSelect.value;
  const prompt = buildPrompt(stage, planet, style);

  setLoading(true);
  renderMessage("Generuję obraz...");

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const text = await response.text(); // najpierw text, żeby dało się debugować
    if (!response.ok) {
      throw new Error(`Worker error: ${response.status} ${text}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Worker returned non-JSON: ${text.slice(0, 200)}`);
    }

    // Obsłuż oba możliwe formaty odpowiedzi:
    const imageUrl =
      data?.image ||                // np. { image: "https://..." }
      data?.url ||                  // np. { url: "https://..." }
      data?.data?.[0]?.url;         // np. { data: [{ url: "https://..." }] }

    if (!imageUrl) {
      throw new Error(`Brak URL obrazka w odpowiedzi: ${text.slice(0, 300)}`);
    }

    renderImage(imageUrl);
  } catch (err) {
    console.error(err);
    renderMessage("Nie udało się wygenerować obrazu. Sprawdź Worker, URL i klucz API.");
  } finally {
    setLoading(false);
  }
});
