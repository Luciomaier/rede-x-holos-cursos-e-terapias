# Plano de Correcao - Tracking & Atribuicao (Holos)

> **Data:** 23/06/2026 · **Lider de tracking:** Lucio · **Dev (handoff):** Nick
> **Escopo:** UTM Meta · codigo IS- orfao + truncamento · fbclid/Pixel-CAPI · evento de conversao GA4 · dashboard de conversao por canal
> **Fontes:** [Auditoria 23/06](2026-06-23-auditoria-funil-trafego.md) · [LPs/codigos](../campanhas/landing-pages.md) · [Ciclo micro-conversoes 09/06](../ciclos/2026-06-09-microconversoes-google-lp-react.md) · [Automacoes](../automacoes.md)

---

## Resumo executivo

Hoje a Holos decide verba **no escuro**: o Meta pago cai em "Organic Social" no GA4 (subnotifica o canal que tem o melhor CPL), os leads do Meta entram **orfaos** no ZenPro porque os codigos nunca foram cadastrados, e nao existe key event de conversao instrumentado — entao nao ha taxa de conversao por canal. As 5 correcoes abaixo destravam: (1) atribuicao GA4 correta do Meta, (2) leads Meta saindo de "orfao" para a campanha certa, (3) sinal de Pixel/CAPI integro, (4) uma conversao oficial no GA4 que importa pro Google Ads, e (5) um dashboard `Leads_ZenPro / sessions_GA4` por canal que sustenta `/painel-dezena` e `/saude-google`. **O grosso e config de gestor (Lucio), feito hoje, sem depender de codigo.** A unica parte que pode exigir dev (Nick) e o ID cru do Meta e a investigacao da mecanica real da React LP.

**Trava factual antes de tudo:** o relatorio e o `landing-pages.md` descrevem a `massoterapia-lp` como "React/Vercel" capturando email->Supabase->Pixel `Lead`. Isso **nao esta confirmado** (relatorio F3 em aberto). Varias correcoes dependem dessa mecanica — ela tem que ser confirmada com o Nick (C0) ou as instrumentacoes mudam.

---

## Ordem de execucao priorizada

| Ordem | Acao | Por que primeiro |
|-------|------|------------------|
| **0** | **C0 — Confirmar a mecanica real da LP + ler o case real dos codigos no banco** | Tudo abaixo depende disso. Sem confirmar (a) o que a React faz no submit e (b) o case exato gravado em `conversations.tracking_code`, instrumenta-se contra um sistema que pode nao existir e cadastra-se codigo que nao da match. Custo ~0, desbloqueia o resto. |
| **1** | **C1 — UTM Meta: `source=instagram` + `medium=paid_social` (sem `fbclid` literal)** | E pre-requisito de C4 e C5: sem isso o Meta cai em Organic Social e o denominador/conversao do Meta nasce no balde errado. Config no Ads Manager, hoje, Lucio. |
| **2** | **C2 — Cadastrar codigos no ZenPro (sair de orfao)** | Sem o codigo registrado em `campaigns`, o lead Meta e orfao e o numerador de C5 = zero. Cadastro na UI, ~5 min, Lucio. Regra de causa-raiz: cadastrar ANTES de subir campanha. |
| **3** | **C3 — fbclid / Pixel-CAPI (higiene + backlog)** | Parte "hoje" (remover literal) ja sai junto de C1. CAPI e greenfield (backlog), nao conserto. |
| **4** | **C4 — Evento de conversao GA4 (`generate_lead`)** | Depende de C0 (mecanica) e C1 (canal). E o que cria a conversao oficial e o numerador "limpo" do GA4. |
| **5** | **C5 — Dashboard de conversao por canal** | Consome C1+C2+C4 ja prontos. So aqui o painel passa a mostrar taxa por canal. |

---

## C0 — Pre-requisito bloqueante: confirmar mecanica + ler case real

