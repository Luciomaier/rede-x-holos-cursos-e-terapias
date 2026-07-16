---
name: repescagem
description: >
  Gera a lista quente de leads pro ativo do comercial no WhatsApp — quem procurou a Holos,
  não comprou, e ainda está dentro da janela de fechamento. Cruza o banco do ZenPro com a
  planilha de vendas da Elis, prioriza em 3 grupos (quem ficou no vácuo, quem está no limite
  da janela, quem ainda está quente) e entrega planilha de trabalho + briefing pra Luciana.
  Use quando o usuário disser "repescagem", "lista de leads pro comercial", "ativo no WhatsApp",
  "quem não fechou", "recuperar leads da dezena", "/repescagem" ou pedir lista de leads quentes
  pra equipe trabalhar.
---

# /repescagem — A lista quente pro ativo do comercial

O modelo que a Luciana aprovou em **14/07/2026** (Jul D1). Rodar a cada dezena, depois de fechar
os números.

## A tese (é o que sustenta a lista)

**A matrícula não sai do lead da semana.** Descobrimos isso cruzando as 11 matrículas do D1 de
julho com a data de entrada de cada lead: **só 3 vieram de gente que chegou em julho.** As outras
oito eram leads antigos — a Samira chegou em abril, a Renata em dezembro.

Medindo o intervalo entre *chegar* e *assinar*, o padrão apareceu:

| Fecharam em | Quantos |
|---|---|
| 2 a 13 dias | 7 de 11 (mediana ~11 dias) |
| 25 a 84 dias | 3 |
| ~6 meses | 1 |

**Por isso a janela é 2–13 dias.** Passou disso, a chance despenca. A lista existe pra pegar a
safra da dezena *enquanto ela ainda está madura* — não é resgate de lead frio, é colher no ponto.

> ⚠️ **Corolário que vale mais que a lista:** nunca dividir as matrículas de uma dezena pelos leads
> daquela dezena. Isso mistura safras e dá um número falso (foi assim que "a conversão caiu de 21%
> pra 7%" — estava errado). Conversão real se mede por **safra ao longo do tempo**.

## Dependências

- **Banco do ZenPro** — `scripts/zenpro-query.js` + `dados/.env.zenpro` (guia: `dados/zenpro-acesso-leitura.md`)
- **Planilha META DE VENDAS** (Drive, aba do mês) — quem já comprou. ID em `dados/fontes.md`
- **Motor:** `scripts/repescagem.js` (carrega todas as regras abaixo)
- **Tom:** `_memoria/preferencias.md`

---

## Workflow

### 1. Montar o arquivo de vendas do mês

Ler a aba do mês na **META DE VENDAS** e salvar **todas** as vendas do mês (masso *e* cursos livres —
quem comprou qualquer coisa sai da lista) em `dados/vendas-<mes><ano>.json`:

```json
[{ "nome": "Fulana da Silva", "tel": "(11) 90000-0000", "curso": "MASSO integral" }]
```

> 🐛 A aba tem **filtro ativo**: a coluna `QUANT.` subconta e os exports CSV omitem linhas.
> Conferir sempre `soma do detalhe == VENDIDO do cabeçalho`. Detalhe em `dados/fontes.md`.
> Cuidado com `massoterapia intensivo flex`: o cabeçalho joga no balde *Integral e flex*.

### 2. Rodar

```bash
node scripts/repescagem.js 2026-07-01 2026-07-10 dados/vendas-jul26.json
```

Sai em `saidas/`: **CSV** (planilha de trabalho) + **HTML** (briefing).

### 3. Virar PDF

```bash
google-chrome --headless --no-pdf-header-footer \
  --print-to-pdf=saidas/repescagem-<slug>.pdf saidas/repescagem-<slug>.html
```

> Não usar LibreOffice: ele não entende flexbox e destrói o layout.

### 4. Subir a planilha no Drive do Lucio

`mcp__claude_ai_Google_Drive__create_file` com `contentMimeType: "text/csv"` — o Drive converte
em Google Sheets sozinho. É **a planilha, não o PDF**, que o time trabalha: é onde eles se
coordenam e ninguém fala duas vezes com a mesma pessoa.

> 🐛 O import do Drive **corrompe emoji de 4 bytes** nos nomes de WhatsApp (🩵 → `ð©µ`).
> O script já remove emoji do CSV por causa disso. Acentos passam normal.

### 5. Entregar

Mandar os dois: **planilha** (o time trabalha) + **PDF** (a Luciana entende o porquê).

---

## Os grupos (a régua)

| # | Quem | Quando | Por quê |
|---|------|--------|---------|
| **1** | Última mensagem foi **do lead** e ninguém respondeu | **HOJE** | Levantaram a mão e foram ignorados. Em jul/D1 eram 31 pessoas com **média de 12 mensagens** trocadas — não são curiosos. É a bola que parou do nosso lado |
| **2** | Clicou em anúncio de masso · **8+ dias** | Até amanhã | No limite da janela: fecha agora ou esfria |
| **3** | Clicou em anúncio de masso · menos de 8 dias | Esta semana | Dentro da janela, ainda quente |
| **4** | Sem código, mas **conversou de verdade** (3+ msgs) | Depois | O chip é o destino da verba de masso → provavelmente é masso sem carimbo |
| **5** | Sem código e pouca conversa | Depois | Fundo do balde |

**A primeira mensagem não vende — ela descobre o que travou.** Pergunta aberta, sem oferta. A coluna
*MOTIVO DE NÃO TER FECHADO* na planilha é o ativo mais valioso: em uma semana ela diz se o problema é
preço, horário ou anúncio atraindo a pessoa errada. Os textos por grupo saem prontos no HTML.

---

## As armadilhas (custaram caro — não desfazer)

1. **"Estrear" é na org inteira, não no chip.** Quem já falou com a Recepção em maio não é lead novo.
2. **O chip da Lu (8429 · `5511976378429`) é o destino da verba de MASSO.** Por isso os "sem código"
   dele quase certamente também são masso. Cursos livres vão pro Com.2 (Giovanna).
3. **`tracking_code` = onde o lead NASCEU** (a régua). **`whatsapp_session_id` = quem ATENDEU**, e isso
   muda de mão. Nunca medir origem pelo chip.
4. **O kanban do ZenPro está vazio** (445 de 445 conversas sem etapa — o time atende fora do sistema).
   O banco **não sabe quem fechou** → cruzar com a Meta de Vendas é obrigatório, não é luxo.
5. **Nem todo `contact_number` é telefone:** o WhatsApp grava LID (id interno) em ~10% das conversas.
   Esses só dá pra responder **dentro do ZenPro**. O script marca.
6. **Casar telefone por DDD + últimos 8 dígitos** — o 9º dígito entra e sai das bases.
7. **Achatar quebra de linha no nome do WhatsApp**, senão o CSV quebra na importação.
8. **O banco é vivo.** Rodar duas vezes com horas de diferença muda o grupo 1 (o time responde no meio).
   Não é bug — é o time trabalhando.

## Histórico

- **14/07/2026 · Jul D1 (01–10/07)** — 234 estrearam · 3 já tinham comprado · **231 na lista**
  (31 no vácuo · 49 no limite · 55 quentes · 96 sem código). Planilha entregue no Drive da Holos.
