# Odex · Plataforma Solar · Design System

> v0.1.0 · 2026-05-20 · Owner: Gabriel Felix Barbosa

Design System da Plataforma Solar Odex. Source of truth para tokens, componentes e padrões visuais que devem ser idênticos entre código (browser) e design (Figma).

---

## Por que isso existe

A plataforma rodava como single-file `index.html` — ótimo pra iterar rápido, ruim pra:

1. Garantir consistência (mesmo botão em telas diferentes diverge sem alguém perceber)
2. Handoff Figma ↔ código (sem componentes formais, sync sempre vira retrabalho)
3. Onboarding de outros devs / designers
4. Trocar token (ex: cor da marca) sem caçar 50 lugares

Este DS resolve esses 4 pontos sem destruir a ergonomia do `index.html`. Tokens viram CSS variables linkadas; HTML continua abrindo no navegador com double-click.

---

## Status atual

| Fase | Escopo | Status |
|---|---|---|
| **A · Tokens** | Cores, radius, shadows, font family/sizes/weights, spacing, sizes | ✅ Pronto |
| **B · CSS atomic** | Mover `.ds-*` (botões, inputs, typography, fields) pra arquivos próprios | 🔜 Próximo |
| **C · Componentes contextuais** | Auth panel atoms, Monte Kit fields, listings | ⏳ |
| **D · Figma DS espelho** | Criar componentes 1:1 no `Design System [ODEX]` da file Figma | ⏳ |
| **E · Code Connect** | Mapear cada CSS class ↔ Figma component | ⏳ |
| **F · Icon library** | Subset lucide como component set no Figma | ⏳ |

---

## Estrutura

```
ds/
├── README.md                # este arquivo
└── tokens/
    ├── tokens.json          # ⭐ source of truth (style-dictionary)
    └── tokens.css           # export CSS · consumido por index.html
```

A medida que avançar pras fases B+, a estrutura cresce:

```
ds/
├── README.md
├── tokens/
├── atoms/                   # .ds-btn, .ds-input, .ds-select, .ds-textarea
├── molecules/               # .ds-field, .odex-select, .auth-input-wrap
├── icons/                   # SVG paths lucide subset
└── figma/                   # exports pra Tokens Studio / Variables Import
```

---

## Fluxo de tokens

```
                ┌────────────────────────┐
                │   tokens/tokens.json   │  ← SOURCE OF TRUTH
                │  (style-dictionary)    │
                └─────────────┬──────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
   ┌──────────────────┐            ┌──────────────────────┐
   │  tokens/tokens.css│            │  Figma Variables     │
   │   (CSS variables) │            │  (via Tokens Studio  │
   │                   │            │   ou Variables       │
   │  → index.html     │            │   Import 2 plugin)   │
   └──────────────────┘            └──────────────────────┘
```

**Hoje:** `tokens.css` é editado manualmente sincronizado com `tokens.json`. Se mudar um, mude o outro.

**Futuro (Phase A.2):** script `build-tokens.js` gera `tokens.css` a partir de `tokens.json` automaticamente.

---

## Como importar no Figma

### Opção 1 · Tokens Studio for Figma (recomendado)

