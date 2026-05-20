/**
 * DS · Menu (toolbar dropdown contextual)
 *
 * Helper de keyboard nav + ARIA pra .ds-menu existentes.
 * Markup permanece manual · este script só anexa comportamento.
 *
 * Uso:
 *   <div class="ds-menu" data-ds-menu>
 *     <button class="ds-menu-trigger">Filtrar ▾</button>
 *     <div class="ds-menu-popover" role="menu">
 *       <button class="ds-menu-item" role="menuitem">Item 1</button>
 *       <button class="ds-menu-item" role="menuitem">Item 2</button>
 *       <div class="ds-menu-sep"></div>
 *       <button class="ds-menu-item" role="menuitem">Item 3</button>
 *     </div>
 *   </div>
 *   <script src="ds/molecules/menu.js"></script>
 *   <script>applyDsMenus()</script>
 *
 * Idempotente via data-ds-menu-applied. Pode rodar após cada render.
 *
 * Keyboard (WAI-ARIA Menu pattern):
 * - Enter/Space/↓     no trigger: abre menu, foca primeiro item
 * - ↑                 no trigger: abre menu, foca último item
 * - ↓/↑               no menu: navega items (skip .ds-menu-sep)
 * - Home/End          no menu: salta pra primeiro/último
 * - Enter/Space       no item: ativa (click programático)
 * - Esc               fecha, retorna foco ao trigger
 * - Tab               fecha, segue tab natural
 *
 * ARIA aplicado:
 * - Trigger: aria-haspopup=menu, aria-expanded
 * - Popover: role=menu, id (referenciado por aria-controls do trigger)
 * - Items: role=menuitem, tabindex=-1
 */
(function () {
  'use strict';

  let _menuIdCounter = 0;

  function applyDsMenus(scope) {
    const root = scope || document;
    root.querySelectorAll('.ds-menu:not([data-ds-menu-applied])').forEach(bindMenu);
  }

  function bindMenu(menuEl) {
    menuEl.setAttribute('data-ds-menu-applied', '1');

    const trigger = menuEl.querySelector('.ds-menu-trigger');
    const popover = menuEl.querySelector('.ds-menu-popover');
    if (!trigger || !popover) return;

    // ARIA setup
    const uid = ++_menuIdCounter;
    const popoverId = popover.id || `ds-menu-popover-${uid}`;
    popover.id = popoverId;
    popover.setAttribute('role', popover.getAttribute('role') || 'menu');

    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', popoverId);

    const items = () => [...popover.querySelectorAll('.ds-menu-item')];
    items().forEach((it) => {
      it.setAttribute('role', it.getAttribute('role') || 'menuitem');
      it.setAttribute('tabindex', '-1');
    });

    function isOpen() { return menuEl.classList.contains('open'); }

    function openMenu(focusIdx) {
      // close other open menus
      document.querySelectorAll('.ds-menu.open').forEach((m) => {
        if (m !== menuEl) closeOther(m);
      });
      menuEl.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      const list = items();
      if (!list.length) return;
      const idx = typeof focusIdx === 'number'
        ? Math.max(0, Math.min(list.length - 1, focusIdx))
        : Math.max(0, list.findIndex((i) => i.classList.contains('is-selected')));
      list[Math.max(0, idx)].focus();
    }

    function closeMenu(returnFocus) {
      menuEl.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) trigger.focus();
    }

    function closeOther(other) {
      other.classList.remove('open');
      const t = other.querySelector('.ds-menu-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    }

    // Trigger click (preserve existing behavior if onclick attr presente)
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isOpen()) closeMenu(false);
      else openMenu();
    });

    trigger.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
          e.preventDefault();
          openMenu(0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          openMenu(items().length - 1);
          break;
      }
    });

    popover.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      const list = items();
      const idx = list.indexOf(document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          list[Math.min(list.length - 1, idx < 0 ? 0 : idx + 1)]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          list[Math.max(0, idx < 0 ? list.length - 1 : idx - 1)]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          list[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          list[list.length - 1]?.focus();
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement && document.activeElement.classList.contains('ds-menu-item')) {
            e.preventDefault();
            document.activeElement.click();
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        case 'Tab':
          closeMenu(false);
          break;
      }
    });
  }

  // Click outside fecha todos
  document.addEventListener('click', (e) => {
    if (e.target.closest('.ds-menu')) return;
    document.querySelectorAll('.ds-menu.open').forEach((m) => {
      m.classList.remove('open');
      const t = m.querySelector('.ds-menu-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // Esc global fallback
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.ds-menu.open');
    if (!open) return;
    open.classList.remove('open');
    const trig = open.querySelector('.ds-menu-trigger');
    if (trig) {
      trig.setAttribute('aria-expanded', 'false');
      trig.focus();
    }
  });

  // Export
  window.applyDsMenus = applyDsMenus;
})();
