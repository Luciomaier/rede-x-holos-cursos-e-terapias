# 📊 Painel de Marketing — Holos

> **O dashboard da operação.** Abre aqui pra ver onde estamos no mês: conversas, matrículas, ROAS, faturamento — sempre contra a meta.
> **Metas oficiais (fonte da verdade):** [acordo-rede-holos.md → Números oficiais](../acordos/rede-publicidade/acordo-rede-holos.md)
> **Atualizado:** 21/06/2026

---

## Funil do mês

```
~300–350 conversas/mês  (topo — ZenPro)
            ↓
   matrículas/mês  →  META 50  (baseline maio: 35)
```

## Matrículas — Junho/2026 (parcial 15/06)

| Tipo | Realizado | Meta | % | Maio (ref) |
|------|-----------|------|---|------------|
| Integral (cartão/à vista) | 10 | 25 | 40% | 15 |
| Mensalista (mensalidade) | 3 | 25 | 12% | 20 |
| **TOTAL** | **13** | **50** | **26%** | **35** |

⚠️ **Mensalista é o gargalo** — atrás do passo. Integral em bom ritmo.

## Faturamento — Junho/2026 (parcial 15/06)

| | Valor |
|---|-------|
| Meta mensal | R$ 195.101,55 |
| Realizado (snapshot) | R$ 60.151,77 (~31%) |
| Falta | R$ 134.949,78 |

*Detalhe produto a produto: [acordo → planilha da Elis](../acordos/rede-publicidade/acordo-rede-holos.md)*

## ROAS / Tráfego — última medição (Mar–Mai/2026)

| Métrica | Valor | Obs |
|---------|-------|-----|
| Investido (período) | R$ 80.986 | relatório mar–mai |
| ROAS geral | 3,67× | |
| ROAS Instagram | 2,45× | com só 12% da verba — alavanca |
| Google Masso Geral | 47,14% conv · R$10,97/conv | medição 22/04 |

⬜ **Atualizar com números de junho** (relatório da dezena)

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
