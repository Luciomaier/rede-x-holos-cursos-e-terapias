# 🔎 Auditoria de tráfego — onde o dinheiro está ficando na mesa

> **Data:** 14/07/2026 (D2 de julho em andamento) · **Autor:** Claude + Lucio
> **Método:** leitura direta do banco do ZenPro (1–14/07) + leitura do código real das landing pages
> (`holos-connect/public/*` e `src/pages/*`). Nenhum número aqui é estimativa de tela — todos têm consulta ou linha de código atrás.
> **✅ Revisado em 16/07** — ver bloco de verificação abaixo.
> ← [Painel](../painel.md) · [Registro de otimizações](registro-otimizacoes.md) · [Plano de tracking 23/06](2026-06-23-plano-correcao-tracking.md)

---

## ✅ VERIFICAÇÃO 16/07 — o que passou, o que caiu, o que apareceu

> Releitura linha a linha do `webhook-worker` e das 10 LPs estáticas. **O achado principal passou intacto.**
> Três coisas novas apareceram e **dois itens deste documento estavam errados** — corrigidos in loco abaixo.

### 🟢 O achado nº1 está CONFIRMADO — sem margem de dúvida

[`webhook-worker/index.ts:22-27`](../../../zenpro/supabase/functions/webhook-worker/index.ts) é literalmente o que
estava descrito. E há uma prova a mais que não tínhamos visto: o parâmetro **`guid=ON`** na URL do pixel
significa *"identifique o usuário pelo cookie do Google"*. **Numa edge function não existe cookie nenhum.**
O Google recebe o hit e não tem a quem atribuir. Não é bug sutil — é endpoint de navegador chamado de servidor.

### 🆕 Três achados novos

| # | Achado | Evidência |
|---|--------|-----------|
| A | **O GA4 tem a mesma doença** | `webhook-worker/index.ts:33` — `client_id: phoneNumber.replace(/\D/g,'')`. O `client_id` do GA4 tem que ser o cookie `_ga`. Com telefone, cada lead vira **usuário órfão sem sessão web** — o GA4 também não liga o lead à campanha |
| B | **O valor está fixo em toda parte** | Webhook manda `value=1`; a LP manda `value: 250.0`. **Nunca o ticket real (R$2.585).** Mesmo se atribuísse, otimizaria pro número errado |
| C | **O sinal da LP dispara em 2 pontos, não em 8** | O disparo está no `lm-skip` e no `lm-form` submit ([`massoterapia-lp/index.html:1369-1421`](../../../holos-connect/public/massoterapia-lp/index.html)) — os 8 CTAs só **abrem o modal**. A inflação vem de **reabrir o modal e converter de novo**. 🟢 **Isso simplifica a correção:** são 2 handlers, não 8 botões |

### 🔴 Dois itens DESTE documento estavam errados

1. **`OR-massoterapia` não é código órfão** (vazamento nº5). É o **`DEFAULT_REF`** da LP
   ([`massoterapia-lp/index.html:1319`](../../../holos-connect/public/massoterapia-lp/index.html)) — o fallback
   de quando a URL não traz `utm_campaign`. Está cadastrado **no código**. **Isso inverte a ação:** não é
   "cadastrar o órfão" — é descobrir **se tem anúncio pago caindo no fallback**. Se tiver, `OR-` lê-se
   *orgânico* e **o ROAS pago está sendo SUBESTIMADO**.
2. **As 10 LPs estáticas TODAS carimbam `#ref`** — o vazamento nº3 vale só pras páginas **React** (`src/pages/`).
   ⚠️ **A pegadinha que causou o erro:** o padrão no código é **URL-encoded** (`%23ref%3D`). Um `grep "#ref="`
   volta vazio e dá falso negativo. **Sempre grepar por `%23ref`.**

### ⚖️ A diferença que de fato importa entre as LPs