**Problema:** O relatorio e `landing-pages.md:12` chamam a `massoterapia-lp` de "React/Vercel" e assumem que ela captura email->Supabase->Pixel `Lead`. Mas `landing-pages.md:61-66` descreve essa mecanica para a **`desportiva-4x1` (HTML estatico)**, nao para a React. F3 do relatorio ("o email entra mesmo no ZenPro/Brevo?") esta **em aberto**. Alem disso, o match de orfao no ZenPro e `Set.has(key)` **case-sensitive** e o worker grava o codigo **sem normalizar case** — entao o cadastro precisa bater o case exato do que esta gravado.

**Correcao exata:**
- **Confirmar com Nick** o que a `massoterapia-lp` faz no submit: quais campos captura (nome+email? so WhatsApp?); se grava no Supabase `leads_campanha`; se ja dispara Pixel `Lead`; se le UTM da **query (`?`)** ou ainda do `#` (`landing-pages.md:50` diz que a React **ainda usa `#ref=`** — follow-up). Se a React **nao** captura email separado, o "passo 1 = email" de C4 nao existe e a decisao muda.
- **Corrigir a descricao** "React/Vercel" no relatorio e em `landing-pages.md:12` conforme o que o Nick confirmar (a `desportiva-4x1` e estatica; a React precisa ser verificada, nao herdada).
- **Ler o case real** gravado, para cadastrar identico em C2:
  ```sql
  SELECT DISTINCT tracking_code FROM conversations
  WHERE organization_id = '<HOLOS_ORG_ID>'
    AND tracking_code ILIKE ANY (ARRAY['is-ub34kh','is-9iyrwz','is-vygsza','estagio-social','fb-69e9d0','gc-0hh1d']);
  ```
- **Reconciliar o codigo Meta:** a auditoria cita `IS-ub34kh`; o `landing-pages.md` (fonte da verdade) so tem `IS-9iyrwz` e `IS-vygsza`. `IS-ub34kh` **nao esta catalogado**. Lucio decide qual e o codigo real do anuncio Meta do Masso Geral e atualiza `landing-pages.md` ANTES de cadastrar.

**Responsavel:** Lucio (reconciliacao de codigo, leitura do banco/decisao de taxonomia) + Nick (confirmar mecanica da React).
**Validacao:** ter por escrito (a) o que a React dispara no submit, (b) o case exato de cada codigo no banco, (c) o codigo Meta canonico em `landing-pages.md`.
**Risco:** pular C0 = consertar fantasma (instrumentar `generate_lead` num submit que talvez nao exista) e cadastrar codigo com case errado que nunca da match.

---

## C1 — Padronizacao de UTM (Meta `social` -> `paid_social`)

**Problema:** A URL do anuncio Meta usa `utm_medium=social` (convencao de **organico**). GA4 joga o Instagram **pago** em "Organic Social" -> canal pago subnotificado (T1). Pior: Paid Social no GA4 e condicao **AND** (source social **E** medium pago) — entao o medium sozinho nao basta se o `utm_source` vier cru (`meta`, ID numerico).

