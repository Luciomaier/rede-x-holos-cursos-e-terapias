# Branding Book — Holos Cursos e Terapias

> **Fonte única de identidade da Holos.** Toda peça — criativo, capa, carrossel, story, página, e-mail, copy — segue este documento. Antes de gerar qualquer coisa visual ou escrita em nome da marca, ler daqui.
>
> Os valores abaixo foram **verificados ao vivo** no produto (`app.holoscursoseterapias.com.br`) e no Instagram `@holos_cursos` em junho/2026 — não são suposições. Quando uma skill ou template divergir daqui, **este documento vence**.

---

## 1. Tokens (a parte que o sistema lê pra acertar)

### Cores

| Token | Hex | Uso |
|-------|-----|-----|
| **Roxo Holos** | `#6D4C7F` | Cor dominante. Fundos sólidos, capas de story, UI, elementos de marca |
| **Roxo profundo** | `#59248F` | Início de gradientes, fundos escuros |
| **Roxo overlay** | `#3E0E55` | **Overlay sobre fotos** — cor confirmada para a sombra roxa sobre imagens |
| **Roxo médio** | `#8040BF` | Fim de gradientes, variação mais viva |
| **Lavanda** | `#9B87F5` | Acento de UI, links, detalhes claros sobre fundo escuro |
| **Lavanda clara** | `#EBE2F3` | Fundo de cards, blocos de respiro, carrosseis claros |
| **Dourado** | `#E6A028` | **Acento quente oficial.** Palavra-chave, badge, destaque, CTA. Uma cor de destaque por peça |
| **Ciano** | `#33C4F0` | Acento secundário, usar com parcimônia (detalhes, ícones) |
| **Branco** | `#FFFFFF` | Texto sobre roxo, fundo de logo, cards |
| **Tinta** | `#171717` | Texto principal sobre fundo claro |
| **Cinza apoio** | `#6B7280` | Texto secundário sobre fundo claro |

**Gradientes oficiais:**
- **Primário:** `linear-gradient(135deg, #59248F, #8040BF)`
- **CTA (mais vivo):** `linear-gradient(135deg, #6629A3, #8C3CDD)`
- **Overlay sobre foto** (pra texto legível): de `rgba(89,36,143,0)` no topo até `rgba(89,36,143,0.96)` na base — curva suave, **nunca um corte seco**.

### Tipografia — três fontes, três papéis

A regra que evita bagunça: cada fonte tem **um** papel. Não misturar fora disso.

| Fonte | Papel | Onde |
|-------|-------|------|
| **Inter** | Corpo, UI, textos longos, dados, legendas, e-mails | App, site, páginas, parágrafos, info de cursos |
| **Poppins** | Títulos e headlines de peças sociais | Capas de reel, títulos de carrossel, manchetes de post |
| **Parisienne** (cursiva) | **Uma** palavra de destaque emocional ou assinatura | A palavra-chave que carrega emoção (ex: *você*, *transformação*, *cuidar*). Nunca frase inteira, nunca texto corrido |

Pesos: Inter 400/500/600/700/800/900 · Poppins 700/800/900 · Parisienne (peso único).

**Hierarquia de tamanho (peças sociais):**
- Título de capa: Poppins 900, 86–100px, line-height 1.0, letter-spacing −0.03em
- Palavra cursiva de destaque: Parisienne, 1.4–1.6× o tamanho do título (ela respira)
- Subtítulo/H2 interno: Poppins 800, 60–72px
- Corpo: Inter 500, 20–24px, line-height 1.5
- Eyebrow/kicker: Inter 700–800, 13–16px, UPPERCASE, letter-spacing 0.2em+, em dourado
- Handle/rodapé: Inter 600, 15–18px

Contraste de kerning é a assinatura tipográfica: **títulos apertados** (−0.03em), **eyebrows abertos** (0.2em+).

### Logo

A marca registrada Holos tem:
- "H" e "s" em **Roxo Holos `#6D4C7F`**
- Símbolo de infinito (∞) em **dourado/laranja** — gradiente quente, elemento central
- Gotas/pegadas em roxo no topo
- "Cursos e Terapias®" abaixo, em roxo discreto
- Marca d'água leve de estrela/pentágono em cinza no fundo

**Arquivos disponíveis em `identidade/logo/`:**
- `logo-original.png` — 90×65px, fundo branco (fonte: site oficial)
- `logo-sem-fundo.png` — 90×65px, fundo removido, PNG com transparência

