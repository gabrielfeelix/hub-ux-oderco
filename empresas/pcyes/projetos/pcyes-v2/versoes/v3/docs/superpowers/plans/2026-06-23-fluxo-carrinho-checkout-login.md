# Fluxo carrinho → checkout com gate de login — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o sidecart levar à página do carrinho e exigir login antes do checkout, redirecionando ao checkout (com dados do usuário) após autenticar.

**Architecture:** Adicionar um "intent" de redirecionamento pós-login (`authRedirect`) ao `AuthContext`, consumido pelo `AuthModal` no sucesso. Dois gatilhos usam esse intent: o botão "Finalizar compra" da `CartPage` e o guard da rota `/checkout`. O `CheckoutPage` já pré-preenche endereço/cartão do usuário logado — basta garantir que só se chega lá autenticado.

**Tech Stack:** React 18 + TypeScript, React Router 7, Vite 6. Estado de auth via React Context (mock, sem backend).

## Global Constraints

- **Diretório do projeto (fonte da verdade):** `empresas/pcyes/projetos/pcyes-v2/versoes/v3` no monorepo `ux-prototipos`. Todos os paths de arquivo abaixo são relativos a esse diretório. Rodar `npm`/`git` a partir dele.
- **Sem harness de teste automatizado:** `typescript`/`tsc` não estão nas deps (`npm run typecheck` não roda) e não há vitest/RTL. **Não criar arquivos de teste.** Verificação de cada task = `npm run build` terminando verde + checagem manual no browser (`npm run dev`).
- **Login é mock:** qualquer email/senha no AuthModal autentica como `João Silva` (com endereços/cartões mockados).
- **Commits locais apenas** — não dar push (push em `main`/monorepo tem implicação de deploy tratada à parte).
- **Seguir o estilo do arquivo** (tokens CSS via `var(--...)`, sem libs novas).

---

### Task 1: AuthContext — intent de redirect (`authRedirect`) + `promptLogin`

**Files:**
- Modify: `src/app/components/AuthContext.tsx`

**Interfaces:**
- Consumes: nada (base).
- Produces:
  - `authRedirect: string | null`
  - `setAuthRedirect: (path: string | null) => void`
  - `promptLogin: (redirectTo?: string) => void` — seta tab "login", grava o redirect e abre o modal.

- [ ] **Step 1: Adicionar os 3 membros ao type `AuthContextType`**

Localizar no `interface AuthContextType` o fim do bloco do modal:

```ts
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
}
```

Trocar por (adiciona 3 linhas antes do `}`):

```ts
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
  authRedirect: string | null;
  setAuthRedirect: (path: string | null) => void;
  promptLogin: (redirectTo?: string) => void;
}
```

- [ ] **Step 2: Adicionar estado + `promptLogin` no `AuthProvider`**

Localizar:

```ts
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
```

Inserir logo abaixo:

```ts
  const [authRedirect, setAuthRedirect] = useState<string | null>(null);

  const promptLogin = useCallback((redirectTo?: string) => {
    setAuthModalTab("login");
    setAuthRedirect(redirectTo ?? null);
    setAuthModalOpen(true);
  }, []);
```

- [ ] **Step 3: `logout` também limpa o redirect**

Localizar:

```ts
  const logout = useCallback(() => setUser(null), []);
```

Trocar por:

```ts
  const logout = useCallback(() => { setUser(null); setAuthRedirect(null); }, []);
```

- [ ] **Step 4: Expor no `value` do Provider**

Localizar no objeto passado ao `AuthContext.Provider`:

```ts
      authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab,
    }}>
```

Trocar por:

```ts
      authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab,
      authRedirect, setAuthRedirect, promptLogin,
    }}>
```

- [ ] **Step 5: Build verde**

Run: `npm run build`
Expected: termina com `✓ built in ...`, sem erro de TypeScript/Vite.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/AuthContext.tsx
git commit -m "feat(pcyes-v3): authRedirect + promptLogin no AuthContext"
```

---

### Task 2: AuthModal — navegar pro redirect no sucesso, limpar no fechamento

**Files:**
- Modify: `src/app/components/AuthModal.tsx`

**Interfaces:**
- Consumes: `authRedirect`, `setAuthRedirect` (Task 1).
- Produces: nada novo (comportamento).

- [ ] **Step 1: Importar `useNavigate`**

Localizar o topo (linha 1):

```ts
import { useEffect, useState } from "react";
```

Inserir logo abaixo:

```ts
import { useNavigate } from "react-router";
```

- [ ] **Step 2: Pegar `authRedirect`/`setAuthRedirect` do context + `navigate`**

Localizar:

```ts
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab, login, socialLogin, register } = useAuth();
```

Trocar por:

```ts
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab, login, socialLogin, register, authRedirect, setAuthRedirect } = useAuth();
  const navigate = useNavigate();
