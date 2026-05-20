import { MOVIES } from '../data/movies.js';
import { GenreTag, EmptyState, MovieGrid, SectionTitle } from '../js/components.js';
import { setBreadcrumbs } from '../js/breadcrumbs.js';

export function renderMovie(container, id) {
  const movie = MOVIES.find(m => m.id === id);
  if (!movie) { EmptyState('Фільм не знайдено', container); return; }

  setBreadcrumbs([
    { label: 'Головна', path: '/' },
    { label: movie.genres[0], path: `/genre/${encodeURIComponent(movie.genres[0])}` },
    { label: movie.title }
  ]);

  // 1. НАЗВА + ЖАНРИ
  const titleBlock = document.createElement('div');
  titleBlock.className = 'mp-title-block';
  titleBlock.innerHTML = `
    <h1 class="mp-title">${movie.title}
      <span style="color:var(--text-muted);font-size:18px;font-weight:400"> (${movie.year})</span>
    </h1>`;
  const tagsRow = document.createElement('div');
  tagsRow.className = 'mp-genres';
  movie.genres.forEach(g => tagsRow.appendChild(GenreTag(g)));
  titleBlock.appendChild(tagsRow);
  container.appendChild(titleBlock);

  // 2. ПОСТЕР-БЛОК (альбомний, на всю ширину)
  const posterBlock = document.createElement('div');
  posterBlock.className = 'mp-poster-wrap';
  posterBlock.innerHTML = `
    <div class="mp-poster-inner">
      <img class="mp-backdrop"
           src="${movie.screenshots[0] || movie.poster}"
           alt="${movie.title}"
           onerror="this.src='${movie.poster}'">
      <div class="mp-poster-gradient"></div>
      <div class="mp-poster-details">
        <img class="mp-poster-thumb" src="${movie.poster}" alt="${movie.title}"
             onerror="this.src='https://via.placeholder.com/150x225/181818/888?text=?'">
        <div class="mp-poster-meta">
          <div class="mp-rating-big">
            <span class="mp-rating-num">${movie.rating}</span>
            <span class="mp-rating-max">/10</span>
          </div>
          <ul class="mp-meta-list">
            <li><span>Рік:</span> ${movie.year}</li>
            <li><span>Тривалість:</span> ${movie.duration} хв</li>
            <li><span>Країна:</span> ${movie.country}</li>
            <li><span>Режисер:</span> ${movie.director}</li>
            <li><span>Актори:</span> ${movie.cast.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>`;
  container.appendChild(posterBlock);

  // 3. ТРЕЙЛЕР — повна ширина контейнера
  const trailerSection = document.createElement('section');
  trailerSection.className = 'mp-section';
  trailerSection.innerHTML = `
    <div class="section-header"><h2 class="section-title">Трейлер</h2></div>
    <div class="mp-player">
      <iframe src="${movie.trailer}"
        title="Трейлер — ${movie.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>`;
  container.appendChild(trailerSection);

  // 4. СКРІНШОТИ — під трейлером, та сама ширина
  if (movie.screenshots.length > 0) {
    const screensSection = document.createElement('section');
    screensSection.className = 'mp-section';
    screensSection.innerHTML = `<div class="section-header"><h2 class="section-title">Кадри зі сцен</h2></div>`;
    const gallery = document.createElement('div');
    gallery.className = 'mp-gallery';
    movie.screenshots.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = movie.title;
      img.loading = 'lazy';
      img.className = 'mp-screenshot';
      img.onerror = function() { this.style.display = 'none'; };
      img.addEventListener('click', () => openLightbox(src, movie.title));
      gallery.appendChild(img);
    });
    screensSection.appendChild(gallery);
    container.appendChild(screensSection);
  }

  // 5. ОПИС — абзаци, та сама ширина
  const storySection = document.createElement('section');
  storySection.className = 'mp-section mp-story';
  storySection.innerHTML = `
    <div class="section-header"><h2 class="section-title">Про фільм</h2></div>
    <h3>Опис</h3>
    <p>${movie.description}</p>
    <h3>Сюжет</h3>
    <p>${movie.plot}</p>
    <h3>Ідея та задумка</h3>
    <p>${movie.concept}</p>`;
  container.appendChild(storySection);

  const related = MOVIES
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 5);
  if (related.length > 0) {
    const relSection = document.createElement('section');
    relSection.className = 'mp-section';
    SectionTitle('Схожі фільми', relSection);
    MovieGrid(related, relSection);
    container.appendChild(relSection);
  }
}

function openLightbox(src, title) {
  const ov = document.createElement('div');
  ov.className = 'lightbox';
  ov.innerHTML = `
    <div class="lightbox__inner">
      <img src="${src}" alt="${title}">
      <button class="lightbox__close">✕</button>
    </div>`;
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.querySelector('.lightbox__close').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
}
