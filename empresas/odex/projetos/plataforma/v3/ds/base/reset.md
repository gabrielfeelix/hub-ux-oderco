# DS · Base / Reset

> Source: [`reset.css`](./reset.css)

## Propósito

Foundational layer. Define defaults dos elementos HTML nativos pra dar consistência cross-browser ANTES de qualquer estilo atomic/molecule/feature.

## Layer

Carregado em `@layer reset` · **menor prioridade** de toda a cascade. Qualquer estilo posterior sobrescreve.

## O que faz

- `* { box-sizing: border-box }` — width/height incluem padding+border (sane default)
- `body` — margin: 0, font-family `--font`, font-size `--fs-14`, line-height `--lh-loose`, bg `--color-surface-page`, color `--color-text-default`, font-smoothing antialiased
- `body.no-scroll` — `overflow: hidden` (usado em modais)
- `a` — sem underline, color inherit
- `button, input, select, textarea` — font inherit, outline none, font-family explícito (Safari/iOS bug)
- `button` — border: 0, cursor: pointer

## Quando re-import

Nunca direto. Carregado automaticamente via `ds/index.css`.

## Não cabe aqui

- Tipografia escala (`.ds-h1` etc) → mora em `atoms/typography.css`
- Component styles → mora em atoms/molecules/features

Reset é só os defaults de elemento HTML.
