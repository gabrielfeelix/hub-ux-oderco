# Design — Fluxo carrinho → checkout com gate de login

- **Data:** 2026-06-23
- **Projeto:** PCYES v3 (monorepo `ux-prototipos`, fonte da verdade)
- **Status:** aprovado, pronto pra plano de implementação

## Problema

O fluxo de compra atual pula a página do carrinho e não exige login:

- O **sidecart** (`CartDrawer`) tem botão "Finalizar pedido" que vai
  **direto** pra `/checkout` (`CartDrawer.tsx:499`).
- A **CartPage** tem 2 botões "Finalizar compra" (desktop + mobile) que
  também vão **direto** pra `/checkout`, sem checar login
  (`CartPage.tsx:959` e `:1165`).
- O `/checkout` é acessível deslogado (por URL ou refresh), caindo em forms
  manuais.

## Objetivo

1. Sidecart leva pra **CartPage** (revisão), não pro checkout.
2. Botão "Finalizar compra" da CartPage:
   - **logado** → vai pro `/checkout` puxando os dados do usuário;
   - **deslogado** → abre o **login**; após logar, segue pro `/checkout`.
3. A rota `/checkout` fica **protegida**: acesso deslogado (URL/refresh)
   redireciona pro `/carrinho` e abre o login; após logar, volta pro checkout.

## Não-objetivo (fora de escopo)

- Guard de carrinho vazio em `/checkout` (problema separado do login).
- Redesenho visual do AuthModal / CartPage.
- Persistência real de sessão / backend (login segue mock — `João Silva`).

## Estado atual relevante (já existe, reaproveitar)

- **`AuthContext`** expõe `user`, `isLoggedIn` (`!!user`), `login`,
  `register`, `socialLogin`, `logout`, e o controle global do modal:
  `authModalOpen`/`setAuthModalOpen`, `authModalTab`/`setAuthModalTab`.
- **`AuthModal`** é montado global no `RootLayout`, dirigido pelo context.
  Hoje **não** navega após o sucesso do login.
- **`CheckoutPage`** já **pré-preenche** endereço padrão, telefone e cartão
  padrão a partir de `user` quando `isLoggedIn` (`CheckoutPage.tsx:525-558`),
  e degrada pra forms manuais quando deslogado. O requisito "puxar os dados"
  já está atendido — basta garantir que só chega lá logado.

## Decisões (definidas com o usuário)

- **Guard da rota `/checkout`:** sim, proteger a rota também (não só o botão).
- **Texto do botão do sidecart:** "Revisar pedido" (vai pro `/carrinho`).
- **Destino pós-login:** direto pro `/checkout`.
- **Tab inicial do modal no gate:** "login".

## Abordagem — redirect pós-login centralizado

Adicionar ao `AuthContext` um "intent" de redirecionamento
(`authRedirect`) que qualquer gatilho seta antes de abrir o login; o
`AuthModal` consome esse intent no sucesso e navega. Fonte única de verdade,
usada tanto pelo botão do carrinho quanto pelo guard da rota.

Alternativas descartadas:
- `useEffect` local na CartPage observando `isLoggedIn` — lógica espalhada e
  **não** cobre o guard da rota `/checkout` (duplicaria).
- Callback `onSuccess` por abertura do modal — o modal é global via context,
  não recebe props por chamada; exigiria reestruturar.

## Mudanças por arquivo

### 1. `AuthContext.tsx`
- Novo estado `authRedirect: string | null` + `setAuthRedirect`.
- Novo helper `promptLogin(redirectTo?: string)`:
  `setAuthModalTab("login")` → `setAuthRedirect(redirectTo ?? null)` →
  `setAuthModalOpen(true)`.
- `logout()` também faz `setAuthRedirect(null)`.
- Expor `authRedirect`, `setAuthRedirect`, `promptLogin` no value e no type
  `AuthContextType`.

### 2. `AuthModal.tsx`
- Importar `useNavigate`.
- Em `handleSubmit` (após `await login`/`register` com sucesso) e no
  handler de social login (após `await socialLogin`): se `authRedirect`,
  `navigate(authRedirect)` e `setAuthRedirect(null)`.
- Nos fechamentos do modal (botão X e clique no overlay): `setAuthRedirect(null)`
  além do `reset()` já existente — evita intent órfão.

### 3. `CartDrawer.tsx`
- Linha ~499: `navigate("/checkout")` → `navigate("/carrinho")`.
- Texto do botão "Finalizar pedido" → **"Revisar pedido"**; atualizar o
  `aria-label` correspondente.

### 4. `CartPage.tsx`
- Pegar `isLoggedIn` e `promptLogin` de `useAuth()`.
- Criar `handleFinalize`:
  ```ts
  const handleFinalize = () =>
    isLoggedIn ? navigate("/checkout") : promptLogin("/checkout");
  ```
- Trocar os 2 `onClick={() => navigate("/checkout")}` (linhas ~959 e ~1165)
  por `onClick={handleFinalize}`.

### 5. `CheckoutPage.tsx`
- Guard de rota: `useEffect` que, se `!isLoggedIn`, chama
  `promptLogin("/checkout")` e `navigate("/carrinho", { replace: true })`.
  (`replace` pra não sujar o histórico.) Quando o login conclui, o
  `authRedirect` leva de volta pro `/checkout`.

## Fluxos resultantes

- **Logado — carrinho:** "Finalizar compra" → `/checkout` → pré-preenche
  endereço/cartão padrão (lógica existente).
- **Deslogado — carrinho:** "Finalizar compra" → `promptLogin("/checkout")`
  → AuthModal (login) → loga → AuthModal navega pra `/checkout` → pré-preenche.
- **Deslogado — URL `/checkout`:** guard → `promptLogin("/checkout")` +
  redirect `/carrinho` → loga → volta `/checkout`.
- **Fecha login sem logar:** `authRedirect` limpo no fechamento → nenhuma
  navegação inesperada.
- **Sidecart:** "Revisar pedido" → `/carrinho` (sempre, sem gate aqui).

## Verificação

Protótipo sem infra de teste automatizado (`typescript`/`tsc` não está nas
deps; `npm run typecheck` não roda). Verificação:

1. `npm run build` precisa terminar verde.
2. Validação manual rodando o app (`npm run dev`) nos 4 fluxos acima:
   - logado: carrinho → checkout direto;
   - deslogado: carrinho → login → checkout;
   - URL `/checkout` deslogado → bounce pro carrinho + login → volta;
   - fechar login sem logar não navega.

Login mock: qualquer email/senha no modal autentica como `João Silva`.

## Risco / atenção

- Garantir que o `useEffect` de guard no `CheckoutPage` não conflite com os
  `useEffect` existentes de pré-preenchimento (`:525`, `:550`) — o guard roda
  e redireciona antes, então quando deslogado aqueles já têm early-return
  (`if (!isLoggedIn ...) return`). Sem conflito.
- O redirect do guard deve usar `replace: true` pra evitar loop de histórico
  voltar→checkout→bounce.
