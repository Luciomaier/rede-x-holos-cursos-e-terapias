#!/usr/bin/env node
/**
 * Verificador das páginas da Holos.
 *
 *   node scripts/checar-paginas.mjs
 *
 * Descobre as páginas pelo sitemap do app, baixa cada uma no ar, confere os itens
 * do checklist (ver marketing/painel-validacao-lp.md) e gera:
 *
 *   dados/lps-status.json     — resultado cru
 *   saidas/painel-lps.html    — o painel visual
 *
 * Rodar de novo depois de qualquer publicação: página nova entra sozinha, porque
 * a lista vem do sitemap.
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = 'https://app.holoscursoseterapias.com.br';
const WP = 'https://holoscursoseterapias.com.br';

// Páginas do WordPress que ainda recebem campanha — entram na conferência mesmo
// não estando no sitemap do app.
const EXTRAS_WP = ['/curso-de-desportiva-4x1/', '/curso-de-auriculoterapia/', '/massoterapia-presencial-g/'];

// Campanha ativa → página de destino (Google Ads, últimos 7 dias)
const CAMPANHAS = {
  '/massoterapia-lp/': { nome: 'Masso Geral (PG_B)', gasto: 4554.96, cliques: 729, conv: 134 },
  '/curso-de-desportiva-4x1/': { nome: '(CP) Busca M.Desportiva', gasto: 585.99, cliques: 330, conv: 53 },
  '/curso-livre-de-quiropraxia/': { nome: 'Busca Quiro Modular', gasto: 249.39, cliques: 178, conv: 1 },
  '/curso-de-auriculoterapia/': { nome: 'Auriculo', gasto: 131.25, cliques: 99, conv: 3 },
};

const ITENS = [
  { id: 'P1', bloco: 'P', nome: 'Página responde 200', dono: 'time' },
  { id: 'P2', bloco: 'P', nome: 'Title e description', dono: 'time' },
  { id: 'P3', bloco: 'P', nome: 'Canonical', dono: 'time' },
  { id: 'P4', bloco: 'P', nome: 'Imagem de compartilhamento', dono: 'time' },
  { id: 'P5', bloco: 'P', nome: 'Schema JSON-LD', dono: 'time' },
  { id: 'A1', bloco: 'A', nome: 'Meta Pixel', dono: 'time' },
  { id: 'A2', bloco: 'A', nome: 'GTM', dono: 'time' },
  { id: 'A3', bloco: 'A', nome: 'GA4', dono: 'time' },
  { id: 'T1', bloco: 'T', nome: 'Carimbo #ref', dono: 'nosso' },
  { id: 'T2', bloco: 'T', nome: 'DEFAULT_REF (orgânico)', dono: 'nosso' },
  { id: 'T3', bloco: 'T', nome: 'Grava lead no Supabase', dono: 'nosso' },
  { id: 'T4', bloco: 'T', nome: 'Evento lead_capturado', dono: 'nosso' },
  { id: 'T8', bloco: 'T', nome: 'Captura gclid', dono: 'nosso' },
];

// Sessões do GA4 são um enfeite útil, não um requisito: `dados/` não vai pro git,
// então num clone limpo o arquivo não existe e o painel roda sem a coluna.
let sessoes = {};
try {
  sessoes = JSON.parse(readFileSync(join(RAIZ, 'dados/ga4-sessoes-7d.json'), 'utf8'));
} catch {
  console.error('  (sem dados/ga4-sessoes-7d.json — painel sai sem a coluna de sessões)');
}

async function baixar(url) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (checador Holos)' },
      signal: AbortSignal.timeout(30000),
    });
    return { status: r.status, html: await r.text() };
  } catch (e) {
    return { status: 0, html: '', erro: e.message };
  }
}

function conferir(url, status, html) {
  const tem = (re) => new RegExp(re, 'i').test(html);
  // Página de captura = tem o modal que exige nome+e-mail. Só nela os itens de
  // atribuição fazem sentido; nas outras marcamos "não se aplica".
  const captura = /lm-form/.test(html);

  const r = {
    P1: status === 200,
    P2: tem('<title>') && tem('name="description"'),
    P3: tem('rel="canonical"'),
    P4: tem('property="og:image"'),
    P5: tem('application/ld\\+json'),
    A1: tem('902498357163312'),
    A2: tem('GTM-PGTFNK2'),
    A3: tem('G-YV8T6YK9N9'),
    T1: captura ? tem('%23ref%3D') : null,
    T2: captura ? tem('DEFAULT_REF') : null,
    T3: captura ? tem('leads_campanha') : null,
    T4: captura ? tem('lead_capturado') : null,
    T8: captura ? tem('gclid') : null,
  };
  return { checks: r, captura, gtagAds: tem('AW-752011587'), tamanho: html.length };
}

// slug do curso a partir do caminho — vira o código da campanha (GC-*/ME-*)
const slug = (p) =>
  p.replace(/^\/|\/$/g, '').replace(/^(curso-de-|curso-livre-de-|formacao-)/, '').replace(/[^a-z0-9-]/g, '') || 'home';

