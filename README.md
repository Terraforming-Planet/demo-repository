# Terraforming-Planet

Terraforming-Planet to edukacyjny projekt o kształtowaniu terenu, retencji wody i pojazdach fotowoltaicznych. Łączymy naukę z wizualizacjami, aby wspierać rekultywację, ochronę środowiska i transformację energetyczną.

## Co znajdziesz w repozytorium

- **/apps/web** — statyczna strona WWW (Vite + Vanilla JS).
- **/apps/worker** — worker API do generowania obrazów (Cloudflare Workers + OpenAI).
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
2. Zainstaluj i uruchom:
   ```bash
   npm install
   npm run dev
   ```

> Uwaga: modele GPT Image zwracają base64. Aplikacja używa `data_url` z workera (bez tymczasowego URL).

## Jak korzystać z generatora

1. Wejdź do sekcji **Laboratorium obrazów**.
2. Wybierz prompt, styl i format.
3. Kliknij **Generuj**.
4. Skopiuj prompt, pobierz obraz i zapisz wnioski w polu notatki.

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

## Zmienne środowiskowe

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
