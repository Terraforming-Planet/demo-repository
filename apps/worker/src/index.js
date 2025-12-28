const allowedOrigins = ['*'];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigins[0]
    }
  });
}

function buildPrompt(prompt, style) {
  const styleMap = {
    realistyczny: 'realistyczny render',
    concept: 'concept art',
    blueprint: 'styl blueprint, techniczna mapa',
    emoji: 'styl emoji, uproszczona grafika'
  };

  const styleSuffix = styleMap[style] ?? style;
  return `${prompt}\nStyl: ${styleSuffix}. Edukacyjna wizualizacja terraformingu lub pojazdów PV.`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigins[0],
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      });
    }

    if (url.pathname !== '/api/generate') {
      return jsonResponse({ ok: false, message: 'Nie znaleziono endpointu.' }, 404);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, message: 'Użyj metody POST.' }, 405);
    }

    if (!env.OPENAI_API_KEY) {
      return jsonResponse({ ok: false, message: 'Brak klucza API.' }, 401);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return jsonResponse({ ok: false, message: 'Niepoprawny JSON.' }, 400);
    }

    const prompt = payload.prompt?.trim();
    if (!prompt) {
      return jsonResponse({ ok: false, message: 'Prompt jest wymagany.' }, 400);
    }

    const size = payload.size || '1024x1024';
    const style = payload.style || 'realistyczny';

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: buildPrompt(prompt, style),
        size,
        response_format: 'b64_json'
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const message = error.error?.message || 'Błąd generowania obrazu.';
      const status = response.status === 429 ? 429 : 500;
      return jsonResponse({ ok: false, message }, status);
    }

    const data = await response.json();
    const imageBase64 = data.data?.[0]?.b64_json;

    if (!imageBase64) {
      return jsonResponse({ ok: false, message: 'Brak danych obrazu.' }, 502);
    }

    return jsonResponse({ ok: true, imageBase64 });
  }
};