| | `massoterapia-lp` | aurículo · quiropraxia · desportiva |
|---|---|---|
| Tag de conversão | ✅ `AW-752011587` | 🔴 **zero** |
| Carimbo do ref | `utm_campaign \|\| DEFAULT_REF` → **sempre carimba** | `utmCampaign \|\| ref \|\| ''` → **só se a URL trouxer UTM** |
| Sem UTM na URL | vira `OR-massoterapia` | vira **nada** → lead entra **sem código** |
| `gclid` | 🔴 zero | 🔴 zero |

**As três são cegas dos dois lados:** não avisam o Google e não carimbam o lead quando a UTM falha.
🔑 **Teste barato que decide muito:** se os leads delas estiverem entrando "sem código" no ZenPro, o
**template de URL dos anúncios não está passando `utm_campaign`** — correção de 5 minutos no Google Ads.

### 🔴 O buraco real: não são 4 páginas React — são **46**

O repo do `holos-connect` (**= repo `holos-universit` no GitHub** — pasta local e repo remoto têm nomes
diferentes; é o mesmo projeto) tem **46 páginas `.tsx`** em `src/pages/`. As 7 de curso/masso verificadas
em 16/07 estão **todas** assim:

| Página React | `wa.me` | `#ref` | tag Google | lê UTM |
|---|---|---|---|---|
| `FormacaoMassoterapia` · `FunilMassoterapia` · `FormacaoMassoterapiaLitoralSul` · `FormacaoImersivaHolosNatureza` | ✅ | 🔴 **0** | 🔴 **0** | 🔴 **0** |
| `CursoMassagemDesportiva4x1` · `CursoLiberacaoMiofascial` · `CursoDrenagemLinfatica` | ✅ | 🔴 **0** | 🔴 **0** | 🔴 **0** |

**Elas não leem UTM** — então não dá nem pra carimbá-las por URL. Todo lead entra **sem código**, o que
casa com **"sem código" = 58% dos leads de julho**.

🚨 **`CursoMassagemDesportiva4x1.tsx` é uma DUPLICATA** da estática `public/desportiva-4x1/` — **duas
páginas pro mesmo curso**, e a campanha da Desportiva está **ATIVA**. Se ela aponta pra React: lead sem
código + zero sinal pro Google. **Mesmo risco vale pra masso** (a estática que rastreia × 4 React que não).

### ❓ A pergunta que NENHUM repo responde — e que decide tudo

**Pra onde cada campanha ativa aponta?** O *URL final* de cada anúncio não está em repositório nenhum —
só no Google Ads. **É o único dado que precisa vir de fora** (Windsor, print ou CSV). Todo o resto do
levantamento sai do código, que já está acessível.

> 📌 Sem essa resposta não dá pra saber se estamos consertando a página certa: instalar tag na LP estática
> não serve de nada se o anúncio manda o tráfego pra React.

### 🚨 O formato do Ref — uma pendência que QUEBRARIA o que funciona

O ZenPro parseia com `messageText.match(/#ref=([A-Za-z0-9_-]+)/i)`
([`webhook-worker/index.ts:295`](../../../zenpro/supabase/functions/webhook-worker/index.ts)) — ele lê **`#ref=`**.
Nenhuma LP anexa `Ref:` (grep vazio). **Todas usam `#ref=`, o ZenPro lê `#ref=`, o sistema está consistente.**

Mas o [`landing-pages.md`](../campanhas/landing-pages.md) registrava que o formato tinha sido "padronizado"
pra `Ref: <código>` e marcava a `massoterapia-lp` como **follow-up pendente** pra migrar. 🔴 **Executar esse
follow-up quebraria a atribuição da campanha principal.** Registro corrigido em 16/07.

### 📌 Correção de registro — as 4 campanhas (Lucio confirmou 16/07)

