# Log de trabalho — Google Ads Holos

> Rastro do que já foi feito e do que está pendente. Ler isto primeiro ao
> retomar o trabalho de ads da Holos. Mais recente no topo.

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
