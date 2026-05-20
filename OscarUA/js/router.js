import { renderHome } from '../pages/home.js';
import { renderMovie } from '../pages/movie.js';
import { renderGenre } from '../pages/genre.js';
import { renderTop100 } from '../pages/top100.js';
import { renderGenreList } from '../pages/genres.js';
import { renderNew } from '../pages/new.js';
import { renderSearch } from '../pages/search.js';
import { setBreadcrumbs } from './breadcrumbs.js';

const routes = {
  '/': { fn: renderHome, crumbs: [{ label: 'Головна', path: '/' }] },
  '/top100': { fn: renderTop100, crumbs: [{ label: 'Головна', path: '/' }, { label: 'Топ 100' }] },
  '/genres': { fn: renderGenreList, crumbs: [{ label: 'Головна', path: '/' }, { label: 'Жанри' }] },
  '/new': { fn: renderNew, crumbs: [{ label: 'Головна', path: '/' }, { label: 'Новинки' }] },
};
export function navigate(path) {
  window.location.hash = path;
}
function getPath() {
  return window.location.hash.replace('#', '') || '/';
}
export function initRouter() {
  const render = () => {
    const path = getPath();
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    document.querySelectorAll('.nav-link').forEach(link => {
      const lp = link.dataset.path;
      link.classList.toggle('active',
        lp === path ||
        (lp === '/genres' && path.startsWith('/genre/')) ||
        (lp === '/new' && path === '/new')
      );
    });

    if (path.startsWith('/movie/')) {
      const id = parseInt(path.split('/')[2]);
      renderMovie(main, id);
    } else if (path.startsWith('/genre/')) {
      const genre = decodeURIComponent(path.split('/')[2]);
      renderGenre(main, genre);
      setBreadcrumbs([{ label: 'Головна', path: '/' }, { label: 'Жанри', path: '/genres' }, { label: genre }]);
    } else if (path.startsWith('/search/')) {
      const q = decodeURIComponent(path.split('/')[2]);
      renderSearch(main, q);
      setBreadcrumbs([{ label: 'Головна', path: '/' }, { label: `Пошук: ${q}` }]);
    } else {
      const route = routes[path] || routes['/'];
      route.fn(main);
      setBreadcrumbs(route.crumbs);
    }

    window.scrollTo(0, 0);
  };

  window.addEventListener('hashchange', render);
  render();
}
