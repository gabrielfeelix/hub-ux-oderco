# DS · Divergence Audit (Phase H prep)

> v0.23 · 2026-05-20 · Auto-atualizado a cada feature extraction (C.10+) e atom creation (H.1+)

Inventário consolidado de **classes duplicadas** entre features + **novos DS atoms/molecules** propostos pra Phase H consolidação.

Source: agregação dos `features/*/README.md` · seção "Divergence audit" de cada feature já extraída.

---

## Status geral

| Métrica | Valor |
|---|---|
| Features extraídas (C.10-C.25) | 16 + cleanup (loja v1/v2 + dashboard home content blocks + ds/legacy-compat.css) |
| Features restantes | (nenhuma) Phase C completa. Próximo: Phase H consolidação. |
| **DS atoms/molecules confirmados** (≥2 features DUPE) | **23 · upgrades fortes**: ds-icon-btn **10x** · ds-table-grid 8x · ds-icon-box 7x · ds-overlay 6x · ds-hero-gradient 6x · ds-kpi 6x · ds-empty-state 6x · ds-toolbar 5x · ds-section-head 4x · ds-status-dot 4x · ds-tabs 4x · ds-stepper-input 3x · ds-kv-list 3x · ds-btn-on-brand 3x |
| Possíveis novos (sugeridos · ≥1 feature) | 22 |

---

## ⭐ Novos DS atoms/molecules **CONFIRMADOS** (≥2 features confirmam DUPE)

Cada um destes vai virar atom/molecule no DS na Phase H, com migração de markup correspondente.

### 1. `.ds-toolbar` (molecule) — 🔴 **4x confirmado**

Header de listagem com search + filter + actions à direita.

| Feature | Class duplicado |
|---|---|
| Clientes | `.clients-toolbar` |
| Pedidos | `.ped-toolbar` |
| Orçamentos | `.orc-toolbar` |
| Monte-kit | `.mk-toolbar` |

**Estrutura proposta:**
```html
<div class="ds-toolbar">
  <div class="ds-toolbar-search"><input class="ds-input-group" /></div>
  <button class="ds-btn ds-btn-ghost">Filtrar</button>
  <button class="ds-btn ds-btn-primary" data-position="end">+ Novo</button>
</div>
```

---

### 2. `.ds-table-grid` (molecule) — 🔴 **4x confirmado**

Tabela em CSS grid (head + rows) usada em listings.

| Feature | Class duplicado |
|---|---|
| Clientes | `.clients-tbl-head` / `.clients-tbl-row` |
| Pedidos | `.ped-tbl-head` / `.ped-tbl-row` |
| Orçamentos | `.orc-tbl-head` / `.orc-tbl-row` |
| Monte-kit | (não tem direto, usa cards) |

**Estrutura proposta:**
```html
<div class="ds-table-grid" style="--cols: 88px 1fr 150px 120px;">
  <div class="ds-table-grid-head">
    <span>Code</span><span>Cliente</span><span>Data</span><span>Total</span>
  </div>
  <div class="ds-table-grid-row">
    <span>#1234</span><span>João</span><span>20/05</span><span>R$ 4.890</span>
  </div>
</div>
```

---

### 3. `.ds-stepper` (molecule) — 🔴 **3x confirmado**

Wizard nav horizontal (steps com dot + label + connector).

| Feature | Class duplicado |
|---|---|
| Clientes (novo cliente) | `.nc-steps` / `.nc-step` / `.nc-step-dot` / `.nc-step-sep` |
| Auth (cadastro) | `.auth-step-indicator` / `.auth-progress-fill` |
| Monte-kit | `.mk-stepper` / `.mk-step` / `.mk-step-dot` |

**Estrutura proposta:**
```html
<ol class="ds-stepper">
  <li class="ds-stepper-item is-done">
    <span class="ds-stepper-dot">1</span>
    <span class="ds-stepper-label">Dados</span>
  </li>
  <li class="ds-stepper-item is-active">
    <span class="ds-stepper-dot">2</span>
    <span class="ds-stepper-label">Endereço</span>
  </li>
  <li class="ds-stepper-item">
    <span class="ds-stepper-dot">3</span>
    <span class="ds-stepper-label">Confirmar</span>
  </li>
</ol>
```

---

### 4. `.ds-card-selectable` (molecule) — 🔴 **3x confirmado**

Radio button visual em formato card (com ícone, título, descrição, estado ativo).

