// render.js — renderiza capa-reel.html em PNG 1080x1920
// Uso: node render.js <html> <output.png>
// Ex:  node render.js capa-reel.html marketing/conteudo/reel-xxx/capa.png

const { chromium } = require('playwright');
const path = require('path');

async function render(htmlFile, outputFile) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.goto(`file://${path.resolve(htmlFile)}`);
  await page.waitForTimeout(800); // aguarda Poppins carregar
  const slide = await page.$('.slide');
  await slide.screenshot({ path: outputFile });
  await browser.close();
  console.log(`✓ ${outputFile}`);
}

const htmlFile = process.argv[2] || 'capa-reel.html';
const outputFile = process.argv[3] || 'capa-reel.png';
render(htmlFile, outputFile).catch(err => { console.error(err.message); process.exit(1); });
