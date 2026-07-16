# Google Ads — Holos (estado + histórico)

> Estado atual das campanhas Google e o histórico de decisões. Outputs de skills (CSVs do `/anuncio-google`, relatórios) ficam em subpastas datadas; este arquivo é o **estado vivo**.
> ← [Painel de Marketing](../painel.md) · Espelha o histórico do vault: `Projetos/Holos/Campanhas/Google Ads — Estratégia e Histórico.md`

---

## Campanhas ativas (**atualizado 16/07/2026** — Lucio confirmou na plataforma)

> 🚨 **ESTE ARQUIVO JÁ MENTIU DUAS VEZES.** Em 14/07 listava a PMax como pausada — estava rodando com
> 28 leads. Em 16/07 listava Quiropraxia e Desportiva como pausadas — **as duas estão ativas há dias**,
> ativadas pelo Lucio, entrando lead no ZenPro. **Não confiar neste registro sem cruzar com a plataforma.**
> A causa é estrutural: sem acesso ao Google Ads (Windsor.ai), o estado aqui é **memória**, não leitura.

| Campanha | Tipo | Budget | LP (URL final — **lido do Google Ads 16/07**) | Tracking real | Tag de conversão | Status |
|----------|------|--------|----|----------|------------------|--------|
| Masso Geral (PG_B) | Search | R$1.000/dia (teto) · gasta ~R$764 | `massoterapia-lp` (**HTML estático**) · **com UTM** | `GC-0hh1dj` ✅ 213 leads/30d | ✅ `AW-752011587` | ✅ **ATIVA** · Maximizar **Cliques** ⚠️ (o registro de tCPA de 23/06 nunca foi aplicado) |
| **Aurículo** | Search | ⚠️ a descobrir | `curso-de-auriculoterapia` · **com UTM** | `auriculo_google` ✅ 29 leads/30d — **NÃO é `GC-ab9924b9`** (esse morreu em 01/07) | 🔴 **ZERO** | ✅ **ATIVA** · resposta mediana **13,5h** 🔴 |
| **Massagem Desportiva** | Search | ⚠️ a descobrir | `desportiva-4x1` (estática) · 🔴 **SEM UTM** | 🔴 **nenhum** — o `IS-9iyrwz` que este registro citava é código de **INSTAGRAM** e nunca recebeu lead. Usar `GC-y5d7r7` | 🔴 **ZERO** | ✅ **ATIVA** — leads entram **sem código** |
| **Quiropraxia** | Search | ⚠️ a descobrir | `curso-livre-de-quiropraxia` · 🔴 **SEM UTM** | 🔴 **nenhum** — 5 códigos cadastrados, **todos com zero leads desde sempre** | 🔴 **ZERO** | ✅ **ATIVA** — nunca atribuiu na história da conta |
| **2 PERFORMAX MASSO** | PMax | ⚠️ a descobrir | — | `GC-DEFAULT` ✅ 42 leads/30d | — | 🔴 **RODANDO** — documentada como pausada (corrigido 14/07) |
| Locação de Salas | Search | R$25–50/dia | `salas-lp` | — | 🔴 zero | 🔵 Criar |

> 🔑 **A DESCOBERTA QUE EXPLICA TUDO (16/07, confirmada no código + no banco):**
> **O que carimba o lead é a `utm_campaign` do URL do anúncio — não o `#ref`.** As LPs estáticas leem
> `(#ref || utm_campaign || DEFAULT_REF)` e repassam pro `wa.me`. **O leitor já está instalado em todas.**
> As 2 campanhas com UTM (Masso, Aurículo) são exatamente as 2 que carimbam; as 2 sem UTM (Desportiva,
> Quiropraxia) são exatamente as 2 com zero código. **Não falta código — falta a UTM no anúncio.**
> Prova ao vivo em 16/07: 14:20 lead do aurículo entrou carimbado; **14:22** lead da quiropraxia entrou
> anônimo. Mesma estrutura, 2 minutos de diferença, a única variável é a UTM.
> **→ Correção da atribuição = 100% no Google Ads, ZERO código, sem deploy.**