**Masso Geral · Aurículo · Desportiva · Quiropraxia estão TODAS ATIVAS**, ativadas pelo Lucio, rodando há
dias e entrando lead no ZenPro. O `google-ads.md` listava desportiva e quiropraxia como **pausadas**.
**É a 2ª vez que o registro mente** (a 1ª foi a PMax). 🔴 **Não tratar o `google-ads.md` como fonte
confiável até reconciliar contra a plataforma.**

⏫ **A urgência subiu:** tem **verba correndo em 3 LPs sem nenhuma tag de conversão** — a mesma doença do
achado nº1, na forma mais crua: lá nem pixel errado existe.

---

## 🎯 O achado principal — por que o lead do Google custa R$ 91 e o do Meta custa R$ 19

Não é o Google que é caro. **É que o Meta recebe o sinal de lead REAL e o Google não.**

Os dois canais mandam conversão de volta pelo mesmo webhook do ZenPro
([`webhook-worker/index.ts:22-63`](../../../zenpro/supabase/functions/webhook-worker/index.ts)) — mas por
caminhos completamente diferentes:

| | Meta | Google |
|---|------|--------|
| Como o ZenPro devolve a conversão | **Conversions API oficial** (`graph.facebook.com/events`), telefone com hash | **Pixel de navegador chamado do servidor** (`googleadservices.com/pagead/conversion/...`) |
| Tem `gclid` / cookie do usuário? | não precisa — a API casa pelo telefone | **não tem nenhum dos dois** |
| O Google/Meta consegue ligar ao clique do anúncio? | ✅ **sim** | 🔴 **não — é impossível** |
| Resultado | otimiza em **lead de verdade** → **CPL R$ 19** | otimiza no **evento da LP** → **CPL R$ 91** |

O `reportGoogleAdsConversion` faz um `fetch` **de dentro de uma edge function** para o endpoint de pixel
de **navegador** do Google, com `User-Agent: ZenPro-Webhook/1.0`, sem cookie, sem `gclid`, do IP do
datacenter da Supabase. **Esse endpoint atribui a conversão pelo cookie/gclid do usuário.** Disparado de
um servidor, sem nada disso, o Google **não tem como ligar a conversão a um clique** — ela não otimiza
campanha nenhuma.

> 📌 A `google-ads.md:36` registra: *"Webhook ZenPro × Google Ads: ✅ funcionando"*. **Ele dispara — mas
> não atribui.** É um no-op que todo mundo acredita que funciona. Corrigir o registro.

E os rótulos provam que são ações diferentes: a LP dispara `AW-752011587/**aPfMCILdg9gaEMOSy-YC**`; o
webhook dispara o rótulo `**1eBlCLuBmfEBEMOSy-YC**`. **Sobrou pro Google só o sinal da LP — e o sinal da
LP está inflado.**

---

## 🎯 O segundo achado — o sinal que sobrou está inflado 1,8×

**O Google está lançando em cima de um sinal inflado ~1,8×, e nós é que criamos o sinal.**

A LP `massoterapia-lp` dispara a conversão do Google **no clique que abre o WhatsApp** — não no
envio da mensagem. Pior: **não existe guarda de disparo único** e o `transaction_id` é gerado novo a
cada clique (`'lp-skip-' + Date.now()`). A mesma pessoa que abre o modal no herói, pula, volta e
entra pela turma de 12 meses **conta 2 conversões** — e o Google não deduplica, porque o ID é
diferente nas duas.

> ✅ **Precisão adicionada em 16/07:** o disparo **não está nos 8 CTAs** — eles só *abrem o modal*.
> Ele está em **2 pontos**: o `lm-skip` (linha 1369) e o submit do `lm-form` (linha 1409). A inflação
> vem de **reabrir o modal e converter de novo**. 🟢 **Isso simplifica a correção: são 2 handlers.**
> O `value` também está **fixo em R$250** nos dois — nunca o ticket real de R$2.585.

