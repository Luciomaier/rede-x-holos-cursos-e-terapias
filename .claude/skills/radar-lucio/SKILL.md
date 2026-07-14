---
name: radar-lucio
description: Verifica os commits novos do Lúcio no repo rede-x-holos-cursos-e-terapias e resume o que mudou nos processos (relatórios dezenais, Google Ads, governança). Usar quando Elis disser "/radar-lucio", "o que o Lúcio andou fazendo", "novidades do repo do Lúcio" ou antes de fechar relatórios que dependem dos números dele.
---

# /radar-lucio — Acompanhar o trabalho do Lúcio

Repo: `https://github.com/Luciomaier/rede-x-holos-cursos-e-terapias` (público, branch `main`).

## Workflow

1. Ler o último SHA registrado em `.claude/skills/radar-lucio/ultimo-commit.txt` (se não existir, considerar tudo como novo a partir de `abc0319`, de 13/07/2026).

2. Buscar commits novos via WebFetch:
   - `https://api.github.com/repos/Luciomaier/rede-x-holos-cursos-e-terapias/commits?per_page=30`
   - Se não houver commit novo desde o SHA salvo: responder "Nada novo do Lúcio desde a última verificação" e parar.

3. Pra cada commit novo, buscar o detalhe (`.../commits/<sha>`) e identificar o que mudou. Arquivos-chave a observar:
   - `marketing/painel.md` — estado geral, urgências (ex: saldo do Google)
   - `marketing/relatorios/*-relatorio-luciana.md` — fechamentos dezenais/mensais (números oficiais)
   - `marketing/relatorios/registro-otimizacoes.md` — mudanças em campanhas
   - `_memoria/estrategia.md` e `governanca/` — diretrizes da holding
   - `acordos/` — contratos e parcerias

4. Resumir pra Elis em 3 blocos, só com o que existe:
   - **Números novos** (matrículas, ROAS, leads masso)
   - **Decisões/processos novos** (réguas, otimizações, diretrizes)
   - **O que toca o trabalho da Elis** (conteúdo, site, demandas implícitas)

5. Atualizar `ultimo-commit.txt` com o SHA mais recente.

6. Se algo mudar prioridade ou processo permanente, sugerir atualizar `_memoria/estrategia.md` (seção "Gestão do Lúcio").

## Regras

- Repo do Lúcio é **somente leitura** — nunca commitar ou abrir PR lá pelo `main`. O trabalho da Elis vai pro branch `elis` (via `/salvar`).
- Não duplicar os números dele em arquivos locais além do resumo em `estrategia.md` — a fonte é o repo dele.
