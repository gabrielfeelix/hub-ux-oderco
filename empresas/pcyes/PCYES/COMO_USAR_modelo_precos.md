# Como usar o modelo de preços promocionais

Planilha: `Modelo_Precos_Promocionais_Magento.csv`

## Preenchimento

Uma linha por produto que entra na campanha. As 3 primeiras linhas são **exemplos** — apague antes de usar.

| Coluna | O que colocar |
|---|---|
| **SKU** | Código EXATO do produto no Magento (maiúsculas e hífens contam) |
| **Nome do produto** | Só referência sua — não vai pro sistema |
| **Preço Normal (R$)** | Referência: preço base atual. Use ponto como decimal: `299.90` |
| **Preço Promo (R$)** | Valor que o cliente vê durante a campanha |
| **Data Início** | Quando a promo ativa. Formato `AAAA-MM-DD` (ex: `2026-06-06`) |
| **Data Fim** | Quando volta ao normal |
| **Store ID** | `0` = todas as lojas (padrão). Só mude para loja específica |

> Promo de 1 dia (ex: 06/06): início `2026-06-06`, fim `2026-06-07`.

## O que acontece tecnicamente

- Eu leio o CSV e chamo `set-special-prices` do MCP, em lote.
- Cria o **special price** do Magento com data início/fim → o "de/por" aparece na loja.
- O preço base (normal) **não é apagado**, fica preservado por baixo.
- No início a promo ativa sozinha; no fim, volta sozinha.
- Para cancelar antes da hora: `delete-special-prices`.

## Atenção

- Confirme se a PCYES usa **catalog price rules** — se sim, o caminho é outro (esse MCP mexe no special price direto do produto).
- **Teste em staging/homologação** antes de aplicar na produção.
- O preço promo substitui o preço cheio no período; combinação com cupom depende da config da loja.
