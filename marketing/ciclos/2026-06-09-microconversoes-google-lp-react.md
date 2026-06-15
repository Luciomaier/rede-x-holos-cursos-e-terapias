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

## A investigar hoje (com Lucio)

- [ ] Qual é exatamente o "passo a mais" da LP React antes do WhatsApp? É necessário?
- [ ] As reclamações são de quê — leads não chegam? caminho confuso? demora?
- [ ] CPL e volume de leads **depois** de 09/06 vs **antes** (o algoritmo melhorou ou piorou?)
- [ ] O tracking GC-0hh1dj está atribuindo certo no ZenPro?
- [ ] Decisão de orçamento: a janela fechou — pode escalar ou precisa de mais alguns dias?

## Resultado / decisão

*(a preencher após a análise de hoje)*

---

## Registros de origem (vault)

- `wiki/daily/2026-06-09.md` — ações Google Ads do dia
- `Projetos/Holos/Campanhas/Google Ads — Estratégia e Histórico.md` — regras e histórico
- `Pessoas/Nick.md` — brief da LP Masso React
