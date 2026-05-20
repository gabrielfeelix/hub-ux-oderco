# Feature · Monte Seu Kit

> Source: [`monte-kit.css`](./monte-kit.css)
> Telas: `#monte-kit` + variants (`#monte-kit-paineis`, `-inversores`, `-stringbox`, `-estrutura`, `-acessorios`, `-resumo`, `-bateria`, `-bess`, `-eletroposto`)
> Layer: `@layer features`
> **Maior feature da plataforma** · ~413 decls · 936 linhas

## Propósito

Kit builder multi-step pra tipos de projeto solar (Fotovoltaico, Híbrido com Bateria, BESS, Eletroposto). Cada tipo tem fluxo próprio de steps (painéis, inversores, string box, estrutura, acessórios, resumo). Form inicial com dados do cliente, escolha de tipo, modo de simulação (potência/consumo).

## Estrutura

### Layout base
- `.mk-page` (1240w) · `.mk-grid` (main + sidebar 380)
- `.mk-form-grid` step 0 (2 cols com gap 48)

### Components principais

| Class | Função |
|---|---|
| `.mk-form-card` / `.mk-card` | Cards principais com shadow-card |
| `.mk-card-title` | Title das seções |
| `.mk-field` / `.mk-field-row` | Form fields stacked + 2-col |
| `.mk-label` (+`.opt`, `.req`) | Labels com modifiers |
| `.mk-input` / `.mk-select` | Inputs 40h |
| `.mk-radio-row` / `.mk-radio` | Radio buttons custom (% / R$) |
| `.mk-help-card` / `.mk-help-video` | Card video YouTube embed |
| `.mk-help-play-btn` | YouTube play button vermelho |
| `.mk-actions` / `.mk-btn` + `-primary/-secondary` | Footer Voltar/Continuar |
| `.mk-stepper` / `.mk-step` / `.mk-step-dot` | Wizard nav horizontal |

### Step selecionar tipo

| Class | Função |
|---|---|
| `.mk-tipo-grid` | Grid 2×2 cards tipo |
| `.mk-tipo-card` | Card selecionável (fotovoltaico/hibrido/bess/eletroposto) |
| `.mk-tipo-card.is-selected` | Estado ativo (border blue + bg blue-50) |
| `.mk-tipo-icon` | Ícone hero do tipo |

### Picker (painéis/inversores/etc)

| Class | Função |
|---|---|
| `.mk-picker-head` | Header c/ title + search + filter + sort |
| `.mk-picker-search` | Search input inline |
| `.mk-toolbar` / `.mk-filter` / `.mk-sort` | Toolbar filtros |
| `.mk-prod-card` | Card produto (selecionável) |
| `.mk-prod-card:hover` / `.mk-prod-card.is-selected` | States |
| `.mk-prod-img` / `.mk-prod-info` / `.mk-prod-actions` | Sub-parts |
| `.mk-marca-card` | Card filtro por marca |
| `.mk-qty-stepper` | Stepper +/- pra qty |

### Resumo (sidebar)

| Class | Função |
|---|---|
| `.mk-resumo` | Container sidebar sticky |
| `.mk-resumo-card` | Card resumo |
| `.mk-resumo-row` | Linha kv |
| `.mk-resumo-itens` | Lista items selecionados |
| `.mk-sel-list` / `.mk-sel-item` | Items selecionados na main |
| `.mk-econ-*` / `.mk-payback-*` | Cálculos econômicos/payback |

### Variant v3 (.mk-v3-*)

Form fields override v3 · novos estilos pra inputs/selects:

| Class | Função |
|---|---|
| `.mk-v3-field` | Field container override |
| `.mk-v3-input` | Input v3 (override `.mk-input`) |
| `.mk-v3-select` | Select v3 |
| `.mk-v3-ds-select` | Variant usando `.odex-select` (DS molecule ✅) |
| `.mk-v3-radio` | Radio v3 |

### Tipos específicos

| Prefix | Domínio |
|---|---|
| `.mk-bess-*` | BESS (Battery Energy Storage System) |
| `.mk-eletro-*` | Eletroposto (carregador) |
| `.mk-bateria-*` | Bateria híbrido |
| `.mk-mode-tabs` / `.mk-mode-tab` | Toggle modo potência vs consumo |

