import "./style.css";

/**
 * 1-KROK: GitHub Pages ma tylko "podgląd" strony z Cloudflare Worker
 * - Na github.io pokazujemy iframe z: https://terraformingplanet.terraforming-planet.workers.dev
 * - Dzięki temu nie musisz walczyć z Vite base / env / endpointami na Pages.
 */
const WORKER_URL = "https://terraformingplanet.terraforming-planet.workers.dev";

const isGitHubPages =
  window.location.hostname.endsWith("github.io") ||
  window.location.hostname.includes("githubusercontent");

if (isGitHubPages) {
  document.body.style.margin = "0";
  document.body.style.height = "100vh";
  document.body.innerHTML = `
    <iframe
      src="${WORKER_URL}"
      style="width:100%; height:100vh; border:0;"
      allow="clipboard-read; clipboard-write"
      referrerpolicy="no-referrer"
    ></iframe>
  `;
  // Koniec — na GitHub Pages wyświetlamy Worker i nie uruchamiamy reszty aplikacji.
} else {
  // === NORMALNY TRYB (poza github.io) ===
  // Jeśli chcesz, żeby lokalnie też zawsze używało Workera jako API:
  const API_BASE =
    (import.meta?.env?.VITE_API_BASE ?? "").trim() || WORKER_URL;

  async function callGenerate(payload) {
    // Worker ma endpoint /generate (u Ciebie było: /health i /generate)
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let msg = `Błąd HTTP ${res.status}`;
      try {
        const j = await res.json();
        msg = j?.message || j?.error || msg;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json();

    // Obsługa różnych formatów odpowiedzi
    if (data?.imageBase64) return `data:image/png;base64,${data.imageBase64}`;
    if (data?.data_url) return data.data_url;
    if (data?.imageUrl) return data.imageUrl;
    if (data?.url) return data.url;

    throw new Error("API nie zwróciło obrazu (brak imageUrl/data_url/base64).");
  }

  // --- reszta Twojej logiki strony (UI) może zostać tu normalnie ---
  // Jeśli chcesz, mogę Ci też wkleić kompletny działający UI generatora,
  // ale Ty teraz chcesz przede wszystkim PODGLĄD Workera na github.io.

  console.log("Tryb normalny. API_BASE =", API_BASE);
}
