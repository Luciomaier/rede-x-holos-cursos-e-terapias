# 🛰️ Painel Holos — a central de verdade (referência)

> **O cérebro comanda, não contém.** O código do painel vive no repo do Nick
> (`nick638/painel-holos`, deploy `painel-holos.vercel.app`). Este arquivo é a
> janela do cérebro pra ele: status, decisões, pendências e a tabela de paridade.
> Quando mexer no painel, atualizar aqui **na mesma sessão**.
>
> **Atualizado:** 17/07/2026 · **Fase atual: 0 (acesso, segurança, fundação)**

## O que é

Dashboard único da Holos com IA como motor — vendas, leads, campanhas, avaliações,
site e caixa num lugar só, com o assistente "Cláudio" pra Elis usar sem precisar de
VS Code/Claude Code. Também é o protótipo do produto "IA sob medida" pra empresas.

**Acordo (16/07/2026, Lucio + Nick + Elis):**
- Claude assina o desenvolvimento, com diretrizes do Lucio, em equipe com o Nick
- **Nick foca em VENDER o EaD** — o painel não pode canibalizar a performance do resto
- **Este painel não é construído dentro do holos-connect** — ele é um hub separado que
  *conecta* as fontes

> **Precisão da regra (24/07/2026).** O que fica fora do Connect é **este painel — o
> painel novo do Nick**, o artefato. **Não são as pessoas:** Nick e Elis trabalham
> dentro do Connect, é a casa deles. A regra separa produto de painel, não gente de
> repositório.
>
> Consequência prática: o painel **interno** mora dentro do Connect — é a
> `/api/checagem` (PR #173).

### Os dois painéis, e para que serve cada um (24/07/2026)

| | **Painel do Nick** (fora) | **Painel interno** (dentro do Connect) |
|---|---|---|
| Dono | **Nick** — ele cuida, ele faz | Lucio (Claude executa) |
| Papel do Lucio | conectar dados e **pedir dados** nele | dono |
| Pergunta que responde | *como o negócio está indo?* | *a medição está certa, e o que otimizar?* |
| Serve pra | **relatórios pra Luciana**, quando estiver funcionando | checagem, correção e **otimização de campanhas e páginas** |
| Entrega | verdade de negócio | performance: ROAS, ROI, lucro **por campanha** |

**A linha entre os dois — é sutil e é ela que evita a deriva:**

- ✅ **Nosso pode** mostrar ROAS, ROI e lucro **de campanha e de página**. São
  instrumentos de decisão de mídia — é literalmente o trabalho do gestor de tráfego, e
  sem eles a bússola não aponta nada.
- ❌ **Nosso não pode** virar a fonte de **quanto a escola faturou/vendeu/tem em caixa**.
  Quando precisar de receita pra calcular ROAS, ela vem da **fonte canônica**
  (`marketing/painel.md` hoje, painel do Nick depois) — nunca calculada por fora e
  publicada como resultado da escola.

> Em uma frase: **medimos mídia para decidir; não emitimos o resultado da empresa.**
> Dois lugares emitindo receita = duas receitas diferentes em três semanas.

### Quem mexe em quê (mapa real da operação)

| Pessoa | O que faz no Connect |
|---|---|
| **Elis** | atualiza e cria páginas |
| **Nick** | mexe nas mesmas coisas + o painel dele |
| **Lucio** | o que está mais fundo no sistema |

> É por isso que **molde e detector valem mais que correção pontual**: quem mais toca nas
> páginas é justamente quem não enxerga a camada de tracking. Correção em arquivo é
> sobrescrita na próxima criação; no molde, sobrevive.

Demais assuntos do Connect seguem sendo tocados aqui, com segurança e controle.
- Windsor.ai contratado (plano Básico: Google Ads + GA4 + Meta Ads) como cano de dados
  — *reverte a decisão de 14–16/07 de "não assinar"; ver nota em
  [marketing/painel.md](../marketing/painel.md)*
- Usuária primária: **Elis**. Relatórios exportáveis pra **Luciana**.

## Onde mora (não mover pra cá)

- **Repo:** GitHub `nick638/painel-holos` — ⚠️ **inacessível em 17/07** (404 até
  autenticado como Luciomaier; privado sem colaborador ou nome diferente).
  **Pendência nº 1 do Nick: adicionar `Luciomaier` como colaborador.**
- **Deploy:** Vercel — `painel-holos.vercel.app`
- **Banco (a criar na Fase 0):** projeto Supabase **novo e dedicado** (`painel-holos`),
  na mesma conta — nunca dentro do holos-connect (`ijuhdov…`, produção congelada) nem
  do ZenPro (`wympymp…`, multi-tenant de terceiro)
- **Plano completo de implementação:** aprovado pelo Lucio em 17/07 (fases 0–4 com
  portão de avaliação antes e depois de cada fase — resumo abaixo)

## O protótipo hoje (análise de 17/07, feita a partir do deploy)

- HTML único artesanal (~183KB, **zero framework**), design system próprio **"AURORA"**
  (roxo #834AA3, Inter+Fraunces, tema claro/escuro). JS vanilla ~420 linhas.
- 8 telas: Visão Geral · Campanhas · CRM · Instagram · Google Meu Negócio · Meu Site ·
  Financeiro · Cláudio.
- Camada de dados ao vivo já desenhada: `apiGet()` com header `x-painel-key` (senha via
  modal → localStorage), badge "dados de exemplo" que some quando uma API responde,
  polling de 60s.
- **`/api/meta` JÁ retorna dados REAIS do Meta Ads** (5 campanhas: gasto hoje/mês,
  leads, CPL — em 17/07: R$ 8.154,74 no mês, 411 leads plataforma).
- `/api/dados` protegida (401 sem chave); pelo contrato do front, retorna leads das LPs
  (`leads_campanha` do Supabase do holos-connect) + vendas confirmadas.
- O chat "Cláudio" atual é **fake** (regex → respostas prontas). A UI de permissões do
  assistente (o que faz sozinho × o que exige aprovação) já está desenhada — vira o
  contrato do Cláudio real na Fase 3.

## 🚨 Incidente de segurança (aberto — prioridade máxima da Fase 0)

**`/api/meta` está SEM autenticação** — qualquer pessoa com a URL vê o gasto real da
Holos no Meta Ads (testado 17/07: HTTP 200 sem chave; `/api/dados` retorna 401 correto).

**Fix pronto pra aplicar assim que houver acesso ao repo** (mesma checagem nas 2 rotas):

```js
// api/_auth.js — compartilhado pelas rotas
export function requireAuth(req, res) {
  const key = req.headers['x-painel-key'] || '';
  if (!process.env.PAINEL_KEY || key !== process.env.PAINEL_KEY) {
    res.status(401).json({ erro: 'senha' });
    return false;
  }
  return true;
}
// em api/meta.js e api/dados.js: if (!requireAuth(req, res)) return;
```

Depois do fix: **rotacionar o token do Meta** nas env da Vercel (tratar como incidente,
mesmo sem evidência de vazamento). Checklist permanente: **toda rota nova nasce atrás
de auth.**

## Fases e portões (nada avança sem o Lucio aprovar o portão anterior)

| Fase | Entrega | Portão |
|---|---|---|
| **0 · Fundação** ⬅️ atual | Fechar `/api/meta` · rotacionar token · acesso ao repo · Supabase novo · docs da bancada | curl 401/200 · clone ok · Lucio+Nick revisam |
| **1 · Espinha de dados** | ETLs (Windsor diário · ZenPro 30–60min · planilha validada) → banco do painel · `/api/*` lêem do banco | Paridade linha a linha com `/painel-dezena` · Elis valida o "vendido" |
| **2 · Telas reais + login** | Visão Geral/Campanhas/CRM/Financeiro reais · **nenhum número sem rótulo de régua** · widget de reconciliação · magic link (Elis/Lucio/Nick) · quebrar o monolito em ES modules | Elis usa 1 dezena real — ela é o critério |
| **3 · Cláudio real** | API Anthropic, tool-use **somente leitura**, canons no system prompt, custo logado (~US$15–45/mês, teto em env) | 1 semana de uso · 20 conversas auditadas · revisão de custo |
| **4 · Relatórios + flip** | Relatório da dezena no canon da `/relatorio-luciana` · export PDF · 2 dezenas de paridade | **O flip:** decisão explícita do Lucio — só então `painel.md` vira histórico |

**Backlog (fase 5, sem compromisso):** GMB/avaliações · Instagram Graph · Sponte ·
ações do Cláudio (nas tabelas do painel, nunca no ZenPro) · WhatsApp.

## Réguas que o painel não pode violar

Fonte: [marketing/relatorios/README.md](../marketing/relatorios/README.md). Resumo:
capa da Lu = **VENDIDO** (planilha) · dezenas D1/D2/D3 incrementais · pipeline = ZenPro ·
atribuição 90 dias · **leads de plataforma ≠ leads ZenPro — reconciliar e rotular, nunca
misturar.** Exemplo real da armadilha: o `/api/meta` conta **411 leads de plataforma no mês**
(Meta-only, mês corrido, inclui estágio social e cursos livres); a régua ZenPro na Jul D1
contou **55 leads masso vindos do Meta/Insta** (janela 01–10, só masso). Comparar 411 com
qualquer número ZenPro exige alinhar **janela + canal + escopo** — é exatamente o que o
widget de reconciliação da Fase 2 faz; sem esse alinhamento, nenhum par de números pode
aparecer lado a lado · parse `#ref=` do ZenPro intocável · `marketing/painel.md` segue
canônico até o Portão 4.

## Pendências

**Nick (bloqueia a Fase 0 — timebox: horas, não dias):**
- [ ] Adicionar `Luciomaier` como colaborador em `nick638/painel-holos` (ou passar o nome certo do repo)
- [ ] Aplicar (ou deixar o Claude aplicar) o fix do `/api/meta` + deploy
- [ ] Rotacionar o token Meta na Vercel após o fix
- [ ] Criar o projeto Supabase `painel-holos` (vazio) na conta
- [ ] Inventariar env vars da Vercel (token Meta, `PAINEL_KEY`) — nada de credencial no client/git

**Lucio:**
- [ ] Confirmar quem paga o Windsor: Rede Publicidade ou Holos
- [ ] Aprovar o Portão 0 quando os itens acima fecharem

**Elis:**
- [ ] (Fase 1) Compartilhar a planilha Meta de Vendas com a service account (ou combinar o upload da dezena)

## Tabela de paridade (preencher por dezena a partir da Fase 1)

| Dezena | painel.md (manual) | Painel web | Paridade | Nota |
|---|---|---|---|---|
| — | — | — | — | — |

## Log de decisões

- **24/07/2026** — Precisada a regra do "fora": o que fica fora do Connect é **este
  painel** (o artefato), não as pessoas — Nick e Elis seguem trabalhando dentro.
  Definidos os dois painéis: o do Nick entrega **verdade de negócio** (e os relatórios
  da Luciana); o interno entrega **performance de mídia** (ROAS/ROI/lucro por campanha)
  para checar, corrigir e otimizar. O interno **pode** calcular ROAS; **não pode** virar
  a fonte do faturamento da escola — receita vem sempre da fonte canônica.
- **17/07/2026** — Plano de implementação aprovado pelo Lucio (fases 0–4, portões).
  Análise do protótipo feita a partir do deploy (repo inacessível). Detectado e
  registrado o incidente `/api/meta` aberto. Criada esta janela.
- **16/07/2026** — Acordo Lucio+Nick+Elis fecha o projeto. Windsor contratado (Básico).
  Decidido: hub separado, nada dentro do holos-connect; novas tabelas em projeto
  Supabase dedicado.
