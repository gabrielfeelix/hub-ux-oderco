# `.ds-modal` (atom)

> Source: [`modal.css`](./modal.css)
> Phase H.18 · consolida **3 DUPES** (.modal, .ped-resumo-modal, .help-modal).

## API

```html
<div class="ds-overlay ds-overlay-tint-strong is-open" onclick="closeModal()"></div>
<div class="ds-modal is-open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <header class="ds-modal-head">
    <div>
      <h2 id="modal-title" class="ds-modal-title">Confirmar ação</h2>
      <p class="ds-modal-sub">Esta ação não pode ser desfeita.</p>
    </div>
    <button class="ds-icon-btn ds-icon-btn-circle ds-icon-btn-soft" aria-label="Fechar">
      <i data-lucide="x"></i>
    </button>
  </header>
  <div class="ds-modal-body">
    <p>Tem certeza que deseja remover este orçamento?</p>
  </div>
  <footer class="ds-modal-foot">
    <button class="ds-btn ds-btn-ghost">Cancelar</button>
    <button class="ds-btn ds-btn-danger">Remover</button>
  </footer>
</div>
```

## Sizes

- `.ds-modal-sm` (420 max) · confirmation
- `.ds-modal-md` (560 default) · standard form
- `.ds-modal-lg` (720) · listings
- `.ds-modal-xl` (960) · rich content
- `.ds-modal-full` (100% - 32 · max 1200) · admin views

## A11y

- `role="dialog"` + `aria-modal="true"`
- `aria-labelledby` referencia modal-title
- Focus-trap (consumer wires) · primeiro focusable recebe focus ao abrir
- ESC fecha (consumer wires)
- Overlay click closes

## Migration map

| Origin | Replace with |
|---|---|
| `.modal` (560 default · r-card-lg) | `.ds-modal .ds-modal-md` |
| `.ped-resumo-modal` (larger) | `.ds-modal .ds-modal-lg` |
| `.help-modal` (com hero head) | `.ds-modal .ds-modal-lg` (head usa `.ds-hero-gradient`) |
| `.modal-head` / `.modal-close` | `.ds-modal-head` + `.ds-icon-btn` |
| `.modal-overlay` | `.ds-overlay .ds-overlay-tint-strong` |
