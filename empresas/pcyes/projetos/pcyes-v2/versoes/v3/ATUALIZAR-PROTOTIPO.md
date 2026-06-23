# Como atualizar o protótipo público da v3

> ⚠️ **ESCOPO: só PCYES v3.** Este runbook vale **exclusivamente** para o
> projeto desta pasta — `empresas/pcyes/projetos/pcyes-v2/versoes/v3`. Os
> caminhos, o repo `pcyes-v3-codigo-fonte` e o deploy
> `pcyes-v3-codigo-fonte.vercel.app` são **só desta v3**.
>
> As outras empresas/projetos do monorepo (Tonante, Odex, etc.) têm **cada um
> o seu próprio** repo, Vercel e fluxo de deploy — **não use este doc pra
> eles**. Ex.: Tonante = projeto `freela1/tonante-website`, outro repo, outro
> deploy. Cada empresa, sua infra.

Este projeto (PCYES v3, dentro do monorepo) é a **fonte da verdade**.
Existe uma **cópia standalone só com código-fonte** que está publicada na
Vercel pros devs navegarem. Quando algo muda **aqui**, o protótipo lá
**não atualiza sozinho** — precisa ressincronizar.

> Atalho: é só pedir ao Claude **"atualiza o protótipo"** que ele roda esse
> passo a passo. O doc abaixo é a referência manual / pra não depender de memória.

## Endereços

| O quê | Onde |
|---|---|
| Fonte da verdade (aqui) | `/home/gabrielbarbosa/dev/ux-prototipos/empresas/pcyes/projetos/pcyes-v2/versoes/v3` |
| Cópia standalone (deploy) | `/home/gabrielbarbosa/dev/v3-codigo-fonte` |
| Repo GitHub (público) | https://github.com/gabrielfeelix/pcyes-v3-codigo-fonte |
| Protótipo online (Vercel) | https://pcyes-v3-codigo-fonte.vercel.app |
| Projeto Vercel | `pcyes-v3-codigo-fonte` — conta `gabrielbarbosa-8923s-projects` (Hobby) |

A standalone é **repo git próprio**, separado do monorepo. Push na branch
`main` dela → **Vercel deploya automático**.

## O que sincronizar

**Copiar (código + assets + configs de build):**

- `src/` — espelhar **com `--delete`** (pra sumir arquivos removidos)
- `public/` — espelhar **com `--delete`**
- `index.html`, `package.json`, `package-lock.json`, `tsconfig.json`,
  `vite.config.ts`, `postcss.config.mjs`, `vercel.json`

**NÃO copiar (a standalone tem versão própria/limpa — sobrescrever regride):**

- `README.md` e `ATTRIBUTIONS.md` → na standalone estão **limpos** (sem menção
  a "Figma Make"/IA-tooling) e o README tem o **link do protótipo**. Copiar os
  daqui traz o texto de monorepo de volta. Deixar como estão lá.
- `.gitignore` → a standalone tem o dela (barra `node_modules`, `dist`,
  `.env*`, `.vercel`).

**Nunca copiar (lixo de monorepo / não entra no build):**
`.planning/`, `.claude/`, `.antigravitycli/`, `.vscode/`, `docs/`,
`guidelines/`, `scripts/`, `tokens.json`, `tokens.studio.json`, `design*.md`,
`AUDIT-DS.md`, `DS-*.md`, `HANDOFF.md`, `SEO-PENDENTES.md`, `node_modules/`,
`dist/`, `.env.local`, `Dockerfile*`, `docker-compose*.yml`,
`*:Zone.Identifier`, `.git/`.

> `tokens.json` / `tokens.studio.json` são export de design (Figma), **não
> são importados pelo build** — por isso ficam de fora sem perder nada visual.
> O DS que renderiza é `src/styles/theme.css`.

## Passo a passo

```bash
H=/home/gabrielbarbosa/dev/ux-prototipos/empresas/pcyes/projetos/pcyes-v2/versoes/v3
D=/home/gabrielbarbosa/dev/v3-codigo-fonte

# 1. Espelhar código + assets (com --delete pra remover deletados)
rsync -rc --delete "$H/src/"    "$D/src/"
rsync -rc --delete "$H/public/" "$D/public/"

# 2. Copiar configs de build (NÃO copiar README/ATTRIBUTIONS/.gitignore)
for f in index.html package.json package-lock.json tsconfig.json \
         vite.config.ts postcss.config.mjs vercel.json; do
  cp -p "$H/$f" "$D/$f"
done

# 3. Verificar que builda
cd "$D"
npm install
npm run build           # tem que terminar verde (gera dist/)

# 4. Conferir o que mudou
git status -s

# 5. Commit + push (dispara deploy na Vercel)
git add -A
git commit -m "sync: atualiza protótipo a partir do monorepo"
git push origin main
```

Vercel detecta o push e redeploya em ~1 min. Confere em
https://pcyes-v3-codigo-fonte.vercel.app

## Checagens antes de publicar (repo é PÚBLICO)

- `git status -s` na standalone: `node_modules/`, `dist/`, `.env*` **não**
  podem aparecer (o `.gitignore` barra — confirmar).
- Sem segredo no commit: a app não usa `.env` versionado; nada de chave vai junto.
- Varrer texto novo por menção a tooling/IA antes do push, se quiser manter limpo:
  `git -C "$D" grep -inE "figma make|claude|anthropic|vibe.?coding"`
  (os "IA/AI" de descrição de GPU/PC são copy legítima de produto — pode ficar.)
