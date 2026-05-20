# Feature · Orçamentos

> Source: [`orcamentos.css`](./orcamentos.css)
> Telas: Lista (`#orcamentos`) · Detail v1 (`#orcamento-ver-N`) · Form novo orçamento (`#orcamento`)
> Layer: `@layer features`

## Propósito

Gestão de orçamentos · listagem com filtros + tabela, página de detalhe (legacy v1) com sidebar resumo + items, e form v2 (.ov-*) com brandbar do doc.

## Componentes principais

### Listagem (.orc-*)

| Class | Função |
|---|---|
| `.orc-toolbar` | Toolbar com search + filter + add |
| `.orc-srch` / `.orc-srch-icon` | Search input 42h c/ ícone left |
| `.orc-filter-btn` | Botão filtrar 42h outline |
| `.orc-add-btn` | CTA "+ Novo orçamento" 42h blue |
| `.orc-meta-bar` / `.orc-meta-stats` | Strip de stats + help link |
| `.orc-list-card` | Container tabela |
| `.orc-tbl-head` / `.orc-tbl-row` | Tabela grid 7-cols |
| `.orc-status-pill` + variants | Pílulas status (semcliente/expirado/pendente/aprovado/cancelado) |
| `.orc-action-link` | Link "ver" em row |
| `.orc-list-foot` | Paginação footer |
| `.pg-btn` | Botão paginação 32×32 |

### Detail v1 (.orc-*)

| Class | Função |
|---|---|
| `.orc-detail-wrap` | Container 1080w |
| `.orc-back` | Link voltar |
| `.orc-detail-title` / `.orc-detail-sub` | Title 24px + sub 13px |
| `.orc-alert` | Banner amarelo info |
| `.orc-detail-grid` | Grid main + sidebar 360 |
| `.orc-detail-right` | Sticky top 80 |
| `.orc-section-card` | Card de seção |
| `.orc-item-row` / `.orc-item-img` / `.orc-item-name` | Items list |
| `.orc-price-row` / `.orc-price-total` | Linhas de preço |
| `.orc-premia` | Banner Prêmio Venda Direta |
| `.orc-submit-btn` | CTA salvar 46h |
| `.orc-print-link` | Link imprimir |

### Detail v2 / Form (.ov-*)

| Class | Função |
|---|---|
| `.ov-page` | Container 1320w |
| `.ov-header` + `-with-actions` | Header com title + ações |
| `.ov-print-btn` / `.ov-share-btn` / `.ov-whats-btn` | Ações 42h outline + variant green WhatsApp |
| `.ov-title` / `.ov-sub` | Title 24 + sub |
| `.ov-alert` | Banner amarelo info |
| `.ov-grid` | Grid main + sidebar 380 |
| `.ov-section` / `.ov-section-head` | Card de seção c/ header underlined |
| `.ov-input` | Input 42h |
| `.ov-grid-2` / `.ov-grid-3-1` | Grids responsive |
| `.ov-whats-modal-icon` / `.ov-whats-preview*` | Modal de envio WhatsApp |

### Brandbar (logo no doc)

| Class | Função |
|---|---|
| `.orc-doc-brandbar` | Strip horizontal logo + cliente info |
| `.orc-doc-brandbar-logo` | Quadrado 54×54 logo |
| `.orc-doc-brandbar-info` | Texto cliente |
| `.orc-doc-brandbar-cta` | Botão "Trocar logo" |

## 📋 Divergence audit (Phase H · TODO consolidar com DS)

Classes que duplicam ou se aproximam de DS atoms/molecules existentes:

| Feature class | DS equivalent (próximo) | Diff real |
|---|---|---|
| `.orc-submit-btn` (46h, blue, 14px, radius card) | `.ds-btn-primary .ds-btn-lg` (48h, 16px) | Diff: 46 vs 48h · 14 vs 16px · radius card vs form |
| `.orc-filter-btn` (42h, outline neutro) | `.ds-btn .ds-btn-ghost` (42h ✅) | Match · pode trocar direto |
| `.orc-add-btn` (42h, blue, 13px bold) | `.ds-btn .ds-btn-primary` (42h) | Match com font-size diff |
| `.ov-print-btn` / `.ov-share-btn` (42h outline) | `.ds-btn .ds-btn-ghost` | Match |
| `.ov-whats-btn` (green) | Não tem variant green no DS | **Manter** ou criar `.ds-btn-success` |
| `.orc-srch` (42h, icon left) | `.ds-input-group` com `.ds-input-group-icon` | Match estrutural |
| `.orc-back` (link c/ icon, muted hover blue) | Variação de `.ds-link` ou `.auth-back` | Consolidar em `.ds-link-back` futuro |
| `.orc-alert` / `.ov-alert` (banner amarelo) | Não existe atom de banner ainda | **Criar `.ds-alert-warning`** |
| `.orc-section-card` / `.ov-section` | `.ds-card .ds-card-lg` | Match |
| `.orc-status-pill` + variants | `.ds-pill` + status variants ✅ JÁ EXISTE | **DUPE direto** · trocar markup pra usar `.ds-pill` |
| `.orc-s-semcliente/-expirado/-pendente/-aprovado/-cancelado` | `.ds-pill-semcliente/-cancelado/-pendente/-aprovado/-cancelado` ✅ | **DUPE direto** |
| `.orc-premia` / `.premia-row` (checkout) | DUPE entre 2 features | Promover pra `.ds-alert-warm` molecule |
| `.ov-input` | `.ds-input` ✅ | DUPE direto |
| `.pg-btn` | Não existe paginação atom | **Criar `.ds-page-btn`** ou usar `.ds-btn-sm` ghost |

**Estimativa migration:** ~80% dos botões/inputs/pílulas viram DS atoms. Restam apenas:
- `.ov-whats-btn` (cor verde · provavelmente vira variant DS)
- `.orc-doc-brandbar-*` (componente específico)
- `.ov-whats-modal-*` (modal específico)
- Algumas medidas customizadas (46h vs 48h) — decidir se ajustar pra DS ou manter

## Tokens consumidos

Maioria primitivos hardcoded (`#0046cc`, `#FCDFB3`, `#1c7a36`, etc). Phase H também migrará pra semantic.

## Responsive

@media queries pra orc estão atualmente compartilhadas com ped em index.html (não extraídas). Phase H verifica se migra junto.

## Related

- [DS atoms · pills](../../ds/atoms/pills.md) — status pills DUPES
- [DS atoms · cards](../../ds/atoms/cards.md) — section cards
- [DS molecules · input-group](../../ds/molecules/input-group.md) — search inputs
- [Checkout feature](../checkout/README.md) — `.premia-row` é DUPE de `.orc-premia`