**Como usar em HTML/CSS:**
```html
<!-- Em fundos escuros/roxos: usar logo-sem-fundo.png diretamente -->
<img src="/identidade/logo/logo-sem-fundo.png" style="height:52px">

<!-- Em fundos claros/brancos: usar logo-original.png -->
<img src="/identidade/logo/logo-original.png" style="height:52px">

<!-- Truque CSS — fundo branco some em fundos coloridos: -->
<img src="/identidade/logo/logo-original.png" style="height:52px; mix-blend-mode:multiply">
```

**Aplicação em peças sociais (Instagram):**
- Topo esquerdo dos slides — altura ~52px no carrossel 1080px
- Centralizado no story
- **Nunca** distorcer proporção, nunca colorir diferente do original
- Tamanho mínimo: 40px de altura (abaixo disso perde leitura no mobile)

---

## 2. Princípios visuais

Sofisticado, acolhedor e clean. O roxo comunica transformação, presença e profissionalismo; o dourado traz calor sem gritar. Nada de clip-art, emoji decorativo, gradiente arco-íris ou cara de template genérico de IA. A credibilidade vem da clareza e do respiro, não de superlativos.

**Web vs Social:**
- **Produto/site (`app.`):** Inter, fundo branco/lavanda clara, roxo da escala 270°, amarelo `#FACC15` aceito como destaque de UI.
- **Social (Instagram, peças):** mesma família de roxo + **dourado `#E6A028`** como destaque (não o amarelo do app), Poppins nos títulos, Parisienne no toque emocional.
- O **roxo-base é o mesmo** nos dois mundos — é o que mantém a marca reconhecível.

---

## 3. Modelos por formato

### Capa de Reels — 1080 × 1920 (9:16)
1. Logo (badge branco circular), canto superior esquerdo (~x30 y30, ~160px)
2. Foto preenchendo todo o canvas (sem barras pretas de celular)
3. Overlay roxo: começa ~58% da altura, sólido ~72% — curva suave
4. Badge dourado arredondado (ex: "REEL DIÁRIO"), texto branco, ~y64%
5. Título em Poppins branco; palavra final em **dourado** ou em **Parisienne** quando for emocional
6. Régua dourada (90×5px)
7. Rodapé: "@holos_cursos" branco + coração roxo à direita

### Feed — Curso/Oferta — 1080 × 1350 (4:5)
Layout dividido: foto (~55%) à esquerda + área roxa (~45%) à direita. Gradiente da esquerda começando ~44%. No lado direito, de cima pra baixo: logo · régua dourada · título (Poppins, branco+dourado) · dados (data/horário/professor) · diferencial · contato · @holos_cursos. Fonte nunca encosta na borda.

### Feed — Prova social / Turma — 1080 × 1350
Foto da turma preenchendo o canvas · logo topo-esquerda · overlay roxo inferior (~46–52%) · badge dourado ("TURMA HOLOS") · frase de impacto em 3 linhas (branco + última em dourado) · régua · subfrase em lavanda · @holos_cursos. Calcular posições **de baixo pra cima**.

### Carrossel — 1080 × 1350 (4:5), máx. 6–10 slides
- **Slide 1 (CAPA):** eyebrow + título grande (Poppins) + subtítulo + @handle. Fundo: foto com overlay OU roxo sólido.
- **Internos:** alternar layouts — **SOLO** (foto 50% + texto 50%), **DUO** (texto + 2 fotos), **NÚMERO** (numeral gigante dourado + texto), **CITAÇÃO** (aspas watermark + frase). Cards arredondados em lavanda clara ou roxo claro com borda dourada.
- **Último (CTA FINAL):** fundo roxo, logo centralizado, headline curta, contato/@handle.
- **Ritmo:** nunca dois slides seguidos com o mesmo fundo. Alternar roxo ↔ claro ↔ destaque.

### Story — Curso — 1080 × 1920
Foto no topo (~50%, sem barras) · overlay roxo suave descendo · logo centralizado topo · badge ("NOVA TURMA · JUNHO") · título/dados/módulos · contato · @holos_cursos rodapé centralizado. **Tudo distribuído verticalmente com respiro**, logo desgrudado da foto.

**Variações sazonais — só em stories** (feed mantém padrão): Copa do Brasil (verde/amarelo/azul), Dia dos Namorados (tons românticos, corações geométricos).

