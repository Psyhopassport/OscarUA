import { navigate } from './router.js';

export function MovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="movie-card__poster">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy"
           onerror="this.src='https://via.placeholder.com/300x450/1a1a1a/666?text=Немає+постера'">
      <div class="movie-card__overlay">
        <span class="movie-card__play">▶</span>
      </div>
      <span class="movie-card__rating ${ratingClass(movie.rating)}">${movie.rating}</span>
      ${movie.isNew ? '<span class="movie-card__badge badge-new">Новинка</span>' : ''}
    </div>
    <div class="movie-card__info">
      <h3 class="movie-card__title">${movie.title}</h3>
      <p class="movie-card__meta">${movie.year} · ${movie.duration} хв</p>
      <div class="movie-card__genres">
        ${movie.genres.slice(0, 2).map(g => `<span class="tag">${g}</span>`).join('')}
      </div>
    </div>
  `;
  card.addEventListener('click', () => navigate(`/movie/${movie.id}`));
  return card;
}

function ratingClass(r) {
  if (r >= 8) return 'rating-high';
  if (r >= 6) return 'rating-mid';
  return 'rating-low';
}

export function MovieGrid(movies, container) {
  const grid = document.createElement('div');
  grid.className = 'movie-grid';
  movies.forEach(m => grid.appendChild(MovieCard(m)));
  container.appendChild(grid);
}

export function SectionTitle(text, container, linkPath, linkLabel) {
  const row = document.createElement('div');
  row.className = 'section-header';
  row.innerHTML = `<h2 class="section-title">${text}</h2>`;
  if (linkPath && linkLabel) {
    const a = document.createElement('a');
    a.className = 'section-more';
    a.href = `#${linkPath}`;
    a.textContent = linkLabel + ' →';
    row.appendChild(a);
  }
  container.appendChild(row);
}
export function EmptyState(msg, container) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `<span>😕</span><p>${msg}</p>`;
  container.appendChild(div);
}
export function GenreTag(genre, clickable = true) {
  const span = document.createElement('span');
  span.className = 'tag' + (clickable ? ' tag--clickable' : '');
  span.textContent = genre;
  if (clickable) {
    span.addEventListener('click', (e) => {
      e.stopPropagation();
      navigate(`/genre/${encodeURIComponent(genre)}`);
    });
  }
  return span;
}
