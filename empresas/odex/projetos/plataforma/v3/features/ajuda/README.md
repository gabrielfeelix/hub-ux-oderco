# Feature · Central de Ajuda

> Source: [`ajuda.css`](./ajuda.css)
> Telas: Central (`#ajuda`) · Artigo (`#artigo-<id>`) · Categoria (`#ajuda-cat-<id>`) · Help FAB + Modal (qualquer página)
> Layer: `@layer features`

## Propósito

Central de ajuda · hero gradient com search + categorias + populares + FAQ + página de artigo individual. FAB flutuante "?" abre modal de ajuda com lista de tópicos e CTA pra Dé chat. Help modal v1 (simples) ainda existe pra contexto legado.

## Componentes principais

### Help Modal v1 (legacy simples)
- `.help-modal` (text-center pad 28×32)
- `.help-modal-icon` (56×56 blue tint circle)
- `.help-modal-title` (18 bold) / `-sub` (14 muted)
- `.help-modal-links` (column gap 10)
- `.help-modal-link` (row item) / `-link-icon` (38) / `-link-title` / `-link-sub`

### Central de Ajuda

**Hero**
- `.ajuda-page` (1080w container)
- `.ajuda-hero` (radius card-lg, padding 56 48 60, gradient navy→blue, decorative ellipses ::before/::after)
- `.ajuda-hero-inner` (text-center, max 560)
- `.ajuda-hero h2` (38 bold white) / `p` (14 white .7)
- `.ajuda-srch-wrap` / `.ajuda-srch-icon` / `.ajuda-srch` (50h, no border, shadow elevated)

**Sections**
- `.ajuda-section` / `.ajuda-section-head` / `.ajuda-section-title` (20 bold navy) / `.ajuda-section-sub` / `.ajuda-section-link`

**Populares (ranked list)**
- `.ajuda-popular-list` (card container)
- `.ajuda-popular-row` (grid 64 1fr 32 · rank num + body + arrow)
- `.ajuda-popular-rank` (32 bold blue opacity .55, hover 1)
- `.ajuda-popular-body` / `-row-title` (16) / `-row-meta` (12 muted)
- `.ajuda-popular-row-cat` (uppercase pill) / `-row-dot` / `-row-read`
- `.ajuda-popular-arrow` (32 circle hover blue)

**Categorias**
- `.ajuda-cats` (grid 3-col responsive)
- `.ajuda-cat` (card link) / `-cat-head` / `-cat-icon` (46 color square) / `-cat-count`
- `.ajuda-cat h4` (16 bold) / `ul` / `li`
- `.ajuda-cat-more` (link blue, gap hover)

**FAQ accordion**
- `.ajuda-faq-wrap` (max 880)
- `.ajuda-faq-list` (column gap 8)
- `.ajuda-faq-item` (border + radius card · `.faq-open` blue border + ring)
- `.ajuda-faq-q` (grid 32 1fr 18 · icon + question + chevron)
- `.ajuda-faq-a` (answer panel)

**Feedback**
- `.ajuda-feedback-row` / `.ajuda-feedback-thumbs` / `-thumb` (👍/👎)
- `.ajuda-feedback-input` / `-input-actions` / `-btn`

**CTA**
- `.ajuda-cta-btn` (CTA blue)

### Artigo (.artigo-*)
- `.artigo-wrap` (max 760)
- `.artigo-back` (link voltar)
- `.artigo-meta` (uppercase eyebrow + dot + date)
- `.artigo-title` (28-32 bold)
- `.artigo-sub` (16 muted)
- `.artigo-body` (prose styles)
- `.artigo-related-list` (grid related articles)

### Categoria detalhe
- `.ajuda-cat-hero` (header da categoria)
- `.ajuda-cat-article` (linha de artigo na lista)

### Help FAB + Modal v2 (floating)
- `.help-fab` (fixed bottom-right 46h navy pill, hover blue)
- `.help-fab-pulse` (yellow dot animado)
- `.help-modal-mask` (backdrop blur)
- `.help-modal-box` (right-bottom 420w box, transition scale)
- `.help-modal-head` (gradient navy→blue) / `-head h3 p`
- `.help-modal-close` (28 circle white-alpha)
- `.help-modal-video` (16/9 cover) / `-play` (60 circle) / `-video-label`
- `.help-modal-article` (linha de artigo) / `-article-text strong/span`
- `.help-modal-foot` (footer com link gradient subtle)
- `.help-modal-foot-text` / `-foot-link`

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.help-modal` (v1) / `.help-modal-box` (v2) / `.ped-resumo-modal` | `.ds-modal` (CONFIRMED) | 3x DUPE |
| `.help-modal-close` / `.ped-resumo-close` / `.cart-close` / `.calc-form-share` | `.ds-icon-btn` (CONFIRMED) | DUPE 4x |
| `.help-link-icon` (38 color square) / `.ajuda-cat-icon` (46) / `.resumo-card-icon` (28) | `.ds-icon-box` (new) | Pattern 3x |
| `.ajuda-hero` (gradient navy→blue) / `.de-chat-head` / `.help-modal-head` | `.ds-hero-gradient` (new) | Pattern |
| `.ajuda-srch` (50h elevated input) | `.ds-input-group .ds-input-group-lg` ✅ | Near-dupe |
| `.ajuda-cat` (card link) | `.ds-card` ✅ | DUPE |
| `.ajuda-cat-count` (pill counter) | `.ds-pill` ✅ | DUPE |
| `.ajuda-cta-btn` | `.ds-btn-primary` ✅ | DUPE |
| `.ajuda-faq-item` accordion | `.ds-accordion` (new) | New molecule |
| `.artigo-back` / `.auth-back` / `.orc-back` / `.client-back-btn` | `.ds-link-back` (new) | 4x DUPE |
| `.artigo-meta` (eyebrow + dot + date) | `.ds-meta-row` (new) | Pattern |
| `.help-fab` (FAB) | `.ds-fab` (new) | New atom |
| `.help-modal-video` (16/9 cover c/ play) | `.ds-video-embed` (new) | Pattern |
| `.help-modal-foot` (footer com link) | `.ds-modal-foot` (parte de .ds-modal) | Match |
| `.ajuda-popular-row` (grid linked row) | List-item pattern · candidato | Pattern |

**Estimativa migration:** ~80% migrável pra DS + criar ~5 novos atoms.

**Novos atoms/molecules confirmados nesta extração:**
- `.ds-link-back` (CONFIRMED 4x · artigo + auth + orc + client)
- `.ds-modal` upgrade (CONFIRMED 3x · help v1 + help v2 + ped-resumo)
- `.ds-icon-btn` upgrade 3x → 4x (+help-modal-close)
- `.ds-icon-box` (38/46 color square pattern) · 3x sugerido
- `.ds-hero-gradient` (3x pattern · ajuda-hero + dé-chat-head + help-modal-head)

## Tokens

Maioria primitives. Phase H migra junto.

## Responsive

`@media(max-width:520px)` interna pra help-fab/help-modal-box.
`@media(max-width:680px)` interna pra ajuda-cats/artigo/cat-hero.
`@media(max-width:1024px)` cross-feature em index.html · tem `.ajuda-cats` rule lá (não extraído).

## Related

- [Pedidos](../pedidos/README.md) — `.ped-resumo-modal` DUPE com `.help-modal-box`
- [Auth](../auth/README.md) — `.auth-back` DUPE com `.artigo-back`
- Dé chat (C.x futuro) — `.help-modal-de*` ficou lá (combined selector com `.de-*`)
