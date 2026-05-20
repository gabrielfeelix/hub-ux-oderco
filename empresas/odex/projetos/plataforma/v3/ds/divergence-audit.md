# DS · Divergence Audit (Phase H prep)

> v0.1 · 2026-05-20 · Auto-atualizado a cada feature extraction (C.10+)

Inventário consolidado de **classes duplicadas** entre features + **novos DS atoms/molecules** propostos pra Phase H consolidação.

Source: agregação dos `features/*/README.md` · seção "Divergence audit" de cada feature já extraída.

---

## Status geral

| Métrica | Valor |
|---|---|
| Features extraídas (C.10-C.16) | 8 (auth, checkout, orcamentos, pedidos, monte-kit, clientes, calculadora, ajuda) |
| Features restantes (C.17+) | ~8 (dash, pv, novas, dé, notif, admin, loja, chrome) |
| **DS atoms/molecules confirmados** (≥2 features DUPE) | **17** |
| Possíveis novos (sugeridos · ≥1 feature) | 5 |

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