**URLs finais lidos na plataforma (16/07):**
```
Masso ......... app.holoscursoseterapias.com.br/massoterapia-lp?utm_source=google&utm_medium=cpc&utm_campaign=GC-0hh1dj
Aurículo ...... app.holoscursoseterapias.com.br/curso-de-auriculoterapia?utm_source=google&utm_medium=cpc&utm_campaign=auriculo_google
Desportiva .... app.holoscursoseterapias.com.br/desportiva-4x1/            ← SEM UTM (colar: ?utm_source=google&utm_medium=cpc&utm_campaign=GC-y5d7r7)
Quiropraxia ... app.holoscursoseterapias.com.br/curso-livre-de-quiropraxia ← SEM UTM (escolher 1 dos 5 códigos; provável GC-kracz0)
```

> ⚠️ **A Desportiva tem 3 páginas do mesmo curso no ar** (verificado por HTTP em 16/07):
> `app.../desportiva-4x1/` (estática Vercel — **é a que o anúncio usa**, lê UTM, sem tag) ·
> `app.../curso-de-massagem-desportiva-4x1` (**React — não lê UTM, não tem tag**: hoje é a pior das três) ·
> `holoscursoseterapias.com.br/curso-de-desportiva-4x1/` (**WordPress/PHP** — sem tag do Google, **com pixel do Meta**).
> Lucio quer aposentar o WP e migrar pra React — **nessa ordem: primeiro o leitor de UTM + tag na React,
> depois trocar o URL, só então aposentar (com 301, não delete)**. Antes de tirar o WP do ar, checar se
> alguma campanha do **Meta** aponta pra ele — o pixel está lá e o Meta é o canal que funciona.

**Pausadas:** Massoterapia 15 dias, CP Ventura, CP M Desportiva.

> ⏫ **A urgência que isso cria (16/07):** há **verba correndo em 3 campanhas cujas LPs não têm tag de
> conversão nenhuma** (aurículo, desportiva, quiropraxia). É a mesma doença do achado nº1 na forma mais
> crua — lá o pixel ao menos dispara errado; **aqui não existe pixel.** Gasto virando lead sem nenhum
> sinal voltando pro Google, todo dia.

> 🔴 **PMax (14/07):** roda com o código `GC-DEFAULT` e fez **28 leads em julho** (resposta mediana de
> 70 min, vs 9 min do Search). O gasto dela **não entrou em nenhum cálculo de CPL/ROAS** da dezena.
> **Não pausar ainda** (volume que não dá pra repor com a meta em 11/50) — descobrir o gasto, excluir
> termos de marca, e reavaliar em **28/07** com o sinal limpo.

## Lógica de canal (decisão 09/06)

- **Google Search** = fundo de funil (alta intenção — "curso de massoterapia")
- **Meta** = topo de funil (descoberta — público frio)

## Regras de otimização (não violar)

1. Nunca pausar Masso Geral sem avaliar impacto direto nas matrículas
2. Escalar budget em degraus de 7–10 dias — não saltos
3. Display só reativar com público segmentado (remarketing), nunca broad
4. Nova campanha: testar R$25–50/dia por 7 dias antes de escalar
5. **Conversão = lead real (formulário ou WhatsApp), nunca micro-conversão**
6. **Auto-aplicar recomendações DESLIGADO** — em 18/06 (21:38) o Google reverteu sozinho Max Cliques → Max Conversões tCPA R$14,27 e estrangulou a campanha. Lance é decisão nossa, não do robô (ver [ciclo 09/06 → Rodada 2](../ciclos/2026-06-09-microconversoes-google-lp-react.md))

## Conversões — config atual (desde 09/06 · 🔴 auditada 14/07 · ✅ **verificada no código 16/07**)

