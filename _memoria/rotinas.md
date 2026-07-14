# Rotinas da Elis

> O que ela faz, quando e quanto tempo leva.
> Preencher ao longo das sessões. Serve pra planejar, priorizar e eventualmente automatizar.

---

## Rotinas de conteúdo digital

| Tarefa | Frequência | Tempo estimado | Ferramenta | Observações |
|---|---|---|---|---|
| Criar carrossel (feed Instagram) | 3x/semana (ter, qui, sáb) | ~30–60 min | Claude + Playwright | Elis posta, Luciana não |
| Criar capa de reel | 3x/semana (seg, qua, sex) | ~20–40 min | Claude + Playwright | Luciana grava, Elis organiza |
| Escrever legenda | A cada post | ~10–15 min | Claude | Máx 5 hashtags |
| Postar no Instagram | Diário | ~10 min | App Instagram | Feed 19h, Reels 18h |
| Criar banner para status/WhatsApp | Eventual | ~15–30 min | Canva | Ex: vagas de estágio |
| Atualizar site (cronograma de cursos) | Mensal ou quando muda | ~20 min | Claude → GitHub → Lúcio faz deploy | |

---

## Rotinas de gestão de turmas

| Tarefa | Frequência | Tempo estimado | Ferramenta | Observações |
|---|---|---|---|---|
| Mensagens de boas-vindas para turmas novas | A cada turma | ~15 min | Claude + WhatsApp | Adaptada ao professor e módulo |
| Avisos e comunicados nos grupos | Conforme necessário | ~10–20 min | WhatsApp | Claude ajuda a redigir |
| Enquetes de presença | Eventual | ~5 min | WhatsApp | Ex: aulas extras |
| Escala de trabalho do depto comercial | Mensal ou quando muda | ~15 min | WhatsApp/email | Envia para Luciana e Leo |

---

## Rotinas de dados e planilhas

| Tarefa | Frequência | Tempo estimado | Ferramenta | Observações |
|---|---|---|---|---|
| Planilha de desempenho Instagram | Mensal | ~30 min | CSV criado pelo Claude + preenchimento manual | `marketing/desempenho-instagram-julho-2026.csv` |
| Planilha de estágio | Mensal (por data de supervisão) | ~15 min total | Holos Conect → CSV exportado → Claude cola no Sheets via Playwright | Processo semi-automatizado: exporta CSV por sessão e manda pro Claude |
| Levantamento de turmas Massoterapia | Eventual | ~? min | Com Mayara | Elis processa e entrega algo mais detalhado |

---

## Rotinas de compras e materiais

| Tarefa | Frequência | Tempo estimado | Ferramenta | Observações |
|---|---|---|---|---|
| Compra de materiais (papel de maca, etc.) | Conforme necessidade | ~15–30 min | Mercado Livre | |

---

## Rotinas de equipe

| Tarefa | Frequência | Tempo estimado | Observações |
|---|---|---|---|
| Alinhamento com Mayara | Recorrente | ~? min | Levantamentos, dados de turmas |
| Escala comercial para Luciana e Leo | Mensal | ~15 min | Depto comercial 1 |

---

## Candidatas a automação

- **Planilha de estágio** (semi-automatizado ✅): Elis exporta CSV de cada sessão no Holos Conect (botão "Exportar CSV" no Relatório), manda pro Claude, Claude cola no Google Sheets via Playwright. Regra: entradas manuais da planilha prevalecem sobre o sistema; canceladas nunca entram. Bug conhecido: Holos Conect exporta CSV com data -1 dia (Lúcio precisa corrigir).
- **Desempenho Instagram**: preenchimento manual hoje — futuramente pode conectar via Windsor.ai ou API Meta.
- **Levantamento de turmas com Mayara**: quando Elis tiver as informações, pode trazer aqui pra processar e entregar formatado.
