# Ciclo — Micro-conversões Google + LP React (09–16/06/2026)

> Um "ciclo" é uma mudança com começo, meio e fim — registrada pra a gente medir o efeito e não repetir cego.
> **Status:** 🔴 Em andamento — janela fechando, reclamações chegando. **Atacar 15/06.**
> ← [Painel de Marketing](../painel.md)

---

## Hipótese

As **micro-conversões** (Engajamento, Ver rota, Compra) davam sinal sujo ao Google (R$0 de valor real) e atrapalhavam o algoritmo a aprender a entregar leads de qualidade. Limpar os sinais + migrar a LP (WordPress → React, mais rápida) deveria melhorar CPL e Quality Score.

## O que foi feito — 09/06/2026

| Mudança | Detalhe |
|---------|---------|
| LP migrada | WordPress → **React/Vercel** (Nick) · `app.holoscursoseterapias.com.br/massoterapia-lp` |
| Campanha repontada | Masso Geral → LP nova · tracking **GC-0hh1dj** |
| Micro-conversões | ❌ desativadas: Engajamento, Ver rota, Compra · ✅ mantidas: Formulário de lead, Lead telefônico |
| Webhook | ZenPro × Google Ads corrigido (bug `pollUpdateMessage` → `messages.upsert`) |

## A regra aplicada

> **Não mexer no orçamento por ~7 dias** — depois de limpar os sinais de conversão, o algoritmo precisa reaprender. Mexer no budget reseta o aprendizado.

- Janela de recalibração: **09/06 → ~16/06**.
- ⚠️ Conferir a data: Lucio menciona "ciclo fechou ontem" (14/06). Alinhar o marco inicial real — define se os 7 dias já completaram.

## Status atual — 15/06/2026

- Ciclo praticamente fechado (fim da janela de recalibração).
- 🔴 **Reclamações começaram a chegar.**
- 🔍 Suspeita principal: a **LP React tem um "passo a mais" antes de enviar pro WhatsApp** — fricção extra no caminho do lead pode estar derrubando a experiência / conversão.

## 🔬 Diagnóstico fechado — 15/06/2026 (dados reais)

### Dado 1 — Google Ads (Windsor.ai), campanha Masso Geral

| Métrica | Antes (01–08/06) | Depois (09–14/06) | Δ |
|---------|------------------|-------------------|---|
| Gasto/dia | R$ 911 | R$ 275 (→ R$25 em 15/06) | **−70% e caindo** |
| Conversões/dia | 69,7 | 2,2 | **−97%** |
| Cliques/dia | 116 | 72 | −38% |
| CPL | R$ 13 | R$ 127 | +873% |

### Dado 2 — ZenPro (leads REAIS), org Holos

| Métrica | Antes (01–08/06) | Depois (09–14/06) | Δ |
|---------|------------------|-------------------|---|
| Leads total/dia | 31,5 | 30,2 | **−4% (estável!)** |
| Via Google/dia | 2,5 | 8,3 | **+233%** |
| Sem origem/dia | 26,0 | 15,8 | −39% |

### Conclusão (o cruzamento mudou a hipótese)

1. **Leads reais NÃO secaram** (~30/dia estável). A LP React **melhorou** a atribuição (via_google subiu, sem_origem caiu) — o "passo a mais" **não quebrou tracking**.
2. **As "70 conversões/dia" eram lixo** (micro-conversões). Tirá-las foi correto.
3. **O gargalo real:** lance **Maximizar Conversões com CPA desejado R$15**. O R$15 foi calibrado nas conversões-lixo; com conversões limpas, o CPA real virou R$120+ → o algoritmo travou o lance pra não pagar caro → gasto despencou R$911→R$25/dia. Não é falta de verba (gasta R$25 de budget R$1.000).
4. **Gap secundário:** Google conta ~2 conv/dia, ZenPro recebe ~8 leads do Google/dia → **gap de ~6 leads/dia** que chegam mas o Google não registra (webhook ZenPro→Google subcontando) → isso alimenta o estrangulamento.

## ✅ Ação tomada — 15/06/2026

- **Estratégia de lance trocada: Maximizar Conversões (tCPA R$15) → Maximizar Cliques** (CPC máx R$10). Salvo, campanha em "aprendizado em andamento". Solta o freio e devolve tráfego/gasto.
- **Orçamento mantido** em R$1.000/dia (não era o freio).
- **Saldo pré-pago:** R$3.062 (~3 dias no ritmo cheio). Lucio repõe **+R$5.000** assim que confirmar performance.

## ⏭️ Próximos passos

- [ ] **Verificar performance** (Lucio + Windsor) em 2–3h: gasto e cliques voltando?
- [ ] **Repor saldo +R$5k** (Holos paga a verba) quando confirmar entrega
- [ ] **Consertar o gap de conversão:** webhook ZenPro→Google deve mandar os ~8 leads reais, não só 2. Quando o Google contar o real, dá pra voltar ao lance por conversão **com tCPA recalibrado** (realista: R$80–130, não R$15)
- [ ] Reavaliar em ~7 dias: com sinal real, migrar de volta pra Maximizar Conversões se fizer sentido

---

## Registros de origem (vault)

- `wiki/daily/2026-06-09.md` — ações Google Ads do dia
- `Projetos/Holos/Campanhas/Google Ads — Estratégia e Histórico.md` — regras e histórico
- `Pessoas/Nick.md` — brief da LP Masso React
