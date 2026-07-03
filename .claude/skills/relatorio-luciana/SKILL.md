---
name: relatorio-luciana
description: >
  Monta o relatório dezenal que a Elis encaminha pra Luciana: resultado comercial, pipeline ZenPro,
  verba investida — sempre com COMPARATIVO (dezena atual × anterior × mesma dezena do mês passado)
  e com o placar de otimizações aplicadas (vitórias e perdas). Puxa os números das planilhas do
  Drive automaticamente; só precisa do Lucio 2 números (leads ZenPro + investimento).
  Use quando o usuário disser "relatório pra Luciana", "relatório dezenal", "fechar a dezena pra Lu",
  "relatorio-luciana", "/relatorio-luciana", ou nos dias 10/20/30.
---

# /relatorio-luciana — Relatório dezenal (Elis → Luciana)

Monta o documento que sobe pra presidência, no formato que já funcionou (dezena 1 de junho).
Luciana **decide no emocional e preza comparativo** → este relatório ancora em número, mostra a
evolução (comparativos) e é honesto sobre o que funcionou e o que não.

## Dependências
- **Fontes de número:** [`dados/fontes.md`](../../../dados/fontes.md) — IDs das planilhas do Drive
  - **META DE VENDAS** (`1MYA0OhQSBjKDr3hsL-aDK0Vv-_dxCp-0T353E2UIpuU`) → vendas + faturamento
  - **Métricas Holos** (`1-iudHBATR684_pNmfpUzYbXZqKPjbF4ZACb6lsUhhmo`) → snapshots diários (p/ recortar a dezena)
- **Comparativo:** [`marketing/relatorios/historico-dezenas.md`](../../../marketing/relatorios/historico-dezenas.md) — uma linha por dezena
- **Placar de otimizações:** [`marketing/relatorios/registro-otimizacoes.md`](../../../marketing/relatorios/registro-otimizacoes.md)
- **Metas oficiais:** [`acordos/rede-publicidade/acordo-rede-holos.md`](../../../acordos/rede-publicidade/acordo-rede-holos.md)
- **Tom:** [`_memoria/preferencias.md`](../../../_memoria/preferencias.md)

## Convenções — CANON (decidido 24/06/2026; ver `marketing/relatorios/README.md`)
- **Régua canônica do número de capa = VENDIDO** (planilha *Meta de Vendas*). NÃO usar o caixa/recebido
  (Métricas Holos) como número de capa — ele é só bastidor interno.
- **Dezena = janela incremental:** D1 = 01–10, D2 = 11–20, D3 = 21–fim. A janela = `acumulado(fim) − acumulado(início)`.
- **Tensão de fonte:** o *vendido* não tem corte por data na Meta de Vendas; o corte por dezena vem dos
  snapshots datados (Métricas Holos, régua caixa) ou do **export do ZenPro** (venda por canal + data).
  Pra ter **vendido + incremental**, o desbloqueio é o export do ZenPro. Sem ele, o incremental sai como
  melhor-esforço e marca-se a pendência (⬜); nunca trocar a régua só pra fechar o número.
- **"Vendas/faturamento" = venda comercial nova** da janela (massoterapia + cursos fechados), não o
  faturamento bruto total (que inclui recorrência/aluguel). Calibrar pela dezena 1 (25 vendas / R$45.524).

## Os 7 números (modelo da dezena 1)
| Bloco | Número | Fonte | Quem |
|-------|--------|-------|------|
| Resultado comercial | Vendas (qtd) · Faturamento · Ticket médio · ROAS | META DE VENDAS + cálculo | ✅ skill puxa |
| Pipeline real (ZenPro) | Leads confirmados no WhatsApp *(único auditado)* | **Banco ZenPro direto** (`dados/.env.zenpro`, pooler sa-east-1; régua: conversations, org Holos, not is_group, tz SP) | ✅ skill puxa |
| Verba investida | Google · Meta · Total | Windsor + Meta Ads | ❌ Lucio passa |

> **Regra dos 90 dias (canon 03/07):** cruzar o telefone de cada venda com `min(created_at)` no ZenPro; lead >90 dias = "base de campanhas antigas" (fora do ROAS, dentro da seção de LTV). Script de consulta: `scripts/zenpro-query.js`.

> Ticket = Faturamento ÷ Vendas · ROAS = Faturamento ÷ Investido. A skill calcula.

## Workflow

### Passo 1 — Reunir
- Ler META DE VENDAS + Métricas Holos do Drive (recortar a janela da dezena).
- Pedir ao Lucio os **2 números**: leads ZenPro da dezena + investimento (Google/Meta).
- Se faltar, oferecer rodar `/pedir-material`.

### Passo 2 — Comparar (o coração do relatório)
Para cada número, montar **3 referências**:
1. **× dezena anterior** (Δ %) — momentum
2. **× mesma dezena do mês passado** (Δ %) — sazonalidade
3. **× meta** da planilha
Puxar as dezenas anteriores do `historico-dezenas.md`. Se faltar (ex: maio não backfillado), marcar
⬜ e seguir com os comparativos possíveis.

### Passo 3 — Otimizações aplicadas (vitórias e perdas)
Do `registro-otimizacoes.md`, listar o que foi **aplicado nesta dezena** + resultado/veredito (✅/❌/⏳).
**Ser honesto com as perdas** — é o que constrói confiança com a Luciana.

### Passo 4 — Gerar os entregáveis
1. **Mensagem de abertura curta** (estilo dezena 1: "Lu, hoje é dia X — …") + o resumo formatado.
2. **Relatório** no formato da dezena 1: Resultado comercial → Pipeline ZenPro → Verba → Comparativos
   → Otimizações (o que rendeu) → Recomendações.
Tom da casa, pronto pra Elis **só encaminhar**.

### Passo 5 — Registrar
- Gravar a linha da dezena fechada no `historico-dezenas.md` (vira base do próximo comparativo).
- Salvar o relatório em `marketing/relatorios/` com data.
- Atualizar veredito das otimizações que fecharam janela no `registro-otimizacoes.md`.
- **Tirar o RETRATO do vendido:** anotar o masso *vendido acumulado* da Meta de Vendas **na data do fechamento** (dia 10/20/30). Sem esse retrato, o vendido por dezena **não é reconstruível depois** (lição do D2-jun/2026: a Meta de Vendas não tem corte por data). É o que destrava o incremental da próxima dezena.

## Regras
- **Sempre com comparativo** — Luciana preza isso. Nunca mandar número solto sem o Δ.
- **Leads ZenPro é o número auditado** — não inflar com cliques de plataforma (que subcontam/super­contam). Enquanto o tracking por canal não estiver limpo, dizer isso (igual fez a dezena 1).
- **Número junto de tudo.** Não inventar; dado faltando = ⬜ pendente.
- Honestidade com perdas tanto quanto com vitórias.
- Nunca usar "curso técnico"/"MEC" (ver `preferencias.md`).
