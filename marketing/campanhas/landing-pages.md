# Landing Pages — Holos (registro + tracking)

> As LPs da operação, com URL, código de tracking e status. Quando uma campanha aponta pra uma LP, o tracking tem que bater.
> ← [Painel de Marketing](../painel.md)

---

## LPs de Massoterapia (5)

| LP | Produto | URL | Tracking | Stack | Status |
|----|---------|-----|----------|-------|--------|
| Masso Presencial | Formação presencial (turmas 6 e 12 meses) | `app.holoscursoseterapias.com.br/massoterapia-lp` | GC-0hh1dj | React/Vercel (Nick) | ✅ No ar |
| Masso Mensalistas | Entrada por mensalidade | *(nova — confirmar URL)* | — | React/Vercel | 🆕 Nova |
| Masso Flex | 12× R$290 | — | — | — | ⬜ |
| Masso Essencial | 12× R$197 | — | — | — | ⬜ campanha não ativa |
| Masso EAD | 12× R$98 | — | — | — | ⬜ campanha não ativa |

## Outras LPs

| LP | URL | Stack | Status |
|----|-----|-------|--------|
| Auriculo | `app.holoscursoseterapias.com.br/curso-de-auriculoterapia` | Holos Connect | ✅ (reconstruir — Lovable degradou) |
| Locação de Salas | — | Holos Connect | ✅ Pronta |
| Atendimento Social | — | Holos Connect | ✅ Pronto |

---

## ⚠️ Pontos de atenção

- **LP Masso React tem um "passo a mais" antes de enviar pro WhatsApp** — possível fonte de fricção / reclamações (investigar — ver [ciclo 2026-06-09](../ciclos/2026-06-09-microconversoes-google-lp-react.md)).
- Padrão de tracking: Google = `GC-*` · Meta = `#ref=ME-*`. UTMs obrigatórias em toda campanha (o ZenPro lê pra atribuir o lead).
- Divisão de responsabilidade: **Nick** faz a LP · **Lucio** cuida de tracking, pixels e UTMs.
