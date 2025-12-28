const fallbackBase = 'https://terraformingplanet.terraforming-planet.workers.dev';

export const API_BASE = (import.meta?.env?.VITE_API_BASE || '').trim() || fallbackBase;

export async function generateImage({ prompt, size = '1024x1024' }) {
  if (!API_BASE) {
    throw new Error('Brak adresu API (ustaw VITE_API_BASE).');
  }

  const response = await fetch(`${API_BASE.replace(/\/$/, '')}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, size })
  });

  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.ok) {
    const message = json?.error || json?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  if (json.data_url) {
    return json.data_url;
  }

  if (json.imageUrl || json.url) {
    return json.imageUrl || json.url;
  }

  if (json.image_base64) {
    return `data:image/png;base64,${json.image_base64}`;
  }

  throw new Error('Brak danych obrazu w odpowiedzi API.');
}
