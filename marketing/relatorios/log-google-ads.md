# Log de trabalho — Google Ads Holos

> Rastro do que já foi feito e do que está pendente. Ler isto primeiro ao
> retomar o trabalho de ads da Holos. Mais recente no topo.

---

## ▶️ RETOMAR AQUI — 24/07/2026 (deixado em 23/07)

> **Contexto:** o Lucio avisou que em 24/07 a desportiva e outras páginas **serão
> recriadas**. Isso torna urgente o que era P3.

### 🔴 A regra que explica tudo (descoberta em 23/07, checada ao vivo)

| Tipo de página | URL de exemplo | Herda GTM/GA4? | Conversão no **Ads** |
|---|---|---|---|
| **Rota React (SPA)** | `app./curso-de-massagem-desportiva-4x1` | ✅ sim | ❌ **não** (ver correção) |
| **LP estática** (`public/<nome>/`) | `app./desportiva-4x1/` | ❌ não — `<head>` próprio | ❌ **não** (sem o patch) |

> ⚠️ **CORREÇÃO da primeira versão desta nota:** escrevi que a rota React era "medida".
> **Errado.** Ela herda GTM e GA4, mas **não registra conversão no Google Ads**:
> (a) o SPA carrega `G-YV8T6YK9N9` (GA4), **não** `AW-752011587`;
> (b) o `DynamicWhatsAppButton` usa `onClick` + `window.open()` — **não é `<a href>`**,
> então gatilho de clique do GTM que casa por *Click URL* não dispara nele;
> (c) os `gtag('event','whatsapp_click')` de `src/components/funnel/` são eventos de
> **GA4**, sem `send_to: 'AW-.../label'` — não viram conversão no Ads. E a página da
> desportiva nem usa esses componentes.
> **Herdar GTM ≠ medir conversão.** Segunda vez no dia que cravei rápido demais.

> **Toda migração "página React → LP estática" apaga o rastreamento do Google, em
> silêncio.** Ninguém percebe: o pixel do Meta continua lá, a página fica mais rápida,
> o SEO melhora — e a conversão do Google some. Foi assim que a masso quebrou em 09/06.
> Os commits de 22–23/07 (Modeladora, Relaxante) fizeram exatamente essa migração.

**Hoje: das 16 LPs estáticas, só a `massoterapia-lp` tem tag. As outras 15 estão cegas.**

### ⚠️ Existem DUAS desportivas (o Lucio suspeitou certo)