| | Número | Fonte |
|---|--------|-------|
| Conversões que o Google conta | **150** (`Lead - Masso Presencial LP B`) | Google Ads |
| Leads reais que chegam no ZenPro | **84** (`GC-*`) | banco, 1–10/07 |
| **Inflação do sinal** | **≈1,8×** | |
| CPL que o Google acha que paga | R$ 43 | |
| **CPL real** | **R$ 91** | R$ 7.642 ÷ 84 |

**Por que isso é o item nº1:** com Maximizar Conversões, o algoritmo compra mais do tráfego que gera
o evento. Como o evento dispara em *clique de CTA*, ele está aprendendo a comprar **gente que clica
em botão** — não gente que manda mensagem. É verba de topo comprando o comportamento errado, todo dia.

*Código: [`massoterapia-lp/index.html:1369-1421`](../../../holos-connect/public/massoterapia-lp/index.html)*

---

## 💸 O quadro do dinheiro na mesa

| # | Vazamento | Evidência (verificada hoje) | Tamanho |
|---|-----------|------------------------------|---------|
| 1 | **Sinal de conversão inflado 1,8×** | LP dispara no clique, sem guarda de disparo único, `transaction_id` novo a cada vez | **~R$ 23k/mês** de verba Google otimizando no sinal errado |
| 2 | **9 de 10 LPs sem tag de conversão do Google** | Só a `massoterapia-lp` tem `AW-752011587`. Aurículo, mensalistas, aula-experimental, salas, quiropraxia, desportiva = **zero sinal** | Cursos livres ~R$ 5k/mês + Aurículo **rodando cegos** |
| 3 | **4 páginas React de masso sem atribuição nenhuma** | `/formacao-massoterapia`, `/funil-massoterapia`, `/formacao-massoterapia-litoral-sul`, `/formacao-imersiva-holos-natureza` têm link `wa.me` **sem `#ref=`** ✅ *(confirmado 16/07 — vale só pras React; as 10 estáticas carimbam)* | Todo lead delas entra como **"sem código"** (58% do total de julho) |
| 4 | **Estágio Social morreu em 08/07** | Última conversa **08/07 17:28**. Zero leads em 6 dias. Vinha fazendo ~5 leads/dia com resposta mediana de **0 min** | **~30 leads** perdidos e contando · ⏫ **em 16/07 já são 8 dias ≈ 40 leads** |
| 5 | ~~Vendas em códigos órfãos~~ **→ REVISADO 16/07** | 🔴 **`OR-massoterapia` NÃO é órfão — é o `DEFAULT_REF` da LP** (`massoterapia-lp/index.html:1319`). Os demais (`FB-69e9d0`, `IS-85788d1d`, `GC-4225a48b`) seguem a cadastrar | **A ação inverteu:** ver se **anúncio pago cai no fallback** → se cair, `OR-` lê-se orgânico e o **ROAS pago está SUBESTIMADO** |
| 6 | **Aurículo: lead pago apodrecendo** | 23 leads no Google em julho · resposta mediana **813 min (13,5 h)** — o masso responde em 9 min | canal pago inteiro |
| 7 | **Leads da noite sem cobertura** | **145 leads (22%)** chegam fora de 8h–20h · resposta mediana **537 min (9 h)** | 22% do volume esfriando |
| 8 | **Lista de e-mails nunca trabalhada** | A LP captura nome+e-mail no Supabase (`leads_campanha`) e **ninguém usa** — inclusive quem deu e-mail e nunca mandou o WhatsApp | ativo parado ([automacoes.md](../automacoes.md)) |
| 9 | **Blackout de 12/07** | **Zero** mensagens e **zero** leads no dia 12 (domingo normal = 30 leads). 3.032 msgs represadas caíram no dia 13 | 1 dia no escuro |

---

## ✅ O que o dado DESMENTE (e o roadmap ainda registra errado)

Antes de mexer em qualquer coisa, corrigir a base — três premissas do roadmap caíram hoje:

