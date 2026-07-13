# 📈 Histórico de dezenas — sistema de comparativos

> **O que a Luciana mais preza: COMPARATIVO.** Aqui cada dezena vira uma linha.
> Com isso o **/relatorio-luciana** compara automático: dezena atual × dezena anterior, e × mesma dezena do mês passado.
> **Convenção (canon 24/06):** dezena = janela **incremental** (D1 = 01–10, D2 = 11–20, D3 = 21–fim). Régua de capa = **Vendido (Meta de Vendas)** — não o caixa. Leads = **ZenPro**. Detalhe: [README.md](README.md).
> **Atualizado:** 13/07/2026 — **Jul D1 fechado** (a dezena que confirmou o lag de conversão do Google)
>
> 🐛 **CORREÇÃO 12/07 — filtro da planilha escondia linhas.** A coluna `QUANT.` da *Meta de Vendas* é
> filtro-dependente e **subcontava**; a coluna `VENDIDO` sempre esteve certa. **Junho fez 32 matrículas,
> não 27** (o faturamento R$ 62.487,07 e o ROAS 2,82× não mudaram). Linhas que estavam ocultas:
> Hugo Alves Pinto (08/06, integral, R$ 3.600) e Yve Brandão Alves (22/06, intensivo, R$ 3.518,28).
> **Régua nova: baixar o `.xlsx` completo e conferir `soma do detalhe == VENDIDO do cabeçalho`.**
>
> **Mês fechado (v3 12/07):** maio = 35 vendas / R$ 54.593,11 (15 int+intens · 20 mensalistas) ·
> junho = **32** / R$ 62.487,07 (**18** int+intens · **14** mensalistas). Holos total vendido:
> mai R$ 124.034,91 → jun R$ 151.784,20 (+22%). Relatório: [2026-06-MES-relatorio-luciana.md](2026-06-MES-relatorio-luciana.md).

> 📌 **Régua de leads corrigida (13/07/2026).** A coluna "Leads ZenPro" é o **bruto** (todo contato novo da
> escola — inclui estágio social, auriculo, cursos livres). **Não é lead de massoterapia.** A coluna nova
> **"Leads MASSO"** é a que vai pro relatório da Luciana (`GC-*` + `IS-*`/`FB-*`/`mensalistas` + `OR-massoterapia`).
> Ver [README](README.md#-o-lead-bruto-não-é-lead-de-massoterapia-canon-13072026).

| Período | Vendas | Faturamento | Ticket médio | **Leads MASSO** *(G/I)* | Leads ZenPro *(bruto)* | Inv. Google | Inv. Meta | Inv. Total | ROAS | Obs |
|---------|--------|-------------|--------------|--------------|--------------|-------------|-----------|------------|------|-----|
| **Jul · D1** (01–10) | **11** | **R$ 28.432,68** | **R$ 2.584,79** | **148** *(84/55)* | 445 | R$ 7.642,34 | R$ 3.751,90 | **R$ 11.394,24** | **2,50×** | 🟢 **A VIRADA: ROAS Google 0,95× → 2,26× · Meta 1,45× → 1,96×** — a tese do lag de conversão do D3 se confirmou. **Leads masso 63 → 148 (+135%)** — Google +75%, Instagram +267%. Ticket +5,5%. 6 integral · 2 intensivo · **3 mensalista** 🔴 (era 7 no Jun D3 — oferta de 50% esfriou). Verba Meta agora inclui MENSALISTAS (régua nova). 100% das vendas rastreadas. Cauda >90d: R$ 3.818 (2) |
| **Jun · D1** (01–10) | **13** | **R$ 31.857,35** | R$ 2.451 | **63** *(48/15)* | 322 | R$ 8.520 | R$ 797 | R$ 9.317 | **3,42×** | **v3 12/07:** +1 venda (Hugo, integral R$ 3.600, oculta pelo filtro) e +Shirley (mensalista R$ 300, lançada depois de 24/06); −Nayane não muda. *(v2 era 12 / R$ 31.557,35 / 3,39×)* |
| **Jun · D2** (11–20) | 7 | R$ 14.619,28 | R$ 2.088 | **105** *(89/16)* | 354 | R$ 3.690 | R$ 569 | R$ 4.259 | 3,43× | FECHADO 24/06. **v3 confirma sem alteração** — única dezena que já estava certa |
| **Jun · D3** (21–30) | **12** | **R$ 16.010,44** | R$ 1.334 | **139** *(89/50)* | 363 | R$ 7.380 | R$ 1.187 | R$ 8.567 | **1,87×** | **v3 12/07:** recontado pelo detalhe (era 8 vendas por subtração de retratos). +Yve (intensivo R$ 3.518,28, oculta pelo filtro) + 7 mensalistas. **A oferta de 50% funcionou: 7 mensalistas em 10 dias** (vs 4 no D1, 3 no D2) |
| **Jun · MÊS** (01–30) | **32** | **R$ 62.487,07** | **R$ 1.953** | **307** *(226/81)* | 1.039 | R$ 19.590 | R$ 2.553 | R$ 22.143 | **2,82×** | **v3 12/07** (xlsx completo; D1+D2+D3 fecham exato). **ROAS por canal (regra 90d):** Google **0,95×** (R$ 18.579,42) · Meta **1,45×** ⬜ (R$ 3.700,30 — inclui `ref=mensalistas`, confirmado pago) · cauda >90d R$ 7.521 (4 vendas) · orgânico/indicação/interno R$ 32.686,35. **ROAS só-anúncio: 1,01×** |
| Mai · MÊS (01–31) | 35 | R$ 54.593,11 | R$ 1.560 | ⬜ | 976 | ⬜ | ⬜ | — | — | backfill 02/07 via aba mai26 (vendido). **Leads preenchidos 03/07 (ZenPro direto)**; verba de maio segue pendente |
| Mai · D1 (01–10) | ⬜ | ⬜ | — | ⬜ | 341 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); vendas/verba backfill (Métricas Holos) |
| Mai · D2 (11–20) | ⬜ | ⬜ | — | ⬜ | 312 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); resto backfill |
| Mai · D3 (21–31) | ⬜ | ⬜ | — | ⬜ | 323 | ⬜ | ⬜ | — | — | leads 03/07 (ZenPro); resto backfill |

## Como o comparativo entra no relatório
Para cada número, o /relatorio-luciana mostra 3 referências:
1. **Esta dezena × dezena anterior** (Δ %) → *momentum* (estamos acelerando ou desacelerando?)
2. **Esta dezena × mesma dezena do mês passado** (Δ %) → *sazonalidade* (junho D2 vs maio D2)
3. **× meta** da planilha → *onde estamos no passo do mês*

## Backfill pendente
Maio (D1/D2/D3) dá pra reconstruir da planilha **Métricas Holos** (tem snapshots diários acumulados: 10, 20, 30/mai). Rodar quando quiser o comparativo mês-a-mês completo. Até lá, o comparativo possível é **D2-jun × D1-jun** (momentum), que já temos.

## Fonte de cada número
Ver [dados/fontes.md](../../dados/fontes.md). Resumo: vendas+faturamento = META DE VENDAS (Drive); leads = ZenPro; investimento = Windsor (Google) + Meta Ads.
