# 📊 Painel de Marketing — Holos

> **O dashboard da operação.** Abre aqui pra ver onde estamos no mês: conversas, matrículas, ROAS, faturamento — sempre contra a meta.
> **Metas oficiais (fonte da verdade):** [acordo-rede-holos.md → Números oficiais](../acordos/rede-publicidade/acordo-rede-holos.md)
> **Atualizado:** 13/07/2026 (**Jul D1 fechado** — a dezena que confirmou o lag de conversão do Google)

---

## 🟢 Julho · D1 (01–10) — A VIRADA

| Métrica | Jul D1 | Jun D1 | Δ |
|---|--------|--------|---|
| Matrículas novas | **11** | 13 | −15% |
| Vendido masso | **R$ 28.432,68** | R$ 31.857 | −10,8% |
| Ticket médio | **R$ 2.585** | R$ 2.451 | **+5,5%** 🟢 |
| **Leads MASSO** | **148** *(G 84 · I 55)* | 63 *(48/15)* | **+135%** 🟢 |
| *Leads brutos (todo o WhatsApp)* | *445* | *322* | *+38%* |
| Verba (Google 7.642 + Meta 3.752) | **R$ 11.394** | R$ 9.317 | +22% |
| CPL masso Google | **R$ 91** | R$ 178 | **−49%** 🟢 |
| CPL masso Instagram | R$ 68 | R$ 53 | +28% |
| **ROAS Google** | **2,26×** | *(jun mês: 0,95×)* | 🟢 **+138%** |
| **ROAS Meta** | **1,96×** | *(jun mês: 1,45×)* | 🟢 **+35%** |
| ROAS geral (régua da casa) | 2,50× | 3,42× | — |

🟢 **A aposta de junho pagou.** Mantivemos a verba do Google com ROAS em 0,95× apostando no lag de
conversão ("os leads de fim de junho viram matrícula em julho"). **Viraram: 2,26×.**
🟢 **100% das 11 matrículas rastreadas** — 1ª dezena com atribuição completa.
🔴 **Mensalista caiu pra 3** (era 7 no D3 de junho, com a oferta de 50%) — único motivo de estarmos
abaixo do passo do mês (22% das matrículas em 1/3 do mês).

📌 **Régua de leads corrigida (13/07 — pego pelo Lucio):** o bruto do ZenPro conta **todo contato da escola**
(estágio social, auriculo, cursos livres). **Não é lead de masso.** Capa da Lu agora usa o **lead masso
identificado**. E **o tracking NÃO piorou**: os sem-origem ficaram parados (233 → 242); o carimbado é que
dobrou (89 → 203) — o "45% → 54%" é armadilha de denominador.

✅ **Saldo do Google — resolvido (14/07):** conta recarregada logo cedo (Lucio confirmou). O alerta de 13/07
(R$ 890,83 · <1 dia no ar) está encerrado — **a campanha não chegou a sair do ar.**

📌 **Orçamento do Google — resolvido (13/07):** a campanha *Masso Geral* está em **R$ 1.000/dia + Maximizar
cliques** (a mudança pra R$800/dia + tCPA R$45, registrada em 23/06, **nunca foi aplicada** — Lucio confirmou).
**Efeito prático nulo:** ela gasta **R$ 764/dia**, nunca encostou nos 800. **O gargalo é ALCANCE, não orçamento** —
e com ROAS em 2,26×, a decisão é **manter os R$ 1.000 e ampliar palavras-chave**, não apertar.
*(O CPL baixo e o gasto controlado de junho vieram da correção de 19/06 — auto-apply off —, não do tCPA fantasma.)*

> Relatório: [2026-07-D1-relatorio-luciana.md](relatorios/2026-07-D1-relatorio-luciana.md) · PDF em `saidas/`

---

## 🐛 Correção de junho (12/07)

A coluna `QUANT.` da *Meta de Vendas* **respeita o filtro ativo da aba e subcontava**. A coluna `VENDIDO`
sempre esteve certa. **Junho fez 32 matrículas, não 27** — faturamento e ROAS **não mudaram**.
**Regra nova pra fechar dezena:** baixar o `.xlsx` completo (`/export?format=xlsx`) e conferir que
`soma do detalhe == VENDIDO do cabeçalho`. Export CSV e conector do Drive **omitem linhas filtradas**.

## Funil do mês

```
1.039 conversas/mês  (topo — ZenPro)
            ↓
   32 matrículas/mês  →  META 50  (baseline maio: 35)   ·  conversão 3,1%
```

