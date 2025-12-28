# Terraforming-Planet

Terraforming-Planet to edukacyjny projekt o kształtowaniu terenu, retencji wody i pojazdach fotowoltaicznych. Łączymy naukę z wizualizacjami, aby wspierać rekultywację, ochronę środowiska i transformację energetyczną.

## Co znajdziesz w repozytorium

- **/apps/web** — statyczna strona WWW (Vite + Vanilla JS).
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
- Sprawdź, czy worker działa i czy `VITE_API_BASE` jest ustawione poprawnie.

**Błąd "Brak klucza API".**
- Upewnij się, że w workerze jest ustawiony `OPENAI_API_KEY`.

**Strona nie uruchamia się.**
- Wykonaj `npm install` w katalogu `apps/web`.

---

Projekt służy edukacji i wspólnemu dobru. Zachęcamy do współtworzenia i dzielenia się wiedzą.
