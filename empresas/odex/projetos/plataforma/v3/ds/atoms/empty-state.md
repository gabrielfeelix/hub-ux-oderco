# `.ds-empty-state` (atom)

> Source: [`empty-state.css`](./empty-state.css)
> Created: Phase H.7 (2026-05-20) · consolida **10 DUPES** (cart, notif, ov-items, premio, admin-artigo, admin-banner, client-tabs, cliente-search, ajuda-cat, novas, etc).

## Quando usar

Placeholder visual quando uma lista/seção não tem conteúdo. Stack vertical centralizado: ícone + título + descrição + ação opcional. Pra:
- Carrinho vazio
- Lista de notificações vazia
- Search sem resultados
- Aba sem items (orçamentos do cliente, prêmios do mês, etc)
- Admin: nenhum banner cadastrado

## Quando NÃO usar

- Loading state → use spinner/skeleton, não empty-state
- Erro de carga → use `.ds-alert-error` (futuro)
- Estado parcial (poucos items) → não é "empty"

## API

```html
<!-- Default · icon + title + desc + action -->
<div class="ds-empty-state">
  <div class="ds-empty-state-icon">
    <div class="ds-icon-box ds-icon-box-xxl ds-icon-box-circle">
      <i data-lucide="inbox"></i>
    </div>
  </div>
  <h3 class="ds-empty-state-title">Nenhum pedido aqui</h3>
  <p class="ds-empty-state-desc">Quando você fechar pedidos, eles aparecem nesta lista.</p>
  <div class="ds-empty-state-action">
    <button class="ds-btn ds-btn-primary">Criar primeiro pedido</button>
  </div>
</div>

<!-- Compact (search dropdown empty) -->
<div class="ds-empty-state ds-empty-state-sm">
  <p class="ds-empty-state-desc">Nenhum cliente encontrado</p>
</div>

<!-- Inline (table empty row) -->
<div class="ds-empty-state ds-empty-state-inline">
  <i data-lucide="search" style="color:var(--muted);"></i>
  <div>
    <p class="ds-empty-state-title">Sem resultados</p>
    <p class="ds-empty-state-desc">Tente refinar a busca.</p>
  </div>
</div>
```

## Variants

### Sizes
- `.ds-empty-state-sm` (32/18 pad · 14 title · 12 desc) — cliente-search dropdown, narrow lists
- `.ds-empty-state-md` (48/24 pad) — modal lists, drawer empties
- (default) (60/24 pad · 16 title · 13 desc) — page-level empty
- `.ds-empty-state-lg` (72/32 pad · 18 title · 14 desc · 420 maxw) — full-page empty

### Layout
- (default) — vertical centered stack
- `.ds-empty-state-inline` — horizontal row (icon + title/desc · left-aligned)

## Slots

- `.ds-empty-state-icon` — wrapper pra icon (use `.ds-icon-box` ou `<svg>` direto)
- `.ds-empty-state-title` — heading curto (h3 recommended)
- `.ds-empty-state-desc` — descrição (1-2 frases · maxw 360px default)
- `.ds-empty-state-action` — botão/link CTA (margin-top extra)

## Accessibility

- `.ds-empty-state-title` deveria ser um heading semântico (`<h3>` ou nível apropriado) pra screen readers identificarem a região
- Action button deve ter label descritivo (ex: "Criar primeiro pedido" não "Criar")
- Icon decorativo · adicione `aria-hidden="true"` no `<i data-lucide>`

## Examples

```html
<!-- Cart empty -->
<div class="ds-empty-state">
  <div class="ds-empty-state-icon">
    <div class="ds-icon-box ds-icon-box-xxl ds-icon-box-circle ds-icon-box-brand">
      <i data-lucide="shopping-bag" aria-hidden="true"></i>
    </div>
  </div>
  <h3 class="ds-empty-state-title">Seu carrinho está vazio</h3>
  <p class="ds-empty-state-desc">Adicione produtos pra finalizar seu pedido.</p>
  <div class="ds-empty-state-action">
    <a href="#loja" class="ds-btn ds-btn-primary">Ver catálogo</a>
  </div>
</div>

<!-- Notif drawer empty -->
<div class="ds-empty-state ds-empty-state-md">
  <div class="ds-empty-state-icon">
    <div class="ds-icon-box ds-icon-box-xxl ds-icon-box-circle">
      <i data-lucide="bell-off" aria-hidden="true"></i>
    </div>
  </div>
  <h3 class="ds-empty-state-title">Sem notificações</h3>
  <p class="ds-empty-state-desc">Você está em dia! Avisos novos aparecem aqui.</p>
</div>

<!-- Admin no banner -->
<div class="ds-empty-state ds-empty-state-lg">
  <div class="ds-empty-state-icon">
    <div class="ds-icon-box ds-icon-box-xxl ds-icon-box-circle">
      <i data-lucide="image" aria-hidden="true"></i>
    </div>
  </div>
  <h3 class="ds-empty-state-title">Nenhum banner cadastrado</h3>
  <p class="ds-empty-state-desc">Banners aparecem no topo da loja · cadastre o primeiro pra começar.</p>
  <div class="ds-empty-state-action">
    <button class="ds-btn ds-btn-primary">+ Novo banner</button>
  </div>
</div>
```

## Migration map (Phase H.7)

| Origin | Replace with |
|---|---|
| `.cart-empty` (60/20 pad) | `.ds-empty-state` |
| `.cart-empty h3` | `.ds-empty-state-title` |
| `.cart-empty p` | `.ds-empty-state-desc` |
| `.notif-drawer-empty` (60/24) | `.ds-empty-state` |
| `.notif-drawer-empty-icon` (54 circle) | `.ds-icon-box .ds-icon-box-xxl .ds-icon-box-circle` inside `.ds-empty-state-icon` |
| `.ov-items-empty` (36/18 · compact) | `.ds-empty-state .ds-empty-state-sm` |
| `.premio-empty` | `.ds-empty-state` |
| `.admin-artigo-empty` (32/18) | `.ds-empty-state .ds-empty-state-sm` |
| `.admin-banner-empty` | `.ds-empty-state` |
| `.client-tabs-empty` (36/20) | `.ds-empty-state .ds-empty-state-sm` |
| `.cliente-search-empty` (30/16 dropdown) | `.ds-empty-state .ds-empty-state-sm` |
| `.ajuda-cat-empty` (48/24) | `.ds-empty-state .ds-empty-state-md` |
| `.novas-empty` (60/20) | `.ds-empty-state` |
| `.empty-state` (loja v1 · 72/20 com h3+p+button) | `.ds-empty-state .ds-empty-state-lg` |

## Related

- `.ds-icon-box .ds-icon-box-xxl .ds-icon-box-circle` — illustration anchor
- `.ds-btn` — action button
