# Feature · Dé Chat (Assistente IA)

> Source: [`de-chat.css`](./de-chat.css)
> Triggered: CTA "Converse com a Dé" no Help Modal · ou FAB direto
> Layer: `@layer features`

## Propósito

Assistente IA conversacional · drawer floating bottom-right 440w · mostra mensagens com avatares (Dé bot + user), suggestions chips, typing indicator, quick chips, cart inline mini-cards, footer com input. Mascote Dé renderizado com pseudo-elements (face + olhos + boca + antena pulsante).

## Componentes principais

### Mascote Dé (SVG-like via pseudo elements)
- Combined selector base: `.help-modal-de-avatar, .de-chat-avatar, .de-msg-avatar, .de-fab-avatar` (34 circle gradient blue→navy)
- Sizes: `.de-chat-avatar` (42) / `.de-msg-avatar` (30) / `.de-fab-avatar` (24)
- Face parts:
  - `.de-eye` + `.de-eye-l/-r` (animação deBlink)
  - `.de-mouth` (smile pseudo)
  - `.de-antenna` + `::before` (pulsante deAntPulse)
- Keyframes: `@deBlink` (piscar) · `@deAntPulse` (antena)

### CTA bridge no Help Modal
- `.help-modal-de` (padding container)
- `.help-modal-de-btn` (CTA blue gradient subtle + hover lift)
- `.help-modal-de-btn::before` (radial decoration)
- `.help-modal-de-text strong/span`
- `.help-modal-de-spark` (16 yellow)

### Chat Drawer
- `.de-chat-mask` (backdrop z-110)
- `.de-chat-box` (right-bottom 440×620, scale transition, z-111, shadow forte)
- `.de-chat-head` (gradient navy→blue · status dot)
- `.de-chat-head-text h3 p` / `.de-chat-status-dot` (7 green pulse)
- `.de-chat-body` (scroll gradient subtle bg)

### Mensagens
- `.de-msg` (flex row, gap 10)
- `.de-msg-bot` (align-start) / `.de-msg-user` (align-end, row-reverse)
- `.de-msg-bubble` (padding 11 14, radius 14)
- `.de-msg-bot .de-msg-bubble` (soft bg + bottom-left-radius 4)
- `.de-msg-user .de-msg-bubble` (blue bg + white + bottom-right-radius 4)
- `.de-msg-bubble p strong a` (markdown styling)
- `.de-msg-typing` (3 dots animation) + `.de-dot` + `@deType`

### Suggestions + chips
- `.de-suggestions` (column gap 7)
- `.de-suggestion` (chip outline pill)
- `.de-quick-chip` (CTA chip)

### Input footer
- `.de-chat-input` (row gap 8 padding top border)
- `.de-chat-input input` (40 pill input)
- `.de-chat-send` (40 circle blue)

### Cart inline (Dé sugerindo produtos)
- `.de-cart-card` (mini card produto dentro do chat)
- `.de-cart-footer-btn` (CTA pill blue)

## 📋 Divergence audit (Phase H)

| Feature class | DS equivalent | Tipo |
|---|---|---|
| `.de-chat-mask` / `.novas-overlay` / `.notif-drawer-overlay` / `.ped-resumo-overlay` / `.help-modal-mask` | `.ds-overlay` (CONFIRMED via ds-modal · UPGRADE 5x) | DUPE |
| `.de-chat-box` (floating drawer) | Floating panel pattern · custom (vs .ds-drawer side panel) | Domain |
| `.de-chat-head` (gradient navy→blue) | `.ds-hero-gradient` UPGRADE 4x → **5x** (+de-chat-head) | DUPE |
| `.de-chat-status-dot` (7 green pulse) | Status indicator atom · candidato `.ds-status-dot` | Pattern |
| `.de-msg-bubble` (chat bubble) | `.ds-chat-bubble` (new molecule) | Domain |
| `.de-suggestion` (chip outline pill) | `.ds-chip` or `.ds-pill-button` (new) | Pattern |
| `.de-quick-chip` | Same chip pattern · candidato `.ds-chip` | Pattern |
| `.de-chat-send` (40 circle blue button) | `.ds-icon-btn` blue variant (CONFIRMED 7x → 8x) | DUPE |
| `.de-chat-input input` (pill 40) | Input variant pill · custom (vs ds-input 42) | Near-dupe |
| `.help-modal-de-btn` (CTA gradient subtle) | CTA card pattern · custom | Domain |
| Mascote (de-avatar + face parts) | Mascote dé · NÃO migrar (brand específico) | Manter |

**Estimativa migration:** ~50% migrável (chat e mascote são domain-specific).

**Upgrades de atoms confirmados:**
- `.ds-hero-gradient` 4x → **5x** (+de-chat-head)
- `.ds-icon-btn` 7x → **8x** (+de-chat-send)
- `.ds-overlay` upgrade pra 5x

**Novos sugeridos:**
- `.ds-chip` (chip outline pill clickable · de-suggestion + de-quick-chip)
- `.ds-chat-bubble` (chat message bubble · molecule)
- `.ds-status-dot` (status indicator dot pulse)

## Notas

- `.help-modal-de*` (CTA bridge no help modal) ficou junto pois compartilha combined selector com `.de-chat-avatar`.
- Orphan comment `/* ====== HELP FLOATING BUTTON ====== */` (vestigial de C.16) extraído junto e descartado.

## Related

- [Ajuda](../ajuda/README.md) — `.help-modal-de*` é bridge pra abrir Dé do help modal
- [Novidades](../novidades/README.md) / [Notif](../notif/README.md) — `.de-chat-mask` DUPE com outros overlays
