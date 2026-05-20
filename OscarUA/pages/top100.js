import { MOVIES } from '../data/movies.js';
import { navigate } from '../js/router.js';
import { SectionTitle } from '../js/components.js';

export function renderTop100(container) {
  const sorted = [...MOVIES].filter(m => m.topRating).sort((a, b) => a.topRating - b.topRating);
  SectionTitle('🏆 Топ 100 фільмів усіх часів', container);
  const list = document.createElement('div');
  list.className = 'top-list';
  sorted.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'top-list__item';
    item.innerHTML = `
      <span class="top-list__rank">#${movie.topRating}</span>
      <img class="top-list__poster" src="${movie.poster}" alt="${movie.title}" loading="lazy"
           onerror="this.src='https://via.placeholder.com/60x90/111/666?text=?'">
      <div class="top-list__info">
        <strong>${movie.title}</strong>
        <span>${movie.year} · ${movie.director} · ${movie.genres[0]}</span>
      </div>
      <span class="top-list__rating">${movie.rating}</span>
    `;
    item.addEventListener('click', () => navigate(`/movie/${movie.id}`));
    list.appendChild(item);
  });
  container.appendChild(list);
  if (sorted.length < 100) {
    const note = document.createElement('p');
    note.className = 'page-info';
    note.style.marginTop = '20px';
    note.textContent = `Наразі ${sorted.length} фільмів з рейтингом. Список поповнюється.`;
    container.appendChild(note);
  }
}
