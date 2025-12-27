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
https://terraforming-image-api.username.workers.dev
```

## 3. Połącz frontend z Workerem

W pliku `app.js` ustaw swój URL:

```js
const WORKER_URL = "https://terraforming-image-api.username.workers.dev";
```

## 4. Uruchomienie na Androidzie

1. Otwórz stronę GitHub Pages w Chrome/Firefox.
2. Kliknij **Generate**.
3. Obraz generuje się w sekcji „Wynik”.

## Wymagania konkursu

- Repozytorium jest publiczne.
- README opisuje projekt oraz sposób uruchomienia.
- Klucze API nie są commitowane do repo.
- Screeny lub sample output są mile widziane.
