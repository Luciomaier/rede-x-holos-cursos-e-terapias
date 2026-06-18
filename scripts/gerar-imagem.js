// gerar-imagem.js — gera imagem via OpenAI e salva em PNG
// Uso: node --env-file=.env scripts/gerar-imagem.js "PROMPT" "caminho/saida.png"

const https = require('https');
const fs = require('fs');
const path = require('path');

const [, , prompt, outputPath] = process.argv;

if (!prompt || !outputPath) {
  console.error('Uso: node --env-file=.env scripts/gerar-imagem.js "PROMPT" "saida.png"');
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Erro: OPENAI_API_KEY não encontrada. Use --env-file=.env');
  process.exit(1);
}

const body = JSON.stringify({
  model: 'gpt-image-1',
  prompt,
  n: 1,
  size: '1024x1024',
  quality: 'high',
});

const options = {
  hostname: 'api.openai.com',
  path: '/v1/images/generations',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log('Gerando imagem...');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    if (parsed.error) {
      console.error('Erro OpenAI:', parsed.error.message);
      process.exit(1);
    }
    const item = parsed.data[0];
    const outDir = path.dirname(path.resolve(outputPath));
    fs.mkdirSync(outDir, { recursive: true });

    if (item.b64_json) {
      // gpt-image-1 retorna base64
      const buf = Buffer.from(item.b64_json, 'base64');
      fs.writeFileSync(path.resolve(outputPath), buf);
      console.log(`✓ Imagem salva: ${outputPath}`);
    } else if (item.url) {
      // dall-e-3 retorna URL
      console.log('URL gerada, baixando...');
      const file = fs.createWriteStream(path.resolve(outputPath));
      https.get(item.url, (imgRes) => {
        imgRes.pipe(file);
        file.on('finish', () => { file.close(); console.log(`✓ Imagem salva: ${outputPath}`); });
      }).on('error', (e) => { console.error('Erro ao baixar imagem:', e.message); process.exit(1); });
    } else {
      console.error('Formato de resposta desconhecido:', JSON.stringify(item));
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Erro na requisição:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
