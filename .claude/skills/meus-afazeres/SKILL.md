---
name: meus-afazeres
description: >
  Varre o workspace da Holos, junta todos os itens em aberto (checkboxes [ ]) espalhados nos
  arquivos — ciclos, campanhas, acordo, produto — num checklist único e priorizado pelo foco atual,
  e sincroniza com o board de kanban do Obsidian. É o "o que eu tenho pra fazer" do Lucio.
  Use quando o usuário disser "meus afazeres", "o que eu tenho pra fazer", "minhas tarefas",
  "checklist", "meus-afazeres", "/meus-afazeres", ou pedir o panorama de pendências.
---

# /meus-afazeres — Checklist do Lucio (workspace + Obsidian)

Os afazeres do Lucio vivem espalhados em checkbox `[ ]` por vários arquivos. Esta skill junta tudo
num lugar, prioriza pelo que importa agora, e empurra pro vault central — pra não perder nada entre
projetos.

## Dependências

- **Fonte dos itens (workspace):** todos os `[ ]` em `marketing/`, `acordos/`, `produto/`, `_memoria/`
- **Prioridade/foco:** `_memoria/estrategia.md` (Fase atual, prioridade principal, contexto com prazo)
- **Vault central:** `/home/usuario/Documentos/Revolucio/Revolucio` (HOME.md) — board de kanban
- **Skill de tarefa do vault:** `/obsidian-task` (ou board de kanban via obsidian-second-brain)

---

## Workflow

### Passo 1 — Varrer o workspace
Buscar todos os checkboxes abertos `[ ]` nos arquivos do workspace (ex:
`grep -rn "\[ \]" marketing/ acordos/ produto/ _memoria/`). Capturar o item + o arquivo de origem
(pra rastreabilidade).

### Passo 2 — Priorizar pelo foco atual
Ler `_memoria/estrategia.md` e ordenar:
- 🔴 **Urgente / com prazo** — bate com "Contexto com prazo" ou "Prioridade principal" da estratégia
- 🟡 **Importante** — avança uma prioridade, mas sem prazo apertado
- ⚪ **Pode esperar** — itens da seção "O que pode esperar" ou pendências secundárias

Agrupar por frente (Tráfego/Google, Contratos, Campanhas, Produto…) pra leitura rápida.

### Passo 3 — Apresentar o checklist
Mostrar o checklist priorizado, com a origem de cada item entre parênteses (arquivo). No topo, as
3 coisas mais alavancadas pra hoje. Direto, sem enrolação.

### Passo 4 — Sincronizar com o Obsidian ("os dois")
Empurrar os itens (ou os priorizados 🔴/🟡) pro board de kanban do vault via `/obsidian-task`,
mantendo o link de origem. Evitar duplicar: se o item já existe no board, atualizar em vez de criar.
Confirmar o que subiu pro vault.

### Passo 5 — Fechar o loop
Quando o Lucio marcar algo como feito, oferecer atualizar o `[ ]` → `[x]` no arquivo de origem do
workspace (não só no board) — pra a fonte da verdade não desencontrar.

## Regras

- **Fonte da verdade dupla, sem desencontro:** item concluído some dos dois lugares (workspace + vault).
- Não inventar tarefa — só agregar o que está escrito como `[ ]` (ou o que o Lucio adicionar na hora).
- Prioridade vem da `estrategia.md`, não de palpite.
- Sempre mostrar a origem do item (arquivo) pra dar pra abrir e agir.
- Manter o checklist curto no topo (as 3 de hoje) e o resto agrupado abaixo.
