const slidesContainer = document.getElementById('slides');
const overviewPanel = document.getElementById('overview');
const overviewGrid = document.getElementById('overview-grid');
const progressBar = document.getElementById('progress-bar');
const toggleOverviewBtn = document.getElementById('toggle-overview');
const startBtn = document.getElementById('start-presentation');

let slides = [];
let currentIndex = 0;

const fallbackSlides = [
    {
        id: 1,
        title: 'Добро пожаловать в шаблон',
        body: 'Каждый слайд занимает весь экран, адаптируется под любое устройство и готов для кастомизации.',
        background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80',
        accent_color: '#7c3aed',
        layout_type: 'hero',
        sequence: 1,
    },
    {
        id: 2,
        title: 'Данные из MySQL',
        body: 'Слайды загружаются с сервера через PHP 8.2 и PDO. В комплекте идёт SQL дамп с тестовым наполнением.',
        background_image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80',
        accent_color: '#0ea5e9',
        layout_type: 'feature',
        sequence: 2,
    },
    {
        id: 3,
        title: 'Готовые интеракции',
        body: 'Навигация по стрелкам, кликом и через мини-карту. Прогресс-бар синхронизирован с текущим слайдом.',
        background_image: 'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1800&q=80',
        accent_color: '#22d3ee',
        layout_type: 'callout',
        sequence: 3,
    },
];

async function loadSlides() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Ошибка загрузки: ' + response.statusText);
        const payload = await response.json();
        slides = payload.slides || [];
        if (!slides.length) {
            slides = fallbackSlides;
        }
    } catch (error) {
        console.warn('Используем данные по умолчанию', error);
        slides = fallbackSlides;
    }

    renderSlides();
    renderOverview();
    updateProgress();
}

function renderSlides() {
    slidesContainer.innerHTML = '';

    slides.forEach((slide, index) => {
        const section = document.createElement('article');
        section.className = 'slide';
        section.style.backgroundImage = `url(${slide.background_image})`;
        section.dataset.index = index;

        const content = document.createElement('div');
        content.className = 'slide-content';

        const meta = document.createElement('div');
        meta.className = 'slide-meta';
        const tag = document.createElement('span');
        tag.className = 'slide-tag';
        tag.textContent = slide.layout_type.toUpperCase();
        meta.appendChild(tag);
        meta.appendChild(document.createTextNode(`Слайд ${index + 1}/${slides.length}`));

        const title = document.createElement('h2');
        title.textContent = slide.title;

        const body = document.createElement('p');
        body.textContent = slide.body;

        const actions = document.createElement('div');
        actions.className = 'actions';
        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = 'Адаптивный экран';
        const badge2 = document.createElement('div');
        badge2.className = 'badge';
        badge2.textContent = 'Просто менять темы';
        actions.append(badge, badge2);

        content.append(meta, title, body, actions);
        section.appendChild(content);
        slidesContainer.appendChild(section);
    });

    goToSlide(0);
}

function renderOverview() {
    overviewGrid.innerHTML = '';

    slides.forEach((slide, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'overview-card';
        card.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
        card.dataset.index = index;

        const heading = document.createElement('div');
        heading.className = 'title';
        heading.textContent = slide.title;

        const hint = document.createElement('div');
        hint.className = 'subtitle';
        hint.textContent = slide.layout_type.toUpperCase();

        card.append(heading, hint);
        card.addEventListener('click', () => goToSlide(index));

        overviewGrid.appendChild(card);
    });

    markOverview();
}

function markOverview() {
    document.querySelectorAll('.overview-card').forEach((card, idx) => {
        card.setAttribute('aria-current', idx === currentIndex ? 'true' : 'false');
    });
}

function goToSlide(index) {
    if (!slides.length) return;
    currentIndex = (index + slides.length) % slides.length;

    document.querySelectorAll('.slide').forEach((slide, idx) => {
        slide.style.display = idx === currentIndex ? 'grid' : 'none';
    });

    markOverview();
    updateProgress();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function updateProgress() {
    const percent = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${percent}%`;
}

function toggleOverview() {
    const visible = overviewPanel.classList.toggle('visible');
    toggleOverviewBtn.setAttribute('aria-expanded', String(visible));
    overviewPanel.setAttribute('aria-hidden', String(!visible));
}

function registerNavigation() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') nextSlide();
        if (event.key === 'ArrowLeft') prevSlide();
    });

    let touchStartX = null;
    slidesContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });
    slidesContainer.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const delta = event.changedTouches[0].screenX - touchStartX;
        if (delta > 50) prevSlide();
        if (delta < -50) nextSlide();
        touchStartX = null;
    });
}

startBtn.addEventListener('click', () => goToSlide(0));
toggleOverviewBtn.addEventListener('click', toggleOverview);

registerNavigation();
loadSlides();
