# Terraforming-Planet

Terraforming-Planet to edukacyjny projekt o kształtowaniu terenu, retencji wody i pojazdach fotowoltaicznych. Łączymy naukę z wizualizacjami, aby wspierać rekultywację, ochronę środowiska i transformację energetyczną.

## Struktura repozytorium

- **/apps/web** — statyczna strona WWW (Vite + Vanilla JS).
- **/apps/worker** — worker API do generowania obrazów (Cloudflare Workers + OpenAI).
- **/apps/web/src/styles** — główne style UI.
- **/apps/web/src/assets** — lekkie zasoby (SVG, tła, ikony).
## Co znajdziesz w repozytorium

- **/apps/web** — statyczna strona WWW (Vite + Vanilla JS).
- **/apps/worker** — worker API do generowania obrazów (Cloudflare Workers + OpenAI).
- **/apps/worker** — opcjonalny worker API do generowania obrazów (Cloudflare Workers + OpenAI).
- **/public / assets** — przykładowe grafiki i ikony (w obrębie aplikacji web).

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
1. Ustaw `VITE_WORKER_URL` (zobacz `apps/web/.env.example`).
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
> Uwaga: modele GPT Image zwracają base64. Aplikacja używa pola `data_url` z workera (bez tymczasowego URL).

## Jak korzystać z generatora

1. Wejdź do sekcji **Laboratorium obrazów**.
2. Wybierz prompt, styl i format.
3. Kliknij **Generuj**.
4. Skopiuj prompt, pobierz obraz i zapisz wnioski w polu notatki.
## Jak uruchomić generator obrazów (opcjonalnie)

Worker API działa niezależnie od frontendu i chroni klucz OpenAI.

1. Przejdź do katalogu workera:
   ```bash
   cd apps/worker
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Skopiuj `.env.example` do `.env` i uzupełnij `OPENAI_API_KEY`.
4. Uruchom lokalnie:
   ```bash
   npm run dev
   ```
5. W osobnym terminalu, w **apps/web**, ustaw w pliku `.env`:
   ```bash
   VITE_API_BASE="http://localhost:8787"
   ```
6. Uruchom `npm run dev` w **apps/web** i testuj laboratorium obrazów.

## Wdrożenie (Cloudflare Pages)

1. Zbuduj aplikację web:
   ```bash
   cd apps/web
   npm install
   npm run build
   ```
2. W Cloudflare Pages ustaw:
   - **Build command**: `npm run build`
   - **Build output**: `apps/web/dist`
   - **Root directory**: `apps/web`
3. Jeśli używasz workera, ustaw `VITE_API_BASE` na adres workera.
3. Jeśli używasz workera, ustaw `VITE_WORKER_URL` na adres workera.

## Zmienne środowiskowe

Przykład konfiguracji znajdziesz w `.env.example` oraz `apps/web/.env.example`.

- `OPENAI_API_KEY` — klucz API dla generowania obrazów w workerze.
- `VITE_API_BASE` — adres API workera, np. `https://twoj-worker.workers.dev`.

## Najczęstsze problemy (FAQ)

**Nie widzę obrazu po kliknięciu Generuj.**
- Sprawdź, czy worker działa i czy `VITE_API_BASE` jest ustawione poprawnie.

**Błąd "Missing OPENAI_API_KEY".**
- `VITE_WORKER_URL` — adres API workera, np. `https://twoj-worker.workers.dev`.
3. Jeśli używasz workera, wdroż go przez `wrangler deploy` w katalogu `apps/worker` i ustaw `VITE_API_BASE` na adres workera.

## Zmienne środowiskowe

Przykład konfiguracji znajdziesz w `.env.example`.

- `OPENAI_API_KEY` — klucz API dla generowania obrazów w workerze.
- `VITE_API_BASE` — adres API workera, np. `https://twoj-worker.workers.dev`.

## Jak korzystać z generatora

1. Wejdź do sekcji **Laboratorium obrazów**.
2. Wybierz prompt, styl i format.
3. Kliknij **Generuj**.
4. Skopiuj prompt, pobierz obraz i zapisz wnioski w polu notatki.

## Najczęstsze problemy (FAQ)

**Nie widzę obrazu po kliknięciu Generuj.**
- Sprawdź, czy worker działa i czy `VITE_WORKER_URL` jest ustawione poprawnie.

**Błąd "Missing OPENAI_API_KEY".**
- Sprawdź, czy worker działa i czy `VITE_API_BASE` jest ustawione poprawnie.

**Błąd "Brak klucza API".**
- Upewnij się, że w workerze jest ustawiony `OPENAI_API_KEY`.

**Strona nie uruchamia się.**
- Wykonaj `npm install` w katalogu `apps/web`.

---

Projekt służy edukacji i wspólnemu dobru. Zachęcamy do współtworzenia i dzielenia się wiedzą.
