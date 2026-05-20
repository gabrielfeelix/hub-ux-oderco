# Feature · Auth

> Source: [`auth.css`](./auth.css)
> Telas: Login (`#login`), Cadastro (`#cadastro`, 2 steps), Redefinir senha (`#redefinir`)
> Layer: `@layer features`

## Propósito

Layout full-screen das telas de autenticação. Painel brand à esquerda (gradient navy + spark + título + signature contextual) + form à direita (max-w 420px).

## Estrutura visual

```
┌──────────────────── auth-shell (1180×680) ─────────────────┐
│                                                            │
│ ┌─ auth-brand (619 wide) ─┐ ┌─ auth-form (561 wide) ────┐ │
│ │ gradient navy-blue      │ │ ← Voltar à plataforma     │ │
│ │                         │ │                            │ │
│ │  ☀ spark                │ │ Bem-vindo de volta        │ │
│ │                         │ │ Entre com email ou CNPJ   │ │
│ │  A plataforma que       │ │                            │ │
│ │  vende solar com você.  │ │ ┌─ auth-input-wrap ──┐    │ │
│ │                         │ │ │ 👤 input            │    │ │
│ │  Catálogo, kit, ...     │ │ └────────────────────┘    │ │
│ │                         │ │ ...                        │ │
│ │  ✓ Catálogo Tier 1      │ │                            │ │
│ │  ✓ Kit em 6 etapas      │ │ [Entrar na plataforma →]   │ │
│ │  ✓ Proposta WhatsApp    │ │                            │ │
│ └─────────────────────────┘ │ ── Ainda não possui? ──    │ │
│                             │ [💼 Quero ser integrador]   │ │
│                             └────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

## Componentes principais

| Class | Função |
|---|---|
| `.auth-shell` | Container grid 1180×680 centralizado · drop-shadow + radius 24 |
| `.auth-brand` | Painel esquerdo gradient (navy → blue-button → blue) + decorações radiais |
| `.auth-spark` | Quadrado 54×54 c/ ícone hero (sun, zap, key-round dependendo da variant) |
| `.auth-brand-title` | Título grande clamp(28, 3.3vw, 44) |
| `.auth-brand-sub` | Sub-título 15px |
| `.auth-brand-signature` | Lista de 3 microcopy items contextuais no rodapé do painel |
| `.auth-form` | Painel direito · centra `.auth-form-card` max 420 |
| `.auth-topline` | Linha topo do form · "← Voltar" + logo |
| `.auth-back` | Link voltar (subtle, navy hover) |
| `.auth-form-title` | h2 do form (28px Bold navy) |
| `.auth-form-sub` | Descrição (14px muted) |
| `.auth-field` | Wrapper de campo · margin-bottom 18 |
| `.auth-input-wrap` | **Input-group** com ícone left + reveal right · 44h / 15px / focus ring |
| `.auth-input-icon` | Ícone à esquerda (absoluto · 14px from left) |
| `.auth-input-reveal` | Botão olho (mostrar/ocultar senha) à direita |
| `.auth-link` | Link microcopy 13px sem underline · "Esqueci minha senha" |
| `.auth-submit` | CTA 48h blue + box-shadow + hover translateY |
| `.auth-divider` | "── Ainda não possui cadastro? ──" |
| `.auth-secondary` | Botão outline secundário 46h |
| `.auth-step-indicator` | Indicador de passo (Passo X de N + progresso) |
| `.auth-progress` / `-fill` | Barra de progresso 120×6 gradient navy→blue |
| `.auth-grid-2` | Grid 2-col gap 14 (campos lado-a-lado) |
| `.auth-section` | Bloco navy claro com title (dados representante legal) |
| `.auth-check` | Checkbox de termos · top-align multi-line · usa input nativo (não .ds-check) |
| `.auth-actions` | Linha de botões justify-end |

## Page chrome

```css
body.is-auth #view-login,
body.is-auth #view-cadastro,
body.is-auth #view-redefinir { ... }
```

Quando body tem `.is-auth`, esconde sidebar/topbar e renderiza fullscreen com bg radial decorativo (azul + amber).

## Variants por rota

`_authBrand(variant)` em `index.html` swappa título/sub/spark/signature baseado em `#login` / `#cadastro` / `#redefinir`. CSS é o mesmo · só o conteúdo muda.

| Variant | Spark | Título | Sig (3 items) |
|---|---|---|---|
| login | sun-medium | A plataforma que vende solar com você. | Catálogo Tier 1 · Kit em 6 etapas · Proposta no WhatsApp |
| cadastro | zap | Torne-se um parceiro Odex. | Aprovação ágil · Sem taxa adesão · Suporte humano |
| redefinir | key-round | Recuperar acesso é simples. | Link expira em 30min · Só você recebe · Sem ligar suporte |

## Tokens consumidos (semantic)

Quase tudo via `--color-*` semantic + `--motion-*`. Cores brand (navy/blue) e rgba whites do panel (decoração) usam primitivas direto · não há semantic adequado pra "rgba sobre brand bg".

## Responsive

- `@media (max-width: 960px)` — shell vira 1 coluna · brand panel acima do form
- `@media (max-width: 600px)` — shell perde radius, vira fullscreen · signature esconde · grid-2 vira 1 col

## TODOs

- **Phase C.9** — Promover `.auth-input-wrap` paradigm pra `.ds-input-group` (DS molecule reutilizável)
- ✅ Phase C.8 done — focus visible em todas variants (.auth-back, .auth-submit, .auth-secondary, .auth-link)
- Consolidar `.auth-check` vs `.ds-check` (mantido auth-check pelo top-align multi-line)

## Related

- [DS atoms · buttons](../../ds/atoms/buttons.md) — `.auth-submit` é variant maior do primary
- [DS atoms · checkbox](../../ds/atoms/checkbox.md) — `.auth-check` é variant top-align
- [DS molecules · select](../../ds/molecules/select.md) — usado em "Como conheceu" / "Vendedor" via `.ds-replace`