```

- [ ] **Step 3: Redirecionar após login/register com sucesso**

Localizar:

```ts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authModalTab === "login") await login(email, password);
      else await register(name, email, password);
    } finally { setLoading(false); }
  };
```

Trocar por:

```ts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authModalTab === "login") await login(email, password);
      else await register(name, email, password);
      if (authRedirect) { const dest = authRedirect; setAuthRedirect(null); navigate(dest); }
    } finally { setLoading(false); }
  };
```

- [ ] **Step 4: Redirecionar após social login com sucesso**

Localizar:

```ts
  const handleSocial = async (provider: string) => {
    setSocialLoading(provider);
    try { await socialLogin(provider); }
    finally { setSocialLoading(null); }
  };
```

Trocar por:

```ts
  const handleSocial = async (provider: string) => {
    setSocialLoading(provider);
    try {
      await socialLogin(provider);
      if (authRedirect) { const dest = authRedirect; setAuthRedirect(null); navigate(dest); }
    }
    finally { setSocialLoading(null); }
  };
```

- [ ] **Step 5: Limpar o intent ao fechar o modal (overlay + botão X)**

Há 2 ocorrências idênticas do fechamento:

```ts
onClick={() => { setAuthModalOpen(false); reset(); }}
```

Trocar **as duas** por:

```ts
onClick={() => { setAuthModalOpen(false); setAuthRedirect(null); reset(); }}
```

- [ ] **Step 6: Build verde**

Run: `npm run build`
Expected: `✓ built in ...`, sem erro.

- [ ] **Step 7: Commit**

```bash
git add src/app/components/AuthModal.tsx
git commit -m "feat(pcyes-v3): AuthModal redireciona pro intent pós-login"
```

---

### Task 3: CartDrawer — sidecart leva pro carrinho ("Revisar pedido")

**Files:**
- Modify: `src/app/components/CartDrawer.tsx` (~linha 499)

**Interfaces:**
- Consumes: nada (usa `navigate` já existente no componente).
- Produces: nada.

- [ ] **Step 1: Trocar destino e texto do botão principal do sidecart**

Localizar:

```tsx
                  onClick={() => { setIsOpen(false); navigate("/checkout"); }}
                  aria-label="Finalizar pedido"
                >Finalizar pedido</button>
```

Trocar por:

```tsx
                  onClick={() => { setIsOpen(false); navigate("/carrinho"); }}
                  aria-label="Revisar pedido"
                >Revisar pedido</button>
```

- [ ] **Step 2: Build verde**

Run: `npm run build`
Expected: `✓ built in ...`, sem erro.

- [ ] **Step 3: Verificação manual**

Run: `npm run dev` → abrir o app, adicionar item ao carrinho, abrir o sidecart.
Expected: botão diz "Revisar pedido"; ao clicar, fecha o drawer e navega pra `/carrinho` (CartPage), **não** pro checkout.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/CartDrawer.tsx
git commit -m "feat(pcyes-v3): sidecart leva pro carrinho (Revisar pedido)"
```

---

### Task 4: CartPage — gate de login no "Finalizar compra"

**Files:**
- Modify: `src/app/components/CartPage.tsx` (imports, hooks, 2 botões ~959 e ~1165)

**Interfaces:**
- Consumes: `isLoggedIn`, `promptLogin` (Task 1).
- Produces: nada.

- [ ] **Step 1: Importar `useAuth`**

Localizar:

```ts
import { useCart } from "./CartContext";
```

Inserir logo abaixo:

```ts
import { useAuth } from "./AuthContext";
```

- [ ] **Step 2: Hook + handler de finalização**

Localizar:

```ts
  const navigate = useNavigate();
  const { appliedCoupon, setAppliedCoupon, pointsApplied, setPointsApplied, pointsToUse, setPointsToUse } = useCheckoutPrefs();
```

Inserir logo abaixo:

