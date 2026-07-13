# 🧭 Relatórios — a linha lógica (leia isto primeiro)

> Se você se perdeu em "qual relatório vai pra quem", **este arquivo é o mapa.**
> Atualizado: 24/06/2026.

## A regra de ouro: 1 relatório pra Luciana, o resto é interno

A Luciana recebe **UM** documento por dezena — o de **massoterapia**, no formato mensagem-pronta.
Quem monta é a skill `/relatorio-luciana`; quem encaminha é a **Elis**. Os outros arquivos da
mesma dezena existem pra te servir (você e a Elis), **não** vão pra ela.

| Arquivo (por dezena) | É o quê | Vai pra Luciana? | Quem lê |
|---|---|---|---|
| `AAAA-MM-DX-relatorio-luciana.md` | **O** relatório dela (massoterapia + comparativo + otimizações) | ✅ **SIM** (Elis encaminha) | Luciana |
| `AAAA-MM-DX-portfolio-holos-INTERNO.md` | Visão de portfólio da Holos inteira (todas as frentes) | ❌ não | Lucio / Elis |
| `AAAA-MM-DX-masso-bastidor-INTERNO.md` | Bastidor técnico da masso (CPL, ROAS por canal, pendências) | ❌ não | Lucio / Elis |

## O canon (decidido 24/06/2026 — não mudar sem registrar aqui)

| Item | Decisão | Por quê |
|---|---|---|
| **Régua do número que vai pra Lu** | **Vendido** (planilha *Meta de Vendas*) | É a venda comercial fechada; casa com o D1 do histórico. NÃO usar o "caixa/recebido" (Métricas Holos) como número de capa. |
| **Janela** | **Incremental** — D1 = 01–10 · D2 = 11–20 · D3 = 21–fim | Só o incremental faz o comparativo dezena-a-dezena (momentum) funcionar. NÃO usar acumulado. |
| **Pipeline (leads)** | **ZenPro** (único nº auditado) | Não inflar com métrica de plataforma (Google/Meta sub/supercontam). |

⚠️ **Tensão de fonte que você precisa conhecer:** o *vendido* mora na *Meta de Vendas* (que **não tem corte por data**), e o *corte por dezena* mora nos snapshots da *Métricas Holos* (régua **caixa**) ou no **export do ZenPro** (venda por canal + data). Ou seja: pra ter **vendido + incremental** ao mesmo tempo, o desbloqueio é o **export do ZenPro com data**. Enquanto ele não vem, o número incremental sai como melhor-esforço e fecha com o ZenPro.

## Regra de atribuição — 90 dias (canonizada 03/07/2026)

- **Venda conta pro canal (ROAS de campanha) só se o lead entrou há ≤ 90 dias** —
  cruzar o telefone da venda com `min(created_at)` das `conversations` no ZenPro.
- Lead mais antigo que 90 dias → **"base de campanhas antigas"**: sai do ROAS do mês
  (senão o número fica bonito à toa) e entra como **prova de LTV/cauda** no relatório.
- Registrar a origem primária mesmo quando >90d (ex.: "IS- de dez/25") — é o argumento
  de longo prazo pra não cortar verba.
- 1ª aplicação: junho/2026 (4 vendas, R$ 7.521 — ver notas internas do D3).

## Fonte de leads — padronizada (03/07/2026) · **régua de MASSO separada (13/07/2026)**

- Leads = **consulta direta ao banco do ZenPro** (`claude_readonly`, ver `dados/zenpro-acesso-leitura.md`).
- Régua **bruta**: `conversations` criadas na janela · org Holos · `not is_group` · tz America/Sao_Paulo.
- Jun/26 por essa régua: D1 322 · D2 354 · D3 363 · mês 1.039.

### ⚠️ O lead bruto NÃO é lead de massoterapia (canon 13/07/2026)

A régua bruta conta **todo contato novo no WhatsApp da escola** — inclui **estágio social, auriculoterapia,
cursos livres, aluno atual com dúvida**. O relatório da Luciana é **de massoterapia**: usar o bruto ali
faz o número parecer inflado e **abre uma frente de questionamento que não precisa existir**
(pego pelo Lucio em 13/07, antes de ir pra ela).

**Régua de LEAD MASSO** = `tracking_code` de campanha/origem de masso:
- **Google:** `GC-*` · **Instagram/Meta:** `IS-*`, `FB-*`, `mensalistas` · **Orgânico:** `OR-massoterapia`
- **FORA:** `estagio-social`, `auriculo_google`, `WC-*`, IDs órfãos numéricos
- **Sem `tracking_code`** = não classificável → fica **fora da capa**, citado em nota

| Janela | Lead masso identificado | Bruto (todo o WhatsApp) |
|---|---|---|
| Jun D1 | **63** (Google 48 · Insta 15) | 322 |
| Jul D1 | **148** (Google 84 · Insta 55 · orgânico 9) | 445 |

> 📌 **Os "sem origem" não estão piorando.** Em absoluto ficaram parados (233 → 242); o que cresceu foi o
> lead **carimbado** (89 → 203). O percentual "45% → 54%" que apareceu num rascunho é **leitura errada** —
> o denominador é que cresceu. **Não repetir esse erro.**

## 🐛 Régua de leitura da planilha (canon 12/07/2026 — não pule este passo)

A *Meta de Vendas* tem **filtro ativo** nas abas. Consequência: a coluna `QUANT.` **subconta** e todo
export por fora (CSV, gviz, conector do Drive) **omite as linhas filtradas**. Foi assim que junho/26
foi reportado com **27 matrículas quando eram 32**.

**Procedimento obrigatório:**
1. Baixar a planilha inteira: `https://docs.google.com/spreadsheets/d/<ID>/export?format=xlsx`
2. Ler com `openpyxl` (traz todas as abas e todas as linhas)
3. **Conferir:** `soma das linhas do detalhe == VENDIDO do cabeçalho`. Não bateu → tem linha oculta.
4. O valor da venda pode estar em **qualquer uma das 4 colunas** de comissão (`com. 1`, `com. 2`,
   `escola`, `Cris`) — somar as quatro.

Detalhe completo em [`../../dados/fontes.md`](../../dados/fontes.md).

## O fluxo (toda dezena, dias 10/20/30)

```
1. /pedir-material   → Nick e Elis mandam o que falta (leads ZenPro por período, verba por data)
2. /relatorio-luciana → puxa Meta de Vendas + Métricas Holos do Drive,
                        cruza com os 2 números do Lucio (leads + verba),
                        monta o relatório da Lu (massoterapia) já no canon
3. Elis encaminha    → o relatorio-luciana.md, sem editar
4. Fecha a linha     → /relatorio-luciana grava a dezena em historico-dezenas.md
                        (vira base do comparativo da próxima)
```

## Onde está cada coisa

- **Fontes/IDs das planilhas:** [`../../dados/fontes.md`](../../dados/fontes.md)
- **Histórico (motor do comparativo):** [`historico-dezenas.md`](historico-dezenas.md)
- **Placar de otimizações (vitórias/perdas):** [`registro-otimizacoes.md`](registro-otimizacoes.md)
- **Skill que monta tudo:** `.claude/skills/relatorio-luciana/`
- **PDFs em `../../saidas/`:** são *renders* pontuais pra enviar/imprimir — não são a fonte. Render antigo ≠ relatório atual; sempre confira a data.
