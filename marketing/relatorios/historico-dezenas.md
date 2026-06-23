# 📈 Histórico de dezenas — sistema de comparativos

> **O que a Luciana mais preza: COMPARATIVO.** Aqui cada dezena vira uma linha.
> Com isso o **/relatorio-luciana** compara automático: dezena atual × dezena anterior, e × mesma dezena do mês passado.
> **Convenção:** dezena = janela **incremental** (D1 = 01–10, D2 = 11–20, D3 = 21–fim). Números = **venda comercial nova** + faturamento da janela.
> **Atualizado:** 23/06/2026

| Período | Vendas | Faturamento | Ticket médio | Leads ZenPro | Inv. Google | Inv. Meta | Inv. Total | ROAS | Obs |
|---------|--------|-------------|--------------|--------------|-------------|-----------|------------|------|-----|
| **Jun · D1** (01–10) | 25 | R$ 45.524,51 | R$ 1.821 | 287 | R$ 8.520 | R$ 797 | R$ 9.317 | 4,88× | 1º relatório do novo protocolo |
| **Jun · D2** (11–20) | ⬜ | ⬜ | — | ⬜ | ⬜ | ⬜ | — | — | **a fechar (atrasado — fechar hoje)** |
| Mai · D1 (01–10) | ⬜ | ⬜ | — | ⬜ | ⬜ | ⬜ | — | — | backfill (Métricas Holos) |
| Mai · D2 (11–20) | ⬜ | ⬜ | — | ⬜ | ⬜ | ⬜ | — | — | backfill |
| Mai · D3 (21–31) | ⬜ | ⬜ | — | ⬜ | ⬜ | ⬜ | — | — | backfill |

## Como o comparativo entra no relatório
Para cada número, o /relatorio-luciana mostra 3 referências:
1. **Esta dezena × dezena anterior** (Δ %) → *momentum* (estamos acelerando ou desacelerando?)
2. **Esta dezena × mesma dezena do mês passado** (Δ %) → *sazonalidade* (junho D2 vs maio D2)
3. **× meta** da planilha → *onde estamos no passo do mês*

## Backfill pendente
Maio (D1/D2/D3) dá pra reconstruir da planilha **Métricas Holos** (tem snapshots diários acumulados: 10, 20, 30/mai). Rodar quando quiser o comparativo mês-a-mês completo. Até lá, o comparativo possível é **D2-jun × D1-jun** (momentum), que já temos.

## Fonte de cada número
Ver [dados/fontes.md](../../dados/fontes.md). Resumo: vendas+faturamento = META DE VENDAS (Drive); leads = ZenPro; investimento = Windsor (Google) + Meta Ads.
