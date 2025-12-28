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

button.addEventListener("click", async () => {
  const stage = stageSelect.value;
  const planet = planetSelect.value;
  const style = styleSelect.value;

  const prompt = `
Cinematic scientific visualization of a ${planetMap[planet]} planet.
Terraforming stage: ${stageMap[stage]}.
${styleMap[style]}
Atmosphere formation, water cycles, vegetation growth, advanced technology, realistic lighting, space view, no text.
`;

  try {
    setLoading(true);
    renderMessage("Generuję obraz..." );

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Worker error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error("Brak URL obrazka w odpowiedzi.");
    }

    renderImage(imageUrl);
  } catch (error) {
    renderMessage("Nie udało się wygenerować obrazu. Sprawdź Worker i klucz API.");
    console.error(error);
  } finally {
    setLoading(false);
  }
});
