# 📈 Histórico de dezenas — sistema de comparativos

> **O que a Luciana mais preza: COMPARATIVO.** Aqui cada dezena vira uma linha.
> Com isso o **/relatorio-luciana** compara automático: dezena atual × dezena anterior, e × mesma dezena do mês passado.
> **Convenção (canon 24/06):** dezena = janela **incremental** (D1 = 01–10, D2 = 11–20, D3 = 21–fim). Régua de capa = **Vendido (Meta de Vendas)** — não o caixa. Leads = **ZenPro**. Detalhe: [README.md](README.md).
> **Atualizado:** 02/07/2026
>
> **Retratos do vendido acumulado (masso novas, Meta de Vendas):** 20/06 = R$ 46.176,63 (19 vendas) · **30/06 = R$ 62.487,07 (27 vendas)**. Base pra reconstruir o incremental por dezena.
> **Mês fechado (backfill 02/07, abas jun26/mai26):** maio completo = 35 vendas novas / R$ 54.593,11 (15 integral+intensivo · 20 mensalistas) · junho completo = 27 / R$ 62.487,07 (17 · 10). Holos total vendido: mai R$ 124.034,91 → jun R$ 151.784,20 (+22%). Relatório mensal: [2026-06-MES-relatorio-luciana.md](2026-06-MES-relatorio-luciana.md).

| Período | Vendas | Faturamento | Ticket médio | Leads ZenPro | Inv. Google | Inv. Meta | Inv. Total | ROAS | Obs |
|---------|--------|-------------|--------------|--------------|-------------|-----------|------------|------|-----|
| **Jun · D1** (01–10) | 12 | R$ 31.557,35 | R$ 2.630 | 322 | R$ 8.520 | R$ 797 | R$ 9.317 | 3,39× | régua = masso vendas NOVAS (Integral+Intensivo+1ªmens), Meta de Vendas detalhe. *(Valor original 25/R$45.524/4,88× era all-products — corrigido 24/06)* |
| **Jun · D2** (11–20) | 7 | R$ 14.619,28 | R$ 2.088 | 354 | R$ 3.690 | R$ 569 | R$ 4.259 | 3,43× | FECHADO 24/06 (vendido, Meta de Vendas detalhe). Momentum de matrículas caiu vs D1 apesar de leads +10% — vigiar conversão no D3 |
| **Jun · D3** (21–30) | 8 | R$ 16.310,44 | R$ 2.039 | 363 | R$ 7.380 | R$ 1.187 | R$ 8.567 | 1,90× | FECHADO 01/07. Régua vendido novas (retrato 30/06 = R$ 62.487,07/27 − retrato 20/06 R$ 46.176,63/19). Faturamento +12% mas verba dobrou → ROAS caiu 3,4×→1,9× (lag de conversão, vigiar julho). Leads 45% sem origem (chips manuais). Investimento = só campanhas masso (Google Masso Geral + Meta MASSO.PRES, print 21–30). **v2 03/07:** leads padronizados via ZenPro direto (363); origem 100% preenchida; ROAS por canal D3: **Meta 3,18×** · Google 0,55× (lag) |
| **Jun · MÊS** (01–30) | **27** | **R$ 62.487,07** | R$ 2.314 | 1.039 | R$ 19.590 | R$ 2.553 | R$ 22.143 | **2,82×** | FECHADO 02/07 (consolidação D1+D2+D3; bate com retrato 30/06). **ROAS por canal v2 (03/07, origem 100% + regra 90d):** Google **0,95×** (R$ 18.579) · Meta **1,29×** (R$ 3.284) · campanhas antigas >90d R$ 7.521 · sem origem R$ 0. Leads padronizados ZenPro: 1.039 |
| Mai · MÊS (01–31) | 35 | R$ 54.593,11 | R$ 1.560 | 976 | ⬜ | ⬜ | — | — | backfill 02/07 via aba mai26 (vendido). **Leads preenchidos 03/07 (ZenPro direto)**; verba de maio segue pendente |
| Mai · D1 (01–10) | ⬜ | ⬜ | — | 341 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); vendas/verba backfill (Métricas Holos) |
| Mai · D2 (11–20) | ⬜ | ⬜ | — | 312 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); resto backfill |
| Mai · D3 (21–31) | ⬜ | ⬜ | — | 323 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); resto backfill |

## Como o comparativo entra no relatório
Para cada número, o /relatorio-luciana mostra 3 referências:
1. **Esta dezena × dezena anterior** (Δ %) → *momentum* (estamos acelerando ou desacelerando?)
2. **Esta dezena × mesma dezena do mês passado** (Δ %) → *sazonalidade* (junho D2 vs maio D2)
3. **× meta** da planilha → *onde estamos no passo do mês*

## Backfill pendente
Maio (D1/D2/D3) dá pra reconstruir da planilha **Métricas Holos** (tem snapshots diários acumulados: 10, 20, 30/mai). Rodar quando quiser o comparativo mês-a-mês completo. Até lá, o comparativo possível é **D2-jun × D1-jun** (momentum), que já temos.

## Fonte de cada número
Ver [dados/fontes.md](../../dados/fontes.md). Resumo: vendas+faturamento = META DE VENDAS (Drive); leads = ZenPro; investimento = Windsor (Google) + Meta Ads.
