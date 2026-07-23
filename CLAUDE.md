# Holos Cursos e Terapias

Operação central da Holos. Cada setor tem sua área, com processos, entregas e documentos. O sistema conhece quem a empresa é, como fala e onde está o atrito — e usa isso antes de qualquer resposta.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual; inclui `rotinas.md` (rotinas recorrentes) e `afazeres.md` (tarefas do mês)
- `identidade/` — marca aplicada em tudo que o sistema gera
- `marketing/` — campanhas, conteúdo, mídia paga; inclui `dezenal/` (base própria de números da massoterapia por dezena D1/D2/D3, de Windsor + ZenPro)
- `saidas/` — documentos e entregas pontuais
- `dados/` — arquivos a analisar
- `scripts/` — automações e templates de código
- `templates/` — moldes reutilizáveis
- `holos-universit/` — código do site da Holos (React/Vite, criado no Lovable). Elis edita com Claude → GitHub (branch `Lovable-(elis)`) → PR pra `main` → deploy automático na Vercel. Usar `/site` pra atualizar o site e `/deploy` pra enviar alterações

## Sobre a empresa

A Holos Cursos e Terapias é uma empresa de educação terapêutica holística. Atua no mercado de saúde integrativa e bem-estar, atendendo dois públicos: (1) pessoas que buscam cura, autoconhecimento e bem-estar; (2) profissionais da saúde que buscam formação e certificação em terapias holísticas. A equipe tem 5+ pessoas com setores definidos.

## O que mais fazemos aqui

- Criação de conteúdo para redes sociais (carrosseis, legendas, posts)
- Relatórios e análises de desempenho
- Campanhas de captação de alunos e clientes
- Materiais de formação e atendimento
- Comunicações com alunos e potenciais clientes

## Tom de voz

Formal sem gírias, com credibilidade e ao mesmo tempo acolhedor. Como um terapeuta experiente — você se sente seguro e bem recebido, não pressionado. Evitar: jargões motivacionais, tom hype, linguagem clínica fria, excesso de emojis.

## Render de peças sociais (carrossel, capa de reel, story)

Workflow testado e operacional:
1. Subir servidor local: `python -m http.server 7823` na raiz do projeto
2. Renderizar com Python Playwright (não Node.js — `playwright` não está instalado pro Node):
```python
from playwright.async_api import async_playwright
# viewport 1080x1920, locator('.slide').screenshot()
```
3. Imagens que não têm proporção 9:16 devem ser pré-processadas com Pillow (`background-size: cover` via CSS não funciona no MCP browser)

> `scripts/gerar-capa.js` e `scripts/gerar-imagem.js` são legados (Node.js) — não funcionam, não usar.

## Ferramentas conectadas

- [ ] Notion
- [x] Gmail
- [x] Google Calendar
- [x] Google Drive
- [ ] Google Ads
- [ ] Meta Ads
- [ ] Google Analytics
- [x] Windsor.ai (agrega dados de Meta Ads, Google Ads, GA4 e outros)
- [x] Playwright (abre browser, tira screenshot, interage com sites)

*(Marcar conforme for instalando os MCPs)*

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é a Holos, o que faz, como funciona
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos
4. `_memoria/afazeres.md` — tarefas abertas e entregues do mês atual
5. `_memoria/agenda.md` — pendências de gestão da Elis (agenda com cobrança)

**Regra da agenda de gestão (`_memoria/agenda.md`):** quando Elis trouxer um assunto pra "não deixar cair no esquecimento", registrar lá com a data do pedido (e prazo, se ela definir). Lembrar as pendências abertas em toda abertura de sessão e quando o contexto tocar no assunto. **Nunca marcar item como resolvido por conta própria** — só quando Elis confirmar; aí mover pra "Resolvidas" com a data de execução.

Usar essas informações como base pra qualquer resposta ou decisão. Ao sugerir prioridades, formatos ou abordagens, considerar o foco atual descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar `identidade/branding-book.md` — a fonte única de identidade (cores, fontes, logo, modelos, voz). Roxo Holos #6D4C7F é a cor central, acento dourado #E6A028; fontes Inter (corpo), Poppins (títulos sociais) e Parisienne (cursiva de destaque).

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível, perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o padrão de repetição for claro.

---

## Aprender com correções

Quando a usuária corrigir algo, melhorar uma resposta ou dar uma instrução que parece permanente ("na verdade é assim", "não faça mais isso", "prefiro assim", "sempre que...", "evita...", "da próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro. Confirmar mostrando a linha adicionada.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill nova, mudança de foco, processo novo, ferramenta instalada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/branding-book.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando a usuária pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar o conteúdo da skill ao contexto da Holos
4. Se a skill precisar de arquivos de apoio (templates, exemplos), criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code
