# 🔎 Auditoria — Funil, Tráfego e LP (Masso Geral)

> **Data:** 23/06/2026 · **Escopo:** Google Ads + Meta Ads + LP `massoterapia-lp` + tracking + funil
> **Fonte de analytics oficial:** GA4 (cruzar com Vercel quando necessário)
> **Status:** achados consolidados — planos de correção a detalhar com os agentes especialistas
> ← [Painel](../painel.md) · [Ciclo micro-conversões](../ciclos/2026-06-09-microconversoes-google-lp-react.md) · [LPs](../campanhas/landing-pages.md)

---

## 0. Regra de posicionamento (trava de tudo)

**Holos = formação profissional / qualificação.** Certificado SINATEN, 1.200h.
**NÃO é curso técnico. NÃO tem MEC.**

- ✅ Pode **lançar** na busca "curso técnico de massoterapia" (público usa o termo no sentido coloquial).
- ❌ **Proibido** em anúncio, LP, copy e script: "curso técnico", "técnico em massoterapia", "reconhecido pelo MEC", "diploma de técnico".
- ✅ Usar sempre: "formação profissional", "qualificação profissional", "certificado SINATEN", "1.200h", "profissionalizante".

---

## 1. Google Ads

| # | Achado | Gravidade |
|---|--------|-----------|
| G1 | **Grupos duplicados** — ~11 keywords repetidas em `Intensão técnica #2/#3/sem-nº`. Canibalização: competem entre si, aprendizado 3× mais lento, sem ganho de alcance | 🔴 |
| G2 | **Alcance estrangulado** — 73 impressões / R$122 no dia (23/06); gasto caiu de R$365 (21/06). "Segmentando menos pesquisas" | 🔴 |
| G3 | **Match types restritivos** — várias exatas com 0 impressão (`[curso presencial...]`, `[curso com certificado...]`) | 🟡 |
| G4 | **Lacuna de cobertura** — só variações "curso/formação massoterapia". Falta geo (SP/Vila Mariana), carreira ("como se tornar massoterapeuta"), EAD | 🟡 |
| G5 | **CTR forte (19,18%; pico 66%)** — anúncio e match de intenção estão certos. Quando aparece, clica | 🟢 |
| G6 | Typo no nome do grupo: "Intensão" → "Intenção" | ⚪ |

**Plano (gestor de tráfego):** consolidar grupos em 1 → adicionar 3 famílias (geo + carreira + EAD) → ampliar workhorses ("curso de massoterapia", "curso técnico massoterapia", "formação em massoterapia") pra **ampla com negativas** → reativar "curso para ser massoterapeuta" (pausada). **Não mexer no lance** (aprendizado ~2 semanas).
**Negativas:** `grátis · gratuito · curso livre · apostila · pdf · download · mec · reconhecido pelo mec · diploma de técnico · massagem caseira · namorado · sensual · tântrica · vaga · emprego`

---

## 2. Meta Ads (campanha "Holos 2021" — 22/06)

| # | Achado | Gravidade |
|---|--------|-----------|
| M1 | **CPL eficiente: R$11,60/contato** (11 contatos, R$127,64) — ~metade do CPA do Google. Confirma "Instagram é a alavanca" do painel | 🟢 |
| M2 | **Canal subfinanciado e fragmentado** — 15 anúncios dividindo R$127/dia; muitos com R$1–4 e 0 contato (Mulher, SENHORA, MINHA MAE) | 🟡 |
| M3 | **Tom dos criativos** — "GANHOS" e "SAIA DO VERMELHO" = promessa financeira, conflita com o tom da casa e tem risco (renda implícita em educação). Mais barato foi "Tecnicas" (conteúdo) a R$1,47 | 🟡 |
| M4 | Vencedores: Tecnicas (R$1,47), SAIA DO VERMELHO (R$12,57). Caro: GANHOS (R$24,45) | — |

**Plano (gestor de tráfego + copy):** consolidar nos 2–3 vencedores, pausar famintos, testar mais criativo de **conteúdo/método** (não promessa). **Antes de remanejar verba Google→Meta:** validar **lead→matrícula por canal** (CPL barato ≠ matrícula barata).

---

## 3. Tracking / Atribuição 🔴 (o mais urgente — sem isso decidimos no escuro)

| # | Achado | Gravidade |
|---|--------|-----------|
| T1 | **UTM do Meta com `utm_medium=social`** — convenção de **orgânico**. GA4 joga a mídia paga do Instagram no balde "Orgânico Social" → paga subnotificada. Certo: `paid_social` (ou `cpc`) | 🔴 |
| T2 | **`utm_campaign=IS-ub34kh`** = código que o ciclo flagrou entrando **órfão** no ZenPro → leads do Meta mal atribuídos | 🔴 |
| T3 | **`fbclid=fbclid`** possivelmente hardcoded (valor literal) — confirmar com Nick se é dinâmico | 🟡 |
| T4 | **Taxa de conversão não instrumentada** — falta cruzar visitas (GA4) × leads (ZenPro) por canal | 🟡 |

