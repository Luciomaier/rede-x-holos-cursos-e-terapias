# Esteira de e-mail — conversão da lista opt-in (Holos / Brevo)

> Brief pra o Nick executar na Brevo. Objetivo: nutrir quem entra na lista opt-in nova e
> levar pra **matrícula na Formação**, rodando **junto com o funil de WhatsApp (PulsarZap)**
> sem sobrepor. Criado 10/07/2026.

## A sequência (evergreen — dispara quando o lead entra na lista)

| # | Quando | Função | CTA |
|---|---|---|---|
| 0 | Na hora | Entrega a isca + boas-vindas (expectativa: "vou te mandar X nos próximos dias") | Consumir a isca |
| 1 | D+1 | Autoridade da Holos (por que confiar) + reforça a aula/isca | Assistir |
| 2 | D+2 | A transformação (nova profissão / renda / propósito) + **prova social** (aluno que virou massoterapeuta) | Engajar |
| 3 | D+3 | Quebra de objeção ("não tenho tempo / idade / experiência") — como a Formação resolve | Engajar |
| 4 | D+4 | **A OFERTA** — a Formação (o que inclui, certificação, formato) + escassez se tiver turma | **Matrícula** |
| 5 | D+5 | Urgência / FAQ / última chamada | **Matrícula** |
| — | Depois | Nutrição contínua 1×/semana pros que não fecharam → re-oferta na próxima turma | — |

## Gatilhos / tags (a lógica pro Nick montar)
- **Entrou na lista** → dispara a sequência.
- **Clicou no CTA de matrícula e não comprou** → tag `quente` → joga pro **WhatsApp humano** (PulsarZap).
- **Comprou** → sai da esteira, tag `aluno`.
- **Não abriu** → reenvia com outro assunto (resgatar não-abridores).

## Integração e-mail × WhatsApp (não repetir)
- **E-mail (Brevo):** nutre e educa (autoridade, história, objeção).
- **WhatsApp (PulsarZap):** qualifica e fecha (humano no lead quente).
- Coordenar pra não bater a mesma mensagem nos dois canais.

## O que falta o Lucio confirmar (pra escrever os textos)
1. **A isca exata** do opt-in (o que a pessoa recebe ao entrar — aula grátis? série de vídeos? ebook?).
2. **A oferta:** a Formação — preço, formato, e se tem **turma com data** (escassez real) ou é contínua.
3. **Aula ao vivo/webinar** no meio do funil, ou é **VSL evergreen**?
4. **Deadline** da oferta (o que cria a urgência do e-mail 5).

## O que o Nick faz
- Monta o fluxo de automação na Brevo com os gatilhos/tags acima.
- Confirma o **sync opt-in → Brevo** (a tabela `leads_campanha` já sincroniza — validar que está caindo na lista certa).
- Alinha com o **PulsarZap** pra e-mail e WhatsApp não sobreporem.

## Próximo passo
Os **textos dos 6 e-mails** o Claude escreve (com a copy no tom da Holos) assim que os 4 pontos acima estiverem travados.
