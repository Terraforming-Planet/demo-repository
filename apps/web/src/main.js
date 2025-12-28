import './styles/main.css';
import { API_BASE, generateImage } from './lib/api.js';

const missionCards = [
  {
    icon: '🛰️',
    title: 'Terraforming terenu',
    text: 'Rekultywacja, retencja i ochrona przeciwpowodziowa w praktyce.'
  },
  {
    icon: '⚡',
    title: 'Pojazdy fotowoltaiczne',
    text: 'Maszyny PV jako mobilne źródła energii dla prac terenowych.'
  },
  {
    icon: '🧪',
    title: 'Laboratorium wizualizacji',
    text: 'Prompty + obrazy + wnioski edukacyjne w jednym miejscu.'
  }
];

const promptSeeds = [
  'System retencji wody w dolinie rzecznej, realistyczny render, światło poranka.',
  'Rekultywacja terenów poprzemysłowych z mokradłami i pasami zieleni, concept art.',
  'Mapa techniczna kanałów przeciwpowodziowych i wałów, styl blueprint.',
  'Odtwarzanie delty rzeki z siecią wysp i roślinności, realistyczny render.',
  'Zielone miasto przyszłości z tarasowaniem terenu i zbiornikami, concept art.',
  'Pojazd gąsienicowy z panelami PV pracujący na wydmach, realistyczny render.',
  'Autonomiczny bus PV z mobilnym magazynem energii, concept art.',
  'Koparka z karoserią PV budująca wały ochronne, styl blueprint.',
  'Drony PV monitorujące retencję wody, realistyczny render.',
  'Roboty solarne sadzące rośliny na hałdach górniczych, concept art.'
];

const galleryItems = [
  {
    title: 'System retencji wody',
    prompt: promptSeeds[0],
    tags: ['terraformowanie', 'hydrologia']
  },
  {
    title: 'Rekultywacja terenów poprzemysłowych',
    prompt: promptSeeds[1],
    tags: ['terraformowanie']
  },
  {
    title: 'Kanały przeciwpowodziowe',
    prompt: promptSeeds[2],
    tags: ['hydrologia']
  },
  {
    title: 'Delta rzeki',
    prompt: promptSeeds[3],
    tags: ['terraformowanie', 'hydrologia']
  },
  {
    title: 'Miasto przyszłości',
    prompt: promptSeeds[4],
    tags: ['miasta przyszłości']
  },
  {
    title: 'Pojazd gąsienicowy PV',
    prompt: promptSeeds[5],
    tags: ['PV-vehicle']
  },
  {
    title: 'Bus PV',
    prompt: promptSeeds[6],
    tags: ['PV-vehicle']
  },
  {
    title: 'Koparka PV',
    prompt: promptSeeds[7],
    tags: ['PV-vehicle']
  },
  {
    title: 'Drony PV',
    prompt: promptSeeds[8],
    tags: ['PV-vehicle']
  },
  {
    title: 'Roboty solarne',
    prompt: promptSeeds[9],
    tags: ['PV-vehicle', 'terraformowanie']
  }
];

const roadmapItems = [
  {
    title: 'Q1: Edukacja lokalna',
    text: 'Scenariusze dla szkół i NGO: retencja, erozja, rekultywacja.'
  },
  {
    title: 'Q2: Symulacje terenowe',
    text: 'Więcej wizualizacji i map terenu z warstwami danych hydrologicznych.'
  },
  {
    title: 'Q3: Flota PV',
    text: 'Biblioteka pojazdów i maszyn PV z opisem parametrów energetycznych.'
  },
  {
    title: 'Q4: Warsztaty społecznościowe',
    text: 'Programy pilotażowe z partnerami miejskimi i środowiskowymi.'
  }
];

const faqItems = [
  {
    q: 'Czy generator wymaga klucza API?',
    a: 'Tak — działa przez Cloudflare Workera, który przechowuje klucz po stronie serwera.'
  },
  {
    q: 'Czy mogę używać promptów edukacyjnie?',
    a: 'Tak, zachęcamy do dzielenia się nimi w szkołach i projektach NGO.'
  },
  {
    q: 'Czy to tylko wizualizacje?',
    a: 'Nie, to także baza wiedzy o hydrologii, rekultywacji i pojazdach PV.'
  },
  {
    q: 'Czy strona działa na telefonie?',
    a: 'Tak, układ jest responsywny i dostosowuje się do ekranów mobilnych.'
  }
];