## Matrículas — Junho/2026 (MÊS FECHADO v3 · vs maio completo)

| Tipo | Jun | Meta | % | Mai | Δ vs Mai |
|------|-----|------|---|-----|----------|
| Integral/Flex | **16** | 20 | 80% | — | 🟢 |
| Intensivo | 2 | 5 | 40% | — | |
| — *Integral + Intensivo* | **18** | 25 | 72% | 15 | **+20%** 🟢 |
| Mensalista novo (1ª) | **14** | 25 | 56% | 20 | **−30%** 🔴 |
| **TOTAL** | **32** | **50** | **64%** | 35 | **−9%** |

🟢 **Ticket médio +25%** (R$ 1.560 → R$ 1.953): menos mensalista de entrada, mais integral.
🟢 **Integral + intensivo cresceu 20%** — é o contrato que sustenta a escola.
🔴 Mensalista segue sendo o gargalo — **mas a curva subiu no fim do mês**: D1 4 · D2 3 · **D3 7** (oferta de 50% funcionou).
📲 Leads: **1.039 em junho** (vs 976 em maio, +6,5%) — D1 322 · D2 354 · D3 363 (ZenPro direto).

## Faturamento — Junho/2026 (MÊS FECHADO, régua vendido)

| | Valor | vs Mai |
|---|-------|--------|
| Holos total vendido (todas as frentes) | **R$ 151.784,20** (77% da meta R$ 196.099) | **+22%** 🟢 |
| **Massoterapia novas (capa)** | **R$ 62.487,07** | **+14%** 🟢 |
| Caixa (Métricas, retrato 30/06) | R$ 157.901,65 | — |

> Detalhe produto a produto e mês×mês: [relatório mensal](relatorios/2026-06-MES-relatorio-luciana.md)

## ROAS / Tráfego — Junho/2026 (fechado, regra 90 dias)

| Métrica | Valor | Obs |
|---------|-------|-----|
| Investido junho (masso) | R$ 22.143 | Google 19.590 + Meta 2.553 ⬜ |
| **ROAS geral do mês** (régua da casa) | **2,82×** | vendido novas ÷ investido — **inclui venda orgânica** |
| **ROAS só-anúncio** | **1,01×** | só vendas de origem paga ÷ verba — *"o anúncio se paga?"* |
| ROAS Google | **0,95×** | R$ 18.579,42 · quase se paga no mês — e deixa cauda |
| ROAS Meta/Instagram | **1,45×** ⬜ | R$ 3.700,30 com **12% da verba** 🟢 — canal a escalar |
| Cauda de campanhas antigas | R$ 7.521 | 4 matrículas de leads dez–mar (>90d) |
| Orgânico · indicação · interno | R$ 32.686,35 | 52% do vendido — **não vem de anúncio** |
| CPL Google | R$ 47,61 (plataforma) · R$ 84,80 (carimbado) | real entre os dois |

> ⚠️ **Duas réguas:** 2,82× divide *tudo* pela verba (inclui orgânico). 1,01× é o que o anúncio de fato
> devolve. Pra decidir verba, usar o **por canal**: Meta 1,45× × Google 0,95×.
> ⬜ **Pendente:** confirmar se os R$ 2.553 do Meta cobrem a campanha `mensalistas` (Lucio puxando print).
> Referência histórica (mar–mai): ROAS geral 3,67× · investido R$ 80.986.

---

## Campanhas ativas (resumo)

| Campanha | Canal | LP | Status |
|----------|-------|----|--------|
| Masso Geral | Google Search | LP Masso React (Vercel) | ✅ Rodando · tracking GC-0hh1dj |
| Auriculo | Google Search | LP Auriculo | ✅ Rodando |
| Locação de Salas | Google Search | LP Salas | 🔵 Criar |
| Estágio Social | Meta Ads | LP Estágio | 🔵 Criar |

Detalhe: [campanhas/google-ads.md](campanhas/google-ads.md) · [campanhas/meta-ads.md](campanhas/meta-ads.md)

## 🔎 AUDITORIA 14/07 — o dinheiro na mesa (dado vivo + código lido)

> **Documento completo:** [auditoria de tráfego 14/07](relatorios/2026-07-14-auditoria-trafego-vazamentos.md)
> ✅ **Verificada no código em 16/07** — o achado principal passou intacto; 3 achados novos; 2 itens corrigidos.

### ✅ Verificação 16/07 — o que mudou

