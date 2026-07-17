# Plano — Sair do WordPress (decidido 16/07/2026)

> **Decisão do Lucio (16/07):** o WordPress sai. **O site vai pro domínio principal**
> (`holoscursoseterapias.com.br`), não fica no `app.`.
> **Status:** preparado em 16/07 · **execução começa 17/07** · executor: Nick (Lucio decide)
> ← [Painel de Marketing](../painel.md) · Log de ads: [log-google-ads.md](../relatorios/log-google-ads.md)

---

## 1. A linha que organiza tudo: **a venda**

Não decorar regra de pasta. Decorar esta linha:

| | Antes da venda | Depois da venda |
|---|---|---|
| **Pessoa** | lead | aluno |
| **Site** | `holoscursoseterapias.com.br` (site novo, SSG) | `app.holoscursoseterapias.com.br` (Connect) |
| **Sistema** | ZenPro (CRM) | Holos Connect (EAD) |
| **Pasta** | `holos-cursos-terapias/` (bancada do Lucio) | `holos-connect/` (Nick + Elis) |

Tudo que cruzar essa linha é bug de arquitetura. Exemplos vivos hoje:
`leads_campanha` (tabela de lead dentro do produto), cursos servidos pelo `app.`,
páginas de curso duplicadas nos dois domínios.

## 2. Por que o domínio principal (e não o `app.`)

1. **SEO de 30 anos mora no apex e não é transferível.** Subdomínio é site quase
   separado pro Google. As 285 URLs se reescrevem; o histórico do domínio não se recompra.
2. **`app.` é endereço de software.** Aluno caindo em `app.…/curso-de-auriculoterapia`
   paga pedágio de confiança em toda venda.
3. **Hoje há duas escolas competindo entre si** pelo mesmo Google (ver §4).

## 3. Terreno (levantado ao vivo em 16/07)

| | Domínio principal | App |
|---|---|---|
| Host | **177.93.106.42** — Núcleo Brasil Servidores (compartilhado) | **Vercel** (`216.150.1.129`) |
| Stack | WordPress 6.8.5 · PHP 8.2.30 · Elementor · WooCommerce | Vite+React SPA + HTML estático em `public/` |
| `www` | mesmo IP do apex | — |

**Conteúdo do WordPress — 285 URLs:**

| Tipo | Qtd |
|---|---|
| Páginas | 146 (98 são de curso) |
| Produtos (Woo) | 74 |
| Posts (blog) | 63 |
| **Total** | **285** |

Loja Woo: `/loja/`, `/carrinho/`, `/finalizar-compra/` → **404**. Produtos existem no
sitemap mas a frente de loja está desligada. **Confirmar com a Elis antes de matar o Woo.**

## 4. 🔴 Minas terrestres (checar ANTES de mexer)

**(a) Campanha ativa apontando pro WordPress.**
A auditoria de 14/07 diz: *"3 das cegas estão com campanha ATIVA gastando agora —
aurículo, desportiva, quiropraxia"*. E estas URLs do WP estão **vivas (HTTP 200)**:
`/curso-de-desportiva-4x1/` · `/curso-de-auriculoterapia/` · `/massoterapia-presencial-g/`
→ **Se o WP cair e a campanha apontar pra lá: anúncio → 404 → verba queimada + Quality
Score afunda.** Mesma família do acidente de 09/06.
**Ação 0:** confirmar no Google Ads o *final URL* de cada campanha ativa.

**(b) Páginas duplicadas nos dois domínios** (canibalização de SEO + ambiguidade de tracking):

| Curso | WordPress | App |
|---|---|---|
| Auriculoterapia | `/curso-de-auriculoterapia/` → 200 | `/curso-de-auriculoterapia` → 200 |
| Desportiva 4x1 | `/curso-de-desportiva-4x1/` → 200 | `/desportiva-4x1` → 200 |