```ts
  const { isLoggedIn, promptLogin } = useAuth();
  const handleFinalize = () =>
    isLoggedIn ? navigate("/checkout") : promptLogin("/checkout");
```

- [ ] **Step 3: Ligar os 2 botões "Finalizar compra" ao handler**

Há 2 ocorrências idênticas (desktop ~959 e mobile ~1165):

```tsx
            onClick={() => navigate("/checkout")}
```

Trocar **as duas** por:

```tsx
            onClick={handleFinalize}
```

- [ ] **Step 4: Build verde**

Run: `npm run build`
Expected: `✓ built in ...`, sem erro.

- [ ] **Step 5: Verificação manual (deslogado e logado)**

Run: `npm run dev`.
- **Deslogado:** carrinho → "Finalizar compra" → abre o AuthModal (tab login); ainda **não** foi pro checkout.
- **Logado** (logar via modal): carrinho → "Finalizar compra" → vai pro `/checkout` direto.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/CartPage.tsx
git commit -m "feat(pcyes-v3): gate de login no Finalizar compra do carrinho"
```

---

### Task 5: CheckoutPage — guard da rota + verificação ponta-a-ponta

**Files:**
- Modify: `src/app/components/CheckoutPage.tsx` (~linha 319)

**Interfaces:**
- Consumes: `isLoggedIn`, `promptLogin` (Task 1). `useEffect`, `useNavigate` já importados no arquivo.
- Produces: nada.

- [ ] **Step 1: Pegar `promptLogin` do context**

Localizar:

```ts
  const { user, isLoggedIn, addAddress, addCard } = useAuth();
```

Trocar por:

```ts
  const { user, isLoggedIn, addAddress, addCard, promptLogin } = useAuth();
```

- [ ] **Step 2: Adicionar o guard de rota**

Logo abaixo da linha do passo anterior, inserir:

```ts
  /* Guard: checkout exige login. Deslogado (URL/refresh) → carrinho + abre login.
     Após logar, authRedirect("/checkout") traz o usuário de volta. */
  useEffect(() => {
    if (!isLoggedIn) {
      promptLogin("/checkout");
      navigate("/carrinho", { replace: true });
    }
  }, [isLoggedIn, promptLogin, navigate]);
```

- [ ] **Step 3: Build verde**

Run: `npm run build`
Expected: `✓ built in ...`, sem erro.

- [ ] **Step 4: Verificação manual ponta-a-ponta (4 fluxos)**

Run: `npm run dev`.
1. **Deslogado pelo carrinho:** add item → sidecart "Revisar pedido" → `/carrinho` → "Finalizar compra" → abre login → logar → cai em `/checkout` com endereço/cartão padrão preenchidos.
2. **Logado pelo carrinho:** (já logado) "Finalizar compra" → `/checkout` direto, dados preenchidos.
3. **URL direta deslogado:** abrir `/checkout` na barra (ou refresh deslogado) → redireciona pra `/carrinho` e abre o login → logar → volta pra `/checkout`.
4. **Fechar login sem logar:** abrir o gate, fechar no X/overlay → nenhuma navegação inesperada; permanece no carrinho.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/CheckoutPage.tsx
git commit -m "feat(pcyes-v3): guard de login na rota /checkout"
```

---

## Notas de implementação

- **Flash mínimo no guard:** o `CheckoutPage` tem muitos hooks, então não dá pra `return null` antes deles (regra dos hooks). Deslogado, o componente renderiza 1 frame antes do `navigate` — aceitável pro protótipo.
- **Sem conflito com os effects de pré-preenchimento** (`:525`, `:550`): eles já têm early-return `if (!isLoggedIn ...) return`, então só agem quando logado, depois do guard.
- **`replace: true`** no redirect do guard evita loop de histórico (voltar → checkout → bounce).

## Self-Review (feita pelo autor do plano)

- **Cobertura do spec:** sidecart→carrinho (Task 3), gate no botão do carrinho (Task 4), redirect pós-login (Tasks 1+2), guard da rota /checkout (Task 5), pré-preenchimento de dados (já existente, validado no Task 5/Step 4). ✔ Todos os itens do spec têm task.
- **Placeholders:** nenhum — todo step tem o código real.
- **Consistência de tipos/nomes:** `authRedirect`/`setAuthRedirect`/`promptLogin` definidos no Task 1 e usados com a mesma assinatura nas Tasks 2, 4 e 5. ✔
