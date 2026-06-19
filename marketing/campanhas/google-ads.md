# Google Ads — Holos (estado + histórico)

> Estado atual das campanhas Google e o histórico de decisões. Outputs de skills (CSVs do `/anuncio-google`, relatórios) ficam em subpastas datadas; este arquivo é o **estado vivo**.
> ← [Painel de Marketing](../painel.md) · Espelha o histórico do vault: `Projetos/Holos/Campanhas/Google Ads — Estratégia e Histórico.md`

---

## Campanhas ativas (15/06/2026)

| Campanha | Tipo | Budget | LP | Tracking | Status |
|----------|------|--------|----|----------|--------|
| Masso Geral (PG_B) | Search | R$1.000/dia (teto) | LP Masso React (Vercel) | GC-0hh1dj | ✅ Maximizar Conversões s/ teto (19/06) |
| Auriculo | Search | — | LP Auriculo | — | ✅ Rodando |
| Locação de Salas | Search | R$25–50/dia | LP Salas | — | 🔵 Criar |

**Pausadas:** MASSO PMax (Display), Massoterapia 15 dias, Quiropraxia, Massagem Desportiva, CP Ventura, CP M Desportiva (todas 0 conversões ou baixa intenção).

## Lógica de canal (decisão 09/06)

- **Google Search** = fundo de funil (alta intenção — "curso de massoterapia")
- **Meta** = topo de funil (descoberta — público frio)

## Regras de otimização (não violar)

1. Nunca pausar Masso Geral sem avaliar impacto direto nas matrículas
2. Escalar budget em degraus de 7–10 dias — não saltos
3. Display só reativar com público segmentado (remarketing), nunca broad
4. Nova campanha: testar R$25–50/dia por 7 dias antes de escalar
5. **Conversão = lead real (formulário ou WhatsApp), nunca micro-conversão**
6. **Auto-aplicar recomendações DESLIGADO** — em 18/06 (21:38) o Google reverteu sozinho Max Cliques → Max Conversões tCPA R$14,27 e estrangulou a campanha. Lance é decisão nossa, não do robô (ver [ciclo 09/06 → Rodada 2](../ciclos/2026-06-09-microconversoes-google-lp-react.md))

## Conversões — config atual (desde 09/06)

- ✅ **Ativas:** Formulário de lead · Lead telefônico
- ❌ **Desativadas:** Engajamento · Ver rota · Compra *(micro-conversões — davam sinal sujo R$0)*
- Webhook ZenPro × Google Ads: ✅ funcionando (envia conversão de lead real)

## Próximos passos

- [ ] Ampliar orçamento Masso Geral (limitado — deixando leads na mesa)
- [ ] Criar campanha Locação de Salas (Search)
- [ ] Fase 2 — Remarketing (visitantes não convertidos, listas Brevo, contatos ZenPro, lookalike de alunos)

---

*Histórico completo de decisões (22/04, 09/06): ver doc do vault linkado acima.*
