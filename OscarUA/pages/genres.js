import { ALL_GENRES, MOVIES } from '../data/movies.js';
import { SectionTitle } from '../js/components.js';
import { navigate } from '../js/router.js';

export function renderGenreList(container) {
  SectionTitle('Жанри', container);
  const grid = document.createElement('div');
  grid.className = 'genre-list';
  ALL_GENRES.forEach(genre => {
    const count = MOVIES.filter(m => m.genres[0] === genre).length;
    const sample = MOVIES.find(m => m.genres[0] === genre);
    const card = document.createElement('div');
    card.className = 'genre-card';
    if (sample) card.style.backgroundImage = `url(${sample.poster})`;
    card.innerHTML = `
      <div class="genre-card__overlay"></div>
      <div class="genre-card__body">
        <span class="genre-card__name">${genre}</span>
        <span class="genre-card__count">${count} фільм(ів)</span>
      </div>
    `;
    card.addEventListener('click', () => navigate(`/genre/${encodeURIComponent(genre)}`));
    grid.appendChild(card);
  });
  container.appendChild(grid);
}
