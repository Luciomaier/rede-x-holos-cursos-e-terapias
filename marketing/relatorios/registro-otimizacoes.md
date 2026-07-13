# 🎯 Registro de otimizações — placar de vitórias e perdas

> **Cada mudança que a gente aplica vira uma linha aqui, com data e janela de medição.**
> Serve pra, na hora do comparativo, saber **o que moveu o número** — e ser honesto: tem otimização que ganha e tem que perde. Pontuar as duas.
> Detalhe de cada uma vive em [`marketing/ciclos/`](../ciclos/). Aqui é o índice/placar.
> **Atualizado:** 01/07/2026 · **Legenda:** ✅ vitória · ❌ perda · ⚠️ efeito colateral · ⏳ medindo

| Data | Otimização | Área | Objetivo | Resultado medido | Veredito |
|------|-----------|------|----------|------------------|----------|
| 09/06 | Migração LP WordPress → **React/Vercel** | LP/Google | LP mais rápida, melhor atribuição | Atribuição melhorou (via_google ↑, sem_origem ↓); surgiu "passo a mais" antes do WhatsApp | ✅⚠️ |
| 09/06 | **Desativar micro-conversões** (Engajamento/Rota/Compra) no Google | Google | Limpar sinal sujo p/ algoritmo | Conversões-lixo sumiram (correto); mas tCPA travou o lance → gasto despencou | ✅⚠️ |
| 15/06 | Lance Max Conversões (tCPA R$15) → **Max Cliques** | Google | Destravar entrega | Gasto voltou ~R$1.020/dia | ✅ (revertido pelo auto-apply) |
| 19/06 | **Desligar auto-apply** de recomendações + Max Conversões **sem teto de CPA** | Google | Impedir o robô de retravar o lance (causa-raiz) | Gasto R$70 → 282 → 365/dia, CPA R$15–24. **Confirmado no D2 (24/06): CPL Google R$181→R$42 (−77%), leads Google 47→87 (+85%) gastando menos** | ✅✅ vitória |
| 21/06 | **Cross-check ZenPro** (leads Masso Geral) | Tracking | Validar se os leads são reais | `GC-0hh1dj` 3→10→7 reais; achou códigos Meta órfãos (backlog) | ✅ |
| **23/06** | **Orçamento R$1.000→R$800/dia + lance Maximizar Conversões com tCPA R$45** (era "sem teto") | Google | Travar o estouro (teto de custo por lead) | **D3 fechado:** gasto ~R$738/dia, CPL R$47,61 ≈ tCPA. ⚠️ **MAS o print de 01–10/07 mostra a campanha em "Maximizar CLIQUES" com R$1.000/dia** — divergente do que registramos. **Veredito suspenso até o Lucio confirmar** se reverteu na mão ou se o Google remexeu | ⚠️ **apurar** |
| **23/06** | 🏆 **MANTER a verba do Google com ROAS em 0,95×** (contra o instinto de cortar), apostando no lag de conversão | Estratégia | Não matar o funil de julho | **Jul D1: ROAS Google 0,95× → 2,26× (+138%).** Os leads de fim de junho viraram matrícula em julho, exatamente como previsto. **A aposta mais importante do trimestre — e ela pagou** | ✅✅✅ **vitória** |
| **D3/06** | **Oferta de 50% pro mensalista novo** | Comercial | Reverter a queda de mensalistas | 7 mensalistas no D3/jun (vs 4 e 3) — funcionou. 🔴 **Mas caiu pra 3 no Jul D1.** Perdeu força ou parou de ser oferecida — **pendente entender com a Luciana** | ✅ depois 🔴 |
| **D1/07** | **Verba nova no Meta** (MASSO.PRES + conjunto MENSALISTAS na régua masso) | Meta | Escalar o canal mais eficiente | **CPL Meta R$56,90 → R$19,19 (−66%)** e ROAS 1,45× → **1,96×**. Conjunto de mensalistas marcado "alto desempenho" pelo próprio Meta | ✅ **vitória** |
| ⏳ 23/06+ | **Ampliar palavras-chave** alta intenção + consolidar grupos duplicados | Google | Destravar ALCANCE (gargalo atual) | ⏳ segue pendente — é o plano nº 2 do card de decisão do Jul D1 | ⏳ |
| ⏳ 23/06+ | **Consolidar criativos Meta** nos vencedores (de 15 anúncios) | Meta | Sair da fragmentação de verba | — | ⏳ |
| ⏳ 23/06+ | **Fix UTM Meta** (social→paid_social) + cadastrar códigos ZenPro + evento GA4 | Tracking | Atribuição limpa por canal | — | ⏳ (ver [plano de tracking](2026-06-23-plano-correcao-tracking.md)) |

## Como entra no relatório
No /relatorio-luciana, cada dezena ganha um bloco **"O que aplicamos nesta dezena (e o que rendeu)"**:
- Otimizações com janela de medição fechada → resultado + veredito (✅/❌).
- Otimizações em andamento → "⏳ medindo, resultado na próxima dezena".
- **Ser honesto com as perdas** — a Luciana confia mais quando vê que a gente mede e admite o que não funcionou, não só vende vitória.

## Regra
- Toda mudança grande de campanha/LP/tracking entra aqui **na hora que é aplicada** (com data).
- Quando a dezena seguinte fecha, volta aqui e preenche o **resultado + veredito**.
- Detalhe técnico e prova → registro em `marketing/ciclos/`.
