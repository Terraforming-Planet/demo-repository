const VERSION = "TP-IMG-A-2025-12-28-URL";
const MODEL = "gpt-image-1.5";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};

function jsonResponse(obj, init = {}) {
  return new Response(JSON.stringify(obj), {
    ...init,
    headers: {
      ...cors,
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function textResponse(text, init = {}) {
  return new Response(text, {
    ...init,
    headers: {
      ...cors,
      "Content-Type": "text/plain; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function clampSize(size) {
  const allowed = new Set(["auto", "1024x1024", "1536x1024", "1024x1536"]);
  return allowed.has(size) ? size : "1024x1024";
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: cors });
      }

      if (request.method === "GET" && url.pathname === "/health") {
        return jsonResponse({
          ok: true,
          service: "terraforming-planet-image-worker",
          version: VERSION,
          model: MODEL
        });
      }

      if (request.method === "GET" && url.pathname === "/") {
        return textResponse("OK. Use GET /health or POST /generate");
      }

      if (request.method !== "POST" || url.pathname !== "/generate") {
        return jsonResponse({ ok: false, error: "Not found" }, { status: 404 });
      }

      if (!env.OPENAI_API_KEY) {
        return jsonResponse(
          { ok: false, error: "Missing OPENAI_API_KEY in Worker env vars" },
          { status: 500 }
        );
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ ok: false, error: "Invalid JSON body" }, { status: 400 });
      }

      const prompt = (body?.prompt || "").toString().trim();
      if (!prompt) {
        return jsonResponse({ ok: false, error: "Missing 'prompt'" }, { status: 400 });
      }

      const size = clampSize((body?.size || "1024x1024").toString());
      const output_format = (body?.output_format || "png").toString();
      const background = (body?.background || "auto").toString();
      const n = Math.max(1, Math.min(1, Number(body?.n ?? 1)));

      const upstream = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          prompt,
          size,
          n,
          output_format,
          background
        })
      });

      const raw = await upstream.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }

      if (!upstream.ok) {
        return jsonResponse(
          {
            ok: false,
            status: upstream.status,
            error: data?.error?.message || data?.message || raw || "Upstream error",
            upstream: data || raw
          },
          { status: 502 }
        );
      }

      const b64 = data?.data?.[0]?.b64_json;
      if (!b64) {
        return jsonResponse(
          {
            ok: false,
            error: "No image data returned (expected data[0].b64_json)",
            upstream: data
          },
          { status: 502 }
        );
      }

      const mime =
        output_format === "jpeg"
          ? "image/jpeg"
          : output_format === "webp"
          ? "image/webp"
          : "image/png";

      const data_url = `data:${mime};base64,${b64}`;

      return jsonResponse({
        ok: true,
        version: VERSION,
        model: MODEL,
        size,
        output_format,
        background,
        image_base64: b64,
        data_url
      });
    } catch (error) {
      return jsonResponse({ ok: false, error: error?.message || String(error) }, { status: 500 });
    }
  }
};
