export const WORKER_BASE_URL = (import.meta?.env?.VITE_WORKER_URL || '').trim() || '';

export async function generateImage({ prompt, size = '1024x1024' }) {
  if (!WORKER_BASE_URL) {
    throw new Error('Missing VITE_WORKER_URL (set it to your Worker base URL)');
  }

  const response = await fetch(`${WORKER_BASE_URL.replace(/\/$/, '')}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, size })
  });

  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.ok) {
    const message = json?.error || json?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return json;
}