| Arquivo | URL | Estado |
|---|---|---|
| `public/desportiva-4x1/` | `app./desportiva-4x1/` | LP estática — cega (patch no PR #162) |
| `src/pages/CursoMassagemDesportiva4x1.tsx` | `app./curso-de-massagem-desportiva-4x1` | rota React — medida via GTM |
| *(a campanha aponta hoje)* | `holoscursoseterapias.com.br/curso-de-desportiva-4x1/` | **WordPress** — medida via GTM |

### ✅ DECIDIDO em 23/07 (Lucio): a campanha **NÃO** vai pra rota React

O Lucio abriu a página React e viu que está **em modelo defasado** (último commit
10/07, sem o padrão novo). Decisão: **a Elis refaz a LP na mesma URL**, no padrão novo
que ela e o Nick estão produzindo — popup que colhe o e-mail e depois manda pro
WhatsApp, com imagem e visual melhor.

A verificação técnica bate com a leitura visual dele: apontar a campanha pra rota React
**teria repetido o 09/06**, porque a rota React não registra conversão no Ads (motivos
na correção acima). **Não trocar o destino da campanha agora.** A campanha segue no
WordPress, onde a tag comprovadamente dispara (112 conversões em 01–22/07), até a LP
nova estar no ar **com a tag validada**.

> O padrão novo (popup e-mail → WhatsApp) **já é o das 16 LPs estáticas** — todas usam
> `lm-form`. Ou seja: a LP nova da Elis nasce nesse molde. **É por isso que consertar o
> molde resolve o problema inteiro, e não só a desportiva.**

### O que fazer amanhã, nesta ordem

1. **Passar pra Elis/Nick o `docs/TRACKING_LP.md`** (criado em 23/07, na branch
   `fix/gtag-lps-cegas`) — são 3 trechos pra colar. **Se a LP nova nascer com eles, o
   problema morre na origem** e o patch do PR #162 não precisa nem sobreviver.
   ⚠️ Sem isso, a LP nova sobrescreve `public/desportiva-4x1/index.html` e **o patch é
   jogado fora junto** — e ninguém percebe, porque o Meta continua medindo.
2. **Lucio (~15 min):** criar 3 ações de conversão no Google Ads (Ferramentas >
   Conversões), uma por curso, e passar os rótulos → eu colo em `ADS_LABEL`.
3. Mergear o [PR #162](https://github.com/Luciomaier/holos-universit/pull/162) e validar
   conversão real 24–72h.
4. **Só então** reapontar a Desportiva pra fora do WordPress. Nunca antes.

### Estado em 23/07 (fim do dia)
- PR #162 aberto, branch `fix/gtag-lps-cegas`, **+78/−0**, produção intacta (não foi
  pra main). Inerte de propósito até os rótulos chegarem.
- `massoterapia-lp` **não** foi tocada — confirmado no diff. A masso segue medindo.
- Repo `holos-connect` estava atrasado localmente; foi feito `git pull` em 23/07.
  **Puxar de novo antes de mexer** — o time (Nick/Elis via Lovable) commita direto na main.

---

## 2026-07-23 — Risco de conversão em dobro: item C do roteiro RESPONDIDO (não há conversão órfã)

Verificação do medo registrado em 17/06 e reafirmado no plano de saída do WordPress:
*"o eb4us/Builderall pode estar mandando conversão server-side; colar gtag nas LPs
contaria em dobro"*. Puxado via Windsor (Google Ads) + inspeção ao vivo das páginas.

**1. Não existe conversão órfã na conta da Holos.** Ações de conversão da
`Holos Geral` (644-631-5099), 01–22/07 — a lista inteira:

| Ação | ID | all_conv | Conta no lance? |
|---|---|---|---|
| Lead - Massoterapia Presencial LP B | 7163932290 | 435 | ✅ sim |
| CONTATO NEW SITE | 6566704991 | 135 | ✅ sim |
| Local actions - Other engagements | 1060577679 | 266 | não |
| Local actions - Website visits | 1059741800 | 58 | não |
| Store visits | 7340031067 | 34,8 | não |
| Ligação do Anúncio | 471576135 | 7,0 | não |

⚠️ **Armadilha evitada:** puxar sem filtrar conta traz ações de OUTROS clientes do MCC
(`Gracielly` 871-963-3517, `Daiana - Angelus` 367-202-7642, `Dra Jacira` 930-468-5264) —
"CHAMA AQUI NO WHATSAPP", "Chame no WhatsApp", "Clique no WhatsApp", "(31) 99158-0239",
"Conversation started", "Calls from ads". **Nenhuma é da Holos.** Sempre filtrar por
`account_id` antes de cravar qualquer coisa.

→ **Só 2 ações alimentam o smart bidding, ambas reconhecidas.** Se o Builderall
estivesse importando conversão, ela apareceria como ação própria "recebendo conversões" —
não aparece. **Item C do roteiro do Lucio: respondido. Dá pra colar gtag nas LPs.**

**2. A LP que já tem gtag não pode duplicar — confirmado no ar.**
`app.…/massoterapia-lp` hoje: gtag base `AW-752011587` carrega, **2** chamadas
`gtag('event','conversion')` com send_to `AW-752011587/aPfMCILdg9gaEMOSy-YC` (os 2 fire
points de 17/06), **zero GTM, zero eb4us**. Caminho isolado → 1 clique = 1 conversão.
O fix de 17/06 segue no ar, intacto, 5 semanas depois.

**3. O lixo do WordPress continua lá** (Fase 1 do plano de saída **não foi executada**).
`holoscursoseterapias.com.br/curso-de-desportiva-4x1/` em 23/07 ainda carrega:
`crm-api.eb4us.com/js/tracking.min.js` · GTM-PGTFNK2 · pixel do TikTok ·
AdSense `ca-pub-9521104886250024` · 5 links WhatsApp p/ `5511976994647`.

**4. Fica ABERTO (risco menor, mora só no WordPress):** o GTM-PGTFNK2 tem as duas tags
("CONTATOS NEW SITE" em vários botões WhatsApp + "Massoterapia LP B - WhatsApp"). Se os
dois gatilhos casarem no MESMO clique de WhatsApp numa página WP, é 1 clique → 2
conversões contadas. Sintoma compatível: `(CP) Busca M.Desportiva` registra as duas
ações juntas quase todo dia. **Não é o eb4us — é o container.** Explicação alternativa
inocente: atribuição cross-campanha (o lead navegou até a LP masso). Só se resolve
abrindo os 2 gatilhos no GTM ou com Tag Assistant numa página WP.

**5. As duas ações contadas são `ONE_PER_CLICK`** — um clique de anúncio gera no máximo
**1** conversão *daquela ação*, por mais vezes que a tag dispare.

| Ação contada no lance | Contagem |
|---|---|
| Lead - Massoterapia Presencial LP B | `ONE_PER_CLICK` ✅ |
| CONTATO NEW SITE | `ONE_PER_CLICK` ✅ |

✅ Isso **encerra** o medo dos 2 fire points da LP masso (skip + submit): disparando os
dois, o Google conta **1**.
⚠️ **CORREÇÃO (mesmo dia, ver bloco de 23/07 abaixo):** `ONE_PER_CLICK` protege *dentro de
uma ação*, **não entre ações diferentes**. Um mesmo clique de WhatsApp numa página com GTM
pode disparar `CONTATO NEW SITE` **e** `Lead LP B` = 2 conversões contadas. Escrevi antes
que "o dobro é impossível por configuração" — **estava forte demais**. O dobro segue
possível no WordPress; só não vem do eb4us nem dos fire points da LP.

## 2026-07-23 (fim do dia) — 🔴 Aurículo e Quiro estão CEGAS. E mover a Desportiva do WP cega ela também.

**Item A do roteiro respondido pelo Lucio** (ele abriu as campanhas): só a **Desportiva**
ainda aponta pro WordPress. Aurículo, Quiro e Masso já apontam pro `app.`.

Verificado ao vivo (curl, 23/07) o que cada página de destino carrega:

| Campanha | Página de destino | Tag Google? | Gasto 01–22/07 |
|---|---|---|---|
| Masso Geral (PG_B) | `app./massoterapia-lp/` | ✅ gtag `AW-752011587` direto | R$ 16.231,68 |
| **Aurículo** | `app./curso-de-auriculoterapia` | ❌ **NENHUMA** | R$ 825,53 |
| **Quiro Modular** | `app./curso-livre-de-quiropraxia` | ❌ **NENHUMA** | R$ 1.042,11 |
| Desportiva | WP `/curso-de-desportiva-4x1/` | ✅ via GTM-PGTFNK2 | R$ 1.803,05 |

⚠️ **Aurículo e Quiro NÃO são páginas do SPA.** São HTML avulso com `<head>` próprio
(sem o bundle `/assets/index-*.js` da raiz, `<title>` próprio, só pixel Meta). A raiz do
app (`app./`) tem GTM-PGTFNK2 + GA4 `G-YV8T6YK9N9`, **mas elas não herdam** — mesma
armadilha das 5 LPs estáticas. Zero GTM, zero gtag, zero GA4, zero dataLayer.

**Consequência: as conversões que o Aurículo (16) e a Quiro (13) mostram não vêm das
páginas delas** — é crédito emprestado. A pessoa clica no anúncio do aurículo, cai numa
página sem tag, navega até a LP masso (ou o WP) e converte lá; o Google credita o
Aurículo. Prova: as duas têm **9 conversões "Lead - Massoterapia Presencial LP B"** cada,
e essa tag só existe na LP de massoterapia. **O lead real do aurículo — quem clicou no
WhatsApp na página do aurículo — não é contado por ninguém.**
→ R$ 1.867,64 em 22 dias em campanhas com página de destino cega. O "CPA R$ 51,60" do
Aurículo e "R$ 80,16" da Quiro são calculados em cima de conversão dos outros.

### 🚨 A armadilha da migração (o acidente de 09/06 prestes a se repetir)

A Desportiva é hoje a **mais bem rastreada** das três secundárias justamente porque
**ainda está no WordPress** (GTM completo). A LP React que vai receber ela —
`app./desportiva-4x1/` — foi verificada hoje: **só pixel Meta, zero Google.**

> **Mover a Desportiva pro React sem colar a tag antes = conversão vai a zero no dia
> seguinte.** Foi exatamente isso que aconteceu com a masso em 09/06 (−98%), e o
> estrago não foi só medir errado: o smart bidding cegou e estrangulou a entrega.

**Ordem obrigatória:** colar o gtag na `desportiva-4x1` **primeiro**, validar conversão
real 24–72h, **só então** reapontar a campanha. Nunca o contrário.

### 🔴 A doença é o MOLDE, não as 3 páginas

Auditadas as **16 LPs estáticas** de `holos-connect/public/`: **só a `massoterapia-lp` tem
tag do Google. As outras 15 estão cegas.** E a migração WordPress→LP estática está a todo
vapor (Radiestesia, Cone Hindu, Modeladora, Relaxante migraram nos últimos dias) —
**cada página nova nasce cega**, porque o molde não traz a tag.

> Corrigir 3 páginas resolve hoje. **Corrigir o molde resolve amanhã.** Enquanto o molde
> não mudar, toda página que sair do WordPress perde a medição do Google no caminho.

### ✅ Feito em 23/07 — PR #162 (aguardando rótulos)

[PR #162](https://github.com/Luciomaier/holos-universit/pull/162) ·
branch `fix/gtag-lps-cegas` · **+78/−0** nas 3 LPs com campanha ativa:
gtag `AW-752011587` no `<head>` (liga vinculador → grava **gclid**) + constante
`ADS_LABEL` por LP + disparo no submit, ao lado do `fbq` que já existia.

**Guard:** `ADS_LABEL` vazio → **não dispara conversão**, só grava gclid. Preencher o
rótulo liga a medição **sem novo deploy de código**.
**Isolamento da masso confirmado:** `massoterapia-lp/` não tocado; rótulo
`aPfMCILdg9gaEMOSy-YC` **não** reusado. Sem valor monetário no disparo, de propósito.
**Verificado:** sintaxe JS ok nos 4 arquivos · guard testado (0 disparos vazio / 1 com
rótulo, `send_to` correto) · 1 fire point por LP.

### Pendências abertas (prioridade)
- [ ] **P1 (Lucio, ~15 min no Google Ads)** — criar 3 ações de conversão (Ferramentas >
      Conversões), uma por curso, e me passar os rótulos. Sem isso o PR fica inerte.
- [ ] **P2** — mergear o #162 e validar conversão real 24–72h **antes** de reapontar a
      Desportiva pro `app.`. Nunca reapontar primeiro.
- [ ] **P3 — consertar o molde das LPs** pra toda página nova nascer com gtag + captura
      de gclid. Sem isso a dívida volta a cada migração.
- [ ] Estender pras outras 12 LPs cegas conforme forem recebendo verba.

---

## 2026-07-23 — Leitura da Masso Geral (PG_B): CPA real e o que o número É

**01–22/07** · estratégia **TARGET_SPEND (Maximizar cliques)** — a troca de 17/06 foi
mantida, 5 semanas sem mexer. Disciplina cumprida. (O `target_cpa: 15` que aparece na API
é resíduo herdado; TARGET_SPEND não usa tCPA.)

| Métrica | Valor |
|---|---|
| Gasto | **R$ 16.231,68** (~R$ 738/dia) |
| Cliques | 2.444 · CPC médio **R$ 6,64** |
| Conversões | **429** (361 Lead LP B + 68 CONTATO NEW SITE) |
| Taxa de conversão | **17,6%** |
| **Custo por conversão** | **R$ 37,84** |
| Valor declarado | R$ 90.250 (=361 × R$250) — **fictício, não é receita** |

CPA diário oscila R$ 19,69–69,80 sem saltos; nenhum cliff em 22 dias. Últimos 3 dias
(20–22/07) com gasto maior (R$ 844→1.048→936) e CPA estável (R$ 32/36/33) — escala sem
piorar o custo.

**⚠️ Como ler o R$ 37,84 (a régua):** é **custo por clique-no-WhatsApp**, não por lead no
ZenPro e muito menos por matrícula. A tag dispara quando a pessoa **abre** o WhatsApp —
parte nunca manda mensagem. **O custo por lead real é maior; o gap só sai cruzando com o
ZenPro** (é o widget de reconciliação da Fase 2 do Painel).

**⚠️ 68 das 429 (16%) não vêm da LP.** "CONTATO NEW SITE" dispara via GTM, que **não** está
na LP estática — está no WordPress e na raiz do app React. Quando as páginas WP morrerem
na migração, essas 68 mudam de lugar ou somem. **Contar com isso no plano de saída.**

**⚠️ A Desportiva pega carona na masso.** `(CP) Busca M.Desportiva`: 112 conversões, valor
R$ 14.000 → **56 delas são "Lead - Massoterapia Presencial LP B"**. Metade das conversões
da Desportiva são leads de massoterapia (atribuição data-driven repartindo crédito — os
decimais 22,3333 / 12,6667 são a assinatura). **O CPA de R$ 16,10 dela é enganoso.**
Mesma coisa, menor: Auriculo e Quiro Modular têm 9 Lead-LP-B cada.

### Pendências abertas
- [ ] Cruzar as 361 conversões de Lead LP B com os leads reais do ZenPro no mesmo período
      → só aí sai o **custo por lead de verdade**.
- [ ] Voltar pro lance por conversão? Já são 5 semanas de conversão estável (a pendência
      de 17/06 pedia 2–3 dias). Se voltar, mirar **tCPA ~R$ 40–45** (o CPA real), **não**
      os R$ 80–130 chutados em junho nem os R$ 13,57 que estrangularam a campanha.
- [ ] Abrir os gatilhos "Click - WhatsApp LP B" × "CONTATOS NEW SITE" no GTM e ver se
      colidem na mesma página WP (crédito trocado entre ações — não infla volume).
- [ ] Fase 1 do plano de saída: arrancar eb4us/TikTok/AdSense do `<head>` do WP.
- [ ] Roteiro do Lucio itens **A** (URL final de aurículo/desportiva/quiropraxia) e
      **B** (template de URL passa `utm_campaign`?) seguem sem resposta.
- [ ] Liberado colar gtag nas outras 4 LPs (label/valor próprios) — sem risco de dobro.

---

## 2026-06-18 (tarde) — Tracking de UTM da massoterapia-lp + mensagem por origem (Instagram)

**Onde vive o código (fonte de verdade):** repo GitHub `Luciomaier/holos-universit`
(local em `/home/usuario/Documentos/Projetos/holos-connect`), branch **main** →
deploy automático na **Vercel** → `app.holoscursoseterapias.com.br`. As LPs são
HTML estático em `public/<lp>/index.html`. Fluxo: feat branch → PR → merge na main.
⚠️ Editar só o local NÃO sobe; tem que ir por PR. O clone local vivia atrasado — dei `git pull`.

**Auditoria de tracking da `massoterapia-lp`:**
- Meta Pixel `902498357163312` + `fbq('track','Lead')` nos 2 pontos (skip + submit).
- Google gtag `AW-752011587` / label `aPfMCILdg9gaEMOSy-YC` (R$250) — só nesta LP; as outras têm só o Pixel.
- Captura de UTM: **só** `utm_source/medium/campaign` → salva no Supabase `leads_campanha` (como veio).
- `#ref=` é montado a partir de `utm_campaign` (fallback `OR-massoterapia`) e colado na msg do WhatsApp.
  **Quem lê o `#ref=` é o ZenPro** (PulsarZap saiu do circuito) p/ atribuir o lead.
- **Lacunas (espelham o gclid do Google):** `fbclid` e `utm_content` NÃO são capturados →
  sem CAPI/offline por clique do Meta e sem atribuição por criativo no lead.
- Padrão documentado (`holos-cursos-terapias/marketing/campanhas/landing-pages.md`):
  Google = `GC-*` · **Meta = `#ref=ME-*`**. ⚠️ Lucio usou `IS-ub34kh` nos testes — alinhar p/ `ME-*` nos anúncios.

**Mudança feita (PR #98, mergeado na main):**
- `massoterapia-lp`: quando `utm_source=instagram`, **todos os botões** enviam saudação própria
  ("Olá! Vi no Instagram e tenho interesse no curso de Massoterapia..."). Google e orgânico **intactos**.
  `#ref=` continua **1x** (sem duplicar). Diff +6/-1. Testado no preview pelo Lucio = OK.
- Escopo: **só a massoterapia-lp**. Cada LP tem UTM e mensagem próprias — replicar uma a uma
  com texto adaptado ao curso (ex: salas-lp não serve "curso de Massoterapia").

### Pendências abertas (tracking)
- [ ] Replicar mensagem-por-origem nas outras LPs (texto adaptado): mensalistas, salas-lp,
  aula-experimental, desportiva-4x1, masso-ead, estágio-social.
- [ ] Capturar `fbclid` + `utm_content` nas LPs (espelhar o fix do gclid) — pra atribuição fina do Meta.
- [ ] Padronizar `utm_campaign` do Meta em `ME-*` nos anúncios (não `IS-`).

---

## 2026-06-18 — Prévia da reunião de campanha de julho enviada à Lu

- Montado o documento de prévia (PDF) com todas as campanhas planejadas pra julho:
  `campanhas/previa-reuniao-julho-2026.pdf` (+ fonte `.html`). É a pauta antecipada
  pra Lu decidir antes da reunião (que está corrida).
- **Lucio já enviou** o PDF pra Lu. Aguardando as decisões.
- Status de página verificado (curl): site é SPA/Lovable com catch-all.
  - **No ar (confirmadas):** Presencial (`/massoterapia-lp`), Mensalidades
    (`/mensalistas/`), Aula Experimental (`/aula-experimental/`), Salas (`/salas-lp/`),
    Desportiva 4x1 (`/desportiva-4x1/`).
  - **A confirmar publicação** (caem no fallback no servidor — pode ser só CSR):
    Quiropraxia (`/curso-livre-de-quiropraxia`), Auriculo (`/curso-de-auriculoterapia`),
    Tarô (`/curso-de-taro-terapeutico`). ⚠️ Auriculo é campanha ativa e não veio do servidor.
  - **A criar:** Intensivo Flex 21 dias, Reiki. **A decidir:** Kabbalah (Magia Antiga ou nova).

### Pendências abertas (pós-prévia)
- [ ] Receber da Lu: verbas Meta/Google por campanha + total (manter teto R$1.000/dia?).
- [ ] Confirmar páginas Quiropraxia/Auriculo/Tarô no navegador (publicadas?).
- [ ] Criar páginas: Intensivo Flex, Reiki. Decidir Kabbalah.
- [ ] **Prazo:** se a reunião passar de ~22/06, as campanhas de 03–05/07 viram urgência.

---

## 2026-06-17 — Pasta de cliente criada + diagnóstico dos 30 dias

- Criada a pasta de cliente `rede-publicidade/clientes/holos/` (padrão Jacira/vanessa):
  `CLAUDE.md`, `briefing.md`, `criativos/`, `relatorios/`, `dados/`.
- Puxados os dados do Google Ads via Windsor.ai (conta `644-631-5099` "Holos Geral"),
  período 18/05–16/06. Salvos em `../dados/dados-google-ads-30d.json`.
- **Achado principal:** conversões da campanha **Masso Geral (PG_B)** despencaram
  ~96% a partir de **09/06** (de ~72/dia para ~2,7/dia), com cliques e impressões
  mantidos → assinatura de **tracking de conversão quebrado**, não de queda real
  de vendas. Detalhe em `diagnostico-google-ads-16-06.md`.
- **Auriculo:** rodando com verba baixa, ROAS ~1,1x — revisar à parte.

### Pendências abertas
- [ ] Confirmar status da **tag de conversão** do Google Ads (recebendo conversões?).
- [ ] Verificar mudança/deploy no site ou LP em ~08–09/06.
- [ ] Cruzar com vendas reais da Holos em 09–16/06 (houve venda não contada?).
- [ ] Decisão sobre Auriculo (manter/ajustar/pausar).
- [ ] Popular `criativos/` com os anúncios atuais.

---

## 2026-06-17 (tarde) — Troca de lances p/ cliques segurou só 1 dia

Contexto do Lucio: na leitura anterior a campanha estava com "freio de mão"
por causa das conversões (smart bidding estrangulou a entrega). Mudaram a
estratégia de lance de **conversões → cliques**; a campanha voltou a gastar
perto da verba. Mas durou **um dia só**.

Dados confirmam:
- 14/06: Masso R$71 (freio) · 15/06: **R$675** (pós-troca, recuperou) ·
  16/06: R$74 · **17/06 (parcial): R$3** → freio voltou.
- R$81,81 que o Lucio viu ontem = Masso R$74,31 + Auriculo R$7,51 (total da conta).
- Parcela de impressões da Masso caindo: 76% (15/06) → 43% (16/06) → 31% (17/06)
  com gasto baixo = **perdendo leilão (rank/CPC), não estourando verba**.
- Conversões seguem ~0 desde 09/06 → **tracking continua quebrado**.

Leitura: a troca pra cliques foi analgésico. Causa-raiz (tracking) intacta +
provável **limite de CPC máximo baixo** no "Maximizar cliques" → ganha leilão
um dia, no outro não. Cada troca de estratégia reinicia o aprendizado (chicote).

Recomendação registrada:
1. (Google Ads, manual) Remover/subir o limite de CPC máx. da Masso; confirmar
   orçamento diário; **parar de trocar a estratégia dia a dia** (segurar 5–7 dias).
2. (Nick) Consertar o tracking de conversão — a cura real.
3. NÃO mexer em verba agora (não é falta de verba; é não conseguir gastar a que tem).

### Pendências abertas
- [ ] Subir/remover limite de CPC máx. na Masso (Google Ads).
- [ ] Confirmar orçamento diário da Masso.
- [ ] Consertar tag de conversão (Nick) — quebrou ~09/06.
- [ ] Verificar deploy/mudança no site ou LP em ~08–09/06.
- [ ] Cruzar com vendas reais 09–16/06 (venda não contada?).
- [ ] Decisão sobre Auriculo (ROAS baixo, verba mínima).
- [ ] Após estabilizar, escolher estratégia de lance definitiva e segurar.

---

## 2026-06-17 (Fase 0 em execução) — Estratégia estava de volta em "Maximizar conversões + tCPA"

Ao abrir Configurações > Lances da Masso Geral (PG_B), a campanha **não estava**
em Maximizar cliques: estava em **Maximizar conversões com CPA desejado R$13,57**,
orçamento **R$1.000/dia**, otimizada para a conversão "Contatos".

- Isso reexplica o freio de hoje (R$3): **não é teto de CPC nem leilão** — é o
  smart bidding estrangulando a entrega porque, com o tracking cego desde 09/06,
  o tCPA de R$13,57 "não vê" conversões e corta o gasto.
- O "um dia sim, outro não" = 15/06 estava em cliques (R$675); depois **reverteu
  pra conversões** e o freio voltou.
- Google Ads não troca estratégia sozinho → alguém alterou de volta, a troca pra
  cliques não foi salva, ou há **estratégia de portfólio** aplicada. **A confirmar.**

**Feito e confirmado:** estratégia trocada p/ **Maximizar cliques**, **sem limite
de CPC** (checkbox desmarcada), orçamento mantido em R$1.000/dia. Fase 0 fechada.
Disciplina acordada: **não trocar estratégia por 5–7 dias** + avisar quem tem
acesso pra ninguém reverter.

### Pendências abertas
- [ ] Acompanhar gasto reagir nas próximas 24–48h (deve voltar a subir).

---

## 2026-06-17 (Fase 1 — CAUSA-RAIZ ISOLADA) — Quebra é na camada de tag do SITE

Puxado via Windsor: conversões por **ação × dia** da Masso (01–16/06). Cliff exato
no **09/06**, em DUAS ações de conversão de **site**, simultaneamente:

| Ação de conversão | Fonte | 01–08/06 (média/dia) | 09–16/06 (média/dia) | Queda |
|---|---|---|---|---|
| **Lead - Massoterapia Presencial LP B** (R$250/cada) | Site | ~52/dia (~R$13k/dia) | ~0,8/dia | **−98%** |
| **CONTATO NEW SITE** | Site | ~18/dia | ~1,9/dia | **−89%** |

**Não quebraram:** "Local actions - Other engagements", "Store visits",
"Local actions - Website visits" — todas **hospedadas pelo Google/Maps** —
seguiram normais o período todo.

**Conclusão:** as duas conversões de **tag no site** caíram juntas no mesmo dia,
enquanto as de fonte Google ficaram intactas → não é config de uma tag isolada,
é a **camada base do site (gtag/GTM/conversion linker) ou a publicação do site/LP B**.
Algo publicado/alterado em **08→09/06** derrubou o tracking do site inteiro.
A LP afetada é a **"Massoterapia Presencial LP B"**.

Suspeitos (ordem): (1) deploy do site/LP B removeu/quebrou o snippet gtag/GTM;
(2) container GTM republicado com tag pausada/quebrada; (3) banner de consentimento
LGPD novo bloqueando disparo; (4) ID/rótulo de conversão alterado.

### Pendências abertas (Fase 1 → Fase 2)
- [ ] Verificar git/deploy do site Holos (`../../../holos-cursos-terapias`) em 08–09/06.
- [ ] Identificar a LP B e confirmar se o gtag/GTM ainda está no HTML.
- [ ] Tag Assistant ao vivo na LP B: a tag de conversão dispara hoje?
- [ ] Conferir se há banner de consentimento novo bloqueando.
- [ ] F2: corrigir + conversão de teste + acompanhar 24–72h.

---

## 2026-06-17 (Fase 1 — RECONCILIAÇÃO com nota do ciclo 09/06) — Causa real: tag da LP React

O cérebro Holos (`../../../holos-cursos-terapias`) já tinha a nota
`marketing/ciclos/2026-06-09-microconversoes-google-lp-react.md`. O 09/06 foi uma
**mudança deliberada**, não um bug: migração da LP **WordPress → React/Vercel**
(`app.holoscursoseterapias.com.br/massoterapia-lp`, tracking **GC-0hh1dj**) +
desativação intencional das micro-conversões (Engajamento, Ver rota, Compra).

A nota cravou: micro-conversões removidas = lixo (correto); leads reais estáveis
no ZenPro (~30/dia); freio = tCPA R$15 travando lance → trocaram p/ Max Cliques.

**O que a leitura por ação ADICIONA (a nota não viu):** a conversão que eles
queriam MANTER — **"Lead - Massoterapia Presencial LP B" (R$250, fonte Site)** —
também caiu **98%** no 09/06 (~52→~0,8/dia). Não é micro-conversão nem só tCPA:
é a **tag de conversão de lead NÃO disparando na LP React nova**. Casa com o ponto
já anotado: a LP React tem "um passo a mais antes do WhatsApp" → o lead chega no
ZenPro mas a tag GC-0hh1dj não dispara → Google cego → lance congela.

**Causa-raiz real = tag da LP React quebrada na migração** (o tCPA foi consequência,
não causa). Responsável: Nick (LP) + Lucio (tracking/pixel). LP = `/massoterapia-lp`,
tracking GC-0hh1dj.

## 2026-06-17 (Fase 1 — CONFIRMADO ao vivo + IDs recuperados)

Inspeção ao vivo da LP React `app.holoscursoseterapias.com.br/massoterapia-lp`
(Playwright, read-only): `window.gtag` **undefined**, `dataLayer` inexistente,
**nenhum** container GTM, **zero** requests pro Google. Único tag de marketing:
**pixel da Meta `902498357163312`**. Confirma a causa-raiz: a LP estática não tem
NENHUMA tag do Google. O lead é salvo no Supabase `leads_campanha` (ZenPro lê daí)
e dispara só `fbq('track','Lead')` — sem equivalente Google.

A LP é HTML estático em `holos-connect/public/<lp>/index.html` (5 LPs:
massoterapia-lp, mensalistas, salas-lp, estagio-social, desportiva-4x1). O app
React (raiz) TEM GTM-PGTFNK2 + GA4 G-YV8T6YK9N9, mas as LPs estáticas têm `<head>`
próprio e não herdam.

**IDs recuperados do WordPress antigo** (`holoscursoseterapias.com.br`, ainda no ar,
disparava tudo via GTM):
- Container GTM: **GTM-PGTFNK2** (mesmo do app)
- Conversões Google Ads via GTM: **AW-752011587** e **AW-412673590**
- GA4 do WP: **G-1ZVTBMN0QY** (⚠️ ≠ do app `G-YV8T6YK9N9` — investigar à parte)

**Fix definido:** recolocar GTM-PGTFNK2 nas LPs estáticas + replicar no submit do
lead o gatilho que a conversão usa no container. Recupera GA4 + Ads de uma vez.
Falta só: do GTM/Google Ads — qual AW/label é a "Lead - Massoterapia Presencial LP B"
e qual o gatilho (evento dataLayer / form submit / pageview obrigado).

### Próximo: validar disparo ao vivo na LP React
- [ ] Inspecionar `app.holoscursoseterapias.com.br/massoterapia-lp`: o gtag/GC-0hh1dj
      carrega? Em que evento a conversão deveria disparar (submit do form? redirect WhatsApp?).
- [ ] Mapear o "passo a mais": onde no fluxo a conversão deveria firar e não fira.
- [ ] Fix com o Nick: disparar GC-0hh1dj no submit do form (antes/independente do WhatsApp).
- [ ] Conversão de teste + acompanhar "Lead - ...LP B" voltar nas 24–72h.
- [ ] Descobrir por que reverteu (acesso de terceiro? portfólio? não salvou?).
- [ ] F1: status da ação de conversão "Contatos" no Google Ads (quebrou ~09/06).
- [ ] F1: identificar fonte da conversão (gtag/GTM/GA4/offline).
- [ ] F1: o que mudou em 08–09/06 (deploy/LP/consentimento).
- [ ] F2: corrigir + conversão de teste + cruzar com vendas reais 09–16/06.
- [ ] Decisão sobre Auriculo (ROAS ~1,1x, verba mínima).

---

## 2026-06-17 (Fase 1/2 — Workflow + GTM inspecionado)

Workflow multi-agente (10 agentes): auditou as 5 LPs estáticas (todas com a MESMA
quebra — só pixel Meta, zero Google) + 3 verificações adversariais + síntese.
Pacote de correção completo salvo em `fix-tracking-google-17-06.md`.

**Caveats que a verificação levantou (importam):**
- A LP estática é página NOVA (commit 08/06, merge 09/06 PR #61), não migração limpa.
- WP `holoscursoseterapias.com.br` vivo, roda CRM/tagger `crm-api.eb4us.com` que
  bate no doubleclick → checar se não há rota offline (risco double-count) — mas
  ver abaixo: a conversão é client-side via GTM, então o risco caiu.
- Cliques caíram ~35% no 09/06 também (131→86) — parte da queda é entrega cortada.
- LP não captura **gclid** (só utm) → lacuna de atribuição; capturar e persistir.
- "Lead" é proxy de topo (abrir WhatsApp), não matrícula (R$250 é offline) → ROAS
  real exige conversão offline por gclid (fase futura).

**GTM-PGTFNK2 (container Web "Espaço Holos") inspecionado — Tags:**
- **"Conversão Google Ads - Massoterapia LP B - WhatsApp"** (Acompanhamento de
  conversões Ads) → trigger **"Click - WhatsApp LP B"** = a conversão "Lead -
  Massoterapia Presencial LP B" (R$250). É **client-side, por clique de WhatsApp**.
- **"CONTATOS NEW SITE"** (Acompanhamento de conversões Ads) → vários botões WhatsApp.
- Vinculador de conversões (All Pages) ✓ · G4 (GA4) · REMARKETING · Tag Base - Google
  Ads · ANALYTICS UNIVERSAL (UA morto) · GLOBAL TAG (HTML custom, All Pages — ⚠ conteúdo
  desconhecido, possível pixel Meta → não recolar GTM na LP).

**Decisão:** gtag direto (não recolar GTM). Conversão = clique de WhatsApp → bate com
os 2 fire points da LP (submit linha 1345 + skip linha 1320). Como a LP estática não
carrega o GTM, o gtag direto fica isolado (sem double-count).

**Falta só:** o ID de conversão (AW-) + rótulo da tag "Conversão Google Ads -
Massoterapia LP B - WhatsApp" (Lucio pegando no GTM agora). Aí o patch fecha.

## 2026-06-17 (Fase 2 — FIX APLICADO E DEPLOYADO) — gtag de conversão na LP

Valores recuperados do GTM (tag "Conversão Google Ads - Massoterapia LP B - WhatsApp"):
- **ID de conversão:** AW-752011587 · **Rótulo:** aPfMCILdg9gaEMOSy-YC
- send_to: `AW-752011587/aPfMCILdg9gaEMOSy-YC` · Vinculação `_gcl` (gclid automático).

Patch aplicado em `holos-connect/public/massoterapia-lp/index.html` (decisão do Lucio:
resolver por aqui, não passar pro Nick): gtag base no `<head>` + `gtag('event',
'conversion', {send_to, value:250, currency:'BRL', transaction_id})` nos 2 pontos
onde o `fbq('track','Lead')` já firava (submit do modal linha ~1369 + skip linha ~1344).
Aditivo (+19 linhas), não toca no Meta nem no design.

⚠️ **Corrida com o Nick:** no meio do trabalho o Nick deu push de um redesign da LP
(PR #86, ajustes da Elis — novo hero com foto). Meu push foi rejeitado; **não forcei**.
Resetei pra versão dele, **re-apliquei o fix por cima** (design preservado) e verifiquei
de novo no browser: conversão 1x por fire point, 0x no abre-modal, Meta intacto, 0 erros.
Commit `e7582fdc`, push fast-forward aceito. Vercel deployando.

**Verificação local (2x, browser headless):** gtag carrega, `config AW-752011587` roda,
skip e submit disparam a conversão com o send_to certo, `fbq Lead` continua 1x. ✓

### Pendências (Fase 2 → 3)
- [x] **gtag CONFIRMADO no ar** (commit e7582fdc deployado). Verificação ao vivo:
      gtag.js AW-752011587 carrega, tag Ads firando (viewthroughconversion + ccm/collect),
      GA4 G-YV8T6YK9N9 voltou de bônus (destino vinculado), Meta intacto.
- [x] **Conversão de teste CONFIRMADA ponta-a-ponta** (17/06): beacon
      `googleadservices.com/pagead/conversion/752011587/?en=conversion&label=aPfMCILdg9gaEMOSy-YC&value=250&currency_code=BRL&gclaw=TESTE_HOLOS_20260617` → HTTP 200.
      gclid capturado/atribuído, enhanced conversions ativo. Nota: gclid de teste era
      **fake** → o Google recebe o beacon mas **não contabiliza** (sem clique real pra
      casar) → não polui a conta. Prova real = leads reais nas próximas 24-72h.
- [ ] Acompanhar "Lead - Massoterapia Presencial LP B" voltar a registrar (24-72h).
- [ ] **As outras 4 LPs (mensalistas, salas, estagio-social, desportiva-4x1) seguem
      sem gtag** — aplicar só onde houver campanha Google ativa (valor/label próprios).
- [ ] Capturar gclid no Supabase (atribuição + futura conversão offline).
- [ ] Só voltar pro lance por conversão (tCPA R$80-130) após 2-3 dias de conversão estável.

<!-- Próximas entradas acima desta linha. Formato: data — o que foi feito + pendências. -->
