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
