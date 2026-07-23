# Preferências

> Como o Claude escreve em nome da Holos. Tom, estilo, vícios a evitar.

## Tom de voz

Formal sem gírias, com credibilidade e ao mesmo tempo acolhedor. Escreve com cuidado e escolhe palavras que transmitem profissionalismo sem criar distância. Como um terapeuta experiente que fala com clareza e presença — você se sente seguro e bem recebido, não pressionado.

## O que evitar

- Jargões motivacionais e de guru: "alavancar", "sinergia", "mindset", "disruptivo", "escalar no piloto automático"
- Tom excessivamente hype: "Bora!!", "Incrível!!", "Vamos juntos!", exclamações em excesso
- Linguagem clínica e fria: "Caro cliente", "Prezado", "Conforme supramencionado"
- Excesso de emojis, especialmente em contexto formal
- Promessas grandiosas sem fundamento
- Linguagem forçada de marketing vazio

## Estilo geral

Textos limpos, acolhedores e sérios. A credibilidade é construída por conteúdo e clareza, não por superlativas ou urgência artificial. Comunicação que respeita a inteligência de quem lê.

## Preferências adicionais

### Tom para conteúdo de captação (Instagram)
- Positivo e inclusivo — nunca atacar CLT ou emprego
- Frase-guia: "Ter emprego é ótimo, mas ser profissional liberal abre outras escolhas"
- Sem drama, sem julgamento de carreira, sem negatividade

### Regras de canal
- **Feed:** evergreen — sem datas específicas, conteúdo atemporal
- **Stories:** pode ter datas, urgência e informações de turma
- **Reels de volume:** desmarcar "publicar no feed"
- **Reels que vão pro feed:** sempre subir com capa desenhada (título Poppins + identidade) — selfies sem capa repetidas deixam a grade monótona
- **Grade do feed:** manter alternância escuro ↔ claro nas capas — pelo menos 1 capa clara (lavanda) a cada 3 posts

### Hashtags nas legendas
- Usar no máximo **5 hashtags** por legenda — as mais virais/relevantes para o nicho
- Instagram só indexa as primeiras 5 quando coladas em bloco, então menos é mais

### O que nunca fazer
- **Usar preto (ou quase-preto) como cor de fundo em peças e páginas** — Luciana não gosta. Vale para rodapés, faixas, capas e fundos de bloco. No lugar, usar o roxo escuro da marca `#52378A`. Atenção ao navy `#0C1436` dos moldes de LP: ele lê como preto (decidido em 23/07/2026)
- Mencionar Matheus (não faz mais parte da equipe)
- Atacar CLT ou emprego como "problema"
- Colocar datas específicas no feed
- Texto pequeno em stories (títulos mínimo 90-100pt, 1080×1920px)
- Muitas informações em um único story — sempre clean
- Confundir taxa de conversão 1/15 como sendo de toda a escola — é só da Formação em Massoterapia

### Padrão visual — stories com foto de professor
- Overlay gradiente na base da foto (não faixa de transição separada): gradiente de ~520px de altura, de `rgba(62,14,85,0)` até `rgba(62,14,85,1)` — padrão aprovado em 18/06/2026

### Padrão — WhatsApp nas páginas de curso (LPs)
- **Curso livre** (Hawaiana, Aromaterapia, Shiatsu, Ventosa, Reiki, Pedras Quentes etc.) → **(11) 97699-4647** (Giovanna) · `wa.me/5511976994647`
- **Formação** (Massoterapia presencial, Constelação Familiar) → **(11) 97637-8429** · `wa.me/5511976378429`
- Ao montar uma LP nova, trocar o número em **todos os pontos**: hero, detalhes, card da turma, investimento, CTA final, sticky mobile e o `BASE_WPP` do script de captura de lead (7 lugares no molde)
- Não herdar o número da página antiga do WordPress sem conferir — a da Hawaiana estava certa, mas vale checar caso a caso (confirmado em 23/07/2026)

### Como criar uma LP de curso nova (checklist técnico)
Fluxo testado nas 6 páginas de 23/07/2026 (Constelação, Hawaiana, Cone Hindu, Radiestesia, Modeladora, Relaxante).

1. **Molde:** copiar de `public/curso-de-auriculoterapia/index.html` — reaproveitar o `<style>` **principal** (o que contém `--roxo`, não o mini do `<noscript>`) e o bloco do modal de captura + scripts. Trocar `LP`, `BASE_WPP`, mensagens e `DATA_TURMA`
2. **Conteúdo:** puxar do WordPress antigo (`curl` + extrair texto) e adaptar ao tom da Holos
3. **Imagens:** converter pra `.webp` com Pillow; fotos de professor em quadrado ~600×600
4. ⚠️ **`scripts/seo-routes.mjs` — o passo que quebra se esquecer:**
   - a rota **NÃO** pode estar no array de rotas pré-renderizadas nem no mapa `COURSE_ROUTES` — o `postbuild-seo` gera um HTML que **sobrescreve** a LP estática no build
   - a rota **DEVE** entrar em `staticLandingPages` (com barra no fim), que é a lista das LPs de `public/` — assim entra no sitemap sem ser sobrescrita
   - sintoma de esquecer: a página vai pro ar mas mostra a versão antiga; dá pra flagrar pelo `<title>` (o de SEO termina em "São Paulo", o da LP em "Vila Mariana")
5. **Se a página era React**, remover a rota em 3 lugares: `App.tsx` (lazy import, `publicRoutes`, `<Route>`), `config/routes/public-routes.tsx` (import + bloco) e apagar o componente
6. **Links:** atualizar `TodosOsCursos.tsx` — catálogo A-Z e agenda, com caminho relativo (`/curso-x`). Como `resolverUrlCurso` casa pelo catálogo, o cronograma vivo também passa a resolver certo
7. **Conferir:** rodar `python -m http.server 7823` em `public/` e renderizar com Playwright; o build da Vercel no PR é a validação final

### Padrão — investimento na página
- **Curso livre (ticket baixo):** mostrar o valor na página. Ex.: Hawaiana R$ 290 ou 3x de R$ 96,67
- **Formação (ticket alto):** **não** mostrar valor — botão leva ao WhatsApp com a mensagem de investimento, pra um humano atender (decisão da Elis em 23/07/2026, na Constelação)

### Padrão visual — rodapé das LPs estáticas
- Rodapé em roxo escuro `#52378A` (`var(--roxo-dark)`), nunca navy/preto — emenda com o bloco roxo do CTA e a página fecha em bloco único
- Sobre roxo, o texto do rodapé vai a 72% de opacidade e os links a 92% (em 60%/80% fica apagado)
- Aplicado em 23/07/2026 nas LPs de Constelação, Auriculoterapia, Quiropraxia e Desportiva 4×1

### Padrão visual — capa de reel com rosto em destaque
- `overlay-brand`: `rgba(46,8,66,0.10)` — não 0.22, que escurece demais e some com o rosto
- Gradiente inferior (`overlay-bottom`): começar transparência em 48% (não 38%) pra não cobrir o rosto
- Aprovado em 10/07/2026 na capa Aromaterapia (Luciana na lavanda)
