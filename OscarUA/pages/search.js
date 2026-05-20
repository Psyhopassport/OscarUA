import { MOVIES } from '../data/movies.js';
import { MovieGrid, SectionTitle, EmptyState } from '../js/components.js';

export function renderSearch(container, query) {
  const q = query.toLowerCase();
  const results = MOVIES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.titleEn.toLowerCase().includes(q) ||
    m.director.toLowerCase().includes(q) ||
    m.genres.some(g => g.toLowerCase().includes(q))
  );
  SectionTitle(`Результати пошуку: "${query}"`, container);
  if (results.length === 0) {
    EmptyState(`За запитом "${query}" нічого не знайдено`, container);
    return;
  }
  const info = document.createElement('p');
  info.className = 'page-info';
  info.textContent = `Знайдено ${results.length} фільм(ів)`;
  container.appendChild(info);
  MovieGrid(results, container);
}
