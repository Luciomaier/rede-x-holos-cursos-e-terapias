const { chromium } = require('C:/Users/Rede Baixada/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const slides = ['s1','s2','s3','s4','s5','s6'];
const outDir = path.join(__dirname, 'instagram');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 8100 });

  const htmlFile = 'file:///' + path.join(__dirname, 'carrossel.html').replace(/\\/g, '/');
  await page.goto(htmlFile, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  for (const id of slides) {
    const el = await page.$('#' + id);
    await el.screenshot({ path: path.join(outDir, id + '.png') });
    console.log('ok ' + id);
  }

  await browser.close();
  console.log('Done!');
})().catch(e => { console.error(e); process.exit(1); });
