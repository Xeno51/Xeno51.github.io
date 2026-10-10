// Small enhancements: the light/dark button and the BibTeX copy buttons.
// Every page works without them.
(() => {
  const root = document.documentElement;
  const store = {
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
})();
