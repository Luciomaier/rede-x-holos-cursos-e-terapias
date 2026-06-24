# 🎯 Registro de otimizações — placar de vitórias e perdas

> **Cada mudança que a gente aplica vira uma linha aqui, com data e janela de medição.**
> Serve pra, na hora do comparativo, saber **o que moveu o número** — e ser honesto: tem otimização que ganha e tem que perde. Pontuar as duas.
> Detalhe de cada uma vive em [`marketing/ciclos/`](../ciclos/). Aqui é o índice/placar.
> **Atualizado:** 23/06/2026 · **Legenda:** ✅ vitória · ❌ perda · ⚠️ efeito colateral · ⏳ medindo

| Data | Otimização | Área | Objetivo | Resultado medido | Veredito |
|------|-----------|------|----------|------------------|----------|
| 09/06 | Migração LP WordPress → **React/Vercel** | LP/Google | LP mais rápida, melhor atribuição | Atribuição melhorou (via_google ↑, sem_origem ↓); surgiu "passo a mais" antes do WhatsApp | ✅⚠️ |
| 09/06 | **Desativar micro-conversões** (Engajamento/Rota/Compra) no Google | Google | Limpar sinal sujo p/ algoritmo | Conversões-lixo sumiram (correto); mas tCPA travou o lance → gasto despencou | ✅⚠️ |
| 15/06 | Lance Max Conversões (tCPA R$15) → **Max Cliques** | Google | Destravar entrega | Gasto voltou ~R$1.020/dia | ✅ (revertido pelo auto-apply) |
| 19/06 | **Desligar auto-apply** de recomendações + Max Conversões **sem teto de CPA** | Google | Impedir o robô de retravar o lance (causa-raiz) | Gasto R$70 → 282 → 365/dia, CPA R$15–24. **Confirmado no D2 (24/06): CPL Google R$181→R$42 (−77%), leads Google 47→87 (+85%) gastando menos** | ✅✅ vitória |
| 21/06 | **Cross-check ZenPro** (leads Masso Geral) | Tracking | Validar se os leads são reais | `GC-0hh1dj` 3→10→7 reais; achou códigos Meta órfãos (backlog) | ✅ |
| **23/06** | **Orçamento R$1.000→R$800/dia + lance Maximizar Conversões com tCPA R$45** (era "sem teto") | Google | Travar o estouro (teto de custo por lead) | **baseline 23/06: 3 leads · R$932 · 476 impr · CPA ~R$155-310/lead** | ⏳ medir 1-2 sem |
| ⏳ 23/06+ | **Ampliar palavras-chave** alta intenção + consolidar grupos duplicados | Google | Destravar ALCANCE (gargalo atual) | — | ⏳ medir na próxima dezena |
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
