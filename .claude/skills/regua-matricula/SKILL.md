---
name: regua-matricula
description: >
  Monta a régua de relacionamento D-7 / D-3 / D-1 de uma turma de massoterapia (email + WhatsApp)
  a partir da data de início e da modalidade, com urgência REAL (não fabricada) e no tom da Holos.
  Entrega 3 emails + 2 mensagens de WhatsApp prontos pra disparar.
  Use quando o usuário disser "monta a régua da turma X", "cadência de matrícula", "emails da turma",
  "regua-matricula", "/regua-matricula", ou for abrir/encher uma turma nova.
---

# /regua-matricula — Régua D-7 / D-3 / D-1 de uma turma

Gera a cadência completa de matrícula de uma turma — campanha sempre ativa pra formação em
massoterapia (canal completo). Não é um email avulso: é a sequência inteira calibrada por data.

## Dependências

- **Tom + cadência:** `_memoria/preferencias.md` (D-7/D-3/D-1, assunto direto + corpo curto, WhatsApp só D-3/D-1)
- **Contexto/provas:** `_memoria/empresa.md` (30 anos, SINATEN, 1.200h, 3 andares, estágio real)
- **Calibração de email:** reutiliza a lógica de `/email-profissional`
- **Disparo:** Brevo (email) + ZenPro (WhatsApp) — gerar pronto pra colar

---

## Inputs necessários
- **Data de início** da turma
- **Modalidade:** Integral (cartão/à vista) ou Mensalista (mensalidade)
- **Nome/identificação** da turma
- (opcional) preço/condição e link de matrícula

Se faltar algo, perguntar só o essencial — não travar a régua inteira por um detalhe.

## Workflow

### Passo 1 — Calcular as datas
A partir da data de início: D-7, D-3, D-1. Mostrar as datas reais de cada disparo.

### Passo 2 — Escrever os 3 emails
Cada um: **assunto direto + corpo curto**, assinatura "Luciana — Holos Cursos e Terapias".
- **D-7 (abertura):** reconhece a objeção real do público ("não tenho tempo") e responde com os
  formatos. Ancora no certificado (SINATEN, 1.200h) e no histórico. Sem urgência ainda.
- **D-3 (prova + aproximação):** prova social (ex-alunos que atuam, estágio supervisionado com
  atendimentos reais). Começa a urgência real (vagas/data).
- **D-1 (urgência real):** última chamada — urgência ancorada na data verdadeira, não fabricada.
  CTA direto pra matrícula.

### Passo 3 — Escrever os 2 WhatsApps (ZenPro)
Canal íntimo → só **D-3 e D-1**, mensagens curtas e humanas. Sem cara de disparo em massa.

### Passo 4 — Ajustar à modalidade
- **Integral:** foco no certificado completo + condição à vista/cartão.
- **Mensalista:** foco em acessibilidade (mesma grade, mesmo certificado, parcelado) — é o gargalo
  histórico, então a régua mensalista trabalha a objeção de custo de frente.

### Passo 5 — Entregar pronto
Listar os 5 ativos (3 emails + 2 WhatsApps) com data de disparo de cada, prontos pra colar no
Brevo/ZenPro.

## Regras

- **Urgência real, nunca fabricada** — ancorar em data/vagas verdadeiras.
- Tom Holos: acolhe e orienta, não "vende". Autoridade pelo histórico, não por jargão.
- Evitar linguagem corporativa fria e promessas genéricas (ver `preferencias.md`).
- WhatsApp só D-3 e D-1, com moderação. Email pode os 3 toques.
- Módulo interno da grade ≠ campanha externa — esta skill é só pra captação de turma (público novo/base).
- Emojis moderados.
