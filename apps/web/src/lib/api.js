// apps/web/src/lib/api.js
const fallbackBase = 'https://terraformingplanet.terraforming-planet.workers.dev';

export const API_BASE = (import.meta?.env?.VITE_API_BASE || '').trim() || fallbackBase;

export async function generateImage({ prompt, size = '1024x1024' }) {
  if (!API_BASE) {
    throw new Error('Brak adresu API (ustaw VITE_API_BASE).');
  }

  const response = await fetch(`${API_BASE.replace(/\/$/, '')}/generate`, {
export const WORKER_BASE_URL = (import.meta?.env?.VITE_WORKER_URL || '').trim() || '';

function normalizeBase(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

// Ustawiasz to albo w .env (VITE_API_BASE=...), albo w GitHub Actions (env),
// a jak nie ustawisz, to fallback jest na Twojego workera:
const FALLBACK = "https://terraformingplanet.terraforming-planet.workers.dev";

export async function generateImage({ prompt, size }) {
  const apiBase = normalizeBase(import.meta.env.VITE_API_BASE) || FALLBACK;

  const res = await fetch(`${apiBase}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, size }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // jeśli worker zwrócił coś innego niż json
  }

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  // wspieramy różne formaty odpowiedzi
  if (data?.imageUrl) return data.imageUrl;
  if (data?.url) return data.url;
  if (data?.imageBase64) return `data:image/png;base64,${data.imageBase64}`;

  throw new Error("API nie zwróciło imageUrl/imageBase64.");
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
  return json;
}
