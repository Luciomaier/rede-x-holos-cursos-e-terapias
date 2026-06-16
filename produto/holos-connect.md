# 🎓 Holos Connect — Plataforma EAD (referência)

> **O cérebro comanda, não contém.** O código do Connect vive isolado em
> `../holos-connect/` (740MB, repo próprio, Lovable + Vercel). Este arquivo
> é a janela do cérebro pra ele: status, links e backlog. Quando mexer no
> produto, atualizar aqui.
>
> **Atualizado:** 15/06/2026

## O que é

Plataforma EAD própria da Holos — onde o aluno consome a formação online
(aulas, turmas, estágios, quizzes, certificados). É a **entrega** do que o
marketing do cérebro vende. Co-donos: Lucio + Luciana.

| Indicador | Valor |
|---|---|
| Alunos ativos | ~460 |
| Status | Produção — **modo proteção** (features congeladas) |
| Rotas / Tabelas | ~60 / ~50 |
| Módulo financeiro | Mockado — controle real no ERP (Sponte) |

## Onde mora (não mover pra cá)

- **Código:** `../holos-connect/`
- **Repo:** GitHub `Luciomaier/holos-universit` (Lovable conectado)
- **Deploy:** Vercel Pro (Ignored Build Step configurado)
- **Backend:** Supabase (PostgreSQL, Auth, 8 Edge Functions, RLS)
- **Pagamentos:** Asaas (PIX / cartão / boleto)
- **Doc técnica completa:** `../holos-connect/README.md`

## Backlog priorizado (do README técnico)

| Pri | Item | Impacto |
|---|---|---|
| 🔴 | Resolver appeal Meta — página SPA Escola Holos | Desbloqueia anúncios |
| 🔴 | Corrigir ad set inválido campanha CTV02/FORMAÇÃO | Evita perda de verba |
| 🟠 | Rate limiting nas Edge Functions públicas | Segurança |
| 🟠 | Ativar Leaked Password Protection (Supabase Auth) | Segurança |
| 🟡 | Integrar módulo financeiro real (tirar do mock) | Controle |
| 🟡 | Expandir catálogo de cursos EAD | Receita |

## ⚠️ Pendência de segurança

O remote git do Connect tem um **token do GitHub exposto em texto puro**
na URL (`ghp_...`). Revogar no GitHub e reconfigurar o remote via
gerenciador de credenciais.

## Como o cérebro se conecta ao Connect

Marketing (cérebro) capta lead → ZenPro/campanha → matrícula → aluno
consome dentro do Connect. Os números de matrícula no `marketing/painel.md`
são o topo desse funil; o Connect é a entrega na ponta.
