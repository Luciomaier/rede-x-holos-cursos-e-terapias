# Plano de ataque — Tracking + Google Ads Holos (17/06/2026)

> Sequência lógica pra resolver a quebra de conversões (09/06) e destravar a
> entrega. Executor: Lucio. Princípio-mestre: **estabilizar o volume sem
> depender de conversão, consertar a medição, só então voltar pro lance smart.**

---

## Princípio estratégico (por que essa ordem)

São dois problemas distintos:
- **Raiz:** tracking de conversão quebrado em 09/06 → o lance smart pisa no freio.
- **Sintoma urgente:** sem leads agora, reclamações voltando.

Não dá pra confiar em lance por conversão enquanto a medição está cega — mas
consertar e re-aprender leva dias. Então: **primeiro segura o volume num lance
que NÃO depende de conversão (Fase 0), depois conserta a raiz (Fase 1–2), e só
no fim volta pro smart bidding (Fase 3).** E nunca trocar de estratégia dia a dia.

---

## FASE 0 — Estancar o sangramento (hoje, ~15 min)

Objetivo: leads voltando hoje, sem reabrir o chicote.

1. Manter a Masso em **Maximizar cliques** (já está) — é o certo enquanto a
   conversão está cega.
2. **Remover ou subir muito o limite de CPC máximo.** É a causa provável do
   "um dia sim, outro não" (parcela de impressões caiu 76%→31% = perdendo leilão).
   CPC histórico da Masso ~R$7–8 → se houver teto, ele está sufocando. Tira o teto
   ou põe em ~R$15+.
3. Confirmar o **orçamento diário** no valor-alvo (a campanha rodava ~R$700–900/dia
   com saúde; hoje gastou R$3).
4. **Travar a estratégia por 5–7 dias.** Cada troca reinicia o aprendizado.

✅ Saída da Fase 0: gasto volta pra perto da verba ainda hoje/amanhã.

---

## FASE 1 — Diagnosticar a quebra de tracking (raiz)

Objetivo: achar o que mudou em **08→09/06** que parou a conversão.

1. **Google Ads → Metas → Conversões.** Olhar o status da ação de conversão
   principal da Masso. Procurar: "Sem conversões recentes", "Tag inativa",
   "Não está registrando". Anotar qual ação quebrou e desde quando.
2. **Identificar a fonte da conversão:** tag do Google Ads (gtag/GTM), importação
   do GA4, ou conversão offline/enhanced? O ponto de quebra muda onde olhar.
3. **O que mudou em 08–09/06** (a quebra é abrupta numa data exata = alguém mexeu):
   - Deploy no site / publicação de container no GTM?
   - Mudança na landing page ou na URL de "obrigado"/checkout?
   - ID de conversão / rótulo alterado ou tag removida?
   - Banner de consentimento (LGPD) novo bloqueando o disparo?
4. **Verificar disparo ao vivo:** Tag Assistant / Preview do GTM / Network na
   página de conversão — a tag dispara hoje? Com o valor certo?
5. Se a conversão importa do **GA4**: checar se o evento-chave parou no GA4
   também (isola se é GA4 ou só a importação pro Ads).

🎯 Resultado esperado: ponto exato da quebra identificado (tag, GTM, LP ou consentimento).

---

## FASE 2 — Corrigir e validar a medição

1. Corrigir o que a Fase 1 apontou (republicar tag, corrigir URL, ajustar
   consentimento, recriar a ação de conversão, etc.).
2. **Disparar uma conversão de teste** e confirmar no Tag Assistant que ela
   dispara (imediato) — o número no Google Ads pode levar 24–48h pra aparecer.
3. Acompanhar a coluna de conversões voltar à vida nas 24–72h seguintes.

> Nota: no dia 15/06 (R$675 de gasto) só 3 conversões foram registradas — mas é
> bem provável que tenha havido leads/vendas reais não contados. Ou seja: a
> performance real pode estar OK; estamos é cegos. Confirmar cruzando com vendas.

---

## FASE 3 — Voltar pro lance smart (só com medição confiável)

1. Depois de **3+ dias** registrando conversão de forma estável, migrar de
   "Maximizar cliques" → **Maximizar conversões** (ou tCPA).
2. Se usar tCPA, ancorar perto do **CPA histórico (~R$13–14)**.
3. Aceitar ~7 dias de aprendizado. **Não mexer** durante o aprendizado.

---

## Checklist rápido

- [ ] F0: tirar/subir teto de CPC máx. da Masso
- [ ] F0: confirmar orçamento diário
- [ ] F0: travar estratégia por 5–7 dias
- [ ] F1: status da ação de conversão no Google Ads
- [ ] F1: identificar fonte (gtag/GTM/GA4/offline)
- [ ] F1: o que mudou em 08–09/06
- [ ] F1: verificar disparo ao vivo (Tag Assistant)
- [ ] F2: corrigir + conversão de teste
- [ ] F2: confirmar conversões voltando (24–72h)
- [ ] F2: cruzar com vendas reais 09–16/06
- [ ] F3: migrar p/ Maximizar conversões / tCPA quando estável
