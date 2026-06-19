# ⚙️ Automações de Marketing — Holos

> Backlog e estado das automações de lead (captura → confirmação → nutrição → conversão).
> ← [Painel de Marketing](painel.md)

---

## 🔴 URGENTE — Confirmação de email + sequência de nutrição

**Registrado:** 19/06/2026 (Lucio)
**Origem:** os leads de **formulário** das LPs caem no Supabase (`leads_campanha`) e hoje **ninguém trabalha essa lista** — quem dá email mas não manda o WhatsApp fica parado. Ver [landing-pages.md](campanhas/landing-pages.md).

### O que construir

1. **Confirmação de email em background (paralelo)** — quando o lead preenche o form (nome+email → Supabase), validar/confirmar o email **em segundo plano, sem travar** o fluxo da pessoa pro WhatsApp. (double opt-in / checagem de email válido)
2. **Disparar a sequência** — depois do email confirmado, entrar numa **sequência automática de nutrição** (provável: Brevo).
3. **Breaks (gatilhos secundários de saída)** — a sequência precisa de **condições de interrupção**: quando a pessoa avança (ex: respondeu no WhatsApp / iniciou conversa no ZenPro, matriculou, virou aluno), dispara um **break** que pausa ou encerra a sequência — pra não continuar nutrindo quem já converteu ou já está em atendimento.

### Componentes envolvidos

- **Captura:** Supabase `leads_campanha` (repo holos-connect)
- **Email:** Brevo (confirmação + sequência)
- **Gatilhos de saída:** ZenPro (conversa iniciada) · matrícula (Sponte / Asaas)

⚠️ **Atribuição não pode se perder:** a `utm_campaign`/Ref (ex: `IS-9iyrwz`) tem que **viajar Supabase → Brevo** junto com o lead — senão a sequência de nutrição perde a origem e não dá pra medir qual campanha gerou a matrícula.

### 🧭 Onde mora (resolve o impasse cérebro × holos-connect)

- **Sistema (código):** construído no repo **holos-connect** — ele é dono da implementação (Supabase trigger → confirmação → Brevo → breaks).
- **Tracking log (este arquivo):** backlog, decisões e status vivem aqui no cérebro — a memória que **não se perde** quando o código muda/deploya. Espelhado no backlog de [produto/holos-connect.md](../produto/holos-connect.md).
- Regra do cérebro: *"comanda, não contém"* — código lá, decisão/log aqui, os dois apontando um pro outro.

### Decisões a tomar

- [ ] Ferramenta da sequência: Brevo nativo (automation) ou fluxo custom?
- [ ] Quem escreve o conteúdo dos emails da sequência
- [ ] Mapear os **breaks**: quais eventos pausam/encerram (resposta WhatsApp, matrícula, descadastro…)
- [ ] Responsável técnico: **Nick** (Supabase → Brevo) + **Lucio** (estratégia/conteúdo)

**Status:** 🔴 A iniciar