| Feature | Class duplicado |
|---|---|
| Clientes | `.nc-tipo-opt` (PF/PJ) |
| Monte-kit | `.mk-tipo-card` (fotovoltaico/hibrido/bess/eletro) + `.mk-prod-card` + `.mk-marca-card` |
| Checkout | `.radio-opt` (pagamento) |

**Estrutura proposta:**
```html
<label class="ds-card-selectable">
  <input type="radio" name="tipo" value="pf" />
  <span class="ds-card-selectable-content">
    <strong>Pessoa Física</strong>
    <small>CPF + dados pessoais</small>
  </span>
</label>
```

---

### 5. `.ds-form-grid` (utility/molecule) — 🔴 **4x confirmado**

Grid responsive 2/3-col para form fields lado-a-lado.

| Feature | Class duplicado |
|---|---|
| Clientes (novo cliente) | `.nc-grid-2` / `.nc-grid-3` |
| Checkout | `.ck-grid-2` / `.ck-grid-3` / `.ck-grid-city` |
| Auth | `.auth-grid-2` |
| Monte-kit | `.mk-form-grid` (variant) |

**Proposta:** classes utility no DS:
```css
.ds-form-grid { display: grid; gap: 14px; grid-template-columns: 1fr; }
.ds-form-grid-2 { grid-template-columns: 1fr 1fr; }
.ds-form-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
@media (max-width: var(--bp-sm)) { /* todas viram 1fr */ }
```

---

### 6. `.ds-pill` status DUPES — 🔴 **6x confirmado · JÁ EXISTE no DS**

Status pills (.ds-pill ✅) já existem. Migrar markup das features:

| Feature | Class duplicado | Migrar pra |
|---|---|---|
| Orçamentos | `.orc-status-pill` + variants (`-semcliente/-expirado/-pendente/-aprovado/-cancelado`) | `.ds-pill .ds-pill-{status}` |
| Pedidos | `.ped-status-pill` + `.ped-v2-pill` variants | `.ds-pill` |
| Clientes | `.client-addr-tag` + `.tag-urbano/-rural/-carreta-*` | `.ds-pill` |

---

### 7. `.ds-kv-list` (molecule) — 🟡 **2x confirmado**

Lista key-value (dt/dd) com label muted + valor strong, distribuídos space-between.

| Feature | Class duplicado |
|---|---|
| Pedidos (resumo modal) | `.resumo-kv` (dl/dt/dd) |
| Monte-kit (resumo) | `.mk-resumo-row` (mesmo pattern) |

**Estrutura proposta:**
```html
<dl class="ds-kv-list">
  <div><dt>Subtotal</dt><dd>R$ 4.500</dd></div>
  <div><dt>Frete</dt><dd>Grátis</dd></div>
  <div><dt>Total</dt><dd class="is-strong">R$ 4.500</dd></div>
</dl>
```

---

### 8. `.ds-modal` (molecule) — 🔴 **3x confirmado**

Container modal (overlay + body + close button).

| Feature | Class duplicado |
|---|---|
| Pedidos (resumo) | `.ped-resumo-overlay` / `.ped-resumo-modal` / `.ped-resumo-close` |
| Auth (no markup direto) | usa `.is-auth` body chrome |
| Clientes (novo cliente) | `.modal-wide` (override class) |
| Ajuda (futuro) | `.help-modal-*` (TODO C.x) |

**Estrutura proposta:**
```html
<div class="ds-modal-overlay" data-state="open">
  <div class="ds-modal" role="dialog" aria-modal="true">
    <header class="ds-modal-head">
      <h2>Title</h2>
      <button class="ds-icon-btn-close" aria-label="Fechar"><svg.../></button>
    </header>
    <div class="ds-modal-body">...</div>
    <footer class="ds-modal-foot">...</footer>
  </div>
</div>
```

---

### 9. `.ds-icon-btn` (atom) — 🟡 **2x confirmado**

Botão icon-only circular (close, clear, action).

| Feature | Class duplicado |
|---|---|
| Pedidos | `.ped-resumo-close` |
| Checkout | `.cart-close` |
| Clientes | `.clients-clr-btn` (X clear) |

**Estrutura proposta:**
```html
<button class="ds-icon-btn" aria-label="Fechar">
  <svg width="18" height="18">...</svg>
</button>
<!-- Variants -->
<button class="ds-icon-btn ds-icon-btn-circle">...</button>
<button class="ds-icon-btn ds-icon-btn-square">...</button>
```