| Registro atual | O que o dado/código mostra |
|---|---|
| "A `massoterapia-lp` é **React/Vercel**" (`landing-pages.md:12`) | ❌ **É HTML estático** (`public/massoterapia-lp/index.html`). A pendência **C0 do plano de tracking está resolvida** |
| "Unificar **as 2 páginas** de masso" (painel) | ❌ São **6**: a estática (única que rastreia) + 4 React sem atribuição + a do site com `CONTATO NEW SITE` |
| "MASSO **PMax** — pausada" (`google-ads.md:16`) | ❌ **Está rodando.** É o código `GC-DEFAULT` ("2 PERFORMAX MASSO"): 28 leads em julho, resposta mediana de 70 min (vs 9 min do Search) |
| "Truncamento `GC-0hh1dj` → `GC-0hh1d`" | ⚠️ Existe, mas é **1 linha** no histórico inteiro. O bug real é o **oposto**: sobra de caractere (`GC-0hh1djol`, `GC-0hh1djn`). Prioridade baixa |

**E o que o dado CONFIRMA — a aposta de junho:** a campanha `GC-a89afa7e` fez **zero leads** em julho e
mesmo assim **4 vendas = R$ 10.818**, com idade média de lead de **62 dias**. O lag de conversão é real e
está provado no banco. Manter a verba com ROAS em 0,95× foi a decisão certa.

**E o atendimento do masso pago está SAUDÁVEL** — não caia na armadilha do campo `first_response_at`
(vazio em 86% dos casos porque o time atende fora da tela do ZenPro). Medindo pela mensagem real:
`GC-0hh1dj` = 81 leads, **1 sem resposta (1%)**, mediana de **9 minutos**. O gargalo do masso **não é
atendimento** — é alcance e sinal.

---

## 🪟 A janela que está aberta AGORA (e fecha quando mexermos no lance)

**A campanha está em Maximizar Cliques. Maximizar Cliques NÃO usa o sinal de conversão.**

Ou seja: **consertar a tag hoje custa ZERO de aprendizado.** Essa janela existe só enquanto o lance for
Max Cliques — no minuto em que migrar pra Max Conversões, qualquer mexida na tag passa a custar 14 dias
de reaprendizado. **É a ordem que decide se julho tem um reset ou dois.**

Fazer na ordem errada (lance antes do sinal) = **~4 semanas de campanha degradada dentro de julho**, com
a meta já em 11/50.

---

## 🧭 Ordem de execução

### 🟢 Onda 1 — HOJE. Custo zero de aprendizado, ganho imediato

1. **Reabrir o Estágio Social** — *a ação mais alavancada do dia.* **Descobrir por que morreu ANTES de
   recriar** (verba? anúncio reprovado? criativo saturado?) — recriar sem saber, morre de novo.
2. **Consertar o sinal da LP** — guarda de disparo único + `transaction_id` estável por sessão (não por clique).
3. **Instalar a tag `AW-752011587` nas 9 LPs cegas** — começando pelo Aurículo, que já gasta.
4. **Cadastrar os órfãos no ZenPro** — **atribuição retroativa**: as vendas antigas entram na campanha certa
   sozinhas. ⚠️ Avisar a Luciana que os canais vão "subir" — é cadastro, não pico.
5. **Leva 1 de palavras-chave** (certificação/SINATEN + geo/turno) — correspondência de **frase**, nunca ampla
   enquanto o lance for Max Cliques. **Verba: zero nova** — os R$236/dia de folga absorvem.
6. **Resgatar os leads do Aurículo** parados há 13h+ e pôr o canal na régua de resposta do masso.
   ⚠️ **Não escalar Aurículo antes do SLA cair** — seria pagar pra encher uma fila que ninguém atende.

⚠️ **Combinar com a Luciana ANTES do passo 2:** quando o sinal limpar, **o CPA vai subir** no painel do
Google (de R$43 pra ~R$91). **Não é piora — é o número saindo da fantasia.** Se ela vir esse salto sem
aviso, corta verba no emocional.

