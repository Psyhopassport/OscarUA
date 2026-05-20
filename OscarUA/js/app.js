import { initRouter } from './router.js';
import { ALL_GENRES } from '../data/movies.js';
import { navigate } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  buildGenresDropdown();
  buildFooterGenres();
  initSearch();
});

function buildGenresDropdown() {
  const dd = document.getElementById('genres-dropdown');
  if (!dd) return;
  ALL_GENRES.forEach(g => {
    const a = document.createElement('a');
    a.href = `#/genre/${encodeURIComponent(g)}`;
    a.textContent = g;
    a.className = 'nav-dropdown-item';
    dd.appendChild(a);
  });
}

function buildFooterGenres() {
  const ul = document.getElementById('footer-genres');
  if (!ul) return;
  ALL_GENRES.slice(0, 6).forEach(g => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#/genre/${encodeURIComponent(g)}">${g}</a>`;
    ul.appendChild(li);
  });
}

function initSearch() {
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');
  const dropdown = document.getElementById('search-dropdown');

  if (!input) return;
  input.addEventListener('input', async () => {
    const q = input.value.trim();
    if (q.length < 2) { dropdown.classList.add('hidden'); return; }

    const { MOVIES } = await import('../data/movies.js');
    const results = MOVIES.filter(m =>
      m.title.toLowerCase().includes(q.toLowerCase()) ||
      m.titleEn.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);

    dropdown.innerHTML = '';
    if (results.length === 0) {
      dropdown.innerHTML = '<div class="search-dropdown-empty">Нічого не знайдено</div>';
    } else {
      results.forEach(m => {
        const item = document.createElement('div');
        item.className = 'search-dropdown-item';
        item.innerHTML = `
          <img src="${m.poster}" alt="${m.title}">
          <div>
            <strong>${m.title}</strong>
            <span>${m.year} · ${m.genres[0]}</span>
          </div>
        `;
        item.addEventListener('click', () => {
          dropdown.classList.add('hidden');
          input.value = '';
          navigate(`/movie/${m.id}`);
        });
        dropdown.appendChild(item);
      });
    }
    dropdown.classList.remove('hidden');
  });
  const doSearch = () => {
    const q = input.value.trim();
    if (!q) return;
    dropdown.classList.add('hidden');
    navigate(`/search/${encodeURIComponent(q)}`);
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header-search')) dropdown.classList.add('hidden');
  });
}
