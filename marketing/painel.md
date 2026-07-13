# 📊 Painel de Marketing — Holos

> **O dashboard da operação.** Abre aqui pra ver onde estamos no mês: conversas, matrículas, ROAS, faturamento — sempre contra a meta.
> **Metas oficiais (fonte da verdade):** [acordo-rede-holos.md → Números oficiais](../acordos/rede-publicidade/acordo-rede-holos.md)
> **Atualizado:** 13/07/2026 (**Jul D1 fechado** — a dezena que confirmou o lag de conversão do Google)

---

## 🟢 Julho · D1 (01–10) — A VIRADA

| Métrica | Jul D1 | Jun D1 | Δ |
|---|--------|--------|---|
| Matrículas novas | **11** | 13 | −15% |
| Vendido masso | **R$ 28.432,68** | R$ 31.857 | −10,8% |
| Ticket médio | **R$ 2.585** | R$ 2.451 | **+5,5%** 🟢 |
| **Leads MASSO** | **148** *(G 84 · I 55)* | 63 *(48/15)* | **+135%** 🟢 |
| *Leads brutos (todo o WhatsApp)* | *445* | *322* | *+38%* |
| Verba (Google 7.642 + Meta 3.752) | **R$ 11.394** | R$ 9.317 | +22% |
| CPL masso Google | **R$ 91** | R$ 178 | **−49%** 🟢 |
| CPL masso Instagram | R$ 68 | R$ 53 | +28% |
| **ROAS Google** | **2,26×** | *(jun mês: 0,95×)* | 🟢 **+138%** |
| **ROAS Meta** | **1,96×** | *(jun mês: 1,45×)* | 🟢 **+35%** |
| ROAS geral (régua da casa) | 2,50× | 3,42× | — |

🟢 **A aposta de junho pagou.** Mantivemos a verba do Google com ROAS em 0,95× apostando no lag de
conversão ("os leads de fim de junho viram matrícula em julho"). **Viraram: 2,26×.**
🟢 **100% das 11 matrículas rastreadas** — 1ª dezena com atribuição completa.
🔴 **Mensalista caiu pra 3** (era 7 no D3 de junho, com a oferta de 50%) — único motivo de estarmos
abaixo do passo do mês (22% das matrículas em 1/3 do mês).

📌 **Régua de leads corrigida (13/07 — pego pelo Lucio):** o bruto do ZenPro conta **todo contato da escola**
(estágio social, auriculo, cursos livres). **Não é lead de masso.** Capa da Lu agora usa o **lead masso
identificado**. E **o tracking NÃO piorou**: os sem-origem ficaram parados (233 → 242); o carimbado é que
dobrou (89 → 203) — o "45% → 54%" é armadilha de denominador.

🚨 **URGENTE — Google sem saldo:** conta com **R$ 890,83**, gasto ~R$ 930/dia → **menos de 1 dia no ar.**
⚠️ **Apurar:** print mostra Masso Geral em *Maximizar cliques · R$ 1.000/dia* — o registro diz
*Max Conversões · tCPA R$ 45 · R$ 800/dia* (23/06). Confirmar com o Lucio antes de dar veredito.

> Relatório: [2026-07-D1-relatorio-luciana.md](relatorios/2026-07-D1-relatorio-luciana.md) · PDF em `saidas/`

---

## 🐛 Correção de junho (12/07)

A coluna `QUANT.` da *Meta de Vendas* **respeita o filtro ativo da aba e subcontava**. A coluna `VENDIDO`
sempre esteve certa. **Junho fez 32 matrículas, não 27** — faturamento e ROAS **não mudaram**.
**Regra nova pra fechar dezena:** baixar o `.xlsx` completo (`/export?format=xlsx`) e conferir que
`soma do detalhe == VENDIDO do cabeçalho`. Export CSV e conector do Drive **omitem linhas filtradas**.

## Funil do mês

```
1.039 conversas/mês  (topo — ZenPro)
            ↓
   32 matrículas/mês  →  META 50  (baseline maio: 35)   ·  conversão 3,1%
```

## Matrículas — Junho/2026 (MÊS FECHADO v3 · vs maio completo)

| Tipo | Jun | Meta | % | Mai | Δ vs Mai |
|------|-----|------|---|-----|----------|
| Integral/Flex | **16** | 20 | 80% | — | 🟢 |
| Intensivo | 2 | 5 | 40% | — | |
| — *Integral + Intensivo* | **18** | 25 | 72% | 15 | **+20%** 🟢 |
| Mensalista novo (1ª) | **14** | 25 | 56% | 20 | **−30%** 🔴 |
| **TOTAL** | **32** | **50** | **64%** | 35 | **−9%** |

🟢 **Ticket médio +25%** (R$ 1.560 → R$ 1.953): menos mensalista de entrada, mais integral.
🟢 **Integral + intensivo cresceu 20%** — é o contrato que sustenta a escola.
🔴 Mensalista segue sendo o gargalo — **mas a curva subiu no fim do mês**: D1 4 · D2 3 · **D3 7** (oferta de 50% funcionou).
📲 Leads: **1.039 em junho** (vs 976 em maio, +6,5%) — D1 322 · D2 354 · D3 363 (ZenPro direto).

## Faturamento — Junho/2026 (MÊS FECHADO, régua vendido)

| | Valor | vs Mai |
|---|-------|--------|
| Holos total vendido (todas as frentes) | **R$ 151.784,20** (77% da meta R$ 196.099) | **+22%** 🟢 |
| **Massoterapia novas (capa)** | **R$ 62.487,07** | **+14%** 🟢 |
| Caixa (Métricas, retrato 30/06) | R$ 157.901,65 | — |

> Detalhe produto a produto e mês×mês: [relatório mensal](relatorios/2026-06-MES-relatorio-luciana.md)

## ROAS / Tráfego — Junho/2026 (fechado, regra 90 dias)

| Métrica | Valor | Obs |
|---------|-------|-----|
| Investido junho (masso) | R$ 22.143 | Google 19.590 + Meta 2.553 ⬜ |
| **ROAS geral do mês** (régua da casa) | **2,82×** | vendido novas ÷ investido — **inclui venda orgânica** |
| **ROAS só-anúncio** | **1,01×** | só vendas de origem paga ÷ verba — *"o anúncio se paga?"* |
| ROAS Google | **0,95×** | R$ 18.579,42 · quase se paga no mês — e deixa cauda |
| ROAS Meta/Instagram | **1,45×** ⬜ | R$ 3.700,30 com **12% da verba** 🟢 — canal a escalar |
| Cauda de campanhas antigas | R$ 7.521 | 4 matrículas de leads dez–mar (>90d) |
| Orgânico · indicação · interno | R$ 32.686,35 | 52% do vendido — **não vem de anúncio** |
| CPL Google | R$ 47,61 (plataforma) · R$ 84,80 (carimbado) | real entre os dois |

> ⚠️ **Duas réguas:** 2,82× divide *tudo* pela verba (inclui orgânico). 1,01× é o que o anúncio de fato
> devolve. Pra decidir verba, usar o **por canal**: Meta 1,45× × Google 0,95×.
> ⬜ **Pendente:** confirmar se os R$ 2.553 do Meta cobrem a campanha `mensalistas` (Lucio puxando print).
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
