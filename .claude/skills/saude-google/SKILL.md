---
name: saude-google
description: >
  Check rápido de saúde do Google Ads: puxa gasto / CPA / conversões / alcance (Windsor.ai),
  cruza com os leads REAIS do ZenPro e flagra as armadilhas já conhecidas (auto-apply revertendo
  o lance, tCPA travando a entrega, gap de atribuição Google×ZenPro, saldo pré-pago baixo).
  Devolve status 🟢🟡🔴 + o que mudou + a ação recomendada.
  Use quando o usuário disser "como tá o Google", "saúde da campanha", "o Google travou de novo?",
  "checa o Masso Geral", "saude-google", "/saude-google".
  NÃO confundir com /relatorio-ads (que formata um relatório a partir de CSV exportado).
---

# /saude-google — Monitor de saúde do Google Ads

Monitor ao vivo, não relatório. Cruza o que o Google diz (Windsor) com o que de fato chegou
(ZenPro) e avisa quando algo trava — antes de queimar dias de verba.

## Dependências

- **Dados Google:** Windsor.ai (conta "Holos Geral" 644-631-5099) — gasto, conversões, CPA, cliques, alcance
- **Leads reais:** ZenPro (org Holos) — leads por dia e por origem (`GC-...` da campanha)
- **Histórico/estado:** `marketing/campanhas/google-ads.md`, `marketing/ciclos/` (ciclo aberto)
- **Atribuição:** `marketing/campanhas/landing-pages.md` (gap de tracking conhecido)

---

## Workflow

### Passo 1 — Puxar os números (período padrão: últimos 7 dias)
- Google (Windsor): gasto/dia, conversões/dia, CPA, cliques, **alcance** (impressões / "segmentando menos pesquisas").
- ZenPro: leads/dia total e leads/dia via Google (`GC-0hh1dj` e afins).

### Passo 2 — Cruzar Google × ZenPro
- Comparar conversões que o Google conta vs. leads que o ZenPro recebe do Google.
- **Gap = leads reais que o Google não registrou** → indica webhook ZenPro→Google subcontando.

### Passo 3 — Rodar o checklist de armadilhas conhecidas
Verificar explicitamente cada uma (são as que já morderam a operação):

1. **Auto-apply revertendo o lance** — o robô "Recommendations Auto-Apply" volta a estratégia pra
   Maximizar Conversões com tCPA ~R$14 (1/3 do CPA real). Deve estar **DESLIGADO**. Se o gasto
   despencou do nada, suspeitar disso primeiro (ver Histórico de alterações).
2. **tCPA travando a entrega** — meta de CPA abaixo do CPA real (~R$39) fecha a torneira.
3. **Gap de atribuição** — Google contando muito menos que o ZenPro recebe.
4. **Saldo pré-pago baixo** — "há pouco fundo pré-pago" freia entrega.
5. **Alcance limitado** — "não gastou o orçamento", "segmentando menos pesquisas", "público-alvo
   limitado" → gargalo é palavra-chave, não lance.

### Passo 4 — Status + ação
Devolver enxuto:
- **🟢/🟡/🔴** por frente (lance, alcance, atribuição, saldo).
- **O que mudou** vs. a última checagem.
- **Ação recomendada** — uma só, a mais alavancada. Se for "não mexer, deixar o aprendizado fechar", dizer isso.

### Passo 5 — Registrar se for mudança grande
Qualquer alteração de campanha (lance, estratégia, keywords) vira/atualiza registro em
`marketing/ciclos/`. Não deixar mudança sem rastro.

## Regras

- **Confiar no ZenPro como verdade de lead**, não na contagem do Google (que subconta).
- Durante janela de aprendizado (~2 semanas após trocar estratégia de lance): **não mexer no lance**, só no alcance (keywords).
- Nunca recomendar mexer no orçamento como primeira ação se o sintoma é lance/atribuição — diagnosticar a causa-raiz antes.
- Toda recomendação pra Luciana/Elis = número junto (preferências).
- Se faltar acesso a Windsor ou ZenPro, dizer o que não deu pra puxar — não preencher com chute.