### 🟡 Onda 2 — D+3 (17/07)

7. **Leva 2 de palavras-chave** (transição de carreira + técnica específica).
8. **Consolidar os 15 anúncios do Meta** nos 3–4 de melhor CPL — verba fragmentada nunca sai do aprendizado.
   Derruba o CPL sem gastar R$1 a mais. **Pré-requisito pra escalar o Meta.**
9. **Atribuição (`#ref=`) nas 4 páginas React** — ou tirá-las do ar e apontar tudo pra LP que funciona.

### 🔴 Onda 3 — 28/07, e SÓ se as 3 travas passarem

10. **Migrar o lance pra Max Conversões** — *uma mudança só, isolada.* **Gatilho:**
    - tag corrigida rodando há **≥14 dias**, E
    - conversões reportadas ≈ leads reais do ZenPro (**±15%** — hoje é 150 × 84), E
    - **≥30 conversões limpas** nos últimos 30 dias.
    - Migrar **sem tCPA** por 14 dias. Se puser tCPA, usar o CPA **real (~R$91)**, **nunca** os R$43
      fantasma — tCPA baixo demais foi exatamente o que estrangulou a campanha em 18/06.

### ⛔ O que NÃO fazer

- **Não mexer no orçamento do Google.** Gasta R$764 de R$1.000 — **o teto não é o freio.** Subir teto sem
  alcance é decoração.
- **Não tirar verba de massoterapia do Google pro Meta** (ver correção de régua abaixo).
- **Não pausar a PMax ainda** — 28 leads em julho, com a meta em 11/50, é volume que não dá pra repor
  esta semana. **Mas ela é a primeira candidata ao machado em 28/07**, com sinal limpo.

---

## ⚖️ Duas correções de régua (antes de qualquer número ir pra Luciana)

**1. "O Meta tem CPL 4,7× menor" é maçã com laranja — e a conclusão muda.**

O R$19,19 é o CPL de **todo lead Meta** (inclui estágio social a R$26). O CPL de lead **de masso**:

| | CPL masso | Direção |
|---|---|---|
| Google | R$ 91 | **caindo 49%** (era R$178) |
| Instagram | R$ 68 | **subindo 28%** (era R$53) |

Maçã com maçã, o Meta é **1,34× melhor — não 4,7×.** Somado a ROAS Google 2,26× > Meta 1,96×, e ao fato
de o Google **nem gastar o teto que já tem**: 🔴 **não se move verba de massoterapia do Google pro Meta.**
A verba nova do Meta vai pro **funil de entrada** (estágio social → mensalista), que é o gargalo do mês e
o único lugar onde o CPL de R$19 é real.

**2. O ROAS do Google não fecha entre as duas contabilidades.**

| Fonte | Google D1 (01–10/07) | ROAS |
|---|---|---|
| **Painel** (planilha da Elis) | — | **2,26×** |
| **ZenPro** (tabela `sales`, mesma janela) | 9 vendas · **R$ 22.023** | **2,88×** |

A direção é **favorável** (o Google está indo melhor do que reportamos), mas **as duas réguas discordam**.
A Lu *acabou* de passar a confiar nesse indicador — se ele oscilar sem explicação, perdemos o crédito que
levou dois meses pra construir. **Fechar uma régua só antes do próximo relatório.**

---

## 🔑 Alcance — o plano de palavras-chave (o gargalo real)

**Regra que atravessa tudo: correspondência de FRASE enquanto o lance for Max Cliques.** Ampla com Max
Cliques é ralo de dinheiro — ampla só depois do smart bidding (pós-28/07).

**Grupo A — o que já converte: NÃO TOCAR.** Só recebe negativas.