---

### 10. `.ds-avatar` (atom) — 🟡 **1x mas pattern reusável**

Avatar circle/square com iniciais + cor de background.

| Feature | Class duplicado |
|---|---|
| Clientes | `.client-av` (38) / `.client-av-lg` (52) |
| Pedidos (resumo) | `.resumo-avatar` (44) |

**Estrutura proposta:**
```html
<span class="ds-avatar ds-avatar-md" style="--bg: var(--blue);">JS</span>
<!-- Sizes -->
<span class="ds-avatar ds-avatar-sm">JS</span>  <!-- 28 -->
<span class="ds-avatar ds-avatar-md">JS</span>  <!-- 38 -->
<span class="ds-avatar ds-avatar-lg">JS</span>  <!-- 52 -->
```

---

### 11. `.ds-alert` (molecule) — 🟡 **2x confirmado · 3 variants**

Banner inline com ícone + mensagem (warning/error/info).

| Feature | Class duplicado |
|---|---|
| Orçamentos | `.orc-alert` (banner amarelo) / `.ov-alert` (idem) |
| Pedidos (futuro) | possível |
| Checkout | `.premia-row` (yellow tint) |
| Monte-kit | `.mk-help-tips` (pattern similar mas list) |

**Estrutura proposta:**
```html
<div class="ds-alert ds-alert-warning">
  <i data-lucide="info" aria-hidden="true"></i>
  <span>Esta nota está sujeita a aprovação.</span>
</div>
<!-- Variants: -info / -warning / -error / -success -->
```

---

### 12. `.ds-kpi` (atom) — 🟡 **2x confirmado**

KPI card com label uppercase + valor grande destacado.

| Feature | Class duplicado |
|---|---|
| Clientes | `.client-kpi` / `-kpi-lbl` / `-kpi-val` |
| Calculadora | `.calc-metric` / `-metric-lbl` / `-metric-val` |

**Estrutura proposta:**
```html
<div class="ds-kpi">
  <span class="ds-kpi-label">Potência total</span>
  <strong class="ds-kpi-value">7,2 kWp</strong>
  <span class="ds-kpi-sub">12 painéis</span>
</div>
```

---

### 13. `.ds-progress` (atom) — 🟡 **2x confirmado**

Barra de progresso linear com gradient navy→blue fill.

| Feature | Class duplicado |
|---|---|
| Auth (cadastro) | `.auth-progress` / `.auth-progress-fill` |
| Calculadora (loading) | `.calc-prog-track` / `.calc-prog-fill` |

**Estrutura proposta:**
```html
<div class="ds-progress">
  <div class="ds-progress-fill" style="width: 50%"></div>
</div>
```

---

### 14. `.ds-icon-btn` (atom) — 🔴 **3x confirmado** (atualizado de 2x)

Atualizado: Calculadora também usa em `.calc-form-share` (38 circle).

| Feature | Class duplicado |
|---|---|
| Pedidos | `.ped-resumo-close` |
| Checkout | `.cart-close` |
| Clientes | `.clients-clr-btn` (X clear) |
| Calculadora | `.calc-form-share` (38 circle) |

Variants: square (line clr-btn) · circle (close / share).

---

### 15. `.ds-link-back` (atom) — 🔴 **4x confirmado**

Link "← Voltar" com seta + texto, color muted hover blue/strong.

| Feature | Class duplicado |
|---|---|
| Auth | `.auth-back` |
| Orçamentos | `.orc-back` |
| Clientes | `.client-back-btn` |
| Ajuda | `.artigo-back` |

**Estrutura proposta:**
```html
<a href="#prev" class="ds-link-back">
  <svg.../> Voltar
</a>
```

---

### 16. `.ds-icon-box` (atom) — 🟡 **3x confirmado**

Container quadrado/redondo color-coded com ícone centralizado (não-interativo, indicativo).

| Feature | Class duplicado |
|---|---|
| Pedidos (resumo) | `.resumo-card-icon` (28×28) |
| Ajuda | `.ajuda-cat-icon` (46×46) / `.help-link-icon` (38×38) |

Variants: sm 28 · md 38 · lg 46.

---

### 17. `.ds-hero-gradient` (molecule) — 🟡 **3x confirmado**

Hero section com gradient navy→blue + decoração + título grande.