const storageKey = 'terraforming-lab-history';
const historyLimit = 8;

const missionContainer = document.getElementById('mission-cards');
const promptList = document.getElementById('prompt-list');
const labForm = document.getElementById('lab-form');
const promptInput = document.getElementById('prompt');
const styleInput = document.getElementById('style');
const formatInput = document.getElementById('format');
const outputPreview = document.getElementById('output-preview');
const downloadBtn = document.getElementById('download-btn');
const copyBtn = document.getElementById('copy-btn');
const notesInput = document.getElementById('notes');
const historyGrid = document.getElementById('history-grid');
const labStatus = document.getElementById('lab-status');
const galleryGrid = document.getElementById('gallery-grid');
const filterContainer = document.getElementById('gallery-filters');
const modal = document.getElementById('gallery-modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalText = document.getElementById('modal-text');
const roadmapGrid = document.getElementById('roadmap-grid');
const faqGrid = document.getElementById('faq-grid');
const healthStatus = document.getElementById('health-status');
const appStatus = document.getElementById('app-status');
const apiStatus = document.getElementById('api-status');

function updateHealthUI(state, message) {
  if (!healthStatus) return;
  healthStatus.textContent = message;
  healthStatus.dataset.state = state;
}

function updateAppStatus(message) {
  if (appStatus) appStatus.textContent = message;
}

function updateApiStatus(message) {
  if (apiStatus) apiStatus.textContent = message;
}

function renderMissionCards() {
  if (!missionContainer) return;
  missionContainer.innerHTML = missionCards
    .map(
      (card) => `
      <article class="mission-card">
        <span>${card.icon}</span>
        <h4>${card.title}</h4>
        <p>${card.text}</p>
      </article>
    `
    )
    .join('');
}

function renderPromptSeeds() {
  if (!promptList) return;
  promptList.innerHTML = promptSeeds
    .map((seed) => `<button type="button" class="prompt-chip">${seed}</button>`)
    .join('');

  promptList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (!promptInput) return;
      promptInput.value = button.textContent ?? '';
      promptInput.focus();
    });
  });
}

function loadHistory() {
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : [];
}

function saveHistory(history) {
  localStorage.setItem(storageKey, JSON.stringify(history));
}

function renderHistory() {
  if (!historyGrid) return;
  const history = loadHistory();
  historyGrid.innerHTML = history
    .map(
      (item) => `
      <div class="history-item" style="background-image: url('${item.imageUrl}')">
        <span>${item.label}</span>
      </div>
    `
    )
    .join('');
}

function updateOutput({ imageUrl, prompt }) {
  if (outputPreview) {
    outputPreview.innerHTML = imageUrl
      ? `<img src="${imageUrl}" alt="Wygenerowany obraz" loading="lazy" />`
      : '<span>Podgląd obrazu</span>';
  }

  if (downloadBtn) {
    downloadBtn.disabled = !imageUrl;
    if (imageUrl) {
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'terraforming-planet.png';
        link.click();
      };
    }
  }

  if (copyBtn) {
    copyBtn.disabled = !prompt;
    if (prompt) {
      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(prompt);
          if (labStatus) labStatus.textContent = 'Prompt skopiowany do schowka.';
        } catch (error) {
          if (labStatus) labStatus.textContent = 'Nie udało się skopiować promptu.';
        }
      };
    }
  }
}

function buildStyledPrompt(prompt, style) {
  const styleMap = {
    realistyczny: 'realistyczny render',
    concept: 'concept art',
    blueprint: 'styl blueprint',
    emoji: 'styl emoji'
  };
  const suffix = styleMap[style] ?? style;
  return `${prompt}\nStyl: ${suffix}. Edukacyjna wizualizacja terraformingu lub pojazdów PV.`;
}