async function emLotes(itens, n, fn) {
  const out = [];
  for (let i = 0; i < itens.length; i += n) {
    out.push(...(await Promise.all(itens.slice(i, i + n).map(fn))));
    process.stderr.write(`  ${Math.min(i + n, itens.length)}/${itens.length}\n`);
  }
  return out;
}

console.error('Lendo o sitemap do app...');
const smp = await baixar(`${APP}/sitemap.xml`);
const doSitemap = [...smp.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.error(`  ${doSitemap.length} URLs no sitemap`);

const alvos = [
  ...doSitemap.map((u) => ({ url: u, origem: 'app' })),
  ...EXTRAS_WP.map((p) => ({ url: WP + p, origem: 'wordpress' })),
];

console.error(`Conferindo ${alvos.length} páginas no ar...`);
const paginas = await emLotes(alvos, 6, async ({ url, origem }) => {
  const { status, html } = await baixar(url);
  const caminho = new URL(url).pathname;
  const { checks, captura, gtagAds, tamanho } = conferir(url, status, html);
  const aplicaveis = Object.entries(checks).filter(([, v]) => v !== null);
  return {
    url,
    caminho,
    origem,
    nome: slug(caminho),
    status,
    captura,
    gtagAds,
    tamanho,
    checks,
    ok: aplicaveis.filter(([, v]) => v).length,
    total: aplicaveis.length,
    faltando: aplicaveis.filter(([, v]) => !v).map(([k]) => k),
    sessoes: sessoes[caminho] ?? sessoes[caminho.replace(/\/$/, '')] ?? sessoes[caminho + '/'] ?? 0,
    campanha: CAMPANHAS[caminho] ?? CAMPANHAS[caminho + '/'] ?? null,
  };
});

paginas.sort((a, b) => b.sessoes - a.sessoes || a.caminho.localeCompare(b.caminho));

const resumo = {
  gerado: new Date().toISOString(),
  paginas: paginas.length,
  captura: paginas.filter((p) => p.captura).length,
  perfeitas: paginas.filter((p) => p.faltando.length === 0).length,
  porItem: Object.fromEntries(
    ITENS.map((i) => {
      const rel = paginas.filter((p) => p.checks[i.id] !== null);
      return [i.id, { ok: rel.filter((p) => p.checks[i.id]).length, de: rel.length }];
    })
  ),
};

mkdirSync(join(RAIZ, 'dados'), { recursive: true });
mkdirSync(join(RAIZ, 'saidas'), { recursive: true });
writeFileSync(join(RAIZ, 'dados/lps-status.json'), JSON.stringify({ resumo, itens: ITENS, paginas }, null, 2));

writeFileSync(join(RAIZ, 'saidas/painel-lps.html'), montarHtml({ resumo, itens: ITENS, paginas }));

console.error('\n── resumo ──');
console.error(`  ${resumo.paginas} páginas · ${resumo.captura} de captura · ${resumo.perfeitas} sem pendência`);
for (const i of ITENS) {
  const s = resumo.porItem[i.id];
  const falta = s.de - s.ok;
  console.error(`  ${i.id} ${i.nome.padEnd(30)} ${s.ok}/${s.de}${falta ? `  ← falta em ${falta}` : ''}`);
}
console.error('\n  dados/lps-status.json  ·  saidas/painel-lps.html');

function montarHtml(d) {
  // escapa "<" pra que nenhum dado consiga fechar a tag <script> do template
  const json = JSON.stringify(d).replace(/</g, '\\u003c');
  return readFileSync(join(RAIZ, 'scripts/painel-template.html'), 'utf8').replace('/*DADOS*/null', () => json);
}