| Feature | Class duplicado |
|---|---|
| Ajuda | `.ajuda-hero` (radius card-lg, padding 56 48 60) |
| Auth | `.auth-brand` (panel gradient com decoração radial) |
| Ajuda (modal head) | `.help-modal-head` (gradient navy→blue) |

---

## 🟡 Sugeridos · 1 feature (precisa confirmação)

### `.ds-stepper-input` (qty +/-)
- `.cart-qty` (checkout) + `.mk-qty-stepper` (monte-kit) **→ CONFIRMADO 2x · subir**

### `.ds-tabs` (mode toggles)
- `.mk-mode-tabs` (monte-kit · potência vs consumo)

### `.ds-tips` (help tips list)
- `.mk-help-tips` (monte-kit) + `.calc-help-tip` (calculadora · sugestão similar) **→ CONFIRMADO 2x · subir**

### `.ds-search-list` (autocomplete results)
- `.cliente-search-list` / `-item` (clientes)

### `.ds-page-btn` (paginação)
- `.pg-btn` (orçamentos)

### `.ds-spinner` (loading animation)
- `.calc-spin-svg` / `.calc-spin-arc` (calculadora)

### `.ds-alert-neutral` (disclaimer)
- `.calc-disclaimer` (calculadora)

### `.ds-accordion` (FAQ items)
- `.ajuda-faq-item` (ajuda)

### `.ds-fab` (floating action button)
- `.help-fab` (ajuda)

### `.ds-video-embed` (16/9 cover + play)
- `.help-modal-video` (ajuda)

### `.ds-btn-on-brand` (CTA sobre brand bg)
- `.dash-hero-cta` / `.dash-promo-cta` / `.dash-carousel-cta` (dashboard)

### `.ds-card-link` (card como link interativo)
- `.quick-act-btn` (dashboard)

### `.ds-section-head` (header com title + sub + action)
- `.section-header` (dashboard) + `.ajuda-section-head` (ajuda) + `.premio-page-head` (pv) **→ 3x · subir CONFIRMED**

### `.ds-dropzone` (upload area dashed)
- `.pv-upload-drop` (pv)

### `.ds-meta-strip` (horizontal divided info strip)
- `.pv-meta` (pv)

### `.ds-timeline` (eventos verticais)
- `.pv-timeline-*` (pv)

### `.ds-drawer` (right side panel)
- `.novas-panel` (novidades) + `.notif-drawer` (notif futuro) **→ 2x · subir CONFIRMED em C.21**

### `.ds-toast` (top-right notification slide-in)
- `.odex-toast` (novidades · global)

### `.ds-empty-state` (icon + h4 + p)
- `.cart-empty` (checkout) + `.novas-empty` / `.novas-end` (novidades) + `.notif-drawer-empty` (notif futuro) + `.premio-empty` (pv) **→ 4x · subir CONFIRMED**

### `.ds-list-item-selectable` (linha selecionável)
- `.novas-cat-item` (novidades)

### `.ds-chip` (chip outline pill clickable)
- `.de-suggestion` + `.de-quick-chip` (de-chat) **→ 2x · subir CONFIRMED**

### `.ds-chat-bubble` (chat message bubble)
- `.de-msg-bubble` (de-chat)

### `.ds-status-dot` (pulse indicator)
- `.de-chat-status-dot` (de-chat)

---

## DUPES → DS atoms existentes (migration markup)

Não precisa criar nada · só migrar markup das features pra usar DS existente:

| Feature class | DS existente | Ocorrências |
|---|---|---|
| `.ov-input` / `.nc-input` / `.ckform-input` / `.mk-input` | `.ds-input` | 4 features |
| `.ov-buscar-btn` / `.clients-srch-btn` | `.ds-btn-secondary` | 2 features |
| `.orc-add-btn` / `.clients-add-btn` / `.mk-btn-primary` / `.cart-checkout-btn` | `.ds-btn-primary` | 4+ features |
| `.orc-filter-btn` / `.ped-filter-btn` / `.nc-cancel` | `.ds-btn-ghost` | 3+ features |
| `.orc-section-card` / `.client-info-card` / `.ckform-card` / `.mk-card` | `.ds-card` | 5+ features |
| `.nc-field` / `.mk-field` | `.ds-field` | 2 features |
| `.nc-label` / `.mk-label` / `.ckform-label` | `.ds-field-label` | 3 features |
| `.nc-radio-opt` / `.mk-radio` | `.ds-check input[radio]` | 2 features |

