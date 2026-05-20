# DS · Status pills

> Source: [`pills.css`](./pills.css) · Catalog: [#pills](../catalog.html#pills)

## Quando usar

Indicador de status passivo · informa estado atual sem ser interativo. Listings, tabelas, headers de detalhe.

## Quando NÃO usar

- Ação clicável → use `.ds-btn` (ou `.ds-pill-warm`/`.ds-pill-cool` que são CTAs especiais)
- Tags livres pelo usuário (chips removíveis) → componente diferente · TODO
- Quantidade/badge numérico (notification count) → componente diferente · TODO

## Variants

| Class | Domínio | Status semântico |
|---|---|---|
| `.ds-pill .ds-pill-finalizado` | Pedidos/Orçamentos | Success (verde) |
| `.ds-pill .ds-pill-aprovado` | Orçamentos | Success (verde) |
| `.ds-pill .ds-pill-andamento` | Pedidos | Em andamento (azul) |
| `.ds-pill .ds-pill-pendente` | Orçamentos/Pedidos | Warning (amarelo) |
| `.ds-pill .ds-pill-cancelado` | Pedidos | Error (vermelho) |
| `.ds-pill .ds-pill-semcliente` | Orçamentos | Neutro (navy) — sem cliente associado |

## Dimensões

- Height fixo 22px
- Padding 0 10px
- Radius `--r-tag` (4px)
- Font 12px / 400

## Tokens consumidos

- `--color-feedback-success-bg` / `-fg`
- `--color-feedback-warning-bg` / `-fg`
- `--color-feedback-error-bg` / `-fg`
- `--color-status-andamento-bg` / `-fg`
- `--color-status-semcliente-bg` / `-fg`
- `--r-tag`

## Accessibility

- Pills são **passivos** (não clicáveis) · não precisam ser `<button>`
- Use `<span>` semântico
- Se o status é crítico (erro/cancelado), adicione `aria-label` mais descritivo se o texto visual for ambíguo:
  `<span class="ds-pill ds-pill-cancelado" aria-label="Pedido cancelado">Cancelado</span>`
- **Contraste WCAG AA atendido** em todas variants (audit em [a11y.md](../a11y.md)):
  - Success/Aprovado: 6.62:1 (green-800 on green-softer)
  - Pendente: 4.88:1
  - Cancelado: 5.30:1
  - Andamento: 7.49:1 (blue-700 on blue-100)
  - Sem cliente: 13.49:1

## Examples

```html
<!-- Em tabela -->
<tr>
  <td>Pedido #1234</td>
  <td><span class="ds-pill ds-pill-finalizado">Finalizado</span></td>
</tr>

<!-- Em listing -->
<div>
  <span class="ds-pill ds-pill-andamento">Em andamento</span>
  <span class="ds-pill ds-pill-pendente">Pendente</span>
</div>

<!-- Cancelado com aria-label explícito -->
<span class="ds-pill ds-pill-cancelado"
      aria-label="Pedido cancelado pelo cliente">
  Cancelado
</span>
```

## Related

- [Buttons](./buttons.md) — para CTAs (pílulas especiais warm/cool moram lá)
- Feedback tokens — `--color-feedback-*` semantic layer