🟢 **O achado nº1 está CONFIRMADO.** A prova a mais: o pixel leva `guid=ON` (= *"identifique pelo cookie do
Google"*) e **numa edge function não existe cookie**. Não é bug sutil — é endpoint de navegador chamado de servidor.

🆕 **Três achados novos:** (1) **o GA4 tem a mesma doença** — `client_id` = telefone, deveria ser o cookie `_ga`;
(2) **o valor está fixo** — webhook manda `value=1`, LP manda `value:250`, **nunca o ticket de R$2.585**;
(3) 🟢 **a correção do sinal é mais simples do que parecia** — o disparo está em **2 handlers**, não nos 8 CTAs.

🔴 **Dois itens da auditoria caíram:** (1) **`OR-massoterapia` não é órfão — é o `DEFAULT_REF` da LP**; a ação
inverteu: ver se **anúncio pago cai no fallback** → se cair, o **ROAS pago está SUBESTIMADO**. (2) **as 10 LPs
estáticas TODAS carimbam `#ref`** — o item das "sem atribuição" vale só pras **React**.

🚨 **Uma pendência que quebraria o que funciona:** o `landing-pages.md` mandava migrar a `massoterapia-lp` de
`#ref=` pra `Ref:`. **O ZenPro só lê `#ref=`** — executar aquilo quebraria a atribuição da campanha principal.
Registro corrigido; **não recriar.**

📌 **As 4 campanhas estão ATIVAS** (Lucio confirmou 16/07): Masso Geral · Aurículo · **Desportiva** · **Quiropraxia**.
O `google-ads.md` listava as duas últimas como pausadas — **2ª vez que o registro mente** (a 1ª foi a PMax).
⏫ **Isso sobe a urgência:** há **verba correndo em 3 LPs sem tag de conversão nenhuma.**

⛔ **Windsor.ai (16/07):** conector do claude.ai ✅ conectado, mas **falta ligar a fonte Google Ads** — e isso
esbarra em plano pago. **Decisão: não assinar** ($19 Básico / $99 Padrão). O **export CSV nativo do Google Ads
dá mais informação, de graça** — o Windsor é ETL pra dashboard recorrente, não ferramenta de análise, e
provavelmente nem traz termos de busca. Só valeria se o painel dezenal virar automático — e aí como custo da
**Rede Publicidade** (Básico, 75 contas cobrem a carteira toda), não da Holos.

🔴 **A causa-raiz do CPL do Google: o ZenPro devolve a conversão pro Google por um caminho que NÃO
ATRIBUI.** O `webhook-worker` chama o **pixel de navegador** do Google **de dentro do servidor**, sem cookie
e sem `gclid` — o Google não tem como ligar a conversão a um clique. O Meta recebe o lead pela
**Conversions API oficial** e por isso otimiza direito. **É por isso que o lead do Meta custa R$19 e o do
Google custa R$91** — não é o canal, é o sinal. *(`google-ads.md` registra esse webhook como "✅ funcionando".
Ele dispara, mas não atribui — corrigir o registro.)*

🔴 **O único sinal que sobra pro Google está inflado ~1,8×.** A LP dispara a conversão **no clique que abre
o WhatsApp**, sem guarda de disparo único e com `transaction_id` novo a cada clique. A página tem 8 CTAs —
a mesma pessoa conta 2×. Google conta **150**; o ZenPro vê **84** leads reais.

🪟 **A janela grátis:** a campanha está em **Maximizar Cliques**, que **não usa o sinal de conversão** →
**consertar a tag hoje custa ZERO de aprendizado.** A janela fecha no minuto em que migrarmos o lance.
**Sinal primeiro, lance depois (28/07). Fora dessa ordem, julho leva dois resets.**

| Vazamento | Evidência | Tamanho |
|---|---|---|
| Sinal do Google inflado 1,8× | 150 conv. × 84 leads reais | **~R$23k/mês** lançando errado |
| **9 de 10 LPs sem tag de conversão** | só a `massoterapia-lp` tem `AW-752011587` | cursos livres + Aurículo **cegos** |
| 4 páginas React de masso **sem atribuição** | `wa.me` sem `#ref=` | leads entram como "sem código" |
| **Estágio Social morreu 08/07 17:28** | 0 leads em 6 dias (fazia ~5/dia) | **~30 leads** — e é o funil do **mensalista** |
| Vendas em códigos órfãos | R$ 8.812 em 14 dias | **~R$18k/mês de venda invisível** |
| Aurículo: resposta em **13,5 h** | mediana 813 min (masso: 9 min) | canal pago apodrecendo |
| 22% dos leads chegam fora do horário | 145 leads · espera mediana **9 h** | 22% do volume esfriando |

⚖️ **Duas réguas a fechar antes do próximo número pra Lu:** (1) o CPL de **masso** no Meta é **R$68**, não
R$19 (o R$19 inclui estágio social) → **não mover verba de masso do Google pro Meta**; (2) o ROAS Google D1
dá **2,26×** pela planilha da Elis e **2,88×** pela tabela `sales` do ZenPro — **escolher uma régua**.

## 🗂️ Próximo trabalho — reorganização (plano fechado 14/07)

**Ordem importa** — mexer fora de ordem reseta o aprendizado duas vezes e cega a atribuição.

| # | Frente | O que já sabemos | Cuidado |
|---|--------|------------------|---------|
| 0 | ✅ **Recarga do Google** | **FEITO 14/07** — campanha não saiu do ar | Vigiar o saldo toda dezena: a conta gasta ~R$ 930/dia |
| 1 | 🔴 **Reabrir o Estágio Social** | Morto desde 08/07 17:28. É o funil de entrada do **mensalista** (gargalo do mês) | **Descobrir POR QUE morreu antes de recriar** — senão morre de novo |
| 2 | 🔴 **Consertar o sinal + tag nas 9 LPs** | Guarda de disparo único + `transaction_id` estável | ⏳ **Janela grátis só enquanto o lance for Max Cliques.** Avisar a Lu: **o CPA vai subir pra ~R$91** — é o número saindo da fantasia, não piora |
| 3 | **Ampliar palavras-chave** (leva 1: certificação/SINATEN + geo/turno) | Gargalo é **ALCANCE**, não orçamento — gasta R$764 de R$1.000 | **Frase**, nunca ampla, enquanto o lance for Max Cliques. **Não mexer no orçamento** |
| 4 | **Unificar as páginas de masso** | ❌ Não são 2 — **são 6**: a estática (única que rastreia) + 4 React sem atribuição + a do site (`CONTATO NEW SITE`) | 🔴 **A página nova TEM que nascer carimbando o `#ref`** |
| 5 | ⏳ **Migrar o lance** (Max Conversões) | **Só em 28/07**, e só se: tag limpa há ≥14d + conversões ≈ leads reais (±15%) + ≥30 conversões limpas | **Sem tCPA.** Se usar, o CPA **real (~R$91)** — nunca os R$43 fantasma (foi o que estrangulou a campanha em 18/06) |
| 6 | **PMax "2 PERFORMAX MASSO"** (`GC-DEFAULT`) | ❌ Documentada como PAUSADA — **está rodando**: 28 leads em julho | **Não pausar ainda** (volume que não dá pra repor). Descobrir o gasto + excluir marca. **Machado em 28/07** |
| 7 | **Template de relatório** | O formato enxuto do Jul D1 funcionou. Virar padrão | Régua de lead masso ≠ bruto ([README](relatorios/README.md)) |

♟️ **A jogada de fundo:** capturar o **`gclid`** na LP → levar até o ZenPro → subir a conversão pela **API
do Google Ads** (*offline conversion import*), **com o valor da venda**. O ZenPro já tem telefone, código,
conversa e a tabela `sales` com o valor real — falta só o `gclid` e a chamada certa. Aí o Google passa a
lançar em **faturamento** (ticket R$2.585), não em clique de botão. É o salto que o Meta já deu.

---

## 🔧 Ciclo em andamento

- [**2026-06-09 — Micro-conversões + LP React**](ciclos/2026-06-09-microconversoes-google-lp-react.md) — **Rodada 2 — fix confirmado (21/06):** auto-apply desligado + lance Max Conversões sem teto **destravou** — gasto rampando R$70→282→365/dia, 15-18 conv/dia a R$15-24 (CPA ótimo). Auto-apply OFF confirmado (otim. score 79%→47%). Saldo R$3.900 (não é o gargalo). **Novo gargalo: ALCANCE** (Google: "segmentando menos pesquisas") → ampliar palavras-chave. ⏳ Cross-check ZenPro + deixar aprendizado fechar (~2 sem).

---

## Como manter este painel

- Atualizar os números **toda dezena** (dias 10/20/30) junto com o relatório
- Matrículas e faturamento: puxar da planilha da Elis (Meta Mês)
- Conversas: puxar do ZenPro
- Mudança grande de campanha/LP vira um registro em [`ciclos/`](ciclos/)
