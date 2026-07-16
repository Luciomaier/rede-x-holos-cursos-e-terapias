# Landing Pages — Holos (registro + tracking)

> As LPs da operação, com URL, código de tracking e status. Quando uma campanha aponta pra uma LP, o tracking tem que bater.
> ← [Painel de Marketing](../painel.md)

---

## LPs de Massoterapia (5)

> 🔴 **AUDITORIA 14/07 + verificação 16/07** (ver [auditoria](../relatorios/2026-07-14-auditoria-trafego-vazamentos.md)):
> 1. **A `massoterapia-lp` NÃO é React** — é **HTML estático** (`holos-connect/public/massoterapia-lp/index.html`).
>    Isso **resolve a pendência C0** do [plano de tracking](../relatorios/2026-06-23-plano-correcao-tracking.md).
> 2. **Não são "2 páginas" de masso a unificar — são 6.** Existem 4 páginas React no ar
>    (`/formacao-massoterapia`, `/funil-massoterapia`, `/formacao-massoterapia-litoral-sul`,
>    `/formacao-imersiva-holos-natureza`) com link `wa.me` **e nenhuma atribuição** **e nenhuma tag de
>    conversão**. 🔴 **Todo lead delas entra no ZenPro como "sem código"** — e "sem código" é **58% dos
>    leads de julho**. **Confirmar pra onde as campanhas apontam.**
> 3. **Só 1 de 10 LPs tem a tag de conversão do Google** (`AW-752011587`): a `massoterapia-lp`.
>    ⏫ **E 3 das cegas estão com campanha ATIVA gastando agora** (aurículo, desportiva, quiropraxia).
> 4. ✅ **Corrigido 16/07 — as 10 LPs estáticas TODAS carimbam `#ref`.** O item 2 vale só pras **React**.
>    ⚠️ **A pegadinha:** o padrão no código é **URL-encoded** (`%23ref%3D`). `grep "#ref="` volta vazio e dá
>    **falso negativo** — foi assim que quase registramos errado. **Sempre grepar por `%23ref`.**
> 5. 🔑 **A diferença que importa:** a `massoterapia-lp` usa `(utm_campaign || DEFAULT_REF)` → **sempre**
>    carimba. Aurículo, quiropraxia e desportiva usam `(utmCampaign || ref || '')` → **só carimbam se a URL
>    trouxer UTM**. Sem UTM, o lead entra **sem código**. Se os leads dessas 3 estiverem entrando sem código,
>    **o template de URL dos anúncios não está passando `utm_campaign`** — correção de 5 min no Google Ads.
> 6. 🔴 **`gclid` = ZERO em todas as 10 LPs.** É o que trava o *offline conversion import*.

| LP | Produto | URL | Tracking | Stack | Status |
|----|---------|-----|----------|-------|--------|
| Masso Presencial | Formação presencial (turmas 6 e 12 meses) | `app.holoscursoseterapias.com.br/massoterapia-lp` | GC-0hh1dj | **HTML estático** (corrigido 14/07) | ✅ No ar · **única com tag de conversão** |
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
| `IS-9iyrwz` | Instagram/social | desportiva-4x1 | Meta Ads jun/26 · WhatsApp Giovanna · ⚠️ registrar no ZenPro |
| `IS-vygsza` | Instagram/social | mensalistas | Meta Ads jun/26 · WhatsApp formação · ⚠️ registrar no ZenPro |
| `GC-0hh1dj` | Google Search | massoterapia-lp | Masso Geral ✅ registrado |
| `GC-ab9924b9` | Google Search | auriculo | Auriculo ✅ registrado |
| `estagio-social` | Meta | Estágio Social | 🚨 rodando como órfão — registrar no ZenPro |

> 🚨 **CORRIGIDO 16/07 — o registro anterior estava errado E a "pendência" dele quebraria a atribuição.**
>
> O registro dizia: *"Formato do Ref padronizado em todas as LPs: `Ref: <código>` (linha nova) (...) a
> `massoterapia-lp` ainda usa `#ref=` (follow-up)."* **Nada disso é verdade.** O código real mostra:
>
> - O ZenPro parseia com `messageText.match(/#ref=([A-Za-z0-9_-]+)/i)` — ele lê **`#ref=`**, e só.
>   *(`zenpro/supabase/functions/webhook-worker/index.ts:295`)*
> - **Nenhuma LP anexa `Ref:`** (grep vazio nas 10). **Todas usam `#ref=`.**
>
> ✅ **O formato real é `#ref=<código>`, as LPs e o ZenPro concordam, e o sistema está funcionando.**
> 🔴 **Executar aquele "follow-up" teria quebrado a atribuição da campanha principal** — o ZenPro não lê
> `Ref:`. Era uma pendência que só existia no papel e que destruiria o que funciona. **Não recriar.**

### 🔑 Atribuição: o código tem que estar nos DOIS lados

Cross-check 21/06 (Google Ads × ZenPro, leads 19–21/06):
- ✅ **Leads do Masso Geral confirmados reais** no ZenPro (`GC-0hh1dj`: 3→10→7, crescendo junto com o gasto). Não é conversão-fantasma.
- 🔑 **Regra:** o ZenPro só atribui código **registrado na tabela `campaigns`**. Botar o código só na LP (`utm_campaign`) **não basta** — sem registro no ZenPro, o lead entra como **órfão** (sem campanha).
- 🚨 Órfãos achados (Meta/IG): `estagio-social` (5), `mensalistas` (2, legado), `FB-69e9d0` (1), ID cru do Meta `120246…` (2). Bug: `GC-0hh1dj` truncando pra `GC-0hh1d`.

**🔴 Pendência (handoff feito pro repo ZenPro em 21/06):** registrar `IS-9iyrwz` e `IS-vygsza` **antes** de subir as campanhas + tratar órfãos + corrigir truncamento + ID cru do Meta.

**Como a LP `desportiva-4x1` rastreia (HTML estático · ✅ relido no código em 16/07):**
- Lê `utm_source/medium/campaign` + `ref` da **query** (do `?`, **não** do `#`).
- **Formulário** → grava no **Supabase** (`leads_campanha`) com os 3 UTMs + dispara Pixel `Lead`. *(Hoje essa lista fica parada → pendência 🔴 [automacoes.md](../automacoes.md): confirmação de email + sequência de nutrição.)*
- **WhatsApp** → anexa **`#ref=<código>`** no `?text=` (URL-encoded: `+%23ref%3D`), montado como
  `(utmCampaign || ref || '')` — `desportiva-4x1/index.html:468-469`. Pelo WhatsApp só vai o ref (não os 3 UTMs).
  🔴 **Sem UTM na URL → não carimba NADA** → o lead entra **sem código**. Ela não tem `DEFAULT_REF` de fallback.
- Pixel Meta: `902498357163312`. 🔴 **Sem tag do Google — e a campanha está ATIVA gastando** (16/07).
- ⚠️ **O registro anterior descrevia `Ref: X` em linha nova e uma prioridade de 5 níveis. Nada disso existe
  no código** — corrigido em 16/07. O formato real é `#ref=`, que é o que o ZenPro parseia.
