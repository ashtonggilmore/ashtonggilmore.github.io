// Pins the work list and lets page scroll choose the active project.
// Without this script the list renders fully open (see .work in site.css).
const work = document.querySelector('.work');
if (work) {
  const stage = work.querySelector('.work-stage');
  const win = work.querySelector('.work-window');
  const list = work.querySelector('.work-list');
  const items = [...work.querySelectorAll('.work-item')];
  const pos = work.querySelector('#work-pos');
  const group = work.querySelector('.filters');
  const status = work.querySelector('#filter-status');
  const pad = n => String(n).padStart(2, '0');

  let visible = items;
  let active = 0;
  let step = 0;          // scroll distance per project
  let collapsed = [];    // item heights when inactive
  let expanded = [];     // item heights when active

  work.classList.add('is-enhanced');
  group.hidden = false;

  // Heights are measured up front so centring never depends on mid-transition layout.
  function measure() {
    work.classList.add('is-measuring');
    for (const li of visible) li.classList.remove('is-active');
    collapsed = visible.map(li => li.offsetHeight);
    expanded = visible.map(li => {
      li.classList.add('is-active');
      const h = li.offsetHeight;
      li.classList.remove('is-active');
      return h;
    });
    step = Math.max(140, stage.offsetHeight * 0.3);
    work.style.height = `${stage.offsetHeight + (visible.length - 1) * step}px`;
    visible[active]?.classList.add('is-active');
    work.offsetHeight; // flush styles before transitions return
    work.classList.remove('is-measuring');
    place();
  }

  function place() {
    const top = collapsed.slice(0, active).reduce((a, b) => a + b, 0);
    list.style.transform = `translateY(${win.clientHeight / 2 - top - expanded[active] / 2}px)`;
    pos.textContent = `${pad(active + 1)} / ${pad(visible.length)}`;
  }

  function setActive(i) {
    if (i === active) return;
    visible[active]?.classList.remove('is-active');
    active = i;
    visible[active].classList.add('is-active');
    place();
  }

  function indexFromScroll() {
    const scrolled = -work.getBoundingClientRect().top;
    return Math.min(visible.length - 1, Math.max(0, Math.round(scrolled / step)));
  }

  function goTo(i) {
    scrollTo({ top: scrollY + work.getBoundingClientRect().top + i * step });
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { setActive(indexFromScroll()); ticking = false; });
  }, { passive: true });
  addEventListener('resize', measure);

  // Tapping an inactive project scrolls to it; tapping the active one opens it.
  list.addEventListener('click', event => {
    const li = event.target.closest('.work-item');
    const i = visible.indexOf(li);
    if (i !== -1 && i !== active) { event.preventDefault(); goTo(i); }
  });

  // Keyboard users tab through projects; each focused one becomes active.
  list.addEventListener('focusin', event => {
    if (!event.target.matches(':focus-visible')) return;
    const i = visible.indexOf(event.target.closest('.work-item'));
    if (i !== -1) { setActive(i); goTo(i); }
  });

  group.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    for (const sibling of group.querySelectorAll('button')) sibling.setAttribute('aria-pressed', String(sibling === button));
    button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    for (const li of items) {
      li.classList.remove('is-active');
      li.hidden = button.dataset.filter !== 'all' && li.dataset.category !== button.dataset.filter;
    }
    visible = items.filter(li => !li.hidden);
    active = 0;
    measure();
    if (work.getBoundingClientRect().top < 0) goTo(0);
    status.textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'} shown`;
  });

  measure();
  setActive(indexFromScroll());
}
