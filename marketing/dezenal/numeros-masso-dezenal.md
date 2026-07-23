# Números Massoterapia — base dezenal (D1 · D2 · D3)

> **Pra que serve:** entregar os números da massoterapia a cada dezena, comparáveis, pra decidir com base em dado — enquanto o painel do Nick não fica pronto. Massoterapia é o principal; cursos livres e o resto são bônus (última seção).
> **Janela (canon):** incremental — **D1 = 01–10 · D2 = 11–20 · D3 = 21–fim.** Nunca acumulado.

## Fontes (de onde puxar cada número)

| Número | Fonte | Régua |
|---|---|---|
| Gasto Google / Meta | **Windsor** (Google Ads + Meta Ads), janela da dezena | campanha *Masso Geral* (Google) · *MASSO.PRES* + *MENSALISTAS* (Meta) |
| Leads + telefone + campanha | **ZenPro** (Supabase / SQL `claude_readonly`) | `tracking_code` da conversa, tz America/Sao_Paulo |
| CPL | cálculo | gasto do canal ÷ leads **carimbados** do canal |

**Régua de LEAD MASSO** (o que conta como lead de massoterapia):
- **Google:** `GC-*` · **Meta:** `IS-*`, `FB-*`, `mensalistas` · **Orgânico:** `OR-massoterapia`
- **FORA da capa:** `estagio-social`, `auriculo_google`, `WC-*`, IDs numéricos órfãos
- **Sem `tracking_code`** = não classificável → fora da capa, citar em nota
- **Bruto** = todas as `conversations` da janela (todo o WhatsApp da escola) — só como referência, **não** é lead masso

> CPL tem duas leituras que sempre divergem: **plataforma** (conversões que o Google/Meta contam) e **carimbado** (leads com `tracking_code` no ZenPro). Reportar as duas — a verdade fica no meio.

---

# A) CADA DEZENA — SEPARADO

## ▸ D1 (01–10/07) ✅ fechado

### Gasto
| Canal | Campanha | Gasto |
|---|---|---|
| Google | Masso Geral (PG_B) | R$ 7.642,34 |
| Meta | 15/12 MASSO.PRES | R$ 2.551,82 |
| Meta | N.E.I. MENSALISTAS | R$ 1.200,08 |
| **Total masso** | | **R$ 11.394,24** |

### Leads por campanha + CPL
| Origem | tracking_code | Leads (carimbado) | Gasto | CPL carimbado | CPL plataforma |
|---|---|---|---|---|---|
| Google | `GC-*` | 84 | R$ 7.642,34 | R$ 90,98 | R$ 42,93 |
| Meta | `IS-*` / `FB-*` / `mensalistas` | 55 | R$ 3.751,90 | R$ 68,22 | R$ 19,19 *(só MASSO.PRES)* |
| Orgânico | `OR-massoterapia` | 9 | — | — | — |
| **Total masso (capa)** | | **148** | **R$ 11.394,24** | **R$ 77,00** | — |
| *Fora da capa* | *estágio social 39 · auriculo 14* | *53* | — | — | — |
| *Sem carimbo* | *não classificável* | *242* | — | — | — |
| *Bruto (todo o WhatsApp)* | | *445* | — | — | — |

### Lead-a-lead (telefones) — anexo do ZenPro
> Lista completa não consta no fechamento narrativo; **puxar do ZenPro** por dezena.
| Telefone | Data entrada | tracking_code | Campanha | Canal | Virou matrícula? |
|---|---|---|---|---|---|
| *[puxar ZenPro D1]* | | | | | |

### Bônus D1 (vendas / ROAS)
- **11 matrículas** · R$ 28.433 · ticket R$ 2.585 · mix 6 integrais / 2 intensivos / 3 mensalistas
- **ROAS Google 2,26×** · **Meta 1,96×** · geral 2,50× · só-anúncio 2,16×
- Atribuição 90d: Google R$ 17.255 (6) · Meta R$ 7.360 (3) · cauda >90d R$ 3.818 (2)

---

## ▸ D2 (11–20/07) ⏳ a fechar

