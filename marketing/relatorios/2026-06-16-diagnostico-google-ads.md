# Holos Google Ads — Diagnóstico (período 18/05 – 16/06/2026)

> **Preparado por:** Lucio Maier / Rede Publicidade
> **Data:** 17/06/2026
> **Fonte:** Windsor.ai → `google_ads`, conta `644-631-5099` "Holos Geral"
> **Janela:** últimos 30 dias (18/05 a 16/06/2026)

---

## 1. Visão geral — últimos 30 dias

| Campanha | Gasto | Conversões | Valor conv. | CPA | ROAS | CTR |
|---|---|---|---|---|---|---|
| **Masso Geral (PG_B)** | R$ 22.929 | 1.602,6 | R$ 296.542 | R$ 14,31 | **12,9x** | 14,3% |
| **Auriculo** | R$ 1.334 | 69,0 | R$ 1.500 | R$ 19,34 | 1,1x | 8,5% |

A Masso Geral é o motor: 94% do gasto e quase todo o valor de conversão.
À primeira vista, ROAS de 12,9x parece excelente. **Mas o número de 30 dias
esconde uma quebra grave no meio do período.**

---

## 2. ⚠️ O achado central — conversões despencaram em 09/06

A campanha **Masso Geral** roda normal até **08/06** e **quebra em 09/06**:

| Recorte | Dias | Gasto/dia | Conversões/dia | Valor conv. | CPA | ROAS |
|---|---|---|---|---|---|---|
| **Antes** (18/05–08/06) | 22 | R$ 933 | **71,9** | R$ 294.875 | R$ 12,99 | **14,4x** |
| **Depois** (09/06–16/06) | 8 | R$ 300 | **2,7** | R$ 1.667 | R$ 110,00 | **0,69x** |

Conversões caíram de **~72/dia para ~2,7/dia** — uma queda de **~96%** —
do dia 8 para o dia 9, sem transição.

## 3. Por que isso parece tracking quebrado, não venda que sumiu

O sinal é clássico de **conversão que parou de ser registrada**, não de campanha
que parou de vender:

- **Cliques continuaram normais.** No período "depois", o CPC até caiu (R$ 4,12 vs
  R$ 7,94). As pessoas seguem clicando e indo pro site.
- **Impressões continuaram.** O Google seguiu entregando (4.943 impressões em 8 dias).
- **O valor de conversão caiu junto, em lockstep** — de ~R$ 13k/dia para ~R$ 0–500/dia.
  Quando o tráfego é o mesmo mas conversão *e* valor zeram no mesmo dia, o
  problema quase sempre é o **tag/evento de conversão**, não o público.
- A quebra é **abrupta e numa data exata** (09/06) — comportamento de algo que
  foi mexido/quebrou (tag de conversão, GTM, deploy no site, mudança na LP),
  não de mercado esfriando (que seria gradual).

**Hipótese de trabalho:** a tag de conversão do Google Ads (ou o evento no
site/GTM) parou de disparar em 09/06. Confirmar antes de qualquer decisão de verba.

## 4. O que NÃO fazer agora

- ❌ **Não cortar a Masso Geral** com base no ROAS de 0,69x do "depois" — esse
  número provavelmente é falso (conversão não está sendo contada).
- ❌ **Não escalar verba** assumindo o ROAS de 14x do "antes" — primeiro
  restabelecer a medição pra saber o que é real hoje.

## 5. Próximos passos (a confirmar com o Lucio / Nick)

1. **Checar a tag de conversão** no Google Ads (status "Recebendo conversões"?)
   e o disparo do evento no site/GTM — o que mudou em ~09/06?
2. Cruzar com vendas reais da Holos no período 09–16/06: houve venda que o Ads
   não contou? (Isso fecha o diagnóstico de tracking.)
3. Verificar se houve **deploy / mudança na landing page** ou checkout em 08–09/06.
4. Avaliar **Auriculo** à parte: ROAS 1,1x é baixo — decidir se mantém, ajusta
   público/lances, ou pausa. (Verba pequena, baixa prioridade.)

---

*Resumo numérico bruto e por dia: ver `../dados/`. Histórico do trabalho: `log.md`.*
