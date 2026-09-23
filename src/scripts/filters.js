const group = document.querySelector('.filters');
if (group) {
  group.hidden = false;
  const cards = [...document.querySelectorAll('.project-card')];
  group.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    for (const sibling of group.querySelectorAll('button')) sibling.setAttribute('aria-pressed', String(sibling === button));
    let count = 0;
    for (const card of cards) {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    }
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  });
}
