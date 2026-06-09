/**
 * shell.js — Injects shared layout (topnav, sidebar, footer)
 *
 * Usage in each page:
 *   <script>
 *     window.SHELL = { page: 'api-keys', base: '../' };
 *   </script>
 *   <script src="../src/js/shell.js"></script>
 *
 * Then place page content inside:
 *   <div id="page-content">...</div>
 *
 * `page` must match one of the NAV_ITEMS id values below.
 * `base` is the path from the current HTML file to the project root.
 */

(function () {
  'use strict';

  const cfg   = window.SHELL || {};
  const base  = cfg.base  || './';
  const activePage = cfg.page || '';

  /* ── Nav items ─────────────────────────────────────────────── */
  const NAV = [
    { id: 'get-started',        label: 'Get Started',        icon: 'start.svg',              href: 'get-started.html' },
    { id: 'api-keys',           label: 'API Keys',           icon: 'api-key.svg',            href: 'api-keys.html' },
    { id: 'webhook',            label: 'Webhook',            icon: 'webhook.svg',            href: 'webhook.html' },
    { id: 'usage',              label: 'Usage',              icon: 'usage.svg',              href: 'usage.html' },
    { id: 'notifications',      label: 'Notifications',      icon: 'notification.svg',       href: '#' },
    { id: 'whats-new',          label: "What's New",         icon: 'whats new.svg',          href: '#', external: true },
    { id: 'redeem-code',        label: 'Redeem Code',        icon: 'redeem code.svg',        href: '#' },
    { id: 'payment-method',     label: 'Payment Method',     icon: 'billing.svg',            href: '#' },
    { id: 'billing-history',    label: 'Billing History',    icon: 'billing.svg',            href: '#' },
    { id: 'project-management', label: 'Project Management', icon: 'project management.svg', href: '#' },
  ];

  /* ── Build nav item HTML ────────────────────────────────────── */
  function navItem(item) {
    const isActive   = item.id === activePage;
    const isExternal = item.external;
    // for items with real pages, href is relative to pages/ folder
    const href = (item.href !== '#' && !item.href.startsWith('http'))
      ? `${base}pages/${item.href}`
      : item.href;

    return `
      <a class="sidebar__nav-item${isActive ? ' active' : ''}" href="${href}"${isExternal ? ' target="_blank" rel="noopener"' : ''}>
        <img src="${base}src/icon/${item.icon}" class="nav-icon" alt="" />
        <span class="nav-label">${item.label}</span>
        ${isExternal ? `<img src="${base}src/icon/external link.svg" class="nav-external" alt="opens in new tab" />` : ''}
      </a>`;
  }

  /* ── Topnav HTML ─────────────────────────────────────────────── */
  const topnavHTML = `
    <header class="topnav" id="topnav">
      <a href="${base}pages/get-started.html" class="topnav__logo">
        <img src="${base}src/icon/API_header.svg" alt="YouCam API" style="height:22px;width:auto;" />
      </a>
      <ul class="topnav__links">
        <li><a href="#">Products</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Documentation</a></li>
        <li><a href="#">Playground</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div class="topnav__spacer"></div>
      <div class="topnav__avatar">
        <img src="${base}src/icon/user.svg" alt="Account" style="width:40px;height:40px;display:block;" />
      </div>
    </header>`;

  /* ── Sidebar HTML ────────────────────────────────────────────── */
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
      <button class="sidebar__collapse-btn" data-sidebar-toggle="sidebar" title="Toggle sidebar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline data-arrow points="15 6 9 12 15 18"/>
        </svg>
      </button>

      <nav class="sidebar__nav">
        ${NAV.map(navItem).join('')}
      </nav>

      <div class="sidebar__user">
        <div class="sidebar__user-avatar">SW</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">Default</div>
          <div class="sidebar__user-org">Steven Weng</div>
        </div>
        <svg class="sidebar__user-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          style="margin-left:auto;flex-shrink:0;color:var(--color-text-secondary)">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </div>
    </aside>`;

  /* ── Footer HTML ─────────────────────────────────────────────── */
  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <a href="${base}pages/get-started.html" class="site-footer__logo">
            <img src="${base}src/icon/API_footer.svg" alt="YouCam API" style="height:20px;width:auto;" />
          </a>
          <p class="site-footer__copy">2026 © Perfect Corp. All Rights Reserved.</p>
          <div class="site-footer__lang">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>English</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <div class="site-footer__links">
          <div class="site-footer__col">
            <h4 class="site-footer__col-title">API</h4>
            <ul>
              <li><a href="https://yce.perfectcorp.com/ai-api" target="_blank">About API</a></li>
              <li><a href="https://yce.perfectcorp.com/ai-api/api-pricing" target="_blank">API Plan</a></li>
              <li><a href="https://docs.perfectcorp.com/develop/introduction" target="_blank">Document</a></li>
              <li><a href="${base}pages/get-started.html">API Dashboard</a></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h4 class="site-footer__col-title">Support</h4>
            <ul>
              <li><a href="https://yce.perfectcorp.com/ai-api/api-pricing" target="_blank">API Pricing</a></li>
              <li><a href="https://www.perfectcorp.com/consumer/blog" target="_blank">Blogs</a></li>
              <li><a href="https://yce.perfectcorp.com/faq" target="_blank">FAQ</a></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h4 class="site-footer__col-title">Legal</h4>
            <ul>
              <li><a href="#" target="_blank">Privacy Policy</a></li>
              <li><a href="#" target="_blank">Terms of Use</a></li>
              <li><a href="#" target="_blank">Legal Notice</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>`;

  /* ── Inject into DOM ─────────────────────────────────────────── */
  function inject() {
    // 1. Insert topnav before everything
    document.body.insertAdjacentHTML('afterbegin', topnavHTML);

    // 2. Locate the page's own content
    const pageContent = document.getElementById('page-content');
    if (!pageContent) {
      console.warn('[shell.js] #page-content not found');
      return;
    }

    // 3. page-shell wraps only the page content (no footer inside)
    const pageShell = document.createElement('div');
    pageShell.className = 'page-shell';
    pageShell.appendChild(pageContent);

    // 4. app-body = sidebar + page-shell  (min-height: 100vh keeps footer below fold)
    const appBody = document.createElement('div');
    appBody.className = 'app-body';
    appBody.innerHTML = sidebarHTML;
    appBody.appendChild(pageShell);

    // 5. Footer lives OUTSIDE app-body so it always sits below the fold
    document.body.appendChild(appBody);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();

  } else {
    inject();
  }

})();
