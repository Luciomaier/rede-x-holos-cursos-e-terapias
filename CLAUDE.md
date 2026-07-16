# MazyOS — Sistema operacional do negócio

Sua empresa roda em cima desse arquivo. Aqui ficam as regras de operação
do MazyOS — como o Claude lê o contexto, aprende com correções, mantém
tudo atualizado e cria skills novas conforme a operação evolui.

Esse arquivo é editável. Quando o `/instalar` rodar, ele complementa o
final dessa página com as regras específicas do seu negócio.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code

---

# Holos — Espaço de Cursos e Terapias

> Perfil **Empresa**. Operação estruturada em setores, várias frentes
> rodando juntas. O sistema gira em torno de organização interna e fluxo
> entre áreas.

## O que é esse workspace

Operação da Holos — a maior escola de massoterapia do Brasil (~30 anos,
prédio próprio de 3 andares em Vila Mariana, SP). Cada setor tem sua área,
com processos, entregas e documentos.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual
- `acordos/` — acordos e contratos vivos (parceria Rede×Holos, etc.) — fonte da verdade
- `governanca/` — documentos fundadores da estrutura (atas, organograma, plano dos 3 pilares). Origem da pasta `holos-forms`, absorvida em 15/06/2026
- `produto/` — camada de referência dos produtos/software que o cérebro comanda mas não contém (ex: `holos-connect.md`). O código vive isolado em pastas-irmãs; aqui ficam status, links e backlog
- `identidade/` — marca aplicada em tudo que o sistema gera (logo, design-guide)
- `marketing/` — campanhas, conteúdo, mídia paga, relatórios + `painel.md` (dashboard de números) e `ciclos/` (experimentos)
- `dados/` — arquivos a analisar
- `saidas/` — documentos pontuais (inclui `entregabilidade-historico/`, digests resgatados do antigo holos-workspace)
- `scripts/` — utilitários Node/Python que as skills chamam (gerar imagem, render PNG, postar em rede social)
- `templates/` — moldes de skills, perfis e identidade

## Sobre a empresa

Holos é uma escola de massoterapia e terapias complementares. Atuamos em
formação profissional (curso de massoterapia 1.200h, certificado SINATEN)
e cursos livres, atendendo pessoas em transição de carreira e terapeutas
em formação. Operação presencial em SP + EAD (Holos Connect, ~1.000 alunos).

## Setores e responsáveis

- **Presidência:** Luciana Maier — decisão final, estratégia, preços, conteúdo
- **Operações (COO):** Elis Augaitis — RH, financeiro, recepção, pedagógico, Instagram
- **Comercial:** Leonardo + Laura (formação), Giovanna (cursos livres) — Mongaguá
- **Financeiro:** Sônia — cobrança, conciliação, NF
- **Recepção/Pedagógico:** Adriana (coringa, CLT), Bruna, Mayara
- **Tecnologia + Tráfego:** Lucio (tráfego, plataformas, estratégia) + Nick (infra, automações, LPs) — via Rede Publicidade

## O que mais fazemos aqui

- Campanhas de matrícula de massoterapia (email + WhatsApp + tráfego pago, cadência D-7/D-3/D-1)
- Conteúdo de Instagram, Reels e YouTube
- Landing pages para modalidades e novos produtos
- Relatórios de tráfego pago (dias 10/20/30)
- Reativação da base de ex-alunos

## Tom de voz

Próximo, humano e direto — acolhe e orienta, não "vende". Autoridade pelo
histórico (30 anos, SINATEN), não por jargão. Detalhes em `_memoria/preferencias.md`.

Evitar: linguagem corporativa fria, promessas genéricas, tom acadêmico.

## Regras do sistema

- **Núcleo de marketing (números, ROAS, campanhas, conversões):** `marketing/painel.md` é o dashboard — começar por ele. Estado das campanhas em `marketing/campanhas/`, mudanças/experimentos em `marketing/ciclos/`. Metas oficiais ficam no acordo (`acordos/rede-publicidade/acordo-rede-holos.md` → "Números oficiais"); o painel mostra realizado vs meta
- Campanhas e conteúdo salvar em `marketing/`
- Relatórios de tráfego em `marketing/relatorios/`
- **Acordos e contratos (vivos/permanentes) em `acordos/`** — cada parceria com pasta própria e um documento mestre (fonte da verdade). Não usar `saidas/` para isso
- Documentos pontuais em `saidas/`
- Arquivos para análise em `dados/`
- Recomendações para a Luciana = sempre acompanhadas de dados/números
- O acordo Rede Publicidade × Holos vive em `acordos/rede-publicidade/` — fonte da verdade dos R$13.500/mês

