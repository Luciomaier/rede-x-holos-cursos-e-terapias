# ✅ Painel de validação — LP + Campanha

> Uma linha por **produto** (curso). O fluxo só está *finalizado* quando os 5 blocos
> fecham. Serve pra checar o que é **deles** (Elis/Nick) e o que é **nosso** (Lucio).
>
> **Rascunho pro Lucio revisar** — os itens têm código (P1, A2, T3…) pra facilitar
> cortar ou renomear. **Atualizado:** 24/07/2026.

## Como roda

| Símbolo | Significa |
|---|---|
| ✅ | conferido, passou |
| ⏳ | pendente, sem bloqueio |
| ⚠️ | existe mas com ressalva (ler nota) |
| 🚨 | quebrado — queima verba ou perde lead |
| — | não se aplica |

**Quem confere o quê:** os itens marcados 🤖 eu confiro sozinho lendo a página no ar
(a qualquer momento, é só pedir "roda o painel"). Os 👁 precisam de olho humano — abrir
a página, testar o popup, olhar a tela do Google Ads ou do ZenPro.

---

## Os itens

### 🅿️ Bloco P — Página no ar *(deles)*

| # | Item | Como confere |
|---|---|---|
| P1 | Página publicada, responde 200 na URL final | 🤖 |
| P2 | `<title>` e `meta description` próprios do curso | 🤖 |
| P3 | `canonical` apontando pra própria URL | 🤖 |
| P4 | **Imagem de compartilhamento** (`og:image` 1200×630) | 🤖 |
| P5 | Schema JSON-LD (Course + FAQ) | 🤖 |
| P6 | **Popup testado**: nome+e-mail → abre WhatsApp com a mensagem certa | 👁 |
| P7 | Preço, carga horária e **data da turma** corretos | 👁 |
| P8 | Abre bem no celular | 👁 |

### 📊 Bloco A — Analytics base *(deles — já padronizado no molde)*

| # | Item | Como confere |
|---|---|---|
| A1 | Meta Pixel `902498357163312` | 🤖 |
| A2 | GTM `GTM-PGTFNK2` | 🤖 |
| A3 | GA4 `G-YV8T6YK9N9` | 🤖 |

### 🎯 Bloco T — Atribuição *(NOSSO)*

| # | Item | Como confere |
|---|---|---|
| T1 | `#ref=` montado a partir do `utm_campaign` | 🤖 |
| T2 | **`DEFAULT_REF` (`OR-<curso>`)** — carimba quem chega sem UTM | 🤖 |
| T3 | Lead grava em `leads_campanha` (Supabase) | 🤖 |
| T4 | Evento `lead_capturado` no dataLayer, **no submit** | 🤖 |
| T5 | Ação de conversão **própria do curso** criada no Google Ads, com valor real | 👁 |
| T6 | Gatilho no GTM preso ao `lead_capturado` — **não** ao clique no `wa.me` | 👁 |
| T7 | **Conversão validada ao vivo** — lead real chegou no Ads em 24–72h | 🤖+👁 |
| T8 | `gclid` capturado e persistido (destrava conversão offline) | 🤖 |

### 📣 Bloco C — Campanha *(NOSSO)*

| # | Item | Como confere |
|---|---|---|
| C1 | Campanha ativa apontando pra **URL certa** (a LP, não o WordPress) | 👁 |
| C2 | Template de URL passa `utm_campaign` (sem isso, T1 não carimba) | 👁 |
| C3 | Nomenclatura: Google `GC-*` · Meta `ME-*` | 👁 |
| C4 | Campanha otimiza pela **ação do curso**, não pela genérica | 👁 |
| C5 | Orçamento e estratégia de lance definidos e estáveis | 👁 |

### 🤝 Bloco Z — Lead chega e é atendido *(Elis/comercial)*

