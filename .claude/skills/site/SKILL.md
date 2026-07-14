---
name: site
description: >
  Atualiza o site da Holos (holos-universit/ — React/Vite, deploy Vercel).
  Use quando a Elis disser "/site", "atualizar o site", "mudar data de curso no site",
  "trocar turma", "atualizar cronograma" ou pedir qualquer alteração em página do site.
---

# /site — Atualização do site da Holos

Fluxo completo: preparar a branch → editar → conferir visualmente → enviar com `/deploy`.

## Contexto fixo

- Código em `holos-universit/` (React + Vite + TypeScript). Ler o `holos-universit/CLAUDE.md` antes de começar.
- Elis trabalha na branch `Lovable-(elis)`. Nunca fazer push direto na `main`.
- Deploy é automático na Vercel quando o PR entra na `main`.
- Produção: holoscursoseterapias.com.br

## Mapa das páginas que a Elis mais mexe

| O que ela pede | Onde fica |
|---|---|
| Cronograma / agenda de cursos, datas de turmas | `src/pages/TodosOsCursos.tsx` |
| Página de um curso específico | `src/pages/Curso*.tsx` (ex.: `CursoMassagemDesportiva4x1.tsx`, `CursoDeTaroTerapeutico.tsx`) |
| Formação presencial / EAD | `src/pages/FormacaoMassoterapia.tsx` / rota `/formacao-ead` |
| Home | `src/pages/Index.tsx` / `NovaHome.tsx` |
| LP estática Auriculoterapia | `public/curso-de-auriculoterapia/index.html` |

Se o pedido não estiver no mapa, procurar com Grep pelo texto visível da página (título do curso, frase do botão etc.).

## Workflow

### 1. Entender o pedido
Confirmar em uma frase o que muda (curso, datas, textos, destaque). Se a Elis já disse tudo, não perguntar de novo.

### 2. Preparar a branch
```
git checkout "Lovable-(elis)"
git pull origin "Lovable-(elis)"
git fetch origin main
```
Se `Lovable-(elis)` estiver atrás da `main` (outros PRs entraram), fazer `git merge origin/main`. Se der conflito, parar, descrever o conflito e perguntar — nunca resolver sozinho conflito com trabalho do Nick ou do Lúcio.

### 3. Editar
- Seguir o padrão que já existe no arquivo (ex.: chips laranja para turmas semipresenciais, formato de data das outras turmas).
- Turma que já passou: remover ou substituir pela próxima, conforme o pedido.
- Não inventar preço, data ou professor — se faltar informação, perguntar.

### 4. Conferir visualmente
```
npm run dev
```
Abrir a página alterada com o Playwright (browser MCP), tirar screenshot e mostrar pra Elis confirmar antes de enviar. Se o dev server não subir, rodar `npm install` primeiro.

### 5. Enviar
Com o visto da Elis, rodar a skill `/deploy` (commit + push na `Lovable-(elis)` + link do PR).

## Regras

- Alteração pontual de conteúdo (datas, textos, imagens) — não refatorar componentes nem mexer em área admin/checkout sem pedido explícito
- Uma tarefa por vez: se a Elis pedir várias mudanças, listar e ir confirmando por página
- Ao terminar, se a mudança afetar contexto do negócio (curso novo, turma nova importante), lembrar de atualizar `_memoria/estrategia.md`
