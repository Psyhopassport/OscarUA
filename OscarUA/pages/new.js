import { MOVIES } from '../data/movies.js';
import { MovieGrid, SectionTitle } from '../js/components.js';

export function renderNew(container) {
  const movies = MOVIES.filter(m => m.isNew);
  SectionTitle('🎬 Новинки кіно', container);
  MovieGrid(movies, container);
}