**Correcao exata** — campo "Parametros de URL" do anuncio, exatamente:
```
utm_source=instagram&utm_medium=paid_social&utm_campaign=<CODIGO RECONCILIADO em C0>
```
- `social` -> **`paid_social`** (underscore). Verificado na fonte oficial: regex de medium do Paid Social e `^(.*cp.*|ppc|retargeting|paid.*)$`; `paid_social` casa pelo ramo `paid.*`. ([GA4 Default channel group](https://support.google.com/analytics/answer/9756891?hl=en)). O folclore "underscore nao funciona" nao se aplica aqui — o gatilho e o prefixo `paid`, nao o separador.
- `utm_source` = **`instagram`** ou `facebook` (ambos na lista oficial de Source Categories do GA4). **Nunca `meta` nem ID numerico** (caem em Referral/Unassigned, fora de Paid Social).
- **Padrao unico de pontuacao:** `paid_social` sempre. GA4 guarda a pontuacao original, entao misturar `paid_social`/`paid-social` fragmenta relatorios por source/medium (nao o channel group, mas a auditoria). Fixar em `landing-pages.md` como regra dura.
- **Ortogonal ao ZenPro:** o ZenPro le `#ref=`/`Ref:`, nao `utm_medium`. Trocar o medium **nao** mexe na atribuicao de lead.

**Responsavel:** **Lucio** (Ads Manager, hoje).
**Validacao:** apos o fix, clicar no anuncio real -> GA4 Tempo real -> a sessao cai em **Paid Social** e `Session source = instagram` (nao `meta`/ID). Se cair em Referral/Unassigned, o `utm_source` esta cru.
**Risco:** **quebra de serie historica no GA4** — sessoes Meta antigas ficam em Organic Social para sempre. **Anotar a data exata da virada** no painel; nao comparar antes vs depois.

---

## C2 — Codigo IS- orfao + truncamento (cadastro no ZenPro)

**Problema:** `utm_campaign=IS-...` entra **orfao** porque **nao esta cadastrado em `campaigns`** da org Holos (T2). Verificado por simulacao: o pipeline LP->WhatsApp->ZenPro transmite o codigo **integro** — a regex `/#ref=([A-Za-z0-9_-]+)/i` (worker) captura o codigo inteiro e as colunas sao `TEXT` (sem limite). **O transporte esta correto; nao ha bug de codigo no fluxo de atribuicao do IS-.** A causa-raiz e **falta de cadastro**. Ha ainda dois pontos separados: (a) o "truncamento" `GC-0hh1dj`->`GC-0hh1d` **nao existe no codigo auditado** — e dado/anotacao a confirmar no banco; (b) um **vetor de orfao distinto**: ID cru do Meta `120246…` entrando como tracking_code (`landing-pages.md:57`), que **nenhum cadastro resolve**.

**Correcao exata** — cadastrar na tabela `campaigns` (Admin -> Campanhas -> aba "Orfaos" -> "Cadastrar"; o `tracking_code` e readonly e mantem o codigo), com **case identico ao lido em C0**:

| tracking_code | source correto | nome sugerido | observacao |
|---|---|---|---|
| `<codigo Meta reconciliado>` (auditoria: `IS-ub34kh`) | instagram (prefixo IS->worker) | Masso Geral — Meta/IG | causa-raiz do T2 |
| `IS-9iyrwz` | instagram | Desportiva 4x1 — Meta/IG | registrar **antes** de subir campanha |
| `IS-vygsza` | instagram | Mensalistas — Meta/IG | idem |
| `estagio-social` | **meta** (corrigido — NAO instagram; `landing-pages.md:48`) | Estagio Social — Meta | prefixo `es` -> worker classifica `outro`; o match de orfao e por `tracking_code`, nao por source |
| `FB-69e9d0` | meta (worker FB->meta; **na UI corrigir manual**, dialog detecta `outro`) | Meta avulso | orfao listado, fora da proposta original |

**Vetor separado (NAO resolvido por cadastro) — ID cru do Meta `120246…`:** investigar qual anuncio/placement Meta injeta o ID numerico na mensagem em vez de `#ref=...`. Provavel parametro dinamico do Meta (`{{campaign.id}}`/`{{ad.id}}`) vazando pro texto, ou um CTA do Meta que nao passa pela LP. Acao: rastrear a origem e ou (i) corrigir o anuncio para mandar `#ref=...`, ou (ii) registrar o ID como campanha Meta. Sem isso, orfao Meta continua nascendo.

**Saneamento do truncado (condicional):** so rodar **se** confirmar linhas `GC-0hh1d` no banco E que e truncamento de `GC-0hh1dj`. UPDATE manual auditado, nunca trigger:
```sql
-- somente apos confirmar contagem > 0 de GC-0hh1d
UPDATE conversations SET tracking_code = 'GC-0hh1dj'
WHERE organization_id = '<HOLOS_ORG_ID>' AND tracking_code = 'GC-0hh1d';
```
Cadastrar `GC-0hh1dj` **NAO** reidrata `GC-0hh1d` (strings diferentes) — continuam orfaos ate o UPDATE.

**Responsavel:**
- **Lucio (gestor):** cadastrar os codigos na aba Orfaos (UI). Regra operacional permanente: todo codigo novo (`IS-`/`GC-`/`ME-`/`FB-`) cadastrado **ANTES** de subir a campanha.
- **Nick (dev):** (1) investigar o ID cru `120246…` (unica parte que pode exigir mudanca de origem/anuncio); (2) so apos confirmar linhas no banco, avaliar o UPDATE de saneamento; (3) endurecimento opcional: alinhar `detectSourceFromCode` do `CampaignDialog` com o worker (adicionar `FB`,`ME`->meta) + aviso "tracking_code deve bater exatamente, mesmo case".

**Validacao:**
1. Ponta-a-ponta (1 lead/canal): abrir LP com `?utm_campaign=<codigo>`, preencher, clicar WhatsApp -> a mensagem termina **exatamente** com `#ref=<codigo>` (com o ultimo char). Repetir com `GC-0hh1dj` (com o `j`).
2. No ZenPro: conversa criada com `tracking_code` inteiro, aparece **sob a campanha**, nao em Orfaos.
3. SQL pos-cadastro:
   ```sql
   SELECT tracking_code, count(*) FROM conversations
   WHERE organization_id = '<HOLOS_ORG_ID>' AND tracking_code IS NOT NULL
   GROUP BY 1 ORDER BY 2 DESC;
   ```
   Esperado: zero orfao de IS-/FB-. **Confirmar se `GC-0hh1d` (8 chars) existe** — se count=0, o "truncamento" e fantasma de anotacao e nao ha saneamento a fazer.

**Risco:** **atribuicao retroativa (desejada):** cadastrar um codigo tira **todos** os orfaos antigos daquele codigo da aba Orfaos e soma na campanha. "Instagram pago" sobe retroativamente — avisar quem le o painel para nao ler como pico. **Saneamento** e irreversivel: dois codigos reais coincidindo nos 8 primeiros chars se fundiriam — por isso manual. **Reatribuicao** (`reattribution_window_days`, default 30): lead recorrente fora da janela pode ter o tracking sobrescrito por toque posterior — considerar ao medir lead->matricula.

---

## C3 — fbclid literal + integridade Pixel/CAPI

**Problema:** O relatorio registrou a URL do anuncio terminando em `&fbclid=fbclid` — **valor literal**, provavel placeholder de template. **Status: NAO confirmado** (T3 = 🟡). Se for real, e **higiene de tracking, nao "atribuicao cega"**: o Meta atribui conversao no Ads Manager pelo proprio click tracking, independente desse parametro. O Meta **anexa** o fbclid real no fim da URL (nao sobrescreve); como a LP atual **nao le fbclid** (so le `utm_source/medium/campaign`) e **nao constroi `_fbc`**, o unico componente tocado e o `_fbc` que o **Pixel base** tenta montar. O evento real disparado e **`Lead`** (nao "Contact"). **Nao existe CAPI hoje** — entao nao ha dedup a configurar; CAPI e greenfield.

**Correcao exata:**
- **Passo 0 (Lucio):** no Ads Manager, abrir o anuncio -> "Parametros de URL" e verificar se `fbclid=fbclid` existe mesmo. Se nao existir, T3 estava resolvido (artefato de documentacao) — seguir so com C1.
- **Hoje (Lucio):** se existir, remover `&fbclid=fbclid` inteiro (sai junto da string limpa de C1). O Meta anexa o real sozinho. Removido o literal, o Pixel base passa a formar `_fbc` do fbclid real automaticamente — **sem mexer no HTML**.
- **Backlog greenfield (Nick):** CAPI server-side e **projeto novo**, mora junto da pendencia ja mapeada em [automacoes.md](../automacoes.md) (Supabase -> Brevo/nutricao). Quando for feito: evento server-side com o **mesmo `event_name` do browser** (hoje `Lead` — padronizar antes); **`event_id` identico** browser<->server para dedup (precisa de `event_id` E `event_name` batendo, janela 48h); `user_data.fbc`/`fbp` **nao hasheados**; `em`/`ph` **hasheados SHA-256**; montar `_fbc` **so** quando houver fbclid real.

**Responsavel:** **Lucio** (confirmar + remover literal, hoje). **Nick** (CAPI, backlog).
**Validacao:** clicar no anuncio real (nao preview) -> **um unico** `fbclid=` com valor real (`IwAR.../PAAa...`), zero `fbclid=fbclid`. DevTools -> Cookies: `_fbc = fb.1.<ts>.<fbclid_real>` e `_fbp` presente. Pixel Helper / Events Manager: confirmar o evento **`Lead`** (nao "Contact") e EMQ melhorando.
**Risco:** **estrago menor** do que parecia — sem CAPI e sem leitura de fbclid na LP, nao houve `_fbc` fabricado em massa; o `Lead` historico so perdeu o reforco do click-id (subotimo, nao "cego"). Ganho de EMQ esperado e **modesto** — nao usar isso como justificativa para escalar verba antes de validar lead->matricula. Dupla contagem so e risco **futuro** (quando ligar CAPI).

---

## C4 — Evento de conversao no GA4 (`generate_lead`)

**Problema:** Nao existe key event de conversao no GA4 para a `massoterapia-lp` (T4/F2). A decisao critica e **qual passo contar**: o cadastro on-site (passo 1) ou o clique pro WhatsApp (passo 2). Contar o WhatsApp como primario **quebra a atribuicao de campanha** (GA4 perde referrer/sessao no salto pro app).

**Decisao:** o **CADASTRO (passo 1, on-site) = key event `generate_lead`**. O clique pro WhatsApp = **evento padrao `whatsapp_click`, NAO key event** (o salto pro app vira `direct`/`not set` — marcar como key event injetaria sinal orfao no bidding do Google e diluiria o sinal de otimizacao; regra 2-4 key events).

**Correcao exata (strings reais):**
1. **Push no submit bem-sucedido** (apos gravar no Supabase, *se C0 confirmar que a React faz isso*) — `value` + `currency` sao **OBRIGATORIOS** desde abril/2026, senao o GA4 grava o evento mas **nao vira key event e nao importa pro Google Ads** ([groas.com](https://www.groas.com/post/ga4-update-april-2026-what-changed-google-ads-conversion-tracking-fix)):
   ```js
   window.dataLayer = window.dataLayer || [];
   window.dataLayer.push({
     event: 'generate_lead',
     value: 1,            // OBRIGATORIO desde abr/2026 — sem isto nao vira key event nem importa pro Ads
     currency: 'BRL',     // OBRIGATORIO — par com value
     lead_id: leadUuid    // mesmo UUID do submit (dedup Meta)
   });
   ```
   - `value: 1` e proxy fixo ate existir conversao offline do ZenPro. **Nao** mandar UTM no push (UTM e session-scoped; o canal sai da dimensao nativa `Session campaign`).
2. **GTM:** Tag GA4 Event, Event Name = `generate_lead`, trigger Custom Event `event equals generate_lead`, mapear `value`/`currency`/`lead_id`. **Nunca** `Generate_Lead`/`form_submit` (GA4 e case/schema-sensitive — cada variante e evento separado e conta 2x).
3. **GA4 Admin -> Eventos -> marcar `generate_lead` como Key Event (toggle ON).** Depois Google Ads -> Conversoes -> Importar do GA4.
4. **`whatsapp_click` como evento PADRAO** (toggle key event **OFF**): trigger = clique em link com URL contendo `wa.me`. Serve como metrica de friccao em exploration, nao como conversao.
5. **Diferenciar canal:** exploration GA4 com dimensao **Session campaign** x `generate_lead`. Pre-requisito: C1 aplicado (senao Meta cai em Organic Social, no balde errado).

**Conciliacao dos tres sistemas:**

| Sistema | Evento | Papel | Momento |
|---|---|---|---|
| **GA4** | `generate_lead` (key event, `value`+`currency`) | Fonte oficial de canal/atribuicao | Passo 1 — cadastro on-site |
| **GA4** | `whatsapp_click` (padrao, NAO key event) | Metrica de friccao (exploration) | Passo 2 |
| **Meta** | `Lead` (Pixel + CAPI, mesmo `event_id`) | Otimizacao do Meta | Passo 1 — mesmo submit |
| **ZenPro** | lead com `Ref:` | Verdade de lead operacional | Passo 2 — chega o WhatsApp |

- **Nao somar GA4 + ZenPro** — e o mesmo lead em dois pontos. `whatsapp_click ÷ generate_lead` = friccao do passo a mais (F1); `lead ZenPro ÷ generate_lead` = email-only que nunca vira WhatsApp.
- **Dedup Meta:** UM `event_id = lead_uuid` no submit, identico no Pixel (browser) e CAPI (server), com `event_name=Lead` igual nos dois lados.

**Responsavel:**
- **Nick (dev):** primeiro confirmar a mecanica (C0); depois push com `value`+`currency`+`lead_id`, gerar `lead_uuid` unico e propaga-lo pro Pixel/CAPI e Supabase, tag `wa.me`.
- **Lucio (gestor/tracking):** criar/nomear eventos no GTM, marcar **so** `generate_lead` como key event (deixar `whatsapp_click` padrao), montar exploration por `Session campaign`.

**Validacao:** GTM Preview + GA4 DebugView -> 1 `generate_lead` **com `value` e `currency`** e `Session campaign` correto. Realtime: nao cair em `(direct)`/`(not set)`. Apos ~24h: confirmar que aparece no import do Google Ads (se nao, **checar primeiro `value`/`currency`** — causa #1 de falha silenciosa pos-abril/2026). Confirmar `whatsapp_click` com toggle OFF. Events Manager -> Test Events: Pixel `Lead` + CAPI `Lead` como 1 evento deduplicado.

**Risco:** **falha silenciosa** sem `value`/`currency`. **Quebra de serie no Google Ads:** key event novo -> historico nao migra, lance entra em reaprendizado (consistente com o ciclo 09/06, CPA aparente ~R$14 vs real ~R$39). Mitigacao: manter "Maximizar Conversoes SEM teto de CPA" e nao recalibrar tCPA por ~2 semanas de `generate_lead` limpo. **Contar cedo (email)** infla com quem da email e some — usar `whatsapp_click` + lead ZenPro como filtro de qualidade no painel, **nao no bidding** ainda.

---

## C5 — Dashboard de conversao por canal

**Problema:** Nao existe taxa de conversao da LP por canal porque os dois lados nunca foram cruzados: GA4 tem visitas por canal (ninguem extrai `sessions x landingPage x canal`) e o ZenPro tem leads por `utm_campaign` com atribuicao furada. "Instagram e a alavanca" e "CPL R$11,60" sao afirmacoes nao auditaveis (T4).

**Correcao exata** — formula e fonte:
```
Taxa_conv_canal = leads_ZenPro_canal / sessions_GA4_LP_canal
```
| Metrica | Definicao | Fonte |
|---|---|---|
| Visitas LP (canal) | `sessions` da LP por canal | GA4 |
| Leads (canal) | leads ZenPro com `utm_campaign` do canal, mesmo periodo | ZenPro |
| Taxa conv. LP (canal) | `Leads / Visitas` | calculada |
| CPL real (canal) | `Gasto / Leads` | Windsor (Google) / Meta Ads + ZenPro |

- **Google:** denominador = sessions GA4 `sessionDefaultChannelGroup = Paid Search`; numerador = leads ZenPro `GC-0hh1dj`.
- **Meta:** denominador = sessions GA4 `sessionDefaultChannelGroup = Paid Social` (so apos C1 com source+medium corretos); numerador = leads ZenPro do codigo reconciliado (so apos C2).
- **Numerador = lead ZenPro** (verdade de lead): nao o cadastro Supabase (parado) nem a conversao Google (subcontada). **Janela:** mesma dezena nos dois lados; lag de 1-2 dias = ruido anotado no rodape.
- **Como puxar (GA4):** dimensoes `sessionDefaultChannelGroup` (session-scoped — **nunca** `firstUserDefaultChannelGroup`, que nao reconcilia com `sessions`) + `landingPagePlusQueryString`; metrica `sessions`; filtro `landingPagePlusQueryString CONTAINS massoterapia-lp`; periodo = dezena. Manual: GA4 > Explorar. Automatizavel quando Nick subir credencial da Data API.

**Bloco no `painel.md` (secao ROAS/Traffic):**
```markdown
## Conversao da LP por canal — massoterapia-lp (dezena DD/MM)

| Canal | Visitas (GA4) | Leads (ZenPro) | Taxa conv. LP | Gasto | CPL real |
|-------|---------------|----------------|---------------|-------|----------|
| Google (Paid Search · GC-0hh1dj) | — | — | — % | R$ — | R$ — |
| Meta (Paid Social · <codigo>)    | — | — | — % | R$ — | R$ — |
| **LP total**                     | — | — | — % | R$ — | R$ — |

> Numerador = lead ZenPro. Denominador = sessions GA4 por Session default channel group.
> ⚠️ Meta so e confiavel apos: (1) UTM source+medium = instagram/paid_social, (2) codigo reconciliado e registrado no ZenPro. Antes disso: Meta = ⬜ pendente (nao zero).
> Fix UTM aplicado em: DD/MM/AAAA (serie de Paid Social comeca aqui — nao comparar com antes).
```

**Responsavel:** **Lucio** (relatorio GA4 manual, query ZenPro, edicao do painel/SKILL); **Nick** (credencial Data API para automatizar).
**Validacao:** apos o fix, clicar no anuncio Meta -> GA4 Realtime em **Paid Social** (se Referral/Unassigned, source cru). Sanidade da taxa: conversao de LP de captura ~5-25%; taxa >100% = denominador subcontando (UTM faltando); taxa ~0% no Meta = C1/C2 nao propagou. So investigar Unassigned se **subir** vs baseline (nao pelo valor absoluto — Direct/Unassigned legitimo sempre existe). CPL real (ZenPro) vs plataforma: divergencia confirma o gap de webhook ZenPro->Google (ciclo 09/06).
**Risco:** **falsa precisao no inicio** — Meta subfinanciado (R$127/dia em 15 anuncios), poucas sessoes, taxa oscila. Direcional, nao decisorio. **Nao remanejar verba com 1 dezena de dado.** Lag de atribuicao infla/desinfla a borda da dezena (some no acumulado mensal).

---

## Responsavel x tarefa x prazo sugerido

| Tarefa | Responsavel | Prazo sugerido |
|--------|-------------|----------------|
| C0 — Confirmar mecanica real da React LP (campos, Supabase, Pixel, `#` vs `?`) | Nick | Antes de tudo |
| C0 — Ler case real dos codigos no banco + reconciliar codigo Meta + atualizar `landing-pages.md` | Lucio | Antes de tudo |
| C1 — Confirmar/remover `fbclid=fbclid` + `social`->`paid_social` + `source=instagram` no Ads Manager | Lucio | Hoje |
| C2 — Cadastrar 5 codigos na aba Orfaos do ZenPro (case exato) | Lucio | Hoje (antes de subir campanhas) |
| C2 — Investigar ID cru do Meta `120246…` | Nick | Esta semana |
| C2 — Saneamento condicional `GC-0hh1d`->`GC-0hh1dj` (so se SQL confirmar linhas) | Nick | Apos validacao SQL |
| C2 — Endurecimento `detectSourceFromCode` (FB/ME->meta) + aviso de case | Nick | Backlog (opcional) |
| C3 — CAPI server-side + padronizar `event_name` | Nick + Lucio | Backlog (automacoes.md) |
| C4 — Push `generate_lead` com `value`+`currency`+`lead_id`, `lead_uuid` unico, tag `wa.me` | Nick | Apos C0+C1 |
| C4 — GTM (criar eventos) + marcar so `generate_lead` como key event + exploration | Lucio | Apos C4-dev |
| C5 — Relatorio GA4 (manual) + query ZenPro + bloco no painel + SKILL | Lucio | Apos C1+C2+C4 |
| C5 — Credencial Data API (automacao futura) | Nick | Backlog |

---

## Como isso alimenta /painel-dezena e /saude-google

**`/painel-dezena`:**
- **Reunir:** novo item — sessions da LP por `sessionDefaultChannelGroup` (GA4) + leads por `utm_campaign` (ZenPro) + gasto por canal (Windsor/Meta).
- **Atualizar:** renderizar o bloco C5 ("Conversao da LP por canal") na secao ROAS/Traffic do `painel.md`.
- **Fontes de numero:** acrescentar GA4 (`sessions x landingPage x sessionDefaultChannelGroup`).
- **Gate (reforcado):** se `utm_medium` Meta ainda for `social`, OU `utm_source` Meta nao for `instagram`/`facebook`, OU codigo Meta nao reconciliado/registrado -> linha Meta = ⬜ pendente + nota; **nao calcular taxa Meta**. Anotar a data do fix de UTM para flag de quebra de serie.

**`/saude-google`:**
- O `generate_lead` (C4) vira a conversao oficial importada no Google Ads — `/saude-google` passa a ler uma conversao **limpa** em vez do historico de micro-conversoes-lixo (ciclo 09/06). Sinalizar que o key event e **novo** -> esperar reaprendizado ~2 semanas antes de ler CPA/tCPA como confiavel.
- CPL real por canal (C5) cruza com o gasto que o `/saude-google` ja monitora via Windsor.ai — divergencia CPL-plataforma vs CPL-ZenPro confirma o gap de webhook ZenPro->Google.
- O cross-check de volume (C2/C5: leads `GC-0hh1dj` 3->10->7 vs gasto) e a checagem de orfaos `120246…` entram como itens recorrentes de saude do tracking.

---

**Arquivos relevantes (todos absolutos):**
- Relatorio-fonte: `/home/usuario/Documentos/Projetos/holos-cursos-terapias/marketing/relatorios/2026-06-23-auditoria-funil-trafego.md`
- LPs/codigos (reconciliar `IS-ub34kh`; corrigir "React/Vercel"): `/home/usuario/Documentos/Projetos/holos-cursos-terapias/marketing/campanhas/landing-pages.md`
- Painel (destino do bloco C5): `/home/usuario/Documentos/Projetos/holos-cursos-terapias/marketing/painel.md`
- Skill painel: `/home/usuario/Documentos/Projetos/holos-cursos-terapias/.claude/skills/painel-dezena/SKILL.md`
- Backlog CAPI/Supabase->Brevo: `/home/usuario/Documentos/Projetos/holos-cursos-terapias/marketing/automacoes.md`
- LP build (transporte do Ref integro; `+` cosmetico): `/home/usuario/Documentos/Projetos/holos-connect/public/massoterapia-lp/index.html`
- Regex de atribuicao (sem normalizacao de case; `es`->`outro`, `FB`/`ME`->`meta`): `/home/usuario/Documentos/Projetos/zenpro/supabase/functions/webhook-worker/index.ts`
- Match de orfao case-sensitive: `/home/usuario/Documentos/Projetos/zenpro/src/hooks/useCampaignStats.tsx`
- Cadastro mantem codigo (readonly); `detectSourceFromCode` sem FB/ME: `/home/usuario/Documentos/Projetos/zenpro/src/components/admin/campaigns/CampaignDialog.tsx`

**Pendencias marcadas (dado faltando):** `<HOLOS_ORG_ID>` (Nick); confirmacao da mecanica da React LP (Nick — C0); codigo Meta canonico `IS-ub34kh` vs `landing-pages.md` (Lucio — C0); existencia real de linhas `GC-0hh1d` no banco (SQL — C2); existencia real de `fbclid=fbclid` no anuncio (Lucio — C3); numeros de visitas/leads/gasto por canal (a preencher quando GA4 + ZenPro forem cruzados — C5).