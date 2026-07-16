# Pacote de correção — Conversões Google Ads "Holos Geral" (644-631-5099)

> **Documento interno — revisar antes de apresentar.** Cliente: Holos. Conta Google Ads `644-631-5099`. Campanha: Masso Geral (PG_B) → `app.holoscursoseterapias.com.br/massoterapia-lp`.
> Gerado em 17/06/2026 a partir de inspeção ao vivo da LP + auditoria das 5 LPs + verificação adversarial (workflow multi-agente).

---

## 1. Causa-raiz confirmada + o que as verificações acharam

**Causa-raiz (confirmada, com ressalvas).** Em 09/06/2026 a campanha passou a apontar para uma LP estática nova (`/public/massoterapia-lp/index.html`, criada do zero — 1º commit `fa37e69b` em 08/06, merge na main 09/06 via PR #61) que **não tem nenhum rastreamento Google**: zero `GTM`, zero `gtag/js`, zero `GA4`, zero `AW-`/`send_to`, zero `dataLayer`. O único "google" no arquivo é o Google Fonts (linhas 46-47), que não rastreia. Só o Meta Pixel `902498357163312` carrega (head, linhas 40-41), e os dois pontos de lead disparam apenas `fbq('track','Lead')`. Resultado: as conversões de fonte "Site" do Google Ads ("Lead - Massoterapia Presencial LP B" R$250 e "CONTATO NEW SITE") caíram ~98% / ~89% a partir de 09/06, o lance smart (Maximizar Conversões, tCPA ~R$13-15) ficou cego e estrangulou o gasto de ~R$911/dia para R$3-25/dia.

**O que as verificações adversariais derrubaram / sinalizaram (não ignorar):**
- **Não é "migração WordPress→React" limpa.** A LP estática é página **nova**. O site WordPress `holoscursoseterapias.com.br` continua **vivo** e roda um CRM/tagger `crm-api.eb4us.com/js/tracking.min.js` que faz request real ao `googleads.g.doubleclick.net`. **Risco:** pode existir rota de conversão server-side/offline por gclid nesse CRM. Se existir e adicionarmos gtag client-side cego, **duplicamos conversão**. Verificar antes (seção 6).
- **Onde a tag vivia antes nunca foi confirmado.** WP `/massoterapia-presencial-g`, rota React `/funil-massoterapia` (que JÁ tem `gtag('event','whatsapp_click')` + GTM), ou WP apex. Isso decide se o fix é na LP estática ou se bastava reapontar a campanha.
- **A queda não foi só de tag.** Cliques caíram ~35% no mesmo dia (08/06: 131 cliques/R$1.436 → 09/06: 86/R$367). Parte da queda de conversão está confundida com corte real de entrega do smart bidding cego.
- **GTM-PGTFNK2 precisa ser aberto no painel** antes de confiar em qualquer plano baseado em GTM (pode não ter a tag AW-, ou o trigger pode ser um evento de dataLayer que a LP estática nunca empurra).
- **gclid não é capturado.** A LP só lê `utm_source/medium/campaign` (linhas ~1276-1280) e descarta o gclid. Sem gclid persistido + auto-tagging + conversion_linker, a conversão restaurada pode chegar **não-atribuída** e poluir o tCPA na volta ao smart bidding.
- **A "conversão" é proxy de topo de funil.** O fix mede abertura de WhatsApp, não matrícula (R$250+ acontece dias depois, offline). Restaura volume de sinal, mas o ROAS real depende de conversão offline keyed em gclid.

---

## 2. As 5 LPs — status e campanha que servem

Todas as 5 têm **a mesma quebra**: Meta Pixel presente, Google 100% ausente, lead salvo no Supabase `leads_campanha`.

| LP | Google tracking | Pontos de lead (`fbq Lead`) | Campanha que serve |
|---|---|---|---|
| **massoterapia-lp** | ausente | **2**: submit `#lm-form` (linha **1345**) + skip `#lm-skip` (linha **1320**) | **Masso Geral (PG_B)** — confirmada |
| **mensalistas** | ausente | 1: submit `#lm-form` (~959) | a confirmar |
| **salas-lp** | ausente | 1: submit `#lm-form` (~1172) | a confirmar (aluguel de salas) |
| **estagio-social** | ausente | 1: submit `#lm-form` (~579); botão "Entrar no grupo" escapa até do Pixel | a confirmar |
| **desportiva-4x1** | ausente | 1 com Lead: submit (~489). **skip NÃO dispara fbq Lead** (~461-465) | a confirmar |

**Regra de ouro:** as LPs são **assimétricas**. Só a `massoterapia-lp` tem 2 fire points. **Nada de copy-paste de um patch único.** Aplicar **só onde há campanha Google ativa apontando** (hoje, confirmada: `massoterapia-lp`). Não colar a conversão de massoterapia (R$250) em LP de outro curso.

---

## 3. O FIX exato na `massoterapia-lp`

Arquivo: `/home/usuario/Documentos/Projetos/holos-connect/public/massoterapia-lp/index.html`

### (a) Snippet no `<head>` — gtag direto (recomendado, ver seção 4)

Inserir **logo após o bloco do Meta Pixel** (depois da linha 44, antes do Google Fonts na linha 46). Ordem importa: o Google entra **junto/depois** do Pixel, nunca antes.

```html
<!-- Google Ads — conversão (PG_B). Substituir AW-XXXXXXXXX pelo ID real (ver 3c) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

### (b) Onde firar — exatamente os 2 pontos onde `fbq('track','Lead')` já fira

**Não amarrar a conversão aos botões `[data-wpp]`** (eles só abrem o modal, `e.preventDefault` linhas 1297-1310). Firar em todo abre-modal infla a contagem e envenena o lance smart. A conversão real é **submit** e **skip**.

**Ponto 1 — `#lm-skip`, linha 1320** (logo após o `fbq`):

```js
if (typeof gtag !== 'undefined') gtag('event', 'conversion', {
  send_to: 'AW-XXXXXXXXX/LABEL',
  value: 250.0, currency: 'BRL',
  transaction_id: 'lp-skip-' + Date.now()
});
```

**Ponto 2 — submit `#lm-form`, logo após a linha 1345** (depois do `fbq`, **fora do `try`** do fetch):

```js
if (typeof gtag !== 'undefined') gtag('event', 'conversion', {
  send_to: 'AW-XXXXXXXXX/LABEL',
  value: 250.0, currency: 'BRL',
  transaction_id: 'lp-form-' + (email || '') + '-' + Date.now()
});
```

- `value: 250` **só vale aqui** (massoterapia). Outras LPs: valor diferente ou sem valor.
- `gtag` vem **depois** do `fbq` e **fora do `try/catch`**, para um erro do Google não derrubar o `fbq` nem o fluxo do WhatsApp.
- `transaction_id` único permite dedupe.

### (c) Falta o ID/label real (AW-) — passo pro Lucio

**Não existe AW- no repo** (confirmado por grep). Sem o ID/label real o fix não funciona — **não chutar e não criar ação nova** (zera o aprendizado histórico).

**Caminho A — Google Ads (preferido):** conta `644-631-5099` → Metas → Conversões → abrir **"Lead - Massoterapia Presencial LP B"** → anotar **status**, **origem** (Tag Google / GTM / GA4 / **offline-CRM**) e data → **Configurar tag** → copiar **ID de conversão** (`AW-XXXXXXXXX`) + **rótulo** (`LABEL`). Repetir p/ "CONTATO NEW SITE".

**Caminho B — GTM (`GTM-PGTFNK2`):** se a origem for GTM, abrir o container → tag "Conversão Google Ads" → ler Conversion ID + Label e **qual o trigger**.

> Se a origem for **importação offline/CRM (eb4us)**: **PARAR** e reconciliar antes de codar (risco de double-count). Nesse caso o fix não é gtag client-side — é restaurar a importação offline por gclid.

---

## 4. Abordagem recomendada: gtag direto com AW-

**Recomendação: gtag direto**, **não** recolar o GTM-PGTFNK2 nas LPs.

| Critério | gtag direto AW- | Recolar GTM-PGTFNK2 |
|---|---|---|
| Restaura conversão rápido | **Sim** — fira no ponto exato do `fbq` | Só se a tag AW- ainda existir no container **e** o trigger casar |
| Risco de duplicar **Meta** | Nenhum | **Alto** — container pode ter tag de Meta; LP já tem `fbq` inline → PageView/Lead em dobro |
| Risco de tag inerte | Baixo | **Alto** — se o trigger for um evento dataLayer que a LP nunca empurra |
| Controle do disparo | Total (só submit/skip) | Indireto (depende do trigger) |

**Trava obrigatória:** escolher **UM único mecanismo**. Como a LP estática não carrega o GTM, o gtag direto é naturalmente isolado — caminho seguro.

---

## 5. Plano de validação

1. **Pré-deploy:** capturar **gclid** (e gbraid/wbraid) na LP e persistir em `leads_campanha`.
2. **Confirmar Auto-tagging ON** na conta `644-631-5099`.
3. **Conversão de teste:** abrir a LP com `?gclid=TESTE123&utm_campaign=teste`, instalar **Tag Assistant** + **Meta Pixel Helper**, 1 submit + 1 skip. Validar: Google fira **1x submit / 1x skip / 0x abre-modal**; Meta `Lead` continua **1x**.
4. **Janela 24-72h:** ação "Lead - Massoterapia Presencial LP B" sair de "sem atividade recente" → "registrando conversões".
5. **Cruzar 09-16/06:** conversões × leads reais (`leads_campanha` ~30/dia + ZenPro + vendas).
6. **Volta ao lance por conversão:** **só** após 2-3 dias de conversões "Site" estáveis. tCPA realista **R$80-130** (nunca R$13-15). Manter Maximizar Cliques até lá.

---

## 6. Checklist de handoff

**Nick (código / deploy — `holos-connect`):**
- [ ] gtag no `<head>` da `massoterapia-lp` após linha 44 (3a) — após receber `AW-XXXXXXXXX/LABEL`.
- [ ] `gtag('event','conversion',...)` nos 2 fire points: linha **1320** (skip) e após **1345** (submit) — depois do `fbq`, fora do `try`.
- [ ] Capturar e persistir **gclid/gbraid/wbraid** no `utms` e no POST do Supabase.
- [ ] **Não** colar GTM nas LPs. **Não** replicar nas outras 4 LPs sem ordem da agência.
- [ ] Deploy Vercel + avisar p/ validação.

**Lucio (Google Ads / GTM):**
- [ ] Pegar `AW-XXXXXXXXX` + `LABEL` da ação "Lead - Massoterapia Presencial LP B" e repassar ao Nick.
- [ ] Anotar a **origem** da ação (Tag Google / GTM / GA4 / **offline-CRM eb4us**). Se offline-CRM, **avisar antes do deploy**.
- [ ] Confirmar **Auto-tagging ON**.
- [ ] Abrir **GTM-PGTFNK2** e checar tag de conversão AW- + trigger (não duplicar com o gtag direto).
- [ ] Manter **Maximizar Cliques** até liberar a volta ao tCPA.

**Agência (Rede Publicidade):**
- [ ] Re-puxar do Windsor a conversão **por ação × dia (01-16/06)** e salvar em `dados/` (provar com dado — ver Anexo A).
- [ ] Confirmar o **final URL real da PG_B antes de 09/06**.
- [ ] Tag Assistant + Pixel Helper pós-deploy.
- [ ] Cruzar conversões 09-16/06 × vendas reais.
- [ ] Decidir volta ao tCPA (R$80-130) só após 2-3 dias estáveis.
- [ ] **Próxima fase (ROAS real):** conversão **offline** (Supabase + gclid → Enhanced Conversions for Leads / importação offline). Tratar o `#lm-skip` que não salva no Supabase e o skip da desportiva-4x1.
- [ ] LGPD: não há banner de consentimento. Não bloqueia o fix, mas decidir sobre Consent Mode v2.

---

## Anexo A — Conversões por ação × dia (Windsor, conta 644-631-5099, campanha Masso Geral PG_B)

`all_conversions` por dia. Cliff exato no 09/06 nas duas ações de fonte **Site**:

| Data | Lead - Massoterapia Presencial LP B (R$250) | CONTATO NEW SITE |
|---|---|---|
| 01/06 | 59,7 | 17,3 |
| 02/06 | 47 | 16 |
| 03/06 | 47 | 17,5 |
| 04/06 | 51 | 16 |
| 05/06 | 48 | 15 |
| 06/06 | 59 | 20 |
| 07/06 | 52,5 | 20,5 |
| 08/06 | 51 | 21 |
| **09/06** | **2** | **1,5** |
| 10/06 | 2 | 1 |
| 11/06 | 0 | 4 |
| 12/06 | 0 | 1 |
| 13/06 | 1 | 1 |
| 14/06 | 0 | 0 |
| 15/06 | 0 | 3 |
| 16/06 | 1,7 | 3,7 |

Ações de fonte **Google-hosted** (Local actions, Store visits) seguiram firando normalmente o período todo — confirma que a quebra é só na camada de tag do **Site**.
