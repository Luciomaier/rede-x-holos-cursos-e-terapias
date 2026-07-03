# 📊 Painel de Marketing — Holos

> **O dashboard da operação.** Abre aqui pra ver onde estamos no mês: conversas, matrículas, ROAS, faturamento — sempre contra a meta.
> **Metas oficiais (fonte da verdade):** [acordo-rede-holos.md → Números oficiais](../acordos/rede-publicidade/acordo-rede-holos.md)
> **Atualizado:** 03/07/2026 (**junho FECHADO** — Meta de Vendas com origem 100% + ZenPro direto)

---

## Funil do mês

```
~300–350 conversas/mês  (topo — ZenPro)
            ↓
   matrículas/mês  →  META 50  (baseline maio: 35)
```

## Matrículas — Junho/2026 (MÊS FECHADO · vs maio completo)

| Tipo | Jun | Meta | % | Mai | Δ vs Mai |
|------|-----|------|---|-----|----------|
| Integral/Flex | 15 | 20 | 75% | — | 🟢 (mai: 15 int+intens) |
| Intensivo | 2 | 5 | 40% | — | |
| Mensalista novo (1ª) | 10 | 25 | 40% | 20 | **−50%** 🔴 |
| **TOTAL** | **27** | **50** | **54%** | 35 | −23% |

🟢 **Ticket médio +48%** (R$ 1.560 → R$ 2.314): menos mensalista de entrada, mais integral.
🔴 Mensalista segue sendo o gargalo — mas a **oferta de 50% reagiu no D3** (4 novos em 10 dias vs 6 em 20).
📲 Leads: **1.039 em junho** (vs 976 em maio, +6,5%) — D1 322 · D2 354 · D3 363 (ZenPro direto).

## Faturamento — Junho/2026 (MÊS FECHADO, régua vendido)

| | Valor | vs Mai |
|---|-------|--------|
| Holos total vendido (todas as frentes) | **R$ 151.784,20** (77% da meta R$ 196.099) | **+22%** 🟢 |
| **Massoterapia novas (capa)** | **R$ 62.487,07** | **+14%** 🟢 |
| Caixa (Métricas, até 25/06 — sem retrato 30/06) | R$ 119.943,62 | — |
| Lucro (até 25/06) | −R$ 27.473,20 | estrutura de custo, não receita |

> Detalhe produto a produto e mês×mês: [relatório mensal](relatorios/2026-06-MES-relatorio-luciana.md)

## ROAS / Tráfego — Junho/2026 (fechado, origem 100% + regra 90 dias)

| Métrica | Valor | Obs |
|---------|-------|-----|
| Investido junho (masso) | R$ 22.143 | Google 19.590 + Meta 2.553 |
| **ROAS geral do mês** | **2,82×** | vendido novas ÷ investido |
| ROAS Google | 0,95× | quase se paga no mês — e deixa cauda |
| ROAS Meta/Instagram | 1,29× | **D3 isolado: 3,18×** 🟢 — canal a escalar |
| Cauda de campanhas antigas | R$ 7.521 | 4 matrículas de leads dez–mar (>90d) |
| CPL Google | R$ 47,61 (plataforma) · R$ 84,80 (carimbado) | real entre os dois |
| CPL Meta | **R$ 27,60** (D3) | |

> Referência histórica (mar–mai): ROAS geral 3,67× · investido R$ 80.986.

---

## Campanhas ativas (resumo)

| Campanha | Canal | LP | Status |
|----------|-------|----|--------|
| Masso Geral | Google Search | LP Masso React (Vercel) | ✅ Rodando · tracking GC-0hh1dj |
| Auriculo | Google Search | LP Auriculo | ✅ Rodando |
| Locação de Salas | Google Search | LP Salas | 🔵 Criar |
| Estágio Social | Meta Ads | LP Estágio | 🔵 Criar |

Detalhe: [campanhas/google-ads.md](campanhas/google-ads.md) · [campanhas/meta-ads.md](campanhas/meta-ads.md)

## 🔧 Ciclo em andamento

- [**2026-06-09 — Micro-conversões + LP React**](ciclos/2026-06-09-microconversoes-google-lp-react.md) — **Rodada 2 — fix confirmado (21/06):** auto-apply desligado + lance Max Conversões sem teto **destravou** — gasto rampando R$70→282→365/dia, 15-18 conv/dia a R$15-24 (CPA ótimo). Auto-apply OFF confirmado (otim. score 79%→47%). Saldo R$3.900 (não é o gargalo). **Novo gargalo: ALCANCE** (Google: "segmentando menos pesquisas") → ampliar palavras-chave. ⏳ Cross-check ZenPro + deixar aprendizado fechar (~2 sem).

---

## Como manter este painel

- Atualizar os números **toda dezena** (dias 10/20/30) junto com o relatório
- Matrículas e faturamento: puxar da planilha da Elis (Meta Mês)
- Conversas: puxar do ZenPro
- Mudança grande de campanha/LP vira um registro em [`ciclos/`](ciclos/)
