import { MOVIES } from '../data/movies.js';
import { MovieGrid, SectionTitle } from '../js/components.js';

export function renderHome(container) {
  const hero = MOVIES.find(m => m.isNew);
  if (hero) {
    const banner = document.createElement('div');
    banner.className = 'hero-banner';
    banner.style.backgroundImage = `url(${hero.screenshots[0] || hero.poster})`;
    banner.innerHTML = `
      <div class="hero-banner__overlay"></div>
      <div class="hero-banner__content">
        <div class="hero-banner__genres">
          ${hero.genres.map(g => `<span class="tag">${g}</span>`).join('')}
        </div>
        <h1 class="hero-banner__title">${hero.title}</h1>
        <p class="hero-banner__desc">${hero.description}</p>
        <div class="hero-banner__actions">
          <button class="btn-primary" onclick="window.location.hash='/movie/${hero.id}'">▶ Дивитися трейлер</button>
          <span class="hero-banner__rating">⭐ ${hero.rating}</span>
        </div>
      </div>
    `;
    container.appendChild(banner);
  }
  const newMovies = MOVIES.filter(m => m.isNew);
  SectionTitle('🎬 Новинки кіно', container, '/new', 'Всі новинки');
  MovieGrid(newMovies, container);
  const topMovies = [...MOVIES].sort((a, b) => (a.topRating || 99) - (b.topRating || 99)).slice(0, 4);
  SectionTitle('🏆 Топ фільмів', container, '/top100', 'Топ 100');
  MovieGrid(topMovies, container);
  SectionTitle('Всі фільми', container);
  MovieGrid(MOVIES, container);
}
