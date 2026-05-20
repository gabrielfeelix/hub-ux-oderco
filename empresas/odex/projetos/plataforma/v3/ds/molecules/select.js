/**
 * DS · Odex-Select (custom dropdown)
 *
 * Substitui <select class="ds-replace"> nativo por uma estrutura
 * acessível com keyboard nav completo (ARIA listbox pattern).
 *
 * Uso:
 *   <select class="ds-replace">...</select>
 *   <script src="ds/molecules/select.js"></script>
 *   <script>applyOdexSelects()</script>
 *
 * Pode ser chamado múltiplas vezes · idempotente via data-odex-applied.
 *
 * Keyboard nav (WAI-ARIA Listbox pattern):
 * - Tab               → foca o trigger
 * - Enter/Space/↓/↑   → no trigger: abre menu, foca opção ativa ou primeira
 * - ↓/↑               → no menu: move foco entre opções
 * - Home/End          → no menu: salta pra primeira/última
 * - Enter/Space       → seleciona opção, fecha
 * - Esc               → fecha menu, retorna foco ao trigger
 * - Tab               → no menu: fecha e segue tab natural
 * - A-Z, 0-9          → type-ahead simples (primeira letra)
 *
 * ARIA:
 * - Trigger: button, aria-haspopup=listbox, aria-expanded, aria-controls, aria-activedescendant
 * - Menu: role=listbox, id (referenciado por aria-controls)
 * - Option: role=option, id único, aria-selected
 */
(function () {
  'use strict';

  let _selectIdCounter = 0;

  function applyOdexSelects(scope) {
    const root = scope || document;
    root.querySelectorAll('select.ds-replace:not([data-odex-applied])').forEach(buildSelect);
  }

  function buildSelect(sel) {
    sel.setAttribute('data-odex-applied', '1');

    const opts = [...sel.options];
    const selected = sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : opts[0];
    const triggerLabel = selected ? selected.textContent : '';
    const isPlaceholder = selected && selected.value === '' && !sel.dataset.allowEmpty;

    const uid = ++_selectIdCounter;
    const menuId = `odex-select-menu-${uid}`;
    const optionId = (i) => `odex-select-option-${uid}-${i}`;

    const wrap = document.createElement('div');
    wrap.className = 'odex-select';

    const optionsHTML = opts.map((o, i) => `
      <button type="button"
              class="odex-select-option${i === sel.selectedIndex ? ' is-active' : ''}"
              role="option"
              id="${optionId(i)}"
              data-value="${escapeAttr(o.value)}"
              aria-selected="${i === sel.selectedIndex ? 'true' : 'false'}"
              tabindex="-1">
        <span>${escapeHtml(o.textContent)}</span>
        <span class="odex-select-option-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      </button>
    `).join('');

    wrap.innerHTML = `
      <button type="button"
              class="odex-select-trigger${isPlaceholder ? ' is-placeholder' : ''}"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-controls="${menuId}">
        <span class="odex-select-label">${escapeHtml(triggerLabel)}</span>
      </button>
      <div class="odex-select-menu" role="listbox" id="${menuId}" tabindex="-1">
        ${optionsHTML}
      </div>
    `;

    sel.style.display = 'none';
    sel.parentNode.insertBefore(wrap, sel.nextSibling);

    const trigger = wrap.querySelector('.odex-select-trigger');
    const menu = wrap.querySelector('.odex-select-menu');
    const labelEl = wrap.querySelector('.odex-select-label');
    const optionEls = [...wrap.querySelectorAll('.odex-select-option')];

    // === Open/close ===
    function openMenu(focusIndex) {
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      const idx = (typeof focusIndex === 'number')
        ? focusIndex
        : Math.max(0, optionEls.findIndex(o => o.classList.contains('is-active')));
      focusOption(idx);
    }

    function closeMenu(returnFocus) {
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-activedescendant');
      if (returnFocus !== false) trigger.focus();
    }

    function isOpen() { return wrap.classList.contains('is-open'); }

    function focusOption(i) {
      if (i < 0 || i >= optionEls.length) return;
      const opt = optionEls[i];
      opt.focus();
      trigger.setAttribute('aria-activedescendant', opt.id);
    }

    // === Select / activate option ===
    function selectOption(opt) {
      const val = opt.dataset.value;
      const txt = opt.querySelector('span').textContent;
      sel.value = val;
      labelEl.textContent = txt;
      trigger.classList.toggle('is-placeholder', val === '' && !sel.dataset.allowEmpty);
      optionEls.forEach((o) => {
        const isMatch = o === opt;
        o.classList.toggle('is-active', isMatch);
        o.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      closeMenu();
    }

    // === Trigger events ===
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // close other open selects
      document.querySelectorAll('.odex-select.is-open').forEach((o) => {
        if (o !== wrap) o.classList.remove('is-open');
      });
      if (isOpen()) closeMenu(false);
      else openMenu();
    });

    trigger.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'Enter':
        case ' ':
          e.preventDefault();
          openMenu();
          break;
        case 'Home':
          e.preventDefault();
          openMenu(0);
          break;
        case 'End':
          e.preventDefault();
          openMenu(optionEls.length - 1);
          break;
        default:
          // type-ahead from trigger
          if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
            e.preventDefault();
            openMenu();
            jumpToLetter(e.key);
          }
      }
    });

    // === Option click (mouse + tap) ===
    optionEls.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        selectOption(opt);
      });
    });

    // === Menu keyboard nav ===
    menu.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      const focused = document.activeElement;
      const idx = optionEls.indexOf(focused);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusOption(Math.min(optionEls.length - 1, idx < 0 ? 0 : idx + 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusOption(Math.max(0, idx < 0 ? optionEls.length - 1 : idx - 1));
          break;
        case 'Home':
          e.preventDefault();
          focusOption(0);
          break;
        case 'End':
          e.preventDefault();
          focusOption(optionEls.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focused && focused.classList.contains('odex-select-option')) {
            selectOption(focused);
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        case 'Tab':
          // Tab fecha e segue navegação natural
          closeMenu(false);
          break;
        default:
          if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
            e.preventDefault();
            jumpToLetter(e.key);
          }
      }
    });

    function jumpToLetter(letter) {
      const lower = letter.toLowerCase();
      const start = Math.max(0, optionEls.indexOf(document.activeElement) + 1);
      // procura do start até fim, depois 0 até start
      for (let i = 0; i < optionEls.length; i++) {
        const idx = (start + i) % optionEls.length;
        const text = optionEls[idx].textContent.trim().toLowerCase();
        if (text.startsWith(lower)) {
          focusOption(idx);
          return;
        }
      }
    }
  }

  // === Click outside fecha qualquer menu aberto ===
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.odex-select')) {
      document.querySelectorAll('.odex-select.is-open').forEach((o) => {
        o.classList.remove('is-open');
        const trig = o.querySelector('.odex-select-trigger');
        if (trig) {
          trig.setAttribute('aria-expanded', 'false');
          trig.removeAttribute('aria-activedescendant');
        }
      });
    }
  });

  // === Esc global como fallback (quando foco saiu do menu) ===
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.odex-select.is-open');
    if (open) {
      open.classList.remove('is-open');
      const trig = open.querySelector('.odex-select-trigger');
      if (trig) {
        trig.setAttribute('aria-expanded', 'false');
        trig.removeAttribute('aria-activedescendant');
        trig.focus();
      }
    }
  });

  // === Helpers ===
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) {
    return String(s).replace(/"/g, '&quot;');
  }

  // Export
  window.applyOdexSelects = applyOdexSelects;
})();
