---
name: painel-dezena
description: >
  Atualiza o painel de marketing (marketing/painel.md) com os números reais da dezena —
  matrículas, faturamento e leads — sempre contra a meta oficial, e registra o delta vs. a
  dezena anterior. Roda nos dias 10/20/30 (ou quando pedido).
  Use quando o usuário disser "atualiza o painel", "fechar a dezena", "números do mês",
  "painel-dezena", "/painel-dezena", ou trouxer os números da planilha da Elis / ZenPro
  pra atualizar o dashboard.
---

# /painel-dezena — Fechamento da dezena no painel

Transforma os números crus da dezena (matrículas, faturamento, leads) em um painel atualizado
contra a meta, com o gargalo do mês em destaque. É o ritual dos dias 10/20/30.

## Dependências

- **Dashboard:** `marketing/painel.md` (alvo da atualização)
- **Metas oficiais (fonte da verdade):** `acordos/rede-publicidade/acordo-rede-holos.md` → "Números oficiais"
- **Contexto/foco:** `_memoria/estrategia.md` (pra apontar o que importa agora)
- **Tom:** `_memoria/preferencias.md` (Luciana decide no emocional → sempre número junto)
- **Fontes de número:**
  - Matrículas + faturamento → planilha da Elis (Meta Mês)
  - Leads / conversas → ZenPro
  - Investimento / ROAS → Windsor.ai (Google) + Meta Ads (cruza com `/saude-google`)

---

## Workflow

### Passo 1 — Reunir os números
Pedir (ou puxar via MCP quando disponível):
- **Matrículas** da dezena por tipo: Integral (cartão/à vista) e Mensalista (mensalidade)
- **Faturamento** realizado no mês (snapshot)
- **Leads/conversas** do período (ZenPro)

Se faltar algum número, NÃO inventar — marcar como `⬜ pendente` e seguir com o que tem.
Se o usuário não trouxe o material do time, oferecer rodar `/pedir-material` antes.

### Passo 2 — Comparar com a meta
- Ler as metas oficiais no acordo (não usar números soltos de memória).
- Calcular % da meta de cada linha e o total.
- Calcular o **delta vs. a dezena anterior** (ler o valor que já está no painel antes de sobrescrever).

### Passo 3 — Atualizar o painel
Editar `marketing/painel.md`:
- Atualizar a data de "Atualizado:".
- Atualizar as tabelas **Matrículas** e **Faturamento** (realizado, %, referência).
- Atualizar a seção **ROAS / Tráfego** se houver número novo da dezena.
- Marcar o **gargalo do mês** com ⚠️ (a linha mais atrás da meta).
- Adicionar UMA linha de "o que mudou desde a última dezena" (delta + leitura curta).

NÃO reformatar o arquivo inteiro — só atualizar os campos que mudaram.

### Passo 4 — Leitura executiva (3–5 linhas)
Fechar com um resumo direto pro Lucio: onde estamos, qual o gargalo, e a ação mais alavancada
pros dias que faltam no mês. Sempre número junto da recomendação.

### Passo 5 — Registrar mudança grande
Se a dezena revelar uma virada relevante (campanha travou, modalidade despencou, meta em risco),
sugerir um registro em `marketing/ciclos/` e/ou atualizar `_memoria/estrategia.md`.

## Regras

- **Nunca decidir no escuro:** se os números estão velhos (passou a dezena), atualizar antes de qualquer recomendação do mês.
- Metas vêm SEMPRE do acordo, não da memória.
- Não sobrescrever histórico sem antes ler o valor anterior (precisa do delta).
- Número faltando = `⬜ pendente`, nunca estimativa disfarçada de real.
- Conectar com `/saude-google` quando o item travado for tráfego pago.