## Ferramentas conectadas

- [ ] Notion
- [x] Gmail (holos.site@gmail.com)
- [ ] Google Calendar
- [x] Google Ads — conectado via Windsor.ai (conta "Holos Geral" 644-631-5099), puxa gasto/conversões/leads reais
- [x] Meta Ads
- [ ] Slack
- [x] Brevo · [x] Sponte · [x] ZenPro (CRM operacional · PulsarZap fora do circuito agora · **leitura direta no banco Supabase**: usuário `claude_readonly`, credencial `dados/.env.zenpro`, guia `dados/zenpro-acesso-leitura.md`) · [x] Holos Connect

*(Marcar conforme for instalando os MCPs)*

## 🧭 Onde a Holos vive (mapa único — 16/07/2026)

> Se bater a sensação de "estou em qual pasta mesmo?", é este bloco que responde.
> **Esta pasta é a bancada do Lucio. Tudo de Holos começa aqui.**

A Holos aparece em mais de um lugar porque o **Lucio tem 3 papéis diferentes com
a mesma empresa** — não porque a estrutura está bagunçada:

| Onde | Papel do Lucio | Quem opera | Serve pra quê |
|---|---|---|---|
| **AQUI** (`holos-cursos-terapias/`) | **sócio da escola** (com a Luciana) | Lucio | tudo: tráfego, campanhas, relatórios, acordos, governança |
| `../holos-connect/` | dono do produto (50% do EaD) | **Nick + Elis** (via Lovable) | código do app + LPs. Janela: [produto/holos-connect.md](produto/holos-connect.md) |
| `../rede-publicidade/clientes/holos/` | fornecedor (a agência) | ninguém — **pasta vazia** | só uma placa apontando pra cá (colapsada em 16/07) |

- **`rede-publicidade/clientes/holos/` foi esvaziada em 16/07/2026.** Existiu de
  17/06 a 16/07 e nunca foi usada — 100% da operação sempre aconteceu aqui. Custou
  caro: o achado *"gclid não é capturado"* (17/06) ficou órfão lá e foi
  **redescoberto do zero na auditoria de 16/07**. Não recriar sem contrato assinado.
- O **contrato Rede×Holos** (R$13.500/mês) segue com fonte da verdade em
  `acordos/rede-publicidade/`.
- O Lucio costuma trabalhar com a sessão aberta no `rede-publicidade/` — o Claude
  lê e escreve aqui a partir de lá. São **repositórios git separados**: trabalho
  feito aqui precisa de commit/push aqui.

### ⚠️ A doença a vigiar: deriva, não duplicação

O risco desta operação **não** é ter pasta duplicada — é o mesmo fato ser descrito
em vários lugares e **derivar** até se contradizer. Casos reais já pegos:

| Fato | Um lugar diz | Outro diz |
|---|---|---|
| gclid nas LPs | achado em 17/06 | "achado novo" em 16/07 |
| alunos do EaD | `produto/`: ~460 | este CLAUDE.md: ~1.000 |
| status do Connect | `produto/`: features congeladas | diretriz 05/07: exceção de crescimento |

**Regra:** ao descobrir algo sobre tráfego/tracking, gravar em UM lugar só —
`marketing/relatorios/log-google-ads.md` (o log vivo; ler ele antes de reabrir
qualquer investigação de ads). Ao mexer no produto, atualizar `produto/holos-connect.md`
**na mesma sessão** — janela desatualizada é pior que janela inexistente.

### O site é 3 stacks em 2 domínios (não confundir)

| Domínio | Stack | Onde mora | Tracking |
|---|---|---|---|
| `holoscursoseterapias.com.br` | **WordPress/PHP** | ⚠️ **em pasta nenhuma** | sem tag Google · com Pixel Meta · roda CRM `crm-api.eb4us.com` |
| `app.holoscursoseterapias.com.br` | HTML estático | `holos-connect/public/` | 10 LPs, todas carimbam `#ref` · só 1 tem tag de conversão |
| `app.holoscursoseterapias.com.br` | **React** | `holos-connect/src/` | 46 páginas · **atribuição zero** |

⚠️ O WordPress está **vivo** e seu CRM faz request real a `googleads.g.doubleclick.net`
— pode existir rota de conversão server-side por gclid. **Checar antes de colar gtag
nas LPs, sob risco de contar conversão em dobro.** (Origem: `marketing/relatorios/2026-06-17-fix-tracking-google.md`.)
