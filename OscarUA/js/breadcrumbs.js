export function setBreadcrumbs(crumbs) {
  const nav = document.getElementById('breadcrumbs');
  if (!nav) return;
  nav.innerHTML = crumbs.map((c, i) => {
    if (c.path && i < crumbs.length - 1) {
      return `<a href="#${c.path}" class="crumb">${c.label}</a>`;
    }
    return `<span class="crumb crumb--active">${c.label}</span>`;
  }).join('<span class="crumb-sep">›</span>');
}