| # | Item | Como confere |
|---|---|---|
| Z1 | `#ref` do curso reconhecido no ZenPro | 👁 |
| Z2 | Lead aparece no ZenPro **com origem** (não "sem código") | 🤖 |
| Z3 | Comercial sabe que esse curso está rodando e como atender | 👁 |

---

## Status hoje — Blocos P/A/T *(conferido no código em 24/07)*

| Produto | P2 | P4 og | A1 px | A2 gtm | A3 ga4 | T1 ref | **T2 dREF** | T3 supa | T4 evt | T5 conv |
|---|---|---|---|---|---|---|---|---|---|---|
| **massoterapia-lp** | ✅ | 🚨 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | ⚠️ |
| **desportiva-4x1** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | ⏳ |
| **curso-de-auriculoterapia** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | ⏳ |
| **curso-livre-de-quiropraxia** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | ⏳ |
| curso-de-terapias-complementares | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| curso-de-cone-hindu | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| curso-de-hawaiana | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| curso-de-massagem-relaxante | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| curso-de-modeladora | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| curso-de-radiestesia | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| formacao-constelacao-familiar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| formacao-ead | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | — |
| massoterapia-ead | ✅ | 🚨 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | — |
| aula-experimental | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ | — |
| mensalistas | ✅ | 🚨 | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| salas-lp | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |
| estagio-social | ✅ | 🚨 | ✅ | ✅ | ✅ | ✅ | 🚨 | ✅ | ⏳ | — |

**O que a tabela mostra de imediato:**
- **T2 falta em 13 das 17** → todo lead sem UTM entra no ZenPro **sem código**. É a causa
  medida dos **58% sem origem** de julho. Só 4 LPs declaram `DEFAULT_REF`.
- **P4 falta em 4** — inclusive na **massoterapia-lp**, a que mais recebe verba: link
  compartilhado no WhatsApp/Instagram sai sem imagem.
- **T4 falta em todas** — sem `lead_capturado` no dataLayer, a conversão do Google só
  pode se pendurar no clique, que dispara **antes** de existir lead.
- A1/A2/A3 ✅ em 17/17 — o time entregou a base inteira.

## Status hoje — Bloco C (campanhas ativas, últimos 7 dias)

| Campanha | Gasto 7d | Cliques | Conv. | C1 destino | Observação |
|---|---|---|---|---|---|
| Masso Geral (PG_B) | R$ 4.554,96 | 729 | 134 | ✅ `massoterapia-lp` | única com conversão própria |
| (CP) Busca M.Desportiva | R$ 585,99 | 330 | 53 | ⚠️ **WordPress** | mede via GTM do WP; migrar só depois de T5–T7 |
| (otmizada) Busca Quiro Modular | R$ 249,39 | 178 | **1** | ✅ LP quiro | 🚨 178 cliques → 1 conversão = assinatura de página cega |
| Auriculo | R$ 131,25 | 99 | 3 | ✅ LP aurículo | 🚨 mesma assinatura |

> Quiro e Aurículo gastaram **R$ 380 em 7 dias** e registraram **4 conversões somadas**.
> Não é campanha ruim necessariamente — é medição ausente. O GTM só chegou nelas em 24/07.

---

## O que trava o "finalizado" hoje

1. **T2 em 13 LPs** — pedir `DEFAULT_REF` no molde (some a categoria "sem código").
2. **T4 em todas** — pedir `dataLayer.push({event:'lead_capturado', curso:'…'})` no submit.
3. **T5/T6** — Lucio cria as ações por curso no Ads e prende no `lead_capturado`.
4. **T7** — só depois: validar 24–72h com lead real. **Aí sim** reapontar a Desportiva (C1).
5. **P4 na masso** — imagem de compartilhamento faltando na LP que mais gasta.

Detalhe técnico dos itens T2 e T4: [campanhas/padrao-lp-nossa-parte.md](campanhas/padrao-lp-nossa-parte.md).
Histórico e provas: [relatorios/log-google-ads.md](relatorios/log-google-ads.md).