**(c) Scripts podres no `<head>` do WP** (inline, linha ~99 — **não vêm de plugin**):
- `crm-api.eb4us.com/js/tracking.min.js` — **Builderall** (id `bacrmtrk`, `__baCRMTracking.init`,
  cKey `493c8b3821e768713a4d1c5b1e7f5ad4`). Plataforma **abandonada** (Lucio, 16/07).
  ⚠️ Faz request real a `googleads.g.doubleclick.net` → **pode já mandar conversão pro Google.**
  **Colar gtag nas LPs sem checar isso = contar conversão em dobro** → lance smart infla e gasta mais.
- Pixel do **TikTok** — ninguém documentou.
- **Google AdSense** `ca-pub-9521104886250024` — tag de quem *exibe* anúncio de terceiro.
  Na home da escola. Provavelmente resto de era antiga.
- Zero tag de conversão do Google. Plugin `cookie-law-info` (LGPD) pode bloquear disparo.

## 5. ⚠️ Decisão de stack (antes do Nick começar)

O `holos-connect` é **SPA (Vite+React)** — exatamente o que produziu as **46 páginas React
sem atribuição e sem SEO**. **Jogar as 98 páginas de curso dentro do SPA recria a doença
no domínio principal, no dobro do tamanho.**

→ Site novo deve ser **estático/SSG (Astro ou Next)**, projeto Vercel separado do app.
Decisão técnica é do Nick; o Lucio precisa saber que a escolha existe.

## 6. Execução — estrangulamento (nada quebra no dia 1)

Padrão *strangler fig*: põe o Vercel na frente e o WordPress vai encolhendo.

**Fase 0 — Blindar (antes de tudo)**
- [ ] Confirmar no Google Ads o final URL de cada campanha ativa (mina 4a)
- [ ] Descobrir se o eb4us manda conversão pro Google (mina 4c) — decide se pode pôr gtag
- [ ] Confirmar com a Elis: WooCommerce vende alguma coisa hoje? (74 produtos, loja 404)
- [ ] Backup completo do WP (arquivos + banco) antes de qualquer alteração

**Fase 1 — Parar o sangramento (dá pra fazer já, site fica no ar)**
- [ ] Arrancar do `<head>`: eb4us/Builderall, TikTok, AdSense
- [ ] Congelar o WP: proibido criar página nova lá. Tudo novo nasce no site novo.

**Fase 2 — Vercel na frente**
- [ ] Criar `legado.holoscursoseterapias.com.br` → A `177.93.106.42` (WP segue vivo, muda de porta)
- [ ] Adicionar `holoscursoseterapias.com.br` + `www` no projeto Vercel do site novo
- [ ] `vercel.json`: rewrite catch-all → `https://legado.holoscursoseterapias.com.br/:path*`
- [ ] Apontar apex + www pro Vercel
- ✅ **Resultado: as 285 URLs continuam no ar, campanha continua chegando, zero 404.**
  Mas o domínio principal já é Vercel.
- ⚠️ Cuidados: manter `/wp-admin` só via `legado.` · formulários do WP com POST precisam
  de teste · WP gera URL absoluta (proxy resolve, mas conferir)

**Fase 3 — Migrar por dinheiro, não por ordem alfabética**
Prioridade: (1) páginas com campanha ativa · (2) páginas com tráfego orgânico real
(puxar do Search Console) · (3) o resto.
- [ ] Cada página migrada nasce com: tag de conversão `AW-752011587`, captura de **gclid**,
      utm, `#ref=` padronizado → e **automaticamente toma o lugar da velha** no Vercel
- [ ] Matar a duplicata no `app.` no mesmo movimento (curso sai do `app.`, vai pro apex)

**Fase 4 — Desligar**
- [ ] Quando só sobrar lixo: 301 do que morreu → página viva mais próxima
- [ ] Desligar o WP e cancelar a Núcleo Brasil
- [ ] `app.` fica só com o app: área do aluno, login, checkout

## 7. Como saber que deu certo

- Nenhuma URL com tráfego devolve 404 (checar Search Console 30 dias depois)
- Leads "sem código" caem dos **58% de julho** pra perto de zero
- `gclid` presente nos leads → destrava *offline conversion import*
- Uma página por curso. Uma só. No apex.
