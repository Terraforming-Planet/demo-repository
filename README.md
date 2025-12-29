
<!--
  Terraforming-Planet / README organizacji
  Wskazówka: ten plik najlepiej umieścić w repo .github/profile/README.md
-->

<div align="center">

# 🌍 Terraforming-Planet
### Generator grafik to wizualna nauka i eksperymentowanie z formowaniem terenu, samowystarczalnie energetycznymi pojazdami pokrytymi panelami fotowoltaicznymi i inżynierią planetarną


# Terraforming-Planet
<img width="1536" height="1024" alt="19882" src="https://github.com/user-attachments/assets/372c80f7-5259-4ccf-a6c4-24b877348c98" />

**Solution technology for Planet**

<img width="124" height="124" alt="19791" src="https://github.com/user-attachments/assets/24d1f223-852c-4f6a-868f-bf507ce9528c" />
<img width="124" height="124" alt="19753" src="https://github.com/user-attachments/assets/77e31b7e-9d0a-4408-a189-7dd23e004d1c" />
<img width="124" height="124" alt="19750" src="https://github.com/user-attachments/assets/40d5627d-26da-4f84-ae41-eec668a51391" />
<img width="124" height="124" alt="19873" src="https://github.com/user-attachments/assets/584e17e1-e84d-4d4f-98cd-ffe69c85f452" />
<img width="124" height="124" alt="19754" src="https://github.com/user-attachments/assets/e048681b-222c-43de-8eb6-4678d195bed1" />


Terraforming-Planet to edukacyjny projekt o kształtowaniu terenu, retencji wody i pojazdach fotowoltaicznych. Łączymy naukę z wizualizacjami, aby wspierać rekultywację, ochronę środowiska i transformację energetyczną.


 **Wypróbuj testowe generowanie Grafik w tym linku**
# 👉 **[Kliknij tutaj i przetestuj model do generowania grafik](https://terraformingplanet.terraforming-planet.workers.dev/)**

Ponizej przedstawiam screana z testów generatora obrazów: 
<img width="800" height="1460" alt="20080" src="https://github.com/user-attachments/assets/6b974130-beb9-42e3-8582-d1e2d34d81f9" />