- ✅ **Ativas:** Formulário de lead · Lead telefônico
- ❌ **Desativadas:** Engajamento · Ver rota · Compra *(micro-conversões — davam sinal sujo R$0)*
- 🔴 **Webhook ZenPro × Google Ads: DISPARA, MAS NÃO ATRIBUI** — ✅ **confirmado no código em 16/07.**
  O registro anterior dizia "✅ funcionando". Ele chama o **pixel de navegador** do Google
  (`googleadservices.com/pagead/conversion/`) **de dentro de uma edge function**, sem cookie e sem `gclid`.
  **A prova definitiva:** a URL leva `guid=ON`, que significa *"identifique pelo cookie do Google"* — e numa
  edge function **não existe cookie**. O Google recebe o hit e não tem a quem atribuir.
  *(`zenpro/supabase/functions/webhook-worker/index.ts:22-27`)*
- 🔴 **O GA4 tem a mesma doença** (novo, 16/07) — `index.ts:33` manda `client_id: <telefone>`. O `client_id`
  do GA4 tem que ser o cookie `_ga`. Com telefone, cada lead vira **usuário órfão sem sessão web**.
- 🔴 **O valor está fixo em toda parte** (novo, 16/07) — o webhook manda `value=1`; a LP manda `value: 250`.
  **Nunca o ticket real (R$2.585).** Mesmo se atribuísse, otimizaria pro número errado.
- 🔴 **O sinal que sobra pro Google (o da LP) está inflado ~1,8×** — dispara no **clique** que abre o
  WhatsApp, sem guarda de disparo único, `transaction_id` novo a cada clique.
  Google conta **150**; o ZenPro vê **84** leads reais.
  ✅ **Precisão 16/07:** o disparo está em **2 handlers** (`lm-skip` e submit do `lm-form`), **não nos 8 CTAs**
  — eles só abrem o modal. A inflação vem de reabrir o modal e converter de novo. **A correção é em 2 pontos.**
- 🔴 **Só 1 de 10 LPs tem a tag `AW-752011587`** (a `massoterapia-lp`) — e **3 das cegas estão com campanha
  ativa gastando agora** (aurículo, desportiva, quiropraxia).
- 🔴 **`gclid` = ZERO em todas as 10 LPs** — nenhuma captura. É o que trava o *offline conversion import*.

> Comparação que fecha o diagnóstico: o Meta recebe o lead pela **Conversions API oficial** (`graph.facebook.com/events`,
> telefone em `user_data.ph` — `index.ts:41-63`) e otimiza direito. **Por isso o lead do Meta custa R$19 e o do
> Google, R$91** — não é o canal, é o sinal.

## Próximos passos (ordem fechada em 14/07 — [auditoria](../relatorios/2026-07-14-auditoria-trafego-vazamentos.md))

1. [ ] **Guarda de disparo único na LP** + `transaction_id` estável por sessão — 🪟 **custa ZERO de
   aprendizado enquanto o lance for Max Cliques** (Max Cliques não usa o sinal de conversão)
2. [ ] **Instalar a tag nas 9 LPs cegas** — começar pelo Aurículo, que já gasta
3. [ ] **Ampliar palavras-chave** (leva 1: certificação/SINATEN + geo/turno) — **frase**, nunca ampla.
   **Sem verba nova**: gasta R$764 de R$1.000
4. [ ] ⏳ **Migrar o lance pra Max Conversões — só em 28/07**, e só se: tag limpa há ≥14d **E** conversões ≈
   leads reais (±15%) **E** ≥30 conversões limpas. **Sem tCPA** (se usar, o real ~R$91 — nunca os R$43 fantasma)
5. [ ] ♟️ **Offline conversion import** — capturar `gclid` na LP → ZenPro → subir pela **API do Google Ads**
   **com o valor da venda**. Faz o Google lançar em **faturamento** (ticket R$2.585), não em clique de botão
6. [ ] Fase 2 — Remarketing (visitantes não convertidos, listas Brevo, contatos ZenPro, lookalike de alunos)

> ⛔ **NÃO mexer no orçamento** — o teto (R$1.000) não é o freio; o gargalo é **alcance**.
> ⛔ **NÃO mexer no lance antes do sinal** — fora dessa ordem, julho leva **dois** resets de aprendizado.

---

*Histórico completo de decisões (22/04, 09/06): ver doc do vault linkado acima.*