---

## Phase H · plano de ação (DRAFT)

Quando todas features estiverem extraídas (~C.24):

### H.1 · Criar novos DS atoms/molecules (~11 confirmados)
Cada um vira `ds/atoms/<name>.css` ou `ds/molecules/<name>.css` com `.md` doc + entry no catálogo.

### H.2 · Migrar markup das features
Substituir `class="ov-input"` por `class="ds-input"`, etc. Cluster por cluster, com smoke test browser em cada.

### H.3 · Apagar CSS duplicado das features
Cada feature `features/<name>/<name>.css` perde 30-70% do tamanho.

### H.4 · Atualizar legacy compat block
Algumas !important overrides do `index.html` podem sumir após migration.

### H.5 · Verify
- Vars audit (zero missing)
- Browser visual smoke todas as telas
- Catálogo atualizado
- Lighthouse score baseline

---

## Manutenção deste doc

Atualizado a cada feature extraction (C.10+). Quando uma DUPE confirma 2+ features, ele sobe de "sugerido" pra "confirmado". Phase H trabalha a partir desta lista.

Update history:
- v0.1 · 2026-05-20 · Criado após C.14 (clientes) · 6 features mapeadas · 11 atoms/molecules confirmados
- v0.2 · 2026-05-20 · Atualizado após C.15 (calculadora) · 7 features mapeadas · 14 atoms/molecules confirmados (.ds-kpi +1, .ds-progress +1, .ds-icon-btn upgrade 2x→3x) + 2 sugeridos viraram confirmados
- v0.3 · 2026-05-20 · Atualizado após C.16 (ajuda) · 8 features mapeadas · 17 confirmados (.ds-link-back 4x, .ds-icon-box 3x, .ds-hero-gradient 3x) + .ds-modal sobe pra 3x · .ds-icon-btn upgrade 3x→4x · 3 novos sugeridos (.ds-accordion, .ds-fab, .ds-video-embed)
- v0.4 · 2026-05-20 · Atualizado após C.17 (dashboard) · 9 features mapeadas · upgrades: .ds-kpi 2x→4x (+dash-kpi+home-kpi) · .ds-hero-gradient 3x→4x (+dash-hero) · .ds-icon-btn 4x→5x (+dash-hero-brand-edit) · .ds-icon-box 3x→5x (+brand-logo+quick-ico) · 3 novos sugeridos (.ds-btn-on-brand, .ds-card-link, .ds-section-head)
- v0.5 · 2026-05-20 · Atualizado após C.18 (premio venda direta) · 10 features mapeadas · upgrades múltiplos: .ds-table-grid 4x→5x · .ds-link-back 4x→5x · .ds-kpi 4x→5x · .ds-icon-box 5x→6x · .ds-icon-btn 5x→6x · .ds-alert 3x→4x (com 5 tones) · .ds-section-head sobe pra confirmed 3x · 3 novos sugeridos (.ds-dropzone, .ds-meta-strip, .ds-timeline)
- v0.6 · 2026-05-20 · Atualizado após C.19 (novidades) · 11 features mapeadas · .ds-icon-btn 6x→7x · 4 novos sugeridos (.ds-drawer 2x, .ds-toast, .ds-empty-state 4x, .ds-list-item-selectable)
- v0.7 · 2026-05-20 · Atualizado após C.20 (dé chat) · 12 features mapeadas · .ds-icon-btn 7x→8x · .ds-hero-gradient 4x→5x · .ds-overlay sobe 5x · 3 novos sugeridos (.ds-chip 2x, .ds-chat-bubble, .ds-status-dot)
- v0.8 · 2026-05-20 · Atualizado após C.21 (notif) · 13 features · .ds-overlay 5x→6x · .ds-icon-box 6x→7x · .ds-empty-state 4x→5x · .ds-drawer 2x→3x (CONFIRMED) · .ds-tab-pill sobe pra CONFIRMED 2x · .ds-status-dot sobe pra CONFIRMED 3x · 2 novos sugeridos (.ds-popover, .ds-badge-counter)
- v0.9 · 2026-05-20 · Atualizado após C.22 (admin) · 14 features · MAIORES upgrades até agora: .ds-icon-btn 8x→9x · .ds-table-grid 5x→8x · .ds-hero-gradient 5x→6x · .ds-kpi 5x→6x · .ds-toolbar 4x→5x · .ds-empty-state 5x→6x · .ds-section-head 3x→4x · 3 sugeridos viram CONFIRMED (.ds-tabs 3x, .ds-card-link 2x, .ds-btn-on-brand 2x) · 2 novos (.ds-toggle, .ds-btn-ghost-sm)
- v0.10 · 2026-05-20 · Atualizado após C.23 (loja) · 15 features · upgrades: .ds-status-dot 3x→4x · .ds-stepper-input 2x→3x · .ds-tabs 3x→4x · .ds-kv-list 2x→3x · .ds-btn-on-brand 2x→3x · 2 novos sugeridos (.ds-carousel, .ds-rating)
- v0.11 · 2026-05-20 · Atualizado após C.24 (chrome · app shell) · 16 features · upgrade único forte: .ds-icon-btn 9x→**10x** (+icon-btn topbar com 2 tamanhos · pico do DS) · `.ds-menu` + `.ds-menu-item` revalidados (user-menu) · 3 novos sugeridos: `.ds-notif-dot` (red 8×8 pulse), `.ds-nav-link` (vertical sidebar nav atom), `.ds-divider --vertical` (extender existing) · candidatos layout primitives `.ds-app-sidebar` + `.ds-app-topbar` (não atom · shell layout)
- v0.13 · 2026-05-20 · **Phase H BEGAN** · 1º atom criado: `.ds-icon-btn` (10x DUPES · TOP do audit · 2 shapes × 4 sizes × 5 tones + dot/badge slots em `ds/atoms/icon-btn.{css,md}`). Migration map em icon-btn.md mapeia 10 origins. Markup migration nos features (Phase H.21+) ainda pendente · 22 atoms restantes pra criar.
- v0.14 · 2026-05-20 · **H.2 done** · `.ds-table-grid` (8x DUPES · 2º maior) criado em `ds/atoms/table-grid.{css,md}`. CSS-grid table com `--ds-table-cols` custom prop · slot `.ds-table-grid-row-arrow` · 4 cell utilities · dense + empty variants · catalog 3 sub-componentes. Migration map cobre 9 origins (clients-tbl-head/row, orc-tbl-head/row, ped-tbl-head/row, admin-novidade-row, admin-artigo-row, client-row-arrow). 21 atoms restantes.
- v0.15 · 2026-05-20 · **H.3 done** · `.ds-icon-box` criado em `ds/atoms/icon-box.{css,md}`. Audit original dizia 7x — inspection revelou **14+ DUPES** (maior cluster real). Container decorativo (não-clicável · sibling de `.ds-icon-btn`) · 6 sizes × 3 shapes × 8 tones · custom props pra inner icon auto-size. Migration map cobre 14 origins (notif-icon, notif-drawer-icon, notif-drawer-empty-icon, ajuda-cat-icon, dash-kpi-icon, dash-hero-quick-ico, dash-hero-brand-logo, dash-activity-icon, dash-info-pill-icon, quick-act-icon, home-perk-icon, home-cat-icon, home-recent-head-icon, client-av). 20 atoms restantes.
- v0.23 · 2026-05-20 · **H.10 done** · `.ds-status-dot` criado em `ds/atoms/status-dot.{css,md}` (5 DUPES status + 4 separator origins · 9 total). 4 sizes × 7 tones × 3 effects + `.ds-dot-sep` variant. Tokens consumidos (`--green`, `--yellow`, `--color-feedback-error-strong`, `--color-tint-blue-strong`, `--color-text-muted`). 13 atoms restantes pra criar.
- v0.22 · 2026-05-20 · **H.9 done + EMOJI PURGE GLOBAL.** `.ds-section-head` criado (7+ DUPES) · 3 sizes × 3 style variants. **Rule oficial firmado: UI usa LUCIDE icons exclusivamente · único emoji permitido é `👋` em saudação ("Boa tarde, Gabriel 👋").** Catalog (13 emoji uses) + index.html (13 disallowed) limpos · todos substituídos por `<i data-lucide>` correspondentes. 14 atoms restantes.
- v0.21 · 2026-05-20 · **H.8 done + input-group canonical fix**. `.ds-toolbar` criado em `ds/atoms/toolbar.{css,md}` (5 DUPES · clients/orc/ped/mk/admin toolbars). Search input com auto-sized icon via `!important` (fix universal). **BONUS:** mesmo padrão aplicado em `ds/molecules/input-group.css` (icon-left + icon-right) — corrige overlap em auth login/reset · qualquer consumer da molecule. Root cause: lucide.createIcons substitui `<i>` por `<svg width=24>` que vence CSS sem !important. 15 atoms restantes.
- v0.20 · 2026-05-20 · **H.7 done** · `.ds-empty-state` criado em `ds/atoms/empty-state.{css,md}` (10+ DUPES · cart/notif/ov-items/premio/admin-artigo/admin-banner/client-tabs/cliente-search/ajuda-cat/novas empties). Vertical stack icon+title+desc+action · 4 sizes + inline layout. 16 atoms restantes.
- v0.19 · 2026-05-20 · **H.6 done** · `.ds-kpi` criado em `ds/atoms/kpi.{css,md}` (6 DUPES · dash-kpi v1+v3, home-kpi glass, client-kpi, calc-metric). 3 sizes × 2 tones × icon-right × clickable × grid container. 7 novos tokens glass adicionados (text-muted/soft/strong + success/error bg/fg) · 220 tokens total. Hero-gradient cleanup colateral pra usar tokens. 17 atoms restantes.
- v0.18 · 2026-05-20 · **H.5 done** · `.ds-hero-gradient` criado em `ds/atoms/hero-gradient.{css,md}` (7 DUPES · dash/auth/ajuda/admin/de-chat/help-modal/loja heroes). 4 gradient directions × 4 pad × 3 radius × decorated opt-in. Migrates admin-hero hardcoded #0d1d52/#1e2f6e → tokens (cleanup colateral). 18 atoms restantes.
- v0.17 · 2026-05-20 · **H.4 done + tokenization sweep complete.** `.ds-overlay` criado (7 DUPES · modal/cart/notif/novas/ped-resumo/de-chat/help backdrops) · 4 tints × 4 blur × 4 z-intent. **TOKENIZATION 100%:** 16 hardcoded rgba migrados pra 18 novos semantic tokens (`--color-overlay-*` 6 · `--color-glass-*` 6 · `--color-tint-*` 6 · `--shadow-dropdown/popover` 2). build-tokens.js extended pra suportar overlay/glass/tint sections. 209 tokens · 0 hardcoded rgba em atoms/molecules. 19 atoms restantes pra criar.
- v0.16 · 2026-05-20 · **Phase H.0 architecture pivot · fixes de regressões visuais documentados.** User reportou loja/monte-kit/dashboard com layouts quebrados após extrações C.10-C.25. Análise programática vs commit ref `b4f18c80` (12/05 · baseline pre-extração) identificou 4 bug categories: (1) 4 feature CSS com `@media` blocks abertos sem fechar · (2) cart drawer sem position:fixed + overlay · (3) hero responsive movido pra breakpoint errado · (4) ROOT CAUSE: `@layer features` wrapper rebaixava priority vs unlayered styles em index.html. **Fix:** removido `@layer features { }` de TODOS os 16 feature CSS · features voltam unlayered = cascade parity pre-extração. Arquitetura corrente (versão canônica): features unlayered · DS atoms/molecules/legacy em layers respectivos. Atoms H.1-H.3 já seguem essa arquitetura · próximos H.4+ idem. `ds/index.css` + `ds/README.md` cascade section atualizadas. NO new atoms confirmed nesta phase (fix-only) · 20 atoms restantes pra criar.
- v0.12 · 2026-05-20 · **Phase C completa após C.25 cleanup** (3 sub-phases · ALÉM dos 16 features formais): C.25a → `ds/legacy-compat.css` (155 linhas de force-radius/font-family band-aid extraídas pra `@layer legacy` self-declared) · C.25b → 280+ linhas de loja residue (store v1/v2 + product-card + filter-chip + qty-stepper + price-slider + catalog-header + cart-overlay + grid.list-view + empty-state + search-icon) append em `features/loja/loja.css` · C.25c → 365 linhas de home content (home-kpis + home-perks + home-showcase + home-categories + home-products-grid + home-recent rails) append em `features/dashboard/dashboard.css` · NO new atoms confirmed (cleanup-only) · **DUPES adicionais notadas pra Phase H**: `.home-prod-card` ↔ `.product-card` (3+ variantes), `.home-kpi` ↔ `.ds-kpi`, `.home-section-head` ↔ `.ds-section-head` 5x. Total index.html: 10589 → 9668 linhas (-921 / -8.7% absoluto · -35% acumulado desde C.10 inicial 14901)
