# Terraforming-Planet — przegląd projektu

## Misja

Terraforming-Planet powstał, aby edukować o formowaniu terenu, retencji wody i technologiach OZE. Pokazujemy, jak odpowiedzialnie planować infrastrukturę, rekultywować krajobraz i wykorzystywać pojazdy fotowoltaiczne do pracy w terenie. Wszystko po to, by wspierać klimat, bezpieczeństwo hydrologiczne i wspólne dobro.

## Architektura

```
/apps
  /web        -> statyczna aplikacja edukacyjna (Vite + Vanilla JS)
  /worker     -> API do generowania obrazów (Cloudflare Worker + OpenAI)
```

### Frontend (`/apps/web`)

- Strona główna z manifestem i CTA.
- Sekcje edukacyjne o terraformingu i pojazdach PV.
- Laboratorium obrazów z historią w `localStorage`.
- Galeria z filtrami i modalem.

### Backend (`/apps/worker`)

- `GET /health` — status workera.
- `POST /generate` — przyjmuje `prompt` i `size`, zwraca `data_url` z obrazem base64.
- Klucz API nigdy nie trafia do frontendu.

## Dlaczego tak?

- **Prostota i wydajność**: lekki frontend bez zbędnych zależności.
- **Bezpieczeństwo**: klucze API tylko po stronie workera.
- **Edukacja**: każda sekcja strony wspiera narrację o terraformingu i pojazdach PV.
