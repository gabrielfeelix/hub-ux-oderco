# PCYES V3 — Auditoria de aderência ao Design System

> Varredura completa do que ainda está **hardcoded / fora do DS**, por categoria e por página.
> Feita em 2026-06-03 após a tokenização de cor (Fases 1–7). Cor já resolvida; este doc mapeia o resto.
>
> Método: grep de padrões off-DS em `src/app/components/*.tsx` + `src/app/pages/*.tsx`.

---

## Sumário executivo (por severidade × esforço)

| # | Categoria | Volume | Severidade | Esforço | Decisão necessária? |
|---|---|---|---|---|---|
| 1 | **Tipografia inline** (`fontSize: "Npx"`) | ~1300 | Alta | Alto | **Sim** — escala + valores ímpares |
| 2 | **Raios magic-number** (`borderRadius/rounded-[Npx]`) | ~340 | Média | Médio | **Sim** — 14/16px sem token |
| 3 | **Sombras inline** one-off | ~80 | Média | Médio | Parcial |
| 4 | **Inputs bespoke** (não usam `FieldInput`) | ~16 | Média (a11y) | Médio | Não |
| 5 | **Hex inline** (color/background) | ~180 | Baixa-média | Médio | Triagem (marca vs fixável) |
| 6 | **Botões bespoke** (`<button>` solto) | ~270 | Baixa | Alto | Triagem (CTA vs ícone/tab) |

Cor de texto/borda = **0 hardcoded** (já feito). Hover = consistente (já feito).

---

## 1. Tipografia inline — o maior gap

**Problema:** ~1300 `fontSize: "Npx"` inline. A escala tokenizada existe (`--text-h1..micro`, §2.2) mas quase ninguém consome. Pior: dezenas de valores **ímpares fora do grid 4px** que o próprio DS proíbe (§2.3 "nada de ímpar"):

| Valor ímpar | Ocorrências |
|---|---|
| `10.5px` | 77 |
| `12.5px` | 72 |
| `11.5px` | 69 |
| `13.5px` | 53 |
| `9.5px` | 34 |
| `8.5px` | 6 |
| `14.5px` | 4 |

Valores "redondos" mais usados: 13px (190), 12px (172), 11px (143), 14px (97), 10px (93), 15px (52).

**Decisão necessária:** definir a escala de UI text de verdade (ex: 11/12/13/14/16) e mapear os ímpares pro vizinho. Isso é um milestone próprio ("tipografia tokenizada") — alto impacto visual, precisa revisão página a página.

**Recomendação:** criar tokens `--text-ui-xs/sm/md/lg` (ex 11/12/13/15) + manter heads em clamp; migrar por página. Não fazer cego (cada -0.5px shift é visível).

---

## 2. Raios magic-number

**Problema:** ~340 raios literais em vez dos tokens `--radius-card-sm/md/lg/xl` (12/18/22/26) + base 4/8 + pill.

| Valor | Ocorrências | Token mais próximo |
|---|---|---|
| `8px` | 53 (41+12) | `--radius-card` (8) ✅ direto |
| `14px` | 51 (35+16) | **sem token** — decidir |
| `10px` | 58 (29+29) | `--radius-card-sm` (12) → +2px |
| `20px` | 32 (25+7) | `--radius-card-lg` (22) → +2px |
| `100px`/`999px`/`9999px` | 34 | `--radius-pill` |
| `24px` | 19 | `--radius-card-xl` (26) → +2px |
| `16px` | 13 | **sem token** — decidir |
| `4px`/`6px`/`5px` | 20 | `--radius` (4) |

**Decisão necessária:** 14px e 16px não têm token (já flagado no HANDOFF). Opções: (a) criar `--radius-card-input: 14` + `--radius-card-base: 16`, ou (b) folder 14→12 e 16→18. Resto é mecânico (mapear pro token).

**Risco:** 2-4px de diferença visual em vários cards. Sweep médio-risco; fazer por página com revisão.

---

## 3. Sombras inline one-off

~80 `boxShadow` inline com rgba/px sem `var(--shadow-*)`. Hotspots: MonteSeuPc (26), Checkout (10), Cart (5), PreOrder (4), DriverDetail (4).

**Abordagem:** muitas são one-offs justificados (glow específico). Tokenizar as que se repetem (3+); aceitar o resto. Baixa prioridade visual.

---

## 4. Inputs bespoke → FieldInput

~16 `<input>` sem o primitivo `FieldInput`/`FieldLabel`: ProductsPage (6), ProfilePage (5), AuthModal (3), CartDrawer (2). (CheckoutPage/CartPage já estavam na lista de pendência.)

**Abordagem:** mecânico, ganho de a11y (required/invalid). Migrar por arquivo. Já planejado como "forms→FieldInput".

---

## 5. Hex inline (color/background)

~180 ocorrências. Hotspots: **CheckoutPage (60)** — mas a maioria é **marca de pagamento** (`#009ee3` boleto, `#eb001b` mastercard, `#1a73e8` google, `#fff` cartão) = **intencional, não tocar**. Outros: PreOrder (17), Profile (13), Products (12), Cart (12), ReviewModal (9).

**Abordagem:** triagem — surfaces dark literais → `var(--surface-*)`; brand/payment/white → manter. Os de estado dinâmico (ternários `active ? "#x" : "#y"`) caso a caso.

---

## 6. Botões bespoke

~270 `<button>` soltos. Hotspots: Profile (54), MonteSeuPc (43), ProductPage (39), Products (34), Navbar (32), Checkout (31). **Nem todos são CTA** — a maioria é ícone/tab/toggle (legítimos). Só os que são "comprar/ação primária" deveriam ir pro `CTAButton`. Triagem necessária; baixa prioridade (os CTAs principais já convergiram).

---

## Hotspots por página (onde mais dói)

| Página/área | Tipografia | Raios | Sombras | Inputs | Hex | Prioridade |
|---|---|---|---|---|---|---|
| **CheckoutPage** | alto | alto | 10 | sim | 60 (maioria marca) | Alta |
| **MonteSeuPcPage** | alto | alto | 26 | — | 1 | Alta |
| **ProfilePage** | alto | alto | 3 | 5 | 13 | Alta |
| **ProductPage** | alto | médio | 3 | — | 3 | Alta |
| **ProductsPage** | alto | médio | — | 6 | 12 | Média |
| **CartPage / CartDrawer** | médio | médio | 5 | 2 | 12 | Média |
| **PreOrderPage** | médio | médio | 4 | — | 17 | Média |
| Páginas legais/Faq/Drivers | baixo | baixo | médio | — | baixo | Baixa |

---

## Ordem de ataque recomendada

1. **Raios** (#2) — mecânico após decidir 14/16px. Maior volume com fix claro.
2. **Inputs → FieldInput** (#4) — ganho de a11y, mecânico.
3. **Hex inline surfaces** (#5) — triagem rápida, fecha o "zero hardcoded de cor".
4. **Tipografia** (#1) — milestone próprio; precisa decisão de escala + revisão por página. Maior impacto, maior risco.
5. **Sombras/botões** (#3/#6) — limpeza incremental, baixa prioridade.

**Decisões que destravam o resto:** (a) tokens de raio 14/16px; (b) escala de UI text + o que fazer com os ímpares (10.5/11.5/12.5/13.5).
