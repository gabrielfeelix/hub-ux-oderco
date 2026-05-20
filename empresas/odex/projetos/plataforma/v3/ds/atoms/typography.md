# DS · Typography

> Source: [`typography.css`](./typography.css) · Catalog: [#typography](../catalog.html#typography)

## Quando usar

Headings de página/seção, body text, labels e placeholders padrão da plataforma. Sempre que precisar de hierarquia tipográfica consistente.

## Quando NÃO usar

- Texto dentro de componentes maiores que já têm tipografia própria (auth-form-title, ov-item-name) — esses são feature-scoped
- Microcopy contextual que precisa de tamanho/peso fora da escala — defina classe própria na feature

## Escala oficial

| Class | Size / Weight / LH | Uso típico |
|---|---|---|
| `.ds-h1` | 700 64/1 | Hero, landing — raro no app interno |
| `.ds-h2` | 700 38/1.05 | Headings de seção principal |
| `.ds-h3` | 700 24/1.2 | Sub-headings, card titles grandes |
| `.ds-p-bold` | 700 16/1.4 | Destaque dentro de body |
| `.ds-p2` | 400 16/1.5 | Body grande (configurações, formulários) |
| `.ds-p` | 400 14/1.5 | Body padrão |
| `.ds-p3` | 400 12/1.5 | Captions, meta, timestamps |
| `.ds-label` | 400 14/1 navy | Labels de campo (usar com `.ds-field-label` quando possível) |
| `.ds-placeholder` | inherit + color muted | Placeholder de input fora de `<input>` |

## Tokens consumidos

- `--font` · família Inter
- `--color-text-default` · cor padrão (ink)
- `--color-text-label` · cor navy para labels
- `--color-text-placeholder` · cor de placeholder

## Accessibility

- Tamanhos seguem escala 4px (12, 14, 16, 24, 38, 64) — proporção visual coerente
- Line-height generoso em body (1.5) garante leitura confortável
- Contraste WCAG AA atendido com `--color-text-default` sobre `--color-surface-page`
- **Não use `font-size: 11px ou menor`** — falha contraste em low-DPI

## Examples

```html
<h2 class="ds-h2">Orçamentos do mês</h2>
<p class="ds-p">Total de 14 orçamentos aprovados.</p>
<p class="ds-p3">Atualizado há 3 minutos</p>
```

## Related

- [Fields](./fields.md) — `.ds-field-label` usa typography
- [Buttons](./buttons.md) — não herda typography, define própria
