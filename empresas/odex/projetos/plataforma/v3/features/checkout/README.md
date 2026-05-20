# Feature · Checkout

> Source: [`checkout.css`](./checkout.css)
> Telas: Cart drawer (lateral, qualquer página) · Checkout page (`#checkout`)
> Layer: `@layer features`

## Propósito

Carrinho lateral (drawer) que abre em qualquer tela da loja + página de checkout review com form de entrega/pagamento e sidebar sticky com resumo do pedido.

## Estrutura visual

### Cart drawer (lateral)

```
┌─ .cart (400 wide) ─────────────────────────────┐
│ ┌─ .cart-head ──────────────────────────────┐ │
│ │ Carrinho   [.cart-count-tag]   [×]        │ │
│ └────────────────────────────────────────────┘ │
│ ┌─ .cart-body (scroll) ─────────────────────┐ │
│ │  .cart-item                                │ │
│ │  ├ .cart-item-img                          │ │
│ │  └ .cart-item-content                      │ │
│ │     ├ .cart-item-name                      │ │
│ │     ├ .cart-item-price                     │ │
│ │     └ .cart-item-controls                  │ │
│ │        ├ .cart-qty (−/+ stepper)           │ │
│ │        └ .cart-remove-btn                  │ │
│ │  ...                                       │ │
│ └────────────────────────────────────────────┘ │
│ ┌─ .cart-foot ──────────────────────────────┐ │
│ │  .cart-total-row · Subtotal   R$ 4.890     │ │
│ │  .cart-total-row · Frete      Grátis       │ │
│ │  .cart-grand-total · Total    R$ 4.890     │ │
│ │  [.cart-checkout-btn]                      │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

Estado vazio: `.cart-empty` com ícone, h3 e p.

### Checkout page

```
┌─ .checkout-page (max 1100) ───────────────────────────────┐
│ ┌─ .ckform-stack (1fr) ─┐ ┌─ .cksummary-card (380 · sticky)─┐│
│ │ ┌─ .ckform-card ───┐ │ │  Resumo do pedido               │ │
│ │ │ .ckform-section- │ │ │  ┌─ .cksummary-items ──────────┐│ │
│ │ │ title            │ │ │  │ .ckitem × N                  ││ │
│ │ │ ── ENDEREÇO ──── │ │ │  └──────────────────────────────┘│ │
│ │ │  .ckform-group   │ │ │  .ckprice-rows                   │ │
│ │ │  ├ label         │ │ │  ├ .ckprice-row (subtotal)       │ │
│ │ │  └ .ckform-input │ │ │  ├ .ckprice-row (frete)          │ │
│ │ │  ...             │ │ │  └ .ckprice-total                │ │
│ │ │  .ck-grid-2/-3   │ │ │  ┌─ .premia-row ───────────────┐ │ │
│ │ └──────────────────┘ │ │  │ Prêmio Venda Direta R$ XX    │ │ │
│ │ ┌─ .ckform-card ───┐ │ │  └──────────────────────────────┘ │ │
│ │ │ ── PAGAMENTO ─── │ │ │  [.ck-submit-btn]                 │ │
│ │ │ .radio-group     │ │ │  [.ck-back-btn]                   │ │
│ │ │  └ .radio-opt × N│ │ │                                   │ │
│ │ └──────────────────┘ │ │                                   │ │
│ └──────────────────────┘ └───────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## Componentes principais

### Cart drawer

| Class | Função |
|---|---|
| `.cart` | Container 400w · bg branco · shadow esquerda |
| `.cart-head` | Header com título + count tag + close |
| `.cart-close` | Botão circular 28×28 fechar |
| `.cart-count-tag` | Tag "N items" |
| `.cart-body` | Lista scroll de items · gap 12 |
| `.cart-item` | Card de item · 64px img + content + controls |
| `.cart-qty` | Stepper −/+ inline · 28h |
| `.cart-remove-btn` | Link "remover" em vermelho |
| `.cart-foot` | Footer com totais e CTA |
| `.cart-total-row` | Linha subtotal/frete/etc · muted |
| `.cart-grand-total` | Total destacado · border-top |
| `.cart-checkout-btn` | CTA "Finalizar" · 44h blue |
| `.cart-empty` | Estado vazio · icon + h3 + p |

### Checkout page

| Class | Função |
|---|---|
| `.checkout-page` | Grid 1100w · main + sidebar 380 |
| `.ckform-stack` | Coluna principal · cards empilhados gap 20 |
| `.ckform-card` | Card individual com padding 28 (usa `.ds-card`) |
| `.ckform-section-title` | Header de seção · uppercase 11px + linha |
| `.ckform-group` | Label + input/textarea · gap 6 |
| `.ckform-label` | Label · 14px navy (+ `.req` red marker) |
| `.ckform-input` | Input 42h · usa --line border + focus blue |
| `.ckform-textarea` | Textarea min 90h · resize vertical |
| `.radio-group` | Linha de radios distribuídos flex 1 |
| `.radio-opt` | Radio visual destacado · `.checked` vira blue + bg blue-50 |
| `.ck-grid` | Grid base · gap 14 |
| `.ck-grid-2` | 2 cols equal |
| `.ck-grid-3` | 3 cols 2fr 1fr 80px (rua + número + complemento small) |
| `.ck-grid-city` | 2 cols 1fr 100px (cidade + UF) |
| `.cksummary-card` | Sidebar sticky top 80 |
| `.cksummary-title` | "Resumo do pedido" 15px bold |
| `.cksummary-items` | Container items · border + radius card |
| `.ckitem` | Item no resumo · img 52 + name + price |
| `.ckprice-rows` | Linhas de preço (subtotal, frete) |
| `.ckprice-row` | 13px muted · padding 4 |
| `.ckprice-total` | Total · 17px bold |
| `.ck-submit-btn` | CTA "Finalizar pedido" · 48h blue |
| `.ck-back-btn` | "Voltar pra loja" · 40h outline |
| `.premia-row` | Banner amarelo · "Prêmio Venda Direta" |

## Tokens consumidos

Maioria primitivas hoje (`--blue`, `--ink`, `--line`, etc) por extração lossless. **TODO Phase futura:** migrar pra semantic (`--color-action-primary-bg`, `--color-text-default`, `--color-border-default`, etc) como atoms/molecules.

Já usa motion tokens (`var(--motion-fast)`, `var(--motion-default)`).

## Page chrome

Não tem · cart drawer flutua sobre qualquer tela, checkout page renderiza dentro do main layout normal.

## TODOs

- Migrar primitivas pra semantic tokens (`--color-*`)
- `.radio-opt` pode virar variant de `.ds-check` no DS (radio com layout pílula)
- `.ckform-input` paradigm já é coberto por `.ds-input` · futuramente substituir
- `.cart-qty` stepper pode virar molecule (`.ds-stepper`) reutilizável

## Related

- [DS atoms · cards](../../ds/atoms/cards.md) — `.ckform-card` usa `.ds-card`
- [DS atoms · inputs](../../ds/atoms/inputs.md) — `.ckform-input` semelhante a `.ds-input`
- [DS atoms · buttons](../../ds/atoms/buttons.md) — CTAs podem futuramente trocar por `.ds-btn-primary`
