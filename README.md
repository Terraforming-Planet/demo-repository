# Terraforming-Planet

Terraforming-Planet to edukacyjny projekt o kształtowaniu terenu, retencji wody i pojazdach fotowoltaicznych. Łączymy naukę z wizualizacjami, aby wspierać rekultywację, ochronę środowiska i transformację energetyczną.

## Struktura repozytorium

- **/apps/web** — statyczna strona WWW (Vite + Vanilla JS).
- **/apps/worker** — worker API do generowania obrazów (Cloudflare Workers + OpenAI).
- **/apps/web/src/styles** — główne style UI.
- **/apps/web/src/assets** — lekkie zasoby (SVG, tła, ikony).

## Jak uruchomić lokalnie (krok po kroku)

1. Otwórz terminal w katalogu repozytorium.
2. Wejdź do aplikacji web:
   ```bash
   cd apps/web
   ```
3. Zainstaluj zależności:
   ```bash
   npm install
   ```
4. Uruchom stronę:
   ```bash
   npm run dev
   ```
5. Otwórz w przeglądarce adres `http://localhost:5173`.

## Setup

### Worker (Cloudflare)

1. Wdróż worker z katalogu `apps/worker`:
   ```bash
   cd apps/worker
   npm install
   npx wrangler deploy
   ```
2. W Cloudflare Dashboard -> Worker -> Settings -> Variables:
   - Dodaj Secret: `OPENAI_API_KEY`
3. Testy:
   - `GET https://<worker>/health`
   - `POST https://<worker>/generate` z body: `{"prompt":"a solar excavator terraforming desert","size":"1024x1024"}`

### Web

1. Ustaw `VITE_API_BASE` (zobacz `apps/web/.env.example`).
2. Zainstaluj i uruchom:
   ```bash
   npm install
   npm run dev
   ```

> Uwaga: modele GPT Image zwracają base64. Aplikacja używa `data_url` z workera (bez tymczasowego URL).

## Wdrożenie (GitHub Pages)

Repozytorium ma workflow `.github/workflows/pages.yml`, który:

- buduje aplikację w `apps/web`,
- publikuje `apps/web/dist` na GitHub Pages,
- ustawia `VITE_API_BASE` na adres workera.

Aby działało poprawnie:

1. Upewnij się, że nazwa repozytorium odpowiada ścieżce `base` w `apps/web/vite.config.js`.
2. Włącz GitHub Pages w ustawieniach repozytorium (Source: GitHub Actions).
3. Zrób push na `main` — workflow sam zbuduje i opublikuje stronę.

## Konfiguracja środowiska

Przykład konfiguracji znajdziesz w `.env.example` oraz `apps/web/.env.example`.

- `OPENAI_API_KEY` — klucz API dla generowania obrazów w workerze.
- `VITE_API_BASE` — adres API workera, np. `https://twoj-worker.workers.dev`.

## Najczęstsze problemy (FAQ)

**Nie widzę obrazu po kliknięciu Generuj.**
- Sprawdź, czy worker działa i czy `VITE_API_BASE` jest ustawione poprawnie.

**Błąd "Missing OPENAI_API_KEY".**
- Upewnij się, że w workerze jest ustawiony `OPENAI_API_KEY`.

**Strona nie uruchamia się.**
- Wykonaj `npm install` w katalogu `apps/web`.

---

Projekt służy edukacji i wspólnemu dobru. Zachęcamy do współtworzenia i dzielenia się wiedzą.
