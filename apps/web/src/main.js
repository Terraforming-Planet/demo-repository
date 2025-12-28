import './style.css';
import { generateImage } from './lib/api.js';

const terraformingTopics = [
  {
    icon: '🌊',
    title: 'Retencja i mokradła',
    text: 'Odbudowa terenów podmokłych dla magazynowania wody.'
  },
  {
    icon: '🧱',
    title: 'Wały i bariery',
    text: 'Bezpieczne zabezpieczenia przeciwpowodziowe i wydmowe.'
  },
  {
    icon: '🌿',
    title: 'Rekultywacja gleby',
    text: 'Przywracanie żyzności gleb i poprawa bioróżnorodności.'
  },
  {
    icon: '🏞️',
    title: 'Odtwarzanie delt',
    text: 'Modelowanie ujść rzek i ochronę obszarów przybrzeżnych.'
  },
  {
    icon: '🌀',
    title: 'Kanały i retencja',
    text: 'Sterowanie przepływami wody w czasie suszy i powodzi.'
  },
  {
    icon: '🏙️',
    title: 'Miasta przyszłości',
    text: 'Zielone przestrzenie i infrastruktura adaptacyjna.'
  }
];

const pvSections = [
  {
    title: 'Pojazdy terenowe',
    description:
      'Quady i pojazdy gąsienicowe z panelami PV wspierające prace w terenie bez dostępu do sieci.',
    images: ['Wydmy', 'Wały', 'Skarpy']
  },
  {
    title: 'Busy i transport',
    description:
      'Mobilne huby energetyczne z panelami na dachu, wspierające logistykę i ewakuację.',
    images: ['Transport', 'Mobilna stacja', 'Konwoje']
  },
  {
    title: 'Maszyny budowlane',
    description:
      'Koparki i ładowarki, które ładują się w trakcie pracy i zasilają czujniki środowiskowe.',
    images: ['Koparka', 'Ładowarka', 'Mini koparka']
  },
  {
    title: 'Roboty i drony',
    description:
      'Autonomiczne roboty z PV do monitoringu gleby, wody i roślinności.',
    images: ['Drony', 'Roboty', 'Czujniki']
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

const storageKey = 'terraforming-lab-history';
const historyLimit = 8;

const terraformingContainer = document.getElementById('terraforming-cards');
const pvContainer = document.getElementById('pv-grid');
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

function renderTerraformingCards() {
  terraformingContainer.innerHTML = terraformingTopics
    .map(
      (topic) => `
      <article class="card">
        <span>${topic.icon}</span>
        <h4>${topic.title}</h4>
        <p>${topic.text}</p>
      </article>
    `
    )
    .join('');
}

function renderPvSections() {
  pvContainer.innerHTML = pvSections
    .map(
      (section) => `
      <article class="pv-card">
        <div>
          <h3>${section.title}</h3>
          <p>${section.description}</p>
        </div>
        <div class="pv-gallery">
          ${section.images
            .map(
              (label) => `
            <div class="pv-image" role="img" aria-label="${label}">
              <span>${label}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </article>
    `
    )
    .join('');
}

function renderPromptSeeds() {
  promptList.innerHTML = promptSeeds
    .map((seed) => `<button type="button" class="prompt-chip">${seed}</button>`)
    .join('');

  promptList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
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
  const history = loadHistory();
  historyGrid.innerHTML = history
    .map(
      (item) => `
      <div class="history-item">
        <strong>${item.label}</strong>
      </div>
    `
    )
    .join('');
}

function updateOutput({ imageUrl, prompt }) {
  outputPreview.innerHTML = imageUrl
    ? `<img src="${imageUrl}" alt="Wygenerowany obraz" loading="lazy" />`
    : '<span>Podgląd obrazu</span>';
  downloadBtn.disabled = !imageUrl;
  copyBtn.disabled = !prompt;
  if (imageUrl) {
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'terraforming-planet.png';
      link.click();
    };
  }
  if (prompt) {
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(prompt);
      labStatus.textContent = 'Prompt skopiowany do schowka.';
    };
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

labForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    labStatus.textContent = 'Najpierw wpisz prompt.';
    return;
  }

  labStatus.textContent = 'Generowanie obrazu...';
  updateOutput({ imageUrl: null, prompt: null });

  try {
    const styledPrompt = buildStyledPrompt(prompt, styleInput.value);
    const out = await generateImage({
      prompt: styledPrompt,
      size: formatInput.value
    });
    const imageUrl = out.data_url;
    updateOutput({ imageUrl, prompt });
    const label = prompt.length > 52 ? `${prompt.slice(0, 48)}…` : prompt;
    updateHistoryEntry({ label, imageUrl, prompt });
    labStatus.textContent = 'Gotowe! Zapisz wnioski i dodaj do historii.';
  } catch (error) {
    labStatus.textContent = error.message;
  }
});

function renderGallery(filters = ['wszystkie']) {
  const active = filters[0];
  const items =
    active === 'wszystkie'
      ? galleryItems
      : galleryItems.filter((item) => item.tags.includes(active));

  galleryGrid.innerHTML = items
    .map(
      (item) => `
      <div class="gallery-item" data-title="${item.title}" data-prompt="${item.prompt}">
        <span>${item.title}</span>
      </div>
    `
    )
    .join('');

  galleryGrid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
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

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('active');
  }
});

renderTerraformingCards();
renderPvSections();
renderPromptSeeds();
renderHistory();
renderFilters();
renderGallery();