---
![19015](https://github.com/user-attachments/assets/3fedf0de-4cd0-4a0e-8027-e0040766d161)
![19016](https://github.com/user-attachments/assets/15987542-6909-4c09-817d-4072d132d423)

# 🌍 Terraforming Planet — Image Generation Lab

> **Eksperymentalne laboratorium generowania grafik AI**  
> Projekt edukacyjno-inżynieryjny pokazujący, jak **GPT Image + Codex + Cloudflare Workers**
> mogą być użyte do nauki terraformowania, formowania terenu i projektowania technologii przyszłości.

---

## ✨ Idea projektu

**Terraforming Planet** to praktyczny eksperyment pokazujący pełny proces tworzenia
generatora grafik AI — od pomysłu, przez architekturę kodu, aż po działającą aplikację webową.

Projekt nie skupia się wyłącznie na estetyce obrazów.
Celem jest **zrozumienie procesów**:
- terraformowania planet,
- kształtowania terenu (góry, doliny, pustynie, oceany),
- wykorzystania energii (np. fotowoltaiczne maszyny),
- oraz pracy z AI jako narzędziem inżynierskim i edukacyjnym.

---

## 🧠 Jak powstał generator?

1. **Koncepcja**  
   Wizualizacja terraformowania jako narzędzie nauki i analizy.

2. **Codex**  
   Iteracyjne projektowanie struktury repozytorium i poprawianie kodu.

3. **GPT Image API**  
   Generowanie realistycznych grafik (zwracanych jako base64).

4. **Cloudflare Workers**  
   Bezpieczne API — klucz OpenAI nigdy nie trafia do frontendu.

5. **Vite + Vanilla JS**  
   Lekki, szybki frontend bez zbędnych frameworków.

6. **GitHub Actions**  
   Automatyczne budowanie i publikacja aplikacji.

Repozytorium dokumentuje **całą drogę powstawania generatora**, a nie tylko efekt końcowy.

---

## 🧱 Struktura repozytorium

text
/apps
 ├─ web/              → Frontend (Vite + Vanilla JS)
 │   ├─ src/
 │   │   ├─ styles/   → główne style UI
 │   │   └─ assets/   → SVG, ikony, tła
 │   └─ dist/         → build produkcyjny
 │
 └─ worker/           → API generowania obrazów
     └─ Cloudflare Workers + OpenAI


---

🎨 Co oferuje aplikacja?

🧪 Laboratorium obrazów

✍️ Edytor promptów (styl, format, rozmiar)

🖼️ Generowanie obrazów AI

📋 Kopiowanie promptów i analiza wyników

⚡ Renderowanie przez data_url (bez tymczasowych linków)



---

🚀 Uruchomienie lokalne

Frontend

cd apps/web
npm install
npm run dev

Adres:

http://localhost:5173


---

Worker (Cloudflare)

cd apps/worker
npm install
npx wrangler deploy

W Cloudflare Dashboard → Worker → Settings → Variables
Dodaj Secret:

OPENAI_API_KEY

Testy:

GET  /health
POST /generate

Body:

{
  "prompt": "a solar excavator terraforming desert",
  "size": "1024x1024"
}

> Modele GPT Image zwracają base64 — worker mapuje je do data_url.




---

🌐 Konfiguracja Web ↔ Worker

Plik .env w apps/web:

VITE_API_BASE=https://twoj-worker.workers.dev
VITE_WORKER_URL=https://twoj-worker.workers.dev


---

📦 Wdrożenie (GitHub Pages)

Workflow:

.github/workflows/pages.yml

Automatycznie:

buduje apps/web,

publikuje apps/web/dist,

ustawia zmienne środowiskowe.


Wymagania:

1. Poprawny base w vite.config.js


2. GitHub Pages → Source: GitHub Actions


3. Push na main




---

☁️ Wdrożenie (Cloudflare Pages – opcjonalnie)

cd apps/web
npm install
npm run build

Ustawienia:

Build command: npm run build

Output: apps/web/dist

Root directory: apps/web



---

🔑 Zmienne środowiskowe

Zmienna	Opis

OPENAI_API_KEY	Klucz API (tylko w workerze)
VITE_API_BASE	Adres API workera
VITE_WORKER_URL	Alias URL workera



---

❓ FAQ

Nie widzę obrazu po kliknięciu „Generuj”.
Sprawdź worker i VITE_API_BASE.

Błąd „Missing OPENAI_API_KEY”.
Sprawdź Secret w Cloudflare Worker.

Strona się nie uruchamia.
Uruchom npm install w apps/web.


---

🌱 Dlaczego ten projekt?

AI jako narzędzie inżynierskie, nie magia

Nauka przez wizualizację procesów

Realna architektura: frontend + worker + API

Projekt gotowy do forkowania i dalszego rozwoju



---

🤝 Community & OpenAI

Projekt powstał w ramach Community Dev Challenge
i jest otwarty na dalsze eksperymenty.

👉 Generator online:
🔗 https://terraformingplanet.terraforming-planet.workers.dev/


---

Made with ☀️ AI, ⚙️ engineering i 🌍 myśleniem o przyszłości

---

To jest **JEDEN KOD**.  
Jak jeszcze coś zmieniamy — **edytuję TEN**, nie dokładam następnych.



---

Projekt służy edukacji i wspólnemu dobru. Zachęcamy do współtworzenia i dzielenia się wiedzą.
<h2>Model do generowania obrazów</h2>

   Terraforming Planet • Cloudflare Worker
Image Generator (OpenAI)
exampel screan 



<img width="1536" height="1024" alt="19658" src="https://github.com/user-attachments/assets/0fd1baa3-cbf8-4b52-ba76-5d617a1b7b6c" />

https://github.com/user-attachments/assets/2056e93e-3a26-46dd-bf37-fd376d03bc29

https://github.com/user-attachments/assets/ac951fc0-bcb3-4261-8d82-3ef418f17b65 


**Tworzymy otwarte dema i narzbędzia
, które zamieniają idee terraformacji w obrazy, koncepcje i procesy edukacyjne.**  
Od dolin i pasm górskich po megastruktury — eksplorowane przez generatory graficzne i przemyślane prompty.

<br/>

<!-- Szybka nawigacja -->
[🌐 Strona główna](https://github.com/Terraforming-Planet) •
[🧪 Dema](#-dema) •
[🎯 Misja](#-misja) •
[🧠 Jak generatory pomagają w nauce](#-jak-generatory-graficzne-pomagają-w-nauce-terraformacji) •
[🤝 Współpraca](#-współpraca) •
[⚖️ Odpowiedzialność](#%EF%B8%8F-bezpieczeństwo--odpowiedzialne-użycie)

<br/>

<!-- Badge -->
<img alt="Status" src="https://img.shields.io/badge/status-aktywny-brightgreen" />
<img alt="Cel" src="https://img.shields.io/badge/cel-edukacja%20%26%20prototypy-blue" />
<img alt="Open Source" src="https://img.shields.io/badge/open%20source-społeczność-orange" />

</div>

---

## 🚀 Czym jest ten projekt?
**Terraforming-Planet** to organizacja skupiona na **nauce, prototypowaniu i opowiadaniu historii** związanych z:
- formowaniem terenu (góry, doliny, delty, baseny),
- futurystycznymi maszynami budowlanymi i fotowoltaicznymi,
- inżynierią w skali planetarnej — przedstawianą w **formie wizualnej**.

Nasza główna idea:  
**generatory obrazów + dobre prompty = szybka eksploracja koncepcji inżynieryjnych**  
bez konieczności budowania pełnych symulacji czy ciężkich pipeline’ów 3D.

---

## 🎯 Misja
Chcemy:
- **Uczyć** jak kształtowany jest teren (geologia + myślenie inżynierskie),
- **Prototypować** maszyny formujące krajobraz (np. koparki PV, autonomiczne budowniki),
- **Wizualizować** scenariusze „co by było gdyby” dla planet i ekosystemów,
- **Łączyć ludzi**: artystów, programistów i inżynierów działających dla dobra wspólnego.

> **Dlaczego to ważne:** obrazy upraszczają złożone systemy i ułatwiają ich zrozumienie, analizę oraz rozwój.

---

## 🧠 Jak generatory graficzne pomagają w nauce terraformacji
Grafika generatywna może działać jak **laboratorium edukacyjne**:

### 1) Szybkie testowanie hipotez
Natychmiastowe warianty:
- silniejsza / słabsza grawitacja,
- różne materiały skorupy planety,
- intensywność erozji,
- cykle wodne i delty rzeczne,
- strategie budowy (tarasy, kanały, zapory).

### 2) Iteracja koncepcji i komunikacja
Jedna grafika „4w1” potrafi pokazać:
- **stan początkowy → interwencję → etap pośredni → efekt końcowy**  
i idealnie nadaje się do dokumentacji, nauki i dyskusji.

### 3) Projektowanie maszyn razem z otoczeniem
Maszyny powstają **równolegle z krajobrazem**, który tworzą:
- koparki PV rzeźbiące doliny,
- autonomiczne pojazdy stabilizujące grunt,
- modułowe systemy budujące góry i wały przeciwpowodziowe.

### 4) Myślenie „naukowe” oparte na promptach
Dobre prompty wymuszają:
- ograniczenia,
- mierzalne efekty,
- etapy procesu,
- spójne kadry i perspektywę.

<details>
<summary><b>Przykładowa grafika narysowana w gimpie na której szkoliłem model Ai od OpenAI edukacyjnego (kopiuj)</b></summary>

txt
xxx.
![19007](https://github.com/user-attachments/assets/d54ef1ca-967d-4c49-8022-17bc43301902)

