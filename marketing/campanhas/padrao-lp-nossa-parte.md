# Padrão das LPs — o que é deles e o que é nosso (24/07/2026)

> Documento pra **encaminhar ao Nick e à Elis**. O time padronizou a camada de
> analytics; falta padronizar a camada de **atribuição** — que é a nossa.

## A divisão

| Camada | O que é | Quem cuida | Status |
|---|---|---|---|
| Analytics | GTM-PGTFNK2 · GA4 `G-YV8T6YK9N9` · Meta Pixel | **Time (Elis/Nick)** | ✅ **feito** — 16 LPs, molde, checklist e detector |
| Atribuição | `#ref=` (ZenPro) · conversão do Google Ads por curso | **Nós (Lucio)** | ⚠️ **2 furos abertos** |

O molde do time já traz `#ref=`, captura de UTM e gravação em `leads_campanha`.
Os furos abaixo são de **calibragem**, não de ausência.

---

## 🔴 Furo 1 — lead sem UTM entra no ZenPro **sem código**

**O que o molde novo faz** (`desportiva-4x1`, `curso-de-auriculoterapia`):

```js
var r = (utmCampaign || ref || '').replace(/[^A-Za-z0-9_-]/g, '');
return 'https://wa.me/' + BASE_WPP + '?text=' + msg + (r ? '+%23ref%3D' + r : '');
```

Se o visitante chega **sem `utm_campaign`** — tráfego orgânico, link do Instagram,
digitou o endereço, indicação — `r` fica vazio e **o `#ref=` não é anexado**. O lead
chega no ZenPro **sem nenhum código de origem**.

**A masso não tem esse furo** porque define um padrão de fallback:

```js
DEFAULT_REF = 'OR-massoterapia'   // OR = orgânico
```

> Este é o problema já medido: **58% dos leads de julho entraram sem código.**
> Não é novo — é o mesmo achado da auditoria de 14/07, que sobreviveu à reconstrução.

**O pedido:** toda LP declara um `DEFAULT_REF` próprio, no padrão `OR-<curso>`
(`OR-desportiva`, `OR-auriculo`, `OR-quiropraxia`…) e usa
`(utmCampaign || ref || DEFAULT_REF)`. Assim **todo lead chega carimbado** — pago com o
código da campanha, orgânico com `OR-*`. Some a categoria "sem código".

Vale entrar no **detector** (`scripts/check-tracking.mjs`): falhar o PR se alguma LP
não declarar `DEFAULT_REF`.

---

## 🟠 Furo 2 — a conversão do Google contaria o momento errado

Nas LPs novas os links de WhatsApp são **isca**: o clique é interceptado e abre o modal
que exige nome e e-mail.

```js
document.querySelectorAll('a[href*="wa.me/"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();          // não vai pro WhatsApp ainda
    lmOverlay.style.display = 'flex';   // abre o modal
  });
});
```

O `preventDefault()` **não impede o GTM de disparar** — ele cancela a navegação, não o
evento. Então um gatilho do tipo *"Click URL contém wa.me"* fira **no instante em que o
modal abre**, antes de existir lead.

| LP | Quando a conversão contaria |
|---|---|
| `massoterapia-lp` | no **submit** — depois de nome + e-mail (verificado em 17/06: 0 disparos no abre-modal) |
| LPs novas, via GTM | no **abre-modal** — antes da captura |

Abrir modal é muito mais frequente que preencher. Contando assim, as LPs novas
**inflam** frente à masso e o custo por lead entre cursos deixa de ser comparável.

**O pedido:** a conversão de Ads deve disparar **no mesmo ponto do funil em toda LP** —
no submit do formulário, junto do `fbq('track','Lead')` que já existe ali. No GTM, isso
é um gatilho de **evento de dataLayer** (ex.: `lead_capturado`) empurrado no submit, e
**não** um gatilho de clique em `wa.me`.

---

## O que precisamos saber do time

1. Qual a **condição exata** dos gatilhos "Click - WhatsApp LP B" e "CONTATOS NEW SITE"
   no container? Se for *Click URL contém wa.me*, o Furo 2 está ativo agora.
2. Topam empurrar `dataLayer.push({event:'lead_capturado', curso:'<nome>'})` no submit do
   molde? Com isso a medição por curso sai inteira **pelo GTM, sem mexer em código de novo**.

## O que fica com o Lucio

- Criar as ações de conversão **por curso** no Google Ads (valor certo por curso — hoje
  tudo entra como formação a R$ 250).
- Ligar cada ação ao gatilho `lead_capturado` correspondente no container.

> ⚠️ **Uma medição só por lead.** Se a conversão por curso entrar, as tags genéricas
> ("Lead - Massoterapia Presencial LP B" e "CONTATOS NEW SITE") **não podem continuar
> firando nessas LPs** — seriam ações diferentes contando o mesmo lead duas vezes.
