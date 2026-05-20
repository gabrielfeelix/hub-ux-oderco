# `.ds-status-dot` (atom)

> Source: [`status-dot.css`](./status-dot.css)
> Created: Phase H.10 (2026-05-20) · consolida **5 DUPES** (de-chat-status, notif, notif-drawer, pdp-stock, plus separator family).

## Quando usar

Indicador circular pequeno (6-10px) · estado binário/categórico ao lado de texto. Casos:
- Online indicator (chat assistente "online")
- Stock status (em estoque · pronta-entrega)
- Unread notification marker
- Quote/order status (active/pending/done)
- Live data freshness indicator

`.ds-dot-sep` (variant) — separator decorativo entre breadcrumb items, metadata fields.

## Quando NÃO usar

- Badge com número (3 notifs) → use `.ds-icon-btn-badge` ou `.ds-pill`
- Status pill com texto ("Em andamento") → use `.ds-pill`
- Step indicator com número/check → use stepper atom (futuro)

## API

```html
<!-- Default 8px primary-blue dot -->
<span class="ds-status-dot"></span>

<!-- Online indicator (green + glow) -->
<span class="ds-status-dot ds-status-dot-success ds-status-dot-glow"></span>

<!-- Pending pulse (yellow animated) -->
<span class="ds-status-dot ds-status-dot-warning ds-status-dot-pulse"></span>

<!-- Inline metadata separator -->
<span>Status</span><span class="ds-dot-sep"></span><span>20/05</span>
```

## Variants

### Sizes
- `.ds-status-dot-xs` (6px) — dense inline
- `.ds-status-dot-sm` (7px) — chat status default
- `.ds-status-dot-md` (8px) — **default** · notif marker
- `.ds-status-dot-lg` (10px) — emphasized

### Tones (semantic)
- `.ds-status-dot-info` / `-brand` — blue (default)
- `.ds-status-dot-success` / `-online` — green
- `.ds-status-dot-warning` / `-pending` — yellow
- `.ds-status-dot-danger` / `-error` — red
- `.ds-status-dot-muted` / `-offline` — muted gray
- `.ds-status-dot-navy` — navy

### Effects
- `.ds-status-dot-glow` — soft outer shadow halo (auto-tinted)
- `.ds-status-dot-ring` — concentric ring background (3px)
- `.ds-status-dot-pulse` — animated pulse (respects prefers-reduced-motion)

## Accessibility

- Status dot é decorativo · adicione texto adjacente descritivo ("Online", "Em estoque", "Nova mensagem")
- Não dependa exclusivamente da cor pra carregar significado · acompanhe com label
- Pulse animation tem `prefers-reduced-motion` fallback (anima desligado)

## Examples

```html
<!-- Chat assistant header · online -->
<header class="de-chat-head">
  <div class="ds-icon-box ds-icon-box-md ds-icon-box-brand">
    <i data-lucide="sparkles" aria-hidden="true"></i>
  </div>
  <div>
    <strong>Dé</strong>
    <p>
      <span class="ds-status-dot ds-status-dot-sm ds-status-dot-online ds-status-dot-glow"></span>
      Online · IA Odex
    </p>
  </div>
</header>

<!-- PDP stock indicator -->
<div class="ds-pill ds-pill-andamento">
  <span class="ds-status-dot ds-status-dot-xs ds-status-dot-success ds-status-dot-ring"></span>
  Em estoque · pronta-entrega
</div>

<!-- Notification unread marker -->
<button class="ds-icon-btn ds-icon-btn-ghost" aria-label="Notificações · 3 não lidas">
  <i data-lucide="bell"></i>
  <span class="ds-icon-btn-dot"></span>
</button>

<!-- Metadata separator -->
<small>
  João Silva <span class="ds-dot-sep"></span>
  20/05/2026 <span class="ds-dot-sep"></span>
  #PED-1234
</small>

<!-- Live data indicator pulsing -->
<span>
  <span class="ds-status-dot ds-status-dot-sm ds-status-dot-danger ds-status-dot-pulse"></span>
  Live · atualizando agora
</span>
```

## Migration map (Phase H.10)

| Origin | Replace with |
|---|---|
| `.de-chat-status-dot` (7px green glow) | `.ds-status-dot .ds-status-dot-sm .ds-status-dot-online .ds-status-dot-glow` |
| `.notif-dot` (7px blue) | `.ds-status-dot .ds-status-dot-sm .ds-status-dot-info` |
| `.notif-drawer-dot` (8px blue) | `.ds-status-dot .ds-status-dot-md .ds-status-dot-info` |
| `.pdp-stock-dot` (7px green pulse) | `.ds-status-dot .ds-status-dot-sm .ds-status-dot-success .ds-status-dot-ring` |
| `.home-recent-dot` (3px line · separator) | `.ds-dot-sep` |
| `.artigo-meta-dot` (3px placeholder) | `.ds-dot-sep` |
| `.ajuda-popular-row-dot` (separator) | `.ds-dot-sep` |
| `.dash-carousel-dot` (6px line) | `.ds-status-dot .ds-status-dot-xs .ds-status-dot-muted` (use as pagination · estado active separate) |

## Related

- `.ds-icon-btn .ds-icon-btn-dot` — pre-positioned slot dentro de icon button
- `.ds-pill` — status com texto label
- `.ds-icon-box` — container decorativo maior pra ícones