**LEVA 1 (hoje) — fundo de funil:**
- **Certificação/credencial:** `curso de massoterapia com certificado` · `curso de massoterapia reconhecido` ·
  `curso de massoterapia 1200 horas` · `certificado sinaten` · `como tirar registro de massoterapeuta`
  → É a busca de quem **já decidiu e está comparando escola**. É onde os 30 anos + SINATEN ganham sozinhos.
- **Geo + turno** (baixo volume, altíssima intenção): `curso de massoterapia vila mariana` ·
  `curso de massoterapia presencial sp` · `curso de massoterapia noturno` · `curso de massoterapia fim de semana`
  → Quem busca **turno** já está encaixando na agenda dele. É lead de matrícula.

**LEVA 2 (17/07):**
- **Transição de carreira** (volume, CPC baixo): `como ser massoterapeuta` · `profissão massoterapeuta` ·
  `quanto ganha um massoterapeuta` · `mudar de carreira massagem`
  ⚠️ Pode-se *lançar* em "quanto ganha", mas **o anúncio não promete salário**. Palavra-chave ≠ promessa.
- **Técnica específica** (isca de nicho): `curso de drenagem linfática` · `curso de quick massage` · `curso de shiatsu`
  → A LP tem que oferecer o curso livre **e a ponte pra formação**. Sem ponte, é lead de R$300.

**Anticanibalização:** cada eixo = grupo próprio; as campeãs do Grupo A entram como **exatas negativas** nos
demais (a busca que já converte continua entrando pelo grupo com histórico de qualidade); Aurículo e
quiropraxia entram como negativas no grupo de formação, e vice-versa.

**Negativas obrigatórias — é provavelmente aqui que a verba vaza:**
`grátis` `gratuito` `pdf` `apostila` `vaga` `emprego` `massagista` `spa` `salão` `tântrica` `preço de massagem`

> 💡 **O achado que vira dinheiro:** metade dessas buscas é de gente que quer **RECEBER** massagem barata —
> que é *exatamente* o público do **Estágio Social (R$26)**. Não jogar no lixo: **testar R$50/dia numa
> campanha "Estágio Social Search"** (`massagem barata sp`, `massagem relaxante vila mariana`), LP do
> estágio, tag instalada. **Transforma desperdício em topo do funil de mensalista.**

---

## 🎯 Mensalista — o gargalo, e a causa-raiz que ninguém tinha ligado

**A causa-raiz não é a oferta. É que a campanha que alimenta o mensalista está MORTA há 6 dias.**

Estágio Social = massagem a R$26. **Quem recebe massagem barata é literalmente o candidato a mensalista.**
Ela fazia **5 leads/dia com resposta mediana de 0 min** — o funil mais rápido da casa. Morreu **08/07 17:28**.
6 dias × 5 = **~30 leads que não existiram**. O mensalista despencou pra 3 na mesma janela. **Não é coincidência.**

**O que faltava e ninguém montou — a ponte:** hoje a pessoa recebe a massagem de R$26 e vai embora. **O
momento de maior intenção de compra da vida dela são os 5 minutos depois da massagem** — e não existe
oferta nessa hora. A oferta de 50% funcionou (7 matrículas no D3 de junho) e sumiu em julho. Trazer de
volta como **oferta de janela, não permanente**: *"primeira mensalidade 50% pra quem fez o estágio social
nos últimos 15 dias."* Isso amarra os dois funis **e resolve o dilema do desconto** — a Lu não precisa
descontar pra todo mundo, só pra quem **já provou o serviço**.

⚠️ **O número que precisa ir pra mesa da Luciana (com ressalva):** a campanha `mensalistas` fez **35 leads
e 1 venda atribuída** no ZenPro. A atribuição é furada (o painel conta 3 mensalistas no D1), então **não dá
pra cravar a taxa** — mas a ordem de grandeza levanta a pergunta certa: **se a conversão de mensalista for
mesmo ~3%, a meta de 25/mês exigiria ~875 leads/mês — não existe verba pra isso.** Ou a conversão sobe, ou
o mensalista entra pelo estágio social. **Isso cheira a gargalo de FECHAMENTO, não de lead** — e verba não
conserta balde furado. **Medir antes de investir.**

