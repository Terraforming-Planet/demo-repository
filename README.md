# Terraforming Planet – Image Gen

Minimalne demo do Community Dev Challenge: frontend na GitHub Pages, backend w Cloudflare Worker.
Projekt generuje obrazy terraformowanej planety bez ujawniania klucza API.

## Architektura

```
Frontend (GitHub Pages)
   ↓
Cloudflare Worker (OPENAI_API_KEY)
# Terraforming Planet Image Gen

Najprostszy, zgodny z regulaminem Community Dev Challenge projekt do generowania obrazów:

```
Android (przeglądarka)
   ↓
GitHub Pages (HTML + JS)
   ↓
Cloudflare Worker (API key)
   ↓
OpenAI Image Gen API
```

## Uruchomienie krok po kroku

### 1) GitHub Pages (frontend)
> **Ważne:** w repozytorium nie ma żadnego klucza API.

## 1. GitHub Pages (frontend)

1. Umieść pliki w repozytorium:
   - `index.html`
   - `style.css`
   - `app.js`
2. Włącz GitHub Pages:
   - Settings → Pages
   - Source: `main`
   - Folder: `/root`

Po chwili strona będzie dostępna pod adresem:

```
https://YOUR-ORG.github.io/terraforming-planet-image-gen/
```

### 2) Cloudflare Worker (backend z API key)

Utwórz Workera i wklej kod z `worker.js`:

```js
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST allowed." }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
## 2. Cloudflare Worker (backend z API key)

Utwórz Workera i wklej kod:

```js
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Only POST", { status: 405 });
    }

    const body = await request.json();

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-images-1.5",
        prompt: body.prompt,
        size: "1024x1024",
      }),
    });

    const data = await response.json();
    const imageUrl = data?.data?.[0]?.url;

    return new Response(JSON.stringify({ image: imageUrl }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    return new Response(await response.text(), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

Dodaj sekret w Worker → Settings → Variables:

- **Name:** `OPENAI_API_KEY`
- **Value:** `sk-...`
- **Type:** Secret

Zapisz i zdeployuj. Otrzymasz URL w stylu:

```
https://terraformingplwnetgenimg.terraforming-planet.workers.dev
```

### 3) Podłącz frontend do Workera
https://terraforming-image-api.username.workers.dev
```

## 3. Połącz frontend z Workerem

W pliku `app.js` ustaw swój URL:

```js
const WORKER_URL =
  "https://terraformingplwnetgenimg.terraforming-planet.workers.dev";
```

### 4) Uruchomienie na Androidzie
const WORKER_URL = "https://terraforming-image-api.username.workers.dev";
```

## 4. Uruchomienie na Androidzie

1. Otwórz stronę GitHub Pages w Chrome/Firefox.
2. Kliknij **Generate**.
3. Obraz generuje się w sekcji „Wynik”.

## Technologie

- HTML, CSS, JavaScript
- GitHub Pages
- Cloudflare Workers
- OpenAI Image Gen API

## Bezpieczeństwo

Klucz `OPENAI_API_KEY` znajduje się wyłącznie w Cloudflare Worker. Frontend nie zawiera żadnych
sekretów.
## Wymagania konkursu

- Repozytorium jest publiczne.
- README opisuje projekt oraz sposób uruchomienia.
- Klucze API nie są commitowane do repo.
- Screeny lub sample output są mile widziane.