### Gasto ✅ (Windsor, 11–20/07)
| Canal | Campanha | Gasto |
|---|---|---|
| Google | Masso Geral (PG_B) | R$ 6.278,91 |
| Meta | 15/12 MASSO.PRES | R$ 2.353,74 |
| Meta | N.E.I. MENSALISTAS | R$ 1.667,89 |
| **Total masso** | | **R$ 10.300,54** |

*(fora da régua masso: Google Auriculo R$ 278,45 · Quiro R$ 441,38 · Desportiva R$ 802,63 · Meta Salas R$ 978,12 · Vídeos R$ 86,15)*

### Leads por campanha + CPL
| Origem | tracking_code | Leads (carimbado) | Gasto | CPL carimbado | CPL plataforma |
|---|---|---|---|---|---|
| Google | `GC-*` | [ZenPro] | R$ 6.278,91 | [calc] | R$ 38,76 *(162 conv.)* |
| Meta | `IS-*`/`FB-*`/`mensalistas` | [ZenPro] | R$ 4.021,63 | [calc] | [pendente — leads Meta] |
| Orgânico | `OR-massoterapia` | [ZenPro] | — | — | — |
| **Total masso (capa)** | | **[soma ZenPro]** | **R$ 10.300,54** | **[calc]** | — |
| *Sem carimbo* | | *[ZenPro]* | — | — | — |
| *Bruto* | | *[ZenPro]* | — | — | — |

### Lead-a-lead (telefones) — anexo do ZenPro
| Telefone | Data entrada | tracking_code | Campanha | Canal | Virou matrícula? |
|---|---|---|---|---|---|
| *[puxar ZenPro D2]* | | | | | |

### Bônus D2
- Matrículas · vendido · ticket · ROAS por canal — [preencher]

---

## ▸ D3 (21–31/07) ⏳ a fechar

*(mesma estrutura do D2 — gasto / leads+CPL / lead-a-lead / bônus)*

---

# B) COMPARATIVO — JUNTO (D1 × D2 × D3)

> É essa tabela que sustenta a decisão. Delta = variação vs dezena anterior.

| Métrica (massoterapia) | D1 | D2 | D3 | Δ D2vsD1 | Δ D3vsD2 |
|---|---|---|---|---|---|
| **Leads masso (carimbado)** | **148** | | | | |
| — Google `GC-*` | 84 | | | | |
| — Meta `IS/FB/mens` | 55 | | | | |
| — Orgânico `OR-` | 9 | | | | |
| Bruto (referência) | 445 | | | | |
| **Gasto total** | **R$ 11.394** | **R$ 10.301** | | **−9,6%** | |
| — Google | R$ 7.642 | R$ 6.279 | | **−17,8%** | |
| — Meta | R$ 3.752 | R$ 4.022 | | **+7,2%** | |
| **CPL carimbado (blended)** | **R$ 77,00** | [ZenPro] | | | |
| — CPL Google (carimbado) | R$ 90,98 | [ZenPro] | | | |
| — CPL Meta (carimbado) | R$ 68,22 | [ZenPro] | | | |
| — CPL Google (plataforma) | R$ 42,93 | R$ 38,76 | | **−9,7%** | |
| *Bônus:* Matrículas | 11 | | | | |
| *Bônus:* Vendido | R$ 28.433 | | | | |
| *Bônus:* ROAS Google | 2,26× | | | | |
| *Bônus:* ROAS Meta | 1,96× | | | | |

**Comparativo sazonal (mesma dezena, mês anterior)** — preencher com Jun D1/D2/D3 quando útil:
| | Jul D1 | Jun D1 | Δ |
|---|---|---|---|
| Leads masso | 148 | 63 | +135% |
| Gasto | R$ 11.394 | R$ 9.317 | +22% |

---

# C) BÔNUS — Cursos livres e resto (secundário)

> Só quando os números de masso estiverem fechados. D1 referência: R$ 9.097 (15 vendas), puxado por Quiropraxia e Tântrica.

| Curso | Vendas | Faturamento | Dezena |
|---|---|---|---|
| *[preencher]* | | | |

---

*Método e canon: repo do Lúcio → `marketing/relatorios/README.md`. Fonte oficial de leads = ZenPro; fonte oficial de vendido = planilha Meta de Vendas (aba do mês).*