function updateHistoryEntry(entry) {
  const history = loadHistory();
  history.unshift(entry);
  const trimmed = history.slice(0, historyLimit);
  saveHistory(trimmed);
  renderHistory();
}

async function handleSubmit(event) {
  event.preventDefault();
  const prompt = promptInput?.value.trim() || '';
  if (!prompt) {
    if (labStatus) labStatus.textContent = 'Najpierw wpisz prompt.';
    return;
  }

  if (labStatus) labStatus.textContent = 'Generowanie obrazu...';
  updateOutput({ imageUrl: null, prompt: null });

  try {
    const styledPrompt = buildStyledPrompt(prompt, styleInput?.value || 'realistyczny');
    const imageUrl = await generateImage({
      prompt: styledPrompt,
      size: formatInput?.value || '1024x1024'
    });
    updateOutput({ imageUrl, prompt });
    const label = prompt.length > 52 ? `${prompt.slice(0, 48)}…` : prompt;
    updateHistoryEntry({ label, imageUrl, prompt });
    if (labStatus) labStatus.textContent = 'Gotowe! Zapisz wnioski i dodaj do historii.';
  } catch (error) {
    if (labStatus) {
      labStatus.textContent = `Błąd: ${error.message || 'Nie udało się wygenerować obrazu.'}`;
    }
  }
}

function renderGallery(filters = ['wszystkie']) {
  if (!galleryGrid) return;
  const active = filters[0];
  const items =
    active === 'wszystkie'
      ? galleryItems
      : galleryItems.filter((item) => item.tags.includes(active));

  galleryGrid.innerHTML = items
    .map(
      (item) => `
      <button class="gallery-item" data-title="${item.title}" data-prompt="${item.prompt}">
        <span>${item.title}</span>
      </button>
    `
    )
    .join('');

  galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (!modal || !modalImage || !modalText) return;
      modal.classList.add('active');
      modalImage.innerHTML = `<span>${item.dataset.title}</span>`;
      modalText.innerHTML = `
        <h3>${item.dataset.title}</h3>
        <p><strong>Prompt:</strong> ${item.dataset.prompt}</p>
      `;
    });
  });
}

function renderFilters() {
  if (!filterContainer) return;
  const tags = ['wszystkie', 'terraformowanie', 'PV-vehicle', 'hydrologia', 'miasta przyszłości'];
  filterContainer.innerHTML = tags
    .map(
      (tag, index) => `
      <button class="filter-btn ${index === 0 ? 'active' : ''}" data-tag="${tag}">${tag}</button>
    `
    )
    .join('');

  filterContainer.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      filterContainer.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderGallery([button.dataset.tag]);
    });
  });
}

function renderRoadmap() {
  if (!roadmapGrid) return;
  roadmapGrid.innerHTML = roadmapItems
    .map(
      (item) => `
      <article class="roadmap-card">
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </article>
    `
    )
    .join('');
}

function renderFaq() {
  if (!faqGrid) return;
  faqGrid.innerHTML = faqItems
    .map(
      (item) => `
      <details class="faq-item">
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>
    `
    )
    .join('');
}

async function checkHealth() {
  updateAppStatus('Gotowe');
  updateHealthUI('loading', 'Sprawdzam API…');
  updateApiStatus('Łączenie…');

  try {
    const response = await fetch(`${API_BASE.replace(/\/$/, '')}/health`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data?.ok) {
      throw new Error('Brak potwierdzenia ok');
    }
    updateHealthUI('ok', 'API działa');
    updateApiStatus(`OK • ${data.version || 'v1'}`);
  } catch (error) {
    updateHealthUI('error', 'API offline');
    updateApiStatus('Brak połączenia');
    if (labStatus) {
      labStatus.textContent = 'Uwaga: API jest niedostępne. Generator może nie działać.';
    }
  }
}

if (labForm) {
  labForm.addEventListener('submit', handleSubmit);
}

if (modalClose && modal) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });
}

renderMissionCards();
renderPromptSeeds();
renderHistory();
renderFilters();
renderGallery();
renderRoadmap();
renderFaq();
checkHealth();