---

## ♟️ A jogada de fundo (o que muda o jogo de verdade)

Consertar a tag da LP resolve a inflação. **Mas não resolve a raiz:** a conversão continua disparando
quando a pessoa **abre** o WhatsApp — não quando ela **manda** a mensagem.

**A solução definitiva é importar a conversão real do ZenPro pro Google Ads — do jeito certo:**

1. A LP passa a capturar o **`gclid`** da URL (hoje ela lê só `utm_source/medium/campaign` — **nenhum `gclid`
   em lugar nenhum do sistema**).
2. O `gclid` viaja com o lead até o ZenPro.
3. O ZenPro sobe a conversão pela **API do Google Ads** (*offline conversion import*) — **não pelo pixel de
   navegador que ele usa hoje** — quando o lead é real. **E de novo, com o valor da venda, quando ele vira matrícula.**

**Por que isso é o maior alavanca disponível:** o ZenPro **já tem tudo** — telefone, código, conversa e a
tabela `sales` com o **valor real**. Faltam só o `gclid` e a chamada de API certa. Com isso, o Google passa
a lançar em **faturamento** (ticket médio **R$ 2.585**), não em clique de botão. É o mesmo salto que o Meta
já deu — e é exatamente por isso que o CPL do Meta é R$19 e o do Google é R$91.

---

## ⛔ Pendências que travam o mês (decisão de outros)

| O que | Quem | Situação |
|---|---|---|
| **Verbas de julho por campanha** | **Luciana** | ⛔ Nunca definidas. O mês está na metade e roda **sem plano de verba** ([planejamento-julho](../campanhas/planejamento-julho-2026.md)) |
| **Página do Reiki** (turma **20/07**) | Nick | ⛔ Não existe — **6 dias** pra turma |
| **Campanha da Quiropraxia** (23/07) | Lucio | ⛔ Não subiu |
| Páginas Intensivo flex / Presencial / Kabbalah | Nick | ⛔ Roadmap parado |
| **Acesso ao Google Ads / Meta Ads** (Windsor.ai) | Lucio | 🔴 **Sem autorização** — não dá pra ver gasto e palavra-chave por campanha |

---

## 📊 Placar — revisar no fechamento do D2 (20/07)

| Indicador | Hoje (14/07) | Meta D2 |
|---|---|---|
| **Conversões Google ÷ leads reais ZenPro** | 150 ÷ 84 = **1,79×** | **≤ 1,15×** |
| LPs com tag de conversão | **1 de 10** | **10 de 10** |
| Leads/dia do Estágio Social | **0** | **5+** |
| Mensalistas no mês | **3** | **10** |
| Gasto/dia Google | R$ 764 | **R$ 900+** com CPL ≤ R$91 |
| Anúncios Meta ativos | **15** | **3–4** |
| Resposta mediana — Aurículo | **813 min** | **≤ 30 min** |
| Régua do ROAS | **2 números conflitantes** | **1 só, fechada** |

---

## 📌 O que ainda não dá pra afirmar

- **Gasto e impressão por campanha** — o Windsor.ai não está autorizado nesta sessão. Todo número de
  verba aqui vem do painel (Jul D1: Google R$ 7.642 · Meta R$ 3.752). Sem isso, **não dá pra fechar o
  ROAS por campanha nem ver a perda de impressão** (a prova do gargalo de alcance).
- **Quantos e-mails estão parados** no `leads_campanha` — o RLS bloqueia leitura anônima. **Nick consegue
  em 1 query**, e é o que dimensiona o resgate.
- **Para onde as campanhas apontam** — se alguma campanha paga aponta pras páginas React sem atribuição,
  o vazamento nº3 é muito maior do que parece.