### Help tips

| Class | Função |
|---|---|
| `.mk-help-tips` | UL com tips contextuais |
| `.mk-help-tips li strong` | Highlight em ink |

## 📋 Divergence audit (Phase H · TODO consolidar com DS)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.mk-toolbar` / `.ped-toolbar` / `.orc-toolbar` | Mesmo pattern → `.ds-toolbar` molecule | DUPE 3x cross-feature |
| `.mk-tipo-card` / `.mk-prod-card` / `.mk-marca-card` | Selection card pattern → `.ds-card-selectable` (novo) | DUPE intra-feature 3x |
| `.mk-step` / `.mk-stepper` / `.auth-step-indicator` | Wizard pattern → `.ds-stepper` (novo) | DUPE cross-feature |
| `.mk-card` / `.mk-form-card` / `.mk-help-card` / `.mk-resumo-card` | `.ds-card` ✅ existe | DUPE 4x |
| `.mk-card-title` | `.ds-h3` ou variant typography | Match |
| `.mk-btn` + variants | `.ds-btn` ✅ | DUPE direto |
| `.mk-btn-primary` | `.ds-btn .ds-btn-primary` | Match (height 46 vs 42) |
| `.mk-btn-secondary` | `.ds-btn .ds-btn-secondary` | Near-match |
| `.mk-input` | `.ds-input` ✅ (height 40 vs 42 diff) | Near-dupe |
| `.mk-select` | `.ds-select` ✅ | DUPE |
| `.mk-field` | `.ds-field` ✅ | DUPE |
| `.mk-label` | `.ds-field-label` ✅ | DUPE |
| `.mk-radio` | `.ds-check input[type=radio]` ✅ | DUPE |
| `.mk-v3-ds-select` | Já usa `.odex-select` ✅ | OK |
| `.mk-resumo-row` | DUPE de `.resumo-kv` (pedidos) → futuro `.ds-kv-list` | DUPE cross-feature |
| `.mk-mode-tabs` / `.mk-mode-tab` | Tab pattern → `.ds-tabs` (novo) | New molecule |
| `.mk-qty-stepper` | DUPE de `.cart-qty` → `.ds-stepper-input` (novo) | DUPE |
| `.mk-help-tips` | List pattern · candidato `.ds-tips` | Pattern |
| `.mk-help-video` / `.mk-help-play-btn` | Custom YouTube embed | **Manter** (specific) |
| `.mk-bess-*` / `.mk-eletro-*` | Domain-specific | **Manter** |
| `.mk-payback-*` / `.mk-econ-*` | Domain-specific cálculo · cross-feature com calc | DUPE potencial com calculadora |

**Estimativa migration:** ~70% migrável. Custom restantes:
- YouTube help video card (.mk-help-*)
- Domain-specific (bess/eletro/payback/econ)
- Stepper wizard (vira molecule generic)
- Tipo cards (selection com ícone hero)

## Novos DS molecules sugeridos (Phase H)

A partir do mk + outros features:
- `.ds-stepper` (wizard nav) — usa em mk + cadastro
- `.ds-card-selectable` (radio card visual) — mk tipos/prods + ck radio-opt
- `.ds-tabs` (mode tabs) — mk modo + potencial outros
- `.ds-stepper-input` (qty +/-) — mk + cart-qty
- `.ds-toolbar` (filter+search+sort header) — mk + ped + orc
- `.ds-kv-list` (key-value rows) — mk-resumo + ped-resumo
- `.ds-tips` (help tips list) — mk + outros

## Tokens

Maioria primitivos hardcoded. Phase H migra junto.

## Responsive

`@media(max-width:1100px)` interna no fim do arquivo · grid e resumo viram 1col.

## Related

- [Calculadora](../calculadora/README.md) — payback calculations (future C.x extraction)
- [Orçamentos](../orcamentos/README.md) — gerado a partir de monte-kit
- [DS atoms](../../ds/) — DUPES massivos a consolidar Phase H
