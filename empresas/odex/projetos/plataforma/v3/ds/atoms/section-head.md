# `.ds-section-head` (atom)

> Source: [`section-head.css`](./section-head.css)
> Created: Phase H.9 (2026-05-20) · consolida **7+ DUPES** (home-section-head, section-header, admin/ajuda/ov/pv-section-head, catalog-header).

## Quando usar

Header de seção dentro de página/card · título + descrição opcional + action à direita (link "ver todos" ou button). NÃO inclui background/border · drop-in pra qualquer container.

## Quando NÃO usar

- Topbar global → use `.topbar` em chrome
- Toolbar com search/filter → use `.ds-toolbar`
- Hero · headline + descrição + CTA grandes → use `.ds-hero-gradient`
- Modal header → use modal pattern próprio

## API

```html
<!-- Default · title + sub + action link -->
<header class="ds-section-head">
  <div class="ds-section-head-info">
    <h3 class="ds-section-head-title">
      <i data-lucide="layers"></i> Navegue por categoria
    </h3>
    <p class="ds-section-head-sub">Filtre produtos por tipo · 12 categorias disponíveis.</p>
  </div>
  <a href="#loja" class="ds-section-head-action">
    Ver todos <i data-lucide="arrow-right"></i>
  </a>
</header>

<!-- Sem action -->
<header class="ds-section-head">
  <div class="ds-section-head-info">
    <h3 class="ds-section-head-title">Ofertas da semana</h3>
  </div>
</header>

<!-- Eyebrow style (orcamentos pattern) -->
<header class="ds-section-head ds-section-head-eyebrow">
  <div class="ds-section-head-info">
    <h4 class="ds-section-head-title">DADOS DO CLIENTE</h4>
  </div>
  <button class="ds-btn ds-btn-ghost ds-btn-sm">Editar</button>
</header>
```

## Slots

- `.ds-section-head-info` — wrapper esquerda (flex 1 · stack vertical)
- `.ds-section-head-title` — heading (h2/h3/h4 · 18/700/-1 default · com icon slot inline)
- `.ds-section-head-sub` — descrição (13/400 muted)
- `.ds-section-head-action` — link/button à direita (sem wrap · auto sized icons)

## Variants

### Sizes
- `.ds-section-head-sm` (14 title · 12 sub · margin-bottom 12) — compact
- (default) (18 title · 13 sub · margin-bottom 18) — page section
- `.ds-section-head-lg` (22 title · 14 sub · margin-bottom 24) — page-level

### Style variants
- (default) — title bold navy + sub muted
- `.ds-section-head-eyebrow` — title uppercase 11/700 muted (orcamentos section labels)
- `.ds-section-head-bordered` — adds border-bottom + padding-bottom 14 (ov-section-head)
- `.ds-section-head-baseline` — align-items: baseline (pv-section-head)

## Accessibility

- Title deve ser heading semântico real (`<h2>`, `<h3>`, etc) respeitando page hierarchy
- Action link/button precisa de label completo ("Ver todos os produtos" não só "Ver")
- Icon inside title é decorativo · `aria-hidden="true"`

## Examples

```html
<!-- Home section -->
<section>
  <header class="ds-section-head">
    <div class="ds-section-head-info">
      <h2 class="ds-section-head-title">
        <i data-lucide="trending-up" aria-hidden="true"></i> Mais vendidos
      </h2>
      <p class="ds-section-head-sub">Os produtos mais procurados em 2026.</p>
    </div>
    <a href="#loja" class="ds-section-head-action">
      Ver catálogo <i data-lucide="arrow-right"></i>
    </a>
  </header>
  <div class="ds-card-grid">...</div>
</section>

<!-- Orçamento detail · eyebrow + edit -->
<header class="ds-section-head ds-section-head-eyebrow">
  <div class="ds-section-head-info">
    <h4 class="ds-section-head-title">PRODUTOS DO ORÇAMENTO</h4>
  </div>
  <button class="ds-btn ds-btn-ghost ds-btn-sm">+ Adicionar item</button>
</header>

<!-- Bordered section divider -->
<header class="ds-section-head ds-section-head-bordered">
  <div class="ds-section-head-info">
    <h3 class="ds-section-head-title">Total da venda</h3>
  </div>
  <strong style="font-size:20px;">R$ 48.900,00</strong>
</header>

<!-- Large hero-like header -->
<header class="ds-section-head ds-section-head-lg">
  <div class="ds-section-head-info">
    <h2 class="ds-section-head-title">Central de ajuda</h2>
    <p class="ds-section-head-sub">Tudo que você precisa pra dominar a plataforma.</p>
  </div>
</header>
```

## Migration map (Phase H.9)

| Origin | Replace with |
|---|---|
| `.home-section-head` | `.ds-section-head` |
| `.home-section-title` | `.ds-section-head-title` |
| `.home-section-sub` | `.ds-section-head-sub` |
| `.home-section-link` | `.ds-section-head-action` |
| `.section-header` (dashboard) | `.ds-section-head` |
| `.section-header h3` | `.ds-section-head-title` |
| `.section-header p` | `.ds-section-head-sub` |
| `.btn-link` (dash section action) | `.ds-section-head-action` (or `.ds-link`) |
| `.admin-section-head` | `.ds-section-head` |
| `.ajuda-section-head` | `.ds-section-head` |
| `.ov-section-head` (com border-bottom) | `.ds-section-head .ds-section-head-bordered` |
| `.orc-section-head` (uppercase 11 muted) | `.ds-section-head .ds-section-head-eyebrow` |
| `.pv-section-head` (baseline) | `.ds-section-head .ds-section-head-baseline` |
| `.catalog-head` / `.catalog-header` | `.ds-section-head` |

## Related

- `.ds-link` — alternative pra action (sem ícone setilo)
- `.ds-btn .ds-btn-ghost-sm` — quando action é botão (não link)
- `.ds-hero-gradient` — pra hero-level (com bg + CTA)
