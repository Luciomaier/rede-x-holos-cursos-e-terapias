// gerar-capa.js — gera capa de reel a partir do template
// Uso: node scripts/gerar-capa.js --foto <caminho> --texto "<texto>" --destaque "<palavra>" --tag "<tag>"
// Ex:  node scripts/gerar-capa.js --foto marketing/fotos/estagio-pratico.jpg --texto "Enquanto você lê isso,\numa turma está\nacontecendo" --destaque "aqui." --tag "REEL DIÁRIO"

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    result[args[i].replace('--', '')] = args[i + 1];
  }
  return result;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 30);
}

async function gerarCapa({ foto, texto, destaque, tag }) {
  if (!foto) { console.error('Erro: --foto é obrigatório'); process.exit(1); }

  const fotoAbsoluto = path.resolve(ROOT, foto);
  if (!fs.existsSync(fotoAbsoluto)) {
    console.error(`Erro: foto não encontrada em ${fotoAbsoluto}`);
    process.exit(1);
  }

  const logoAbsoluto = path.join(ROOT, 'identidade', 'holos-logo-registrada.png');
  const tagTexto = tag || 'REEL DIÁRIO';
  const textoFinal = (texto || '').replace(/\\n/g, '<br>');
  const destaqueFinal = destaque || '';

  const templatePath = path.join(ROOT, 'templates', 'conteudo', 'capa-reel', 'template.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  html = html
    .replace(/\{\{FOTO\}\}/g, fotoAbsoluto.replace(/\\/g, '/'))
    .replace(/\{\{LOGO\}\}/g, logoAbsoluto.replace(/\\/g, '/'))
    .replace(/\{\{TAG\}\}/g, tagTexto)
    .replace(/\{\{TEXTO\}\}/g, textoFinal)
    .replace(/\{\{DESTAQUE\}\}/g, destaqueFinal);

  const data = new Date().toISOString().slice(0, 10);
  const slug = slugify(destaqueFinal || textoFinal || tagTexto);
  const outputDir = path.join(ROOT, 'marketing', 'conteudo', `reel-${slug}-${data}`);
  fs.mkdirSync(outputDir, { recursive: true });

  const htmlPath = path.join(outputDir, 'capa-reel.html');
  const pngPath = path.join(outputDir, 'capa-reel.png');
  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`);
  await page.waitForTimeout(800);
  const slide = await page.$('.slide');
  await slide.screenshot({ path: pngPath });
  await browser.close();

  console.log(`✓ PNG gerado: ${pngPath}`);
  console.log(`  HTML salvo: ${htmlPath}`);
}

gerarCapa(parseArgs()).catch(err => { console.error(err.message); process.exit(1); });
