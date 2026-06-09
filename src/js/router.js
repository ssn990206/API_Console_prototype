/**
 * router.js — Client-side SPA routing
 *
 * Intercepts sidebar nav clicks, fetches only the target page's
 * #page-content, swaps it in-place, and updates the sidebar
 * active state — without reloading the topnav / sidebar / footer.
 *
 * Each page HTML must have <div id="page-content">…</div>.
 * Modals and page-specific <script> tags should live inside
 * #page-content so they are carried along with the swap.
 */

(function () {
  'use strict';

  /* ── Intercept sidebar nav clicks ─────────────────────────── */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar__nav-item');
    if (!link) return;

    const href = link.getAttribute('href');
    // Skip: no href, anchors, external, new-tab
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto')) return;
    if (link.target === '_blank') return;

    e.preventDefault();
    navigate(href);
  });

  /* ── Browser back / forward ───────────────────────────────── */
  window.addEventListener('popstate', (e) => {
    const href = (e.state && e.state.href) || location.href;
    navigate(href, false);
  });

  // Tag the initial page so popstate can go back to it
  history.replaceState({ href: location.href }, '', location.href);

  /* ── Core navigate function ───────────────────────────────── */
  async function navigate(href, pushState = true) {
    const container = document.getElementById('page-content');
    if (!container) return;

    // Indicate loading — subtle opacity
    container.style.opacity = '0.5';
    container.style.pointerEvents = 'none';

    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      const doc  = new DOMParser().parseFromString(html, 'text/html');
      const newContent = doc.getElementById('page-content');
      if (!newContent) throw new Error('#page-content not found in fetched page');

      // ── Swap HTML ──────────────────────────────────────────
      container.innerHTML = newContent.innerHTML;

      // ── Re-execute inline <script> tags ───────────────────
      // innerHTML assignment does NOT run scripts; we must clone them.
      container.querySelectorAll('script').forEach(old => {
        const fresh = document.createElement('script');
        [...old.attributes].forEach(a => fresh.setAttribute(a.name, a.value));
        fresh.textContent = old.textContent;
        old.parentNode.replaceChild(fresh, old);
      });

      // ── Update sidebar active state ────────────────────────
      const filename = href.split('/').pop().split('?')[0]; // e.g. "api-keys.html"
      document.querySelectorAll('.sidebar__nav-item').forEach(item => {
        const itemHref = item.getAttribute('href') || '';
        const match = itemHref === href
          || itemHref.endsWith('/' + filename)
          || itemHref === filename;
        item.classList.toggle('active', match);
      });

      // ── Update browser title ───────────────────────────────
      const newTitle = doc.querySelector('title');
      if (newTitle) document.title = newTitle.textContent;

      // ── Push URL ───────────────────────────────────────────
      if (pushState) history.pushState({ href }, '', href);

      // ── Scroll content area to top ─────────────────────────
      window.scrollTo({ top: 0, behavior: 'instant' });

    } catch (err) {
      console.error('[router] Navigation failed:', err);
      // Fall back to full page load on any error
      location.href = href;
    } finally {
      container.style.opacity = '';
      container.style.pointerEvents = '';
    }
  }

  // Public API for programmatic navigation
  window.Router = { navigate };

})();
