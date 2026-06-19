# Landing Pages — Holos (registro + tracking)

> As LPs da operação, com URL, código de tracking e status. Quando uma campanha aponta pra uma LP, o tracking tem que bater.
> ← [Painel de Marketing](../painel.md)

---

## LPs de Massoterapia (5)

| LP | Produto | URL | Tracking | Stack | Status |
|----|---------|-----|----------|-------|--------|
| Masso Presencial | Formação presencial (turmas 6 e 12 meses) | `app.holoscursoseterapias.com.br/massoterapia-lp` | GC-0hh1dj | React/Vercel (Nick) | ✅ No ar |
| Masso Mensalistas | Entrada por mensalidade (6m/12m) | `app.holoscursoseterapias.com.br/mensalistas/` | `IS-vygsza` | HTML estático (`holos-connect/public`) | ✅ No ar · WhatsApp formação |
| Masso Flex | 12× R$290 | — | — | — | ⬜ |
| Masso Essencial | 12× R$197 | — | — | — | ⬜ campanha não ativa |
| Masso EAD | 12× R$98 | — | — | — | ⬜ campanha não ativa |

## Outras LPs

| LP | URL | Stack | Status |
|----|-----|-------|--------|
| Auriculo | `app.holoscursoseterapias.com.br/curso-de-auriculoterapia` | Holos Connect | ✅ (reconstruir — Lovable degradou) |
| Locação de Salas | — | Holos Connect | ✅ Pronta |
| Atendimento Social | — | Holos Connect | ✅ Pronto |
| Desportiva 4x1 (imersão) | `app.holoscursoseterapias.com.br/desportiva-4x1/` | HTML estático (`holos-connect/public/desportiva-4x1`) | ✅ No ar · WhatsApp Giovanna |

---

## ⚠️ Pontos de atenção

- **LP Masso React tem um "passo a mais" antes de enviar pro WhatsApp** — possível fonte de fricção / reclamações (investigar — ver [ciclo 2026-06-09](../ciclos/2026-06-09-microconversoes-google-lp-react.md)).
- Padrão de tracking: Google = `GC-*` · Meta/Instagram = `IS-*`/`ME-*`. UTMs obrigatórias em toda campanha (o ZenPro lê pra atribuir o lead).
- Divisão de responsabilidade: **Nick** faz a LP · **Lucio** cuida de tracking, pixels e UTMs.

---

## 🏷️ Padrão de UTM + códigos de campanha

**Estrutura:** `utm_source` (instagram·facebook·google·whatsapp·brevo) · `utm_medium` (social·paid_social·cpc·email·bio·crm) · `utm_campaign` = **código da campanha** (ex: `IS-9iyrwz`).
⚠️ `utm_content` e `utm_term` **não são lidos** pelas LPs estáticas — não usar.

| Código | Canal | LP | Observação |
|--------|-------|----|-----------|
| `IS-9iyrwz` | Instagram/social | desportiva-4x1 | Meta Ads jun/26 · WhatsApp Giovanna (cursos livres) |
| `IS-vygsza` | Instagram/social | mensalistas | Meta Ads jun/26 · WhatsApp formação (Leo/Laura) |
| `GC-0hh1dj` | Google Search | massoterapia-lp | Masso Geral |
| `ME-ESTAG` | Meta | estágio social | 🔵 a criar |

> ⚠️ **Formato do Ref padronizado** em todas as LPs: `Ref: <código>` (linha nova). A `mensalistas` usava `#ref=` (corrigido em 19/06). O ZenPro lê esse formato.

**Como a LP `desportiva-4x1` rastreia (HTML estático):**
- Lê `utm_source/medium/campaign` + `ref` da **query** (do `?`, **não** do `#`).
- **Formulário** → grava no **Supabase** (`leads_campanha`) com os 3 UTMs + dispara Pixel `Lead`. *(Hoje essa lista fica parada → pendência 🔴 [automacoes.md](../automacoes.md): confirmação de email + sequência de nutrição.)*
- **WhatsApp** → anexa **1 linha** `Ref: X`, prioridade `ref → utm_campaign → utm_source → pacote → DIRETO`. Pelo WhatsApp só vai o Ref (não os 3 UTMs).
- Pixel Meta: `902498357163312`. **Sem tag do Google.**
- ⚠️ **Nunca hardcodar "Ref:" no texto da mensagem** — o script anexa sozinho a partir do `utm_campaign` (senão duplica).