### Story Geral — "Bolinhas"
Logo topo · badge + título ("8 técnicas em 6 meses") · grade de fotos circulares (4 por linha, borda dourada, nome embaixo) · início/diferenciais/contato · @holos_cursos.

---

## 4. Especificações técnicas (para código/render)

**Gradiente suave (nunca corte):**
```
Para cada linha y entre grad_start e grad_end:
  alpha = 255 * ((y - grad_start) / (grad_end - grad_start)) ** 1.4   // curva 1.4–1.8
```

**Logo circular com borda:** máscara elíptica → putalpha → fundo branco circular um pouco maior → colar logo por cima.

**Corte de barras pretas de screenshot:** percorrer linhas; achar onde a média de cor da coluna central > 20; cortar topo e base.

**Corações geométricos** (emoji Unicode quebra em Python): equação paramétrica `x=16sin³(t)`, `y=-(13cos t −5cos2t −2cos3t −cos4t)`, polígono preenchido.

**Render padrão das peças:** HTML + Google Fonts (Inter, Poppins, Parisienne) → Playwright screenshot do `.slide` na dimensão exata. Ver `scripts/gerar-capa.js` e `templates/conteudo/`.

---

## 5. Voz e copy

### Tom de voz
Formal sem gírias, com credibilidade e ao mesmo tempo acolhedor. Como um terapeuta experiente que fala com clareza e presença — a pessoa se sente segura e bem recebida, não pressionada. A credibilidade vem do conteúdo e da clareza, não de superlativos ou urgência artificial.

### Evitar sempre
- Jargão de guru/marketing: "alavancar", "sinergia", "mindset", "disruptivo", "escalar no piloto automático", "ticket médio", "performance"
- Hype: "Bora!!", "Incrível!!", "Vamos juntos!", excesso de exclamação
- Frieza clínica: "Caro cliente", "Prezado", "Conforme supramencionado"
- Excesso de emoji em contexto formal
- Promessas grandiosas sem fundamento

### Regras de canal
- **Feed:** evergreen — sem datas específicas, conteúdo atemporal
- **Stories:** pode ter datas, urgência, info de turma. Títulos mínimo 90–100pt, 1080×1920px, sempre clean (pouca info por story)
- **Reels de volume:** desmarcar "publicar no feed"
- **Captação:** positivo e inclusivo — *"Ter emprego é ótimo, mas ser profissional liberal abre outras escolhas"*. **Nunca** enquadrar emprego/CLT como problema.

### Padrão de legenda (Instagram/Facebook)
1. Hook (gancho forte na 1ª linha) → 2. Contexto (1–2 frases) → 3. CTA suave ("Arraste pro lado", link na bio, direct com palavra-chave) → 4. Bloco de oferta (diferenciais, contato) → 5. 10–15 hashtags (alto volume + nichadas, ex: `#massoterapia` + `#tocaquetransforma`).

### Fatos que não podem sair errados
- **Nunca mencionar Matheus** (não faz mais parte da equipe).
- A conversão **1 em 15 é só da Formação em Massoterapia**, não da escola inteira.
- Endereço: Rua Cel. Artur Godói, 83, Vila Mariana, SP. Não colocar CEP no perfil do Instagram.

---

## 6. Erros a evitar (consolidado)

- ❌ Logo quadrado ou sem anel → sempre circular com anel gradiente
- ❌ Gradiente como "risco" dividindo a imagem → sempre fluido
- ❌ Laranja `#EF8904` ou roxos antigos (`#5B3E8E`, `#834AA3`) → usar os tokens da seção 1 (`#3E0E55` é válido como overlay — ver tabela de cores)
- ❌ Poppins ou Inter na palavra de destaque emocional → essa é a Parisienne (e só uma palavra)
- ❌ Texto encavalando o @holos_cursos → calcular de baixo pra cima
- ❌ Conteúdo amontoado no topo do story → centralizar verticalmente, com respiro
- ❌ Fonte encostando na borda → reduzir
- ❌ Quatro cores brigando → roxo + UMA cor de destaque (dourado) por peça
- ❌ Barras pretas de celular nas fotos → cortar antes
- ❌ Datas específicas no feed → datas só em stories

---

*Verificado ao vivo no produto e no Instagram da Holos · junho/2026. Atualizar quando a marca evoluir — e, ao atualizar, refazer a verificação nas peças reais.*
