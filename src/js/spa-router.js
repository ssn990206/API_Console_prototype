/**
 * spa-router.js — Hash-based SPA router for app.html
 *
 * Works with file:// protocol — no fetch() required.
 * Switching pages = show/hide <div class="page-section">.
 *
 * URL scheme:  app.html#get-started  |  app.html#api-keys  |  …
 */

(function () {
  'use strict';

  /* Page registry: hash key → section element id + title */
  const PAGES = {
    'get-started': { id: 'section-get-started', title: 'Get Started' },
    'api-keys':    { id: 'section-api-keys',    title: 'API Keys'    },
    'webhook':     { id: 'section-webhook',      title: 'Webhook'    },
    'usage':       { id: 'section-usage',        title: 'Usage'      },
  };

  const DEFAULT_PAGE = 'get-started';

  /* ── Show a page by hash key ──────────────────────────────── */
  function showPage(key) {
    const page = PAGES[key] || PAGES[DEFAULT_PAGE];
    const resolvedKey = PAGES[key] ? key : DEFAULT_PAGE;

    // Swap visible section
    document.querySelectorAll('.page-section').forEach(el => {
      el.style.display = el.id === page.id ? '' : 'none';
    });

    // Update sidebar active state
    document.querySelectorAll('.sidebar__nav-item[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === resolvedKey);
    });

    // Update title
    document.title = `${page.title} — YouCam API Console`;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ── Intercept sidebar nav clicks ────────────────────────── */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar__nav-item[data-page]');
    if (!link) return;

    const key = link.dataset.page;
    if (!PAGES[key]) return;

    // Let href="#key" update the URL naturally (no e.preventDefault needed)
    showPage(key);
  });

  /* ── Handle hash changes (back/forward, direct URL) ─────── */
  window.addEventListener('hashchange', () => {
    const key = location.hash.replace('#', '');
    showPage(key);
  });

  /* ── Initial render on page load ────────────────────────── */
  const initialKey = location.hash.replace('#', '') || DEFAULT_PAGE;
  showPage(initialKey);

})();
