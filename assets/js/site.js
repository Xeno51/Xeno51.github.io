// Small enhancements. Every page works without them.
(() => {
  const root = document.documentElement;
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
    remove(key) { try { localStorage.removeItem(key); } catch { /* storage unavailable */ } },
  };

  // Colour mode: automatic (follows the system) -> light -> dark.
  const modes = ['auto', 'light', 'dark'];
  const modeLabel = { auto: 'automatic', light: 'light', dark: 'dark' };
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    const current = () => root.dataset.theme || 'auto';
    const label = () => themeToggle.setAttribute('aria-label', `Colour mode: ${modeLabel[current()]}`);
    label();
    themeToggle.addEventListener('click', () => {
      const next = modes[(modes.indexOf(current()) + 1) % modes.length];
      if (next === 'auto') {
        delete root.dataset.theme;
        store.remove('theme');
      } else {
        root.dataset.theme = next;
        store.set('theme', next);
      }
      label();
    });
  }

  // Copy buttons (BibTeX).
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const code = button.parentElement.querySelector('code');
      try {
        await navigator.clipboard.writeText(code.textContent.trim());
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Select and copy';
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
  }

  // Style lab: local preview only.
  const lab = document.querySelector('[data-style-lab]');
  if (!lab) return;
  const links = [...document.querySelectorAll('link[data-style]')];
  const picks = [...lab.querySelectorAll('[data-style-pick]')];
  const ids = picks.map((b) => b.dataset.stylePick);
  const names = Object.fromEntries(picks.map((b) => [b.dataset.stylePick, b.querySelector('.name').textContent]));
  const panel = lab.querySelector('.style-lab-panel');
  const toggle = lab.querySelector('.style-lab-toggle');
  const currentName = lab.querySelector('[data-style-current]');

  const apply = (id) => {
    for (const link of links) link.media = link.dataset.style === id ? 'all' : 'not all';
    root.dataset.style = id;
    store.set('style-lab', id);
    currentName.textContent = names[id];
    for (const b of picks) b.setAttribute('aria-pressed', String(b.dataset.stylePick === id));
    // A ?style= in the address would override the choice on the next load.
    const url = new URL(location.href);
    if (url.searchParams.has('style')) {
      url.searchParams.delete('style');
      history.replaceState(null, '', url);
    }
  };
  const next = () => apply(ids[(ids.indexOf(root.dataset.style) + 1) % ids.length]);
  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  apply(ids.includes(root.dataset.style) ? root.dataset.style : ids[0]);
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  lab.querySelector('[data-style-next]').addEventListener('click', next);
  for (const b of picks) b.addEventListener('click', () => apply(b.dataset.stylePick));
  document.addEventListener('click', (e) => { if (!lab.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    const typing = e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]');
    if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 's' || e.key === 'S')) next();
  });
})();
