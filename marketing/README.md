# marketing/ — operação e saídas

Duas camadas aqui:
1. **Inteligência / controle** (núcleo do trabalho de marketing — números, campanhas, ciclos) — editada à mão, é a operação viva
2. **Saídas de skills** (carrossel, SEO, CSVs, relatórios) — geradas automaticamente

## 🎯 Camada de controle — comece por aqui

| Arquivo | O que é |
|---------|---------|
| [**painel.md**](painel.md) | **Dashboard** — números do mês: conversas, matrículas, ROAS, faturamento (vs meta) |
| [campanhas/google-ads.md](campanhas/google-ads.md) | Estado + histórico das campanhas Google |
| [campanhas/meta-ads.md](campanhas/meta-ads.md) | Estado + histórico das campanhas Meta |
| [campanhas/landing-pages.md](campanhas/landing-pages.md) | As LPs + URLs + códigos de tracking |
| [ciclos/](ciclos/) | Log de mudanças/experimentos (começo-meio-fim) — ex: micro-conversões |

> **Metas oficiais (fonte da verdade):** [`acordos/rede-publicidade/acordo-rede-holos.md`](../acordos/rede-publicidade/acordo-rede-holos.md) → seção "Números oficiais".
> O painel mostra **realizado vs meta**; a meta mora no acordo.

---

## 📦 Camada de saídas de skills

Tudo que as skills de marketing produzem cai aqui. Skills do MazyOS já sabem onde salvar — você raramente precisa criar pasta manualmente.

## Estrutura padrão

```
marketing/
├── conteudo/                    saídas do /carrossel e /publicar-tema
│   └── <tipo>-<tema>-<YYYY-MM-DD>/
│       ├── carrossel.html
│       ├── render.js
│       ├── instagram/slide-XX.png
│       ├── legenda.md
│       └── legenda-linkedin.md
│
├── seo/                         saídas do /seo (8 passos)
│   ├── 01-pesquisa-demanda.md
│   ├── 02-analise-concorrencia.md
│   ├── 03-google-meu-negocio.md
│   ├── 04-otimizacao-on-page.md
│   ├── 05-estrategia-conteudo.md
│   ├── 06-google-ads.md
│   ├── 07-checklist-monitoramento.md
│   └── 08-geo-otimizacao-ia.md
│
├── campanhas/                   saídas do /anuncio-google e /relatorio-ads
│   ├── google-ads-<YYYY-MM-DD>/  CSVs prontos pra importar
│   └── relatorios/               relatórios semanais
│
└── avaliacoes-google/           histórico do /responder-avaliacoes (opcional)
```

## Como funciona

- **`/carrossel` ou `/publicar-tema`** → cria pasta em `conteudo/<tipo>-<tema>-<data>/`
- **`/seo`** → preenche os 8 arquivos numerados em `seo/`
- **`/anuncio-google`** → cria pasta em `campanhas/google-ads-<data>/` com CSVs
- **`/relatorio-ads`** → cria arquivo em `campanhas/relatorios/<data>-relatorio.md`
- **`/responder-avaliacoes`** → opcionalmente salva histórico em `avaliacoes-google/`

## Versionamento

Tudo aqui versiona no git pelo `/salvar`. Útil pra comparar evolução de SEO entre meses, rever copies antigas, ou recuperar peça depois de mexer no Insta.
