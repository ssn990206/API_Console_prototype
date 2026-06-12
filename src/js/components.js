/**
 * YouCam API Console — Components JS  (custom-select: single + multi)
 * All interactions use event delegation so they work after SPA content swaps.
 * No explicit init() call needed.
 */

(function () {
  'use strict';

  /* ============================================================
     MODAL helpers
     ============================================================ */
  function openModal(el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    const first = el.querySelector('input, button, textarea, select, [tabindex]');
    if (first) setTimeout(() => first.focus(), 40);
  }

  function closeModal(el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Public API for programmatic use (e.g. onclick= in HTML)
  window.Modal = {
    open:  (id) => { const el = document.getElementById(id); if (el) openModal(el);  },
    close: (id) => { const el = document.getElementById(id); if (el) closeModal(el); },
  };

  // Delegated: open trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-open]');
    if (!trigger) return;
    const el = document.getElementById(trigger.getAttribute('data-modal-open'));
    if (el) openModal(el);
  });

  // Delegated: close button
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-modal-close]');
    if (!btn) return;
    const el = btn.closest('.modal-overlay');
    if (el) closeModal(el);
  });

  // Click backdrop to close
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('open')) {
      closeModal(e.target);
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
  });


  /* ============================================================
     TABS  (event delegation)
     Usage: <div class="tabs" data-tabs>
              <button class="tab active" data-tab="panel-id">…</button>
            </div>
            <div data-tabs-container>
              <div id="panel-id" class="tab-panel" style="display:block">…</div>
              <div id="panel-2"  class="tab-panel" style="display:none">…</div>
            </div>
     ============================================================ */
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    const tabGroup = tab.closest('[data-tabs]');
    if (!tabGroup) return;

    tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const targetId = tab.getAttribute('data-tab');
    if (targetId) {
      const container = tab.closest('[data-tabs-container]') || document;
      container.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = panel.id === targetId ? 'block' : 'none';
      });
    }
  });


  /* ============================================================
     SIDEBAR COLLAPSE  (event delegation)
     ============================================================ */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-sidebar-toggle]');
    if (!btn) return;
    const sidebar = document.getElementById(btn.getAttribute('data-sidebar-toggle'));
    if (!sidebar) return;

    const collapsed = sidebar.classList.toggle('collapsed');
    const arrow = btn.querySelector('[data-arrow]');
    if (arrow) arrow.setAttribute('points', collapsed ? '9 6 15 12 9 18' : '15 6 9 12 15 18');
    try { localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0'); } catch (_) {}
  });

  // Restore persisted collapse state on load
  (function restoreSidebar() {
    try {
      if (localStorage.getItem('sidebar-collapsed') !== '1') return;
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      sidebar.classList.add('collapsed');
      const arrow = sidebar.querySelector('[data-arrow]');
      if (arrow) arrow.setAttribute('points', '9 6 15 12 9 18');
    } catch (_) {}
  })();


  /* ============================================================
     COPY TO CLIPBOARD  (event delegation)
     ============================================================ */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    try {
      await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
      Toast.show('Copied!', 'success', 2000);
    } catch (_) { Toast.show('Copy failed', 'error', 2000); }
  });

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy-target]');
    if (!btn) return;
    const target = document.querySelector(btn.getAttribute('data-copy-target'));
    const text = target ? (target.value || target.textContent) : '';
    try {
      await navigator.clipboard.writeText(text);
      Toast.show('Copied!', 'success', 2000);
    } catch (_) { Toast.show('Copy failed', 'error', 2000); }
  });


  /* ============================================================
     CONFIRM DIALOG  (event delegation)
     Usage: <button data-confirm="Sure?" data-confirm-label="Delete">…</button>
     ============================================================ */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-confirm]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const ok = await Confirm.show(
      btn.getAttribute('data-confirm') || 'Are you sure?',
      btn.getAttribute('data-confirm-label') || 'Confirm',
      true,
    );
    if (ok) {
      const action = btn.getAttribute('data-confirm-action');
      if (action) try { new Function(action)(); } catch (err) { console.error(err); }
      btn.dispatchEvent(new CustomEvent('confirmed', { bubbles: true }));
    }
  });


  /* ============================================================
     TOAST
     Usage: Toast.show('message', 'success' | 'error' | 'neutral', ms)
     ============================================================ */
  let _toastContainer;
  function getToastContainer() {
    if (!_toastContainer) {
      _toastContainer = document.createElement('div');
      _toastContainer.style.cssText =
        'position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:8px;z-index:9999;pointer-events:none';
      document.body.appendChild(_toastContainer);
    }
    return _toastContainer;
  }

  window.Toast = {
    show(message, type = 'success', duration = 3000) {
      const colors = {
        success: { bg: 'var(--color-success-bg)',  border: 'var(--color-success-border)', text: 'var(--color-success-text)' },
        error:   { bg: 'var(--color-error-bg)',    border: 'var(--color-error-border)',   text: 'var(--color-error-text)'   },
        neutral: { bg: '#fff',                      border: 'var(--color-border-default)', text: 'var(--color-text-default)' },
      };
      const c = colors[type] || colors.neutral;
      const el = document.createElement('div');
      el.style.cssText = `background:${c.bg};border:1px solid ${c.border};color:${c.text};
        padding:10px 16px;border-radius:8px;font-size:14px;font-family:var(--font-sans);
        box-shadow:0 4px 16px rgba(0,0,0,.12);pointer-events:auto;
        opacity:0;transform:translateY(8px);transition:opacity .2s ease,transform .2s ease`;
      el.textContent = message;
      getToastContainer().appendChild(el);
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
      setTimeout(() => {
        el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
        setTimeout(() => el.remove(), 250);
      }, duration);
    },
  };


  /* ============================================================
     CONFIRM DIALOG (reusable modal)
     Usage: const ok = await Confirm.show('Delete?', 'Delete', true)
     ============================================================ */
  window.Confirm = {
    show(message, confirmLabel = 'Confirm', danger = true) {
      return new Promise(resolve => {
        let el = document.getElementById('_confirmModal');
        if (!el) {
          el = document.createElement('div');
          el.id = '_confirmModal';
          el.className = 'modal-overlay';
          el.innerHTML = `
            <div class="modal" style="max-width:360px">
              <div class="modal__header">
                <span class="modal__title" id="_confirmTitle">Confirm</span>
                <button class="modal__close" id="_confirmX">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div class="modal__body">
                <p id="_confirmMsg" style="font-size:14px;color:var(--color-text-secondary);line-height:20px"></p>
              </div>
              <div class="modal__footer">
                <button class="btn btn-secondary" id="_confirmCancel">Cancel</button>
                <button class="btn" id="_confirmOk">Confirm</button>
              </div>
            </div>`;
          document.body.appendChild(el);
        }

        document.getElementById('_confirmMsg').textContent = message;
        const okBtn = document.getElementById('_confirmOk');
        okBtn.textContent = confirmLabel;
        okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
        openModal(el);

        function cleanup(result) {
          closeModal(el);
          okBtn.onclick = null;
          document.getElementById('_confirmCancel').onclick = null;
          document.getElementById('_confirmX').onclick = null;
          resolve(result);
        }
        okBtn.onclick = () => cleanup(true);
        document.getElementById('_confirmCancel').onclick = () => cleanup(false);
        document.getElementById('_confirmX').onclick = () => cleanup(false);
      });
    },
  };


  /*   CUSTOM SELECT  (single + multi)  — event delegation
     ============================================================ */

  function getOptionLabel(opt) {
    let text = '';
    opt.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) text += node.textContent;
    });
    return text.trim() || opt.textContent.trim();
  }

  function getMultiValues(sel) {
    return Array.from(
      sel.querySelectorAll('.custom-select__option:not([data-select-all]).selected')
    ).map(o => ({ value: o.dataset.value, label: getOptionLabel(o) }));
  }

  function dispatchMultiChange(sel) {
    const selected = getMultiValues(sel);
    sel.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: {
        values: selected.map(s => s.value),
        labels: selected.map(s => s.label),
      },
    }));
  }

  function updateMultiTags(sel) {
    const tagsEl      = sel.querySelector('.custom-select__tags');
    const placeholder = sel.querySelector('.custom-select__placeholder');
    if (!tagsEl) return;
    const selected = Array.from(
      sel.querySelectorAll('.custom-select__option:not([data-select-all]).selected')
    );
    tagsEl.innerHTML = '';
    if (selected.length === 0) {
      if (placeholder) placeholder.style.display = '';
    } else {
      if (placeholder) placeholder.style.display = 'none';
      selected.forEach(opt => {
        const label = getOptionLabel(opt);
        const tag   = document.createElement('span');
        tag.className = 'custom-select__tag';
        tag.dataset.tagValue = opt.dataset.value;
        tag.innerHTML =
          `<span class="custom-select__tag-text">${label}</span>` +
          `<span class="custom-select__tag-remove" title="Remove">` +
            `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">` +
              `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>` +
            `</svg>` +
          `</span>`;
        tagsEl.appendChild(tag);
      });
    }
  }

  // Open / close trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.custom-select__trigger');
    if (trigger) {
      e.stopPropagation();
      const sel     = trigger.closest('.custom-select');
      const wasOpen = sel.classList.contains('open');
      document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
      if (!wasOpen) sel.classList.add('open');
      return;
    }
    if (!e.target.closest('.custom-select__dropdown') && !e.target.closest('.custom-select__trigger')) {
      document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
    }
  });

  // Single-select: option click
  document.addEventListener('click', (e) => {
    const opt = e.target.closest('.custom-select__option');
    if (!opt) return;
    const sel = opt.closest('.custom-select');
    if (!sel || sel.hasAttribute('data-multi')) return;
    sel.querySelectorAll('.custom-select__option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    const valueEl = sel.querySelector('.custom-select__value');
    if (valueEl) valueEl.textContent = getOptionLabel(opt);
    sel.classList.remove('open');
    sel.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: { value: opt.dataset.value, label: getOptionLabel(opt) }
    }));
  });

  // Multi-select: option click (toggle checkbox)
  document.addEventListener('click', (e) => {
    const opt = e.target.closest('.custom-select__option');
    if (!opt) return;
    const sel = opt.closest('[data-multi]');
    if (!sel) return;
    e.stopPropagation();
    const isAll  = opt.hasAttribute('data-select-all');
    const allOpt = sel.querySelector('[data-select-all]');
    const opts   = Array.from(sel.querySelectorAll('.custom-select__option:not([data-select-all])'));
    if (isAll) {
      const allSelected = opts.every(o => o.classList.contains('selected'));
      opts.forEach(o => o.classList.toggle('selected', !allSelected));
      if (allOpt) allOpt.classList.toggle('selected', !allSelected);
    } else {
      opt.classList.toggle('selected');
      const allChecked = opts.every(o => o.classList.contains('selected'));
      if (allOpt) allOpt.classList.toggle('selected', allChecked);
    }
    updateMultiTags(sel);
    dispatchMultiChange(sel);
  });

  // Multi-select: tag x remove
  document.addEventListener('click', (e) => {
    const rm = e.target.closest('.custom-select__tag-remove');
    if (!rm) return;
    e.stopPropagation();
    const tag = rm.closest('.custom-select__tag');
    const sel = rm.closest('[data-multi]');
    if (!tag || !sel) return;
    const opt = sel.querySelector(`.custom-select__option[data-value="${tag.dataset.tagValue}"]`);
    if (opt) {
      opt.classList.remove('selected');
      const allOpt = sel.querySelector('[data-select-all]');
      if (allOpt) allOpt.classList.remove('selected');
    }
    updateMultiTags(sel);
    dispatchMultiChange(sel);
  });

  // Public helpers for pages that rebuild multi-select options dynamically
  window.CustomSelect = {
    updateTags: updateMultiTags,
    getValues:  (sel) => getMultiValues(sel).map(s => s.value),
  };

  // Escape closes any open custom-select
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
    }
  });

})();

