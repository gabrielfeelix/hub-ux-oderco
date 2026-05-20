# `.ds-kv-list` (atom)

> Source: [`kv-list.css`](./kv-list.css)
> Phase H.13 · consolida **3 DUPES** (pdp-meta-grid, pdp-price-breakdown, ped-resumo-kv).

## API

```html
<dl class="ds-kv-list" style="--ds-kv-cols: 2;">
  <div><span class="ds-kv-list-key">Potência</span><strong class="ds-kv-list-val">580W</strong></div>
  <div><span class="ds-kv-list-key">Eficiência</span><strong class="ds-kv-list-val">22,5%</strong></div>
  <div><span class="ds-kv-list-key">Bifacial</span><strong class="ds-kv-list-val">Sim</strong></div>
  <div><span class="ds-kv-list-key">Tier</span><strong class="ds-kv-list-val">1</strong></div>
</dl>
```

## Variants

- Cols via `--ds-kv-cols` custom prop (default 2)
- Sizes: `.ds-kv-list-sm` / default / `.ds-kv-list-lg`
- Style: (default · borders top+bottom) / `.ds-kv-list-flush` (no border) / `.ds-kv-list-dashed` (dashed top) / `.ds-kv-list-stacked` (label em cima)

## Migration map (Phase H.13)

| Origin | Replace with |
|---|---|
| `.pdp-meta-grid` (2-col KV) | `.ds-kv-list` (default) |
| `.pdp-meta-grid > div` / `span` / `strong` | `.ds-kv-list-row` / `.ds-kv-list-key` / `.ds-kv-list-val` |
| `.pdp-price-breakdown` (dashed) | `.ds-kv-list .ds-kv-list-dashed` |
| `.ped-resumo-kv` patterns | `.ds-kv-list .ds-kv-list-flush` |