1. Instale o plugin **Tokens Studio for Figma** ([figma.com/community](https://www.figma.com/community/plugin/843461159747178978))
2. No plugin: `Tools` → `Import` → cole o conteúdo de `tokens/tokens.json`
3. Click `Create Variables` → escolhe collection name (sugestão: `DS Odex`)
4. Pronto. Variáveis aparecem na file Figma e podem ser aplicadas em fills/text styles.

### Opção 2 · Variables Import 2

1. Plugin [Variables Import 2](https://www.figma.com/community/plugin/1256713532517819979)
2. Cole `tokens/tokens.json` no input
3. Click `Import` → gera coleção de Variables

### Opção 3 · Build script (futuro)

`pnpm run build-figma-tokens` vai gerar um JSON no formato exato da Figma REST API pra upload programático.

---

## Como consumir no código

### CSS

```html
<link rel="stylesheet" href="ds/tokens/tokens.css">
```

Depois usa as variáveis CSS normalmente:

```css
.my-button {
  background: var(--blue);
  color: var(--white);
  border-radius: var(--r-form);
  padding: 0 var(--space-18);
  height: var(--control-md);
  font: var(--fw-medium) var(--fs-14) var(--font);
  box-shadow: var(--shadow-sm);
}
```

### JS / JSON (futuro)

Quando virar `.npm` package:

```js
import { color, spacing, radius } from '@odex/ds-tokens';
console.log(color.brand.blue); // '#005AFF'
```

---

## Convenções

### Naming

- **Cores** seguem categoria-finalidade: `color.brand.navy`, `color.feedback.green`, `color.surface.bg`
- **Radius** seguem uso: `radius.form` (controls), `radius.card` (containers), `radius.pill` (especiais)
- **Spacing** seguem px (`space-4`, `space-8`, `space-16`...) — base 4px
- **Sizes** seguem t-shirt (`control-sm/md/lg`, `icon-xs/sm/md/lg/xl`)
- **Font sizes** seguem px (`fs-12`, `fs-14`, `fs-28`...)

### O que NÃO criar como token

- Cores one-off de animação ou estados muito específicos → usa rgba inline
- Valores únicos usados em UM lugar → não escala como token
- Cores temáticas de feature (ex: brand color do Prêmio Venda Direta) → vive na feature, não no DS

### Mudanças

Mudar token significa mudar visual em **toda a plataforma**. Sempre:
1. Discutir com UX antes
2. Atualizar `tokens.json` E `tokens.css` no mesmo commit
3. Revisar telas-chave (Dashboard, Login, Monte Kit, Loja, Orçamentos) antes de merge

---

## Referência rápida · Tokens

### Brand

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#0D1D52` | Sidebar, headings |
| `--blue` | `#005AFF` | CTAs primários, links |
| `--blue-button` | `#22437D` | Botão navy variant |

### Surface

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F9F9F9` | BG página |
| `--white` | `#FFFFFF` | Cards, inputs |
| `--line` | `#E6E6E6` | Borders |

### Feedback

| Token | Valor | Uso |
|---|---|---|
| `--green` | `#53C667` | Success |
| `--yellow` | `#F39200` | Warning |
| `--red` | `#E94647` | Error |

### Radius

| Token | Valor | Uso |
|---|---|---|
| `--r-form` | `4px` | Botões, inputs |
| `--r-card` | `12px` | Cards |
| `--r-card-lg` | `16px` | Modais |

### Control sizes

| Token | Valor | Uso |
|---|---|---|
| `--control-sm` | `32px` | `.ds-btn-sm` |
| `--control-md` | `42px` | `.ds-btn`, `.ds-input` |
| `--control-lg` | `48px` | `.ds-btn-lg`, `.auth-submit` |

---

## Roadmap

### Phase A · Tokens (atual)
- [x] Extrair CSS vars de `index.html` pra `ds/tokens/tokens.css`
- [x] Espelhar em `ds/tokens/tokens.json` (style-dictionary)
- [x] Documentar fluxo em `ds/README.md`
- [x] Link `tokens.css` em `index.html`
- [ ] Importar `tokens.json` no Figma como Variables (Phase D pré-requisito)

### Phase B · CSS Atomic
- [ ] Mover `.ds-*` (buttons, inputs, typography) pra `ds/atoms/*.css`
- [ ] Mover `.odex-select` pra `ds/molecules/`
- [ ] Auditar duplicações (`.auth-input-wrap` vs `.ds-input`)

### Phase C · Componentes contextuais
- [ ] Promover `.auth-spark`, `.auth-brand-signature` ao DS canônico se reutilizáveis
- [ ] Documentar `.mk-v3-*`, `.ov-*`, etc — manter feature-scoped vs promover

### Phase D · Figma DS espelho
- [ ] Importar tokens via Tokens Studio
- [ ] Criar component sets: Button, Input, Select, Field, Checkbox, Spark
- [ ] Variants conforme CSS variants

### Phase E · Code Connect
- [ ] `figma-code-connect` por componente
- [ ] CI valida sync

### Phase F · Lucide icon library
- [ ] Subset usado: ~30 ícones
- [ ] Component set "Icon" no Figma com all variants
- [ ] Code Connect: `<i data-lucide="user">` ↔ `Icon/user`

---

## Versionamento

`v0.1.0` = Phase A. Próxima minor (`v0.2.0`) ao concluir Phase B.

Breaking changes em tokens = major bump. Aditivos = minor. Fixes/docs = patch.
