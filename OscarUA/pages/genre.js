import { MOVIES } from '../data/movies.js';
import { MovieGrid, SectionTitle, EmptyState } from '../js/components.js';

export function renderGenre(container, genre) {
  const movies = MOVIES.filter(m => m.genres[0] === genre);
  SectionTitle(`Жанр: ${genre}`, container);
  if (movies.length === 0) {
    EmptyState(`Фільмів у жанрі "${genre}" не знайдено.`, container);
    return;
  }
  const info = document.createElement('p');
  info.className = 'page-info';
  info.textContent = `Знайдено ${movies.length} фільм(ів) де "${genre}" є основним жанром`;
  container.appendChild(info);
  MovieGrid(movies, container);
}