**URLs de referência:**
- Limpa: `https://app.holoscursoseterapias.com.br/massoterapia-lp`
- Google: `...?utm_source=google&utm_medium=cpc&utm_campaign=GC-0hh1dj` ✅
- Meta: `...?utm_source=instagram&utm_medium=social&utm_campaign=IS-ub34kh&fbclid=fbclid` ❌ (medium errado)

**Padrão de UTM correto (a fixar):**
- Google paga: `utm_medium=cpc`
- Meta/IG paga: `utm_medium=paid_social`
- Orgânico: `utm_medium=social`

**Plano (especialista em tracking):** corrigir UTM do Meta → consertar código IS- órfão no ZenPro → validar fbclid → instrumentar evento de conversão no GA4 → montar dashboard de conversão por canal.

---

## 4. Landing Page `massoterapia-lp` (Google + Meta — a mesma)

| # | Achado | Gravidade |
|---|--------|-----------|
| L1 | **Idade da escola em 3 números:** "11 anos" (bloco) vs "18 anos" (seção) vs ~30 (contexto). Quebra confiança | 🔴 |
| L2 | **Nº de técnicas:** "14" (3 lugares) vs "8" (bloco de números) | 🔴 |
| L3 | **Alunos:** "+10.000 vidas" (título) vs "+6.012 formados" (bloco) | 🔴 |
| L4 | **FAQ "O certificado é reconhecido?"** — resposta não verificada; ponto de maior risco de citar MEC | 🔴 verificar |
| L5 | **CTA muda de objetivo 3×:** "Quero minha vaga" → "Tenho interesse" (×5) → "Aula experimental/WhatsApp" | 🟡 |
| L6 | **Posicionamento OK** — não cita "técnico" nem "MEC"; usa SINATEN / certificado profissional / mercado | 🟢 |
| L7 | "Você se reconhece aqui?" + "Não importa sua agenda" batem na objeção #1 ("não tenho tempo") | 🟢 manter |
| L8 | Página muito longa (8.366px) — medir profundidade de scroll | ⚪ |

**Plano (copy + designer):** cravar UM número de anos (pendente: Lucio confirmar real) → corrigir técnicas (14) e alunos → verificar/ajustar resposta do FAQ do certificado → definir 1 CTA primário → hierarquia visual do CTA.

---

## 5. Funil — estado atual e desenho-alvo

**Hoje (dois passos):** `Anúncio` → `LP` → `Cadastro (coleta email)` → dispara pro `WhatsApp` + entra no `ZenPro`.

**Desenho-alvo:**
```
Anúncio (Google/Meta)
   → LP (massoterapia-lp)
   → Cadastro (coleta email)        ← evento de conversão (GC- / IS-)
   → WhatsApp + ZenPro              ← lead operacional
   → [A FAZER] Email de confirmação (opt-in)
   → [A FAZER] Esteira de emails (nurture → matrícula)   ← conecta com /regua-matricula
```

**Pontos a validar (especialista em validar funil):**
- F1 — **O "passo a mais" (email antes do WhatsApp) derruba conversão?** É a fricção que o ciclo já suspeitou. Medir drop cadastro→WhatsApp.
- F2 — **Onde a conversão é contada?** No cadastro ou no WhatsApp? Define quais códigos GC-/IS- disparam e a atribuição.
- F3 — **O email entra mesmo no ZenPro/Brevo** pra alimentar a esteira? ("email ainda a fazer")
- F4 — **Esteira + email de confirmação não existem** → projeto já mapeado em [automacoes.md](../automacoes.md) (Nick: Supabase→Brevo). Conectar.
- F5 — Resposta no WhatsApp (SLA) — lead que chega e não é respondido = perdido (gargalo do comercial já conhecido).

---

## 6. Prioridade recomendada (estrategista)

1. **🔴 Tracking primeiro** (T1–T4) — sem atribuição confiável, todo o resto é decisão no escuro.
2. **🔴 LP — contradições** (L1–L4) — barato de corrigir, alto impacto em confiança/conversão.
3. **🟡 Google — consolidar grupos + alcance** (G1–G4) — destrava o canal estrangulado.
4. **🟡 Meta — consolidar criativos + avaliar escala** (M1–M3) — o canal eficiente.
5. **🟡 Funil — construir email/esteira** (F3–F4) — captura o lead que hoje só vai pro WhatsApp.

---

## Inputs pendentes do Lucio
- [ ] Número **verdadeiro de anos** da escola (pra corrigir a LP)
- [ ] Confirmar com Nick: `fbclid` dinâmico? código IS- no ZenPro?
- [ ] Acesso/fonte de visitas no **GA4** (pra taxa de conversão por canal)
