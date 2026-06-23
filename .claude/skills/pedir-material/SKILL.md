---
name: pedir-material
description: >
  Gera os prompts/mensagens prontos pedindo ao Nick e à Elis o material que falta pra fechar um
  entregável (dezena, relatório, campanha) — cada um recebe exatamente o que precisa entregar, no
  canal certo, sem rodeio. Junta a parte deles com a do Lucio.
  Use quando o usuário disser "pede o material pro Nick e pra Elis", "preciso dos números da Elis",
  "manda o pedido pro time", "pedir-material", "/pedir-material", ou antes de rodar /painel-dezena
  ou /relatorio-luciana sem ter os dados em mãos.
---

# /pedir-material — Pedido de material pro time (Nick + Elis)

Antes de fechar um entregável, falta input de outras pessoas. Esta skill gera a mensagem certa pra
cada um — específica, curta, com prazo — pra o Lucio só copiar e enviar.

## Dependências

- **Quem faz o quê:** `_memoria/empresa.md` / `CLAUDE.md` (setores e responsáveis)
  - **Elis (COO):** financeiro, matrículas, planilha Meta Mês, recepção/pedagógico, Instagram
  - **Nick (infra/Rede):** automações, LPs, webhooks, Supabase→Brevo, tracking
- **Tom:** `_memoria/preferencias.md` (direto e humano)
- **Destino do material:** alimenta `/painel-dezena` e `/relatorio-luciana`

---

## Workflow

### Passo 1 — Definir o entregável-alvo
Pra que é o material? (fechar a dezena, relatório pra Luciana, subir campanha…). Isso define o que pedir.

### Passo 2 — Mapear o que falta de cada um
- **Da Elis:** matrículas da dezena por tipo (Integral/Mensalista), faturamento realizado (snapshot
  da planilha Meta Mês), e o que mais o entregável exigir.
- **Do Nick:** o que for técnico/atribuição — status de webhook ZenPro→Google, tracking das LPs,
  números de automação/Brevo, deploy de LP.
- **Do Lucio (a parte dele):** o que ele já tem (números de tráfego via Windsor, estado das campanhas)
  — listar pra deixar claro o que se junta com o que o time mandar.

### Passo 3 — Escrever as mensagens
Uma mensagem por pessoa: saudação curta + lista objetiva do que precisa + **formato** desejado
(ex: "manda só os 2 números: matrículas Integral e Mensalista da dezena") + **prazo**. Tom humano,
sem burocracia. Pronta pra colar no WhatsApp/email.

### Passo 4 — Entregar
Mostrar as mensagens separadas (Nick / Elis) + uma nota de "o que você junta quando voltar" — o
encaixe entre o material deles e o do Lucio.

## Regras

- **Específico e curto:** pedir o número exato, não "me manda os dados". Quanto mais fácil de responder, mais rápido volta.
- Sempre com prazo (ancorado na dezena/fechamento).
- Pedir só o que falta — não recriar o que o Lucio já tem.
- Respeitar o papel de cada um (não pedir número de tráfego pra Elis nem matrícula pro Nick).
- Deixar explícito como o material deles se junta com o do Lucio pra fechar o entregável.
