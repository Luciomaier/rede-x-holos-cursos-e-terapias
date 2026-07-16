#!/usr/bin/env node
/**
 * REPESCAGEM — lista quente de leads pro ativo do comercial no WhatsApp.
 *
 * Nasceu em 14/07/2026 (Jul D1). O modelo que a Luciana aprovou.
 *
 * Uso:
 *   node scripts/repescagem.js <de> <ate> <vendas.json> [telefone-do-chip]
 *   node scripts/repescagem.js 2026-07-01 2026-07-10 dados/vendas-jul26.json
 *
 * <vendas.json> = quem JÁ COMPROU no período (qualquer produto), extraído da aba do mês
 *                 da planilha META DE VENDAS. Formato: [{ "nome": "...", "tel": "(11) 90000-0000" }]
 *                 O Claude monta esse arquivo lendo a planilha — ver a skill /repescagem.
 *
 * Saídas (em saidas/):
 *   repescagem-<chip>-<de>_<ate>.csv   → planilha de trabalho do time (vira Google Sheets)
 *   repescagem-<chip>-<de>_<ate>.html  → briefing pra Luciana (virar PDF com o Chrome headless)
 *
 * ---------------------------------------------------------------------------
 * REGRAS QUE ESTE SCRIPT CARREGA (aprendidas na marra — não desfazer sem motivo)
 *
 *  1. "Estrear" = 1ª conversa do contato em TODA a org, não só no chip. Um lead que já
 *     falou com a Recepção em maio não é lead novo.
 *  2. O chip da Lu (8429) é o destino da verba de MASSO. Por isso os "sem código" dele
 *     quase certamente TAMBÉM são masso — entram na lista, em grupo mais baixo.
 *  3. `tracking_code` = onde o lead NASCEU (a régua). `whatsapp_session_id` = quem ATENDEU
 *     (muda de mão). Nunca medir origem pelo chip.
 *  4. O kanban do ZenPro está VAZIO (o time atende fora do sistema). O banco NÃO sabe quem
 *     fechou → o cruzamento com a Meta de Vendas é obrigatório, não é luxo.
 *  5. Nem todo `contact_number` é telefone: o WhatsApp grava LID (id interno) em parte das
 *     conversas. Esses só dá pra responder dentro do ZenPro.
 *  6. Casar telefone por DDD + últimos 8 dígitos — o 9º dígito entra e sai das bases.
 *  7. Achatar quebra de linha no nome do WhatsApp, senão o CSV quebra na importação.
 * ---------------------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ORG = '742cc473-e27e-4973-9b2d-bb9d88abda65';           // Holos (o banco é multi-tenant!)
const CHIP_PADRAO = '5511976378429';                          // "vendas - 8429" — comercial de masso
const RAIZ = path.join(__dirname, '..');

const [, , DE, ATE, VENDAS_JSON, CHIP = CHIP_PADRAO] = process.argv;
if (!DE || !ATE || !VENDAS_JSON) {
  console.error('uso: node scripts/repescagem.js <de> <ate> <vendas.json> [telefone-do-chip]');
  console.error('ex:  node scripts/repescagem.js 2026-07-01 2026-07-10 dados/vendas-jul26.json');
  process.exit(1);
}

const hoje = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------- 1. banco
const SQL = `
with base as (
  select c.id, c.contact_name, c.contact_number, c.created_at, c.tracking_code
  from conversations c
  join whatsapp_sessions s on s.id = c.whatsapp_session_id
  where c.organization_id = '${ORG}'
    and s.phone_number = '${CHIP}'
    and not c.is_group
    and (c.created_at at time zone 'America/Sao_Paulo')::date between '${DE}' and '${ATE}'
    and not exists (                                    -- regra 1: estreou na ORG inteira
      select 1 from conversations c2
      where c2.organization_id = c.organization_id
        and c2.contact_number  = c.contact_number
        and not c2.is_group
        and c2.created_at < c.created_at)
),
msg as (
  select m.conversation_id,
         count(*) filter (where m.direction = 'inbound')  as msgs_lead,
         count(*) filter (where m.direction = 'outbound') as msgs_escola,
         (array_agg(m.direction order by m.timestamp desc))[1] as ultima_direcao
  from whatsapp_messages m
  where m.organization_id = '${ORG}'
  group by 1
)
select
  to_char(b.created_at at time zone 'America/Sao_Paulo', 'DD/MM') as data,
  ('${hoje}'::date - (b.created_at at time zone 'America/Sao_Paulo')::date) as dias,
  b.contact_name   as nome,
  b.contact_number as telefone,
  coalesce(nullif(b.tracking_code, ''), '(sem ref)') as codigo,
  case
    when b.tracking_code like 'GC-%'                       then 'Google'
    when b.tracking_code like 'IS-%'
      or b.tracking_code like 'FB-%'
      or b.tracking_code =  'mensalistas'                  then 'Instagram/Meta'
    when b.tracking_code =  'OR-massoterapia'              then 'Organico'
    else 'SEM REF' end as origem,
  coalesce(m.msgs_lead, 0)          as msgs_lead,
  coalesce(m.msgs_escola, 0)        as msgs_escola,
  coalesce(m.ultima_direcao, 'nenhuma') as ultima_direcao
from base b
left join msg m on m.conversation_id = b.id
order by b.created_at`;

const leads = JSON.parse(
  execFileSync('node', [path.join(__dirname, 'zenpro-query.js'), SQL], { encoding: 'utf8', maxBuffer: 1 << 26 })
);

// ------------------------------------------------- 2. quem já comprou (Meta de Vendas)
const chave = (raw) => {                                 // regra 6: DDD + últimos 8 dígitos
  let d = String(raw).replace(/\D/g, '');
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2);
  return d.length < 10 ? null : d.slice(0, 2) + d.slice(-8);
};
const vendas = JSON.parse(fs.readFileSync(path.join(RAIZ, VENDAS_JSON), 'utf8'));
const compraram = new Map();
vendas.forEach(v => { const k = chave(v.tel); if (k) compraram.set(k, v); });

const temTel = (t) => /^55\d{11}$/.test(String(t).replace(/\D/g, ''));   // regra 5
const fmtTel = (raw) => {
  const d = String(raw).replace(/\D/g, '');
  if (!temTel(d)) return null;
  const n = d.slice(2);
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

const fora = [];
const pool = [];
for (const l of leads) {
  l.dias = +l.dias; l.msgsLead = +l.msgs_lead; l.msgsEscola = +l.msgs_escola;
  l.tel = fmtTel(l.telefone);
  const k = l.tel ? chave(l.telefone) : null;
  if (k && compraram.has(k)) { fora.push({ l, v: compraram.get(k) }); continue; }
  pool.push(l);
}

// ------------------------------------------------------------- 3. grupos (a régua)
const MASSO = new Set(['Google', 'Instagram/Meta', 'Organico']);
for (const l of pool) {
  l.masso = MASSO.has(l.origem);
  if (l.ultima_direcao === 'inbound') {
    l.grupo = 1; l.quando = 'HOJE';
    l.motivo = 'Mandou mensagem e ficou SEM RESPOSTA';
  } else if (l.masso && l.dias >= 8) {
    l.grupo = 2; l.quando = 'ATE AMANHA';
    l.motivo = 'Clicou no anuncio de masso · no limite da janela (fecha agora ou esfria)';
  } else if (l.masso) {
    l.grupo = 3; l.quando = 'ESTA SEMANA';
    l.motivo = 'Clicou no anuncio de masso · dentro da janela';
  } else if (l.msgsLead >= 3) {
    l.grupo = 4; l.quando = 'DEPOIS';
    l.motivo = `Sem codigo, mas conversou de verdade (${l.msgsLead} mensagens)`;
  } else {
    l.grupo = 5; l.quando = 'DEPOIS';
    l.motivo = 'Sem codigo e pouca conversa';
  }
}
pool.sort((a, b) => a.grupo - b.grupo || b.msgsLead - a.msgsLead || a.dias - b.dias);
const G = (n) => pool.filter(x => x.grupo === n);

// -------------------------------------------------------------------- 4. saídas
const nomeOk = (l) => {
  const n = (l.nome || '').replace(/\s+/g, ' ').trim();                 // regra 7
  return (!n || n === 'Holos' || /^[^\p{L}]+$/u.test(n)) ? '(sem nome no WhatsApp)' : n;
};
const semEmoji = (s) => s.replace(/[\u{1F000}-\u{1FAFF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim() || '(sem nome no WhatsApp)';
const wa = (raw) => String(raw).replace(/\D/g, '');
const slug = `${CHIP.slice(-4)}-${DE}_${ATE}`;
const OUT = path.join(RAIZ, 'saidas');

// 4a. CSV → o Google Sheets do time. Emoji fora: o import do Drive corrompe 4 bytes.
const esc = (s) => { const v = String(s ?? ''); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
const csv = [
  ['GRUPO', 'QUANDO FALAR', 'NOME', 'TELEFONE', 'ABRIR WHATSAPP', 'ENTROU', 'DIAS',
   'ORIGEM', 'CODIGO', 'MSGS DO LEAD', 'SITUACAO',
   'QUEM ATENDEU', 'JA FALEI?', 'MOTIVO DE NAO TER FECHADO', 'PROXIMO PASSO', 'FECHOU?'].join(','),
  ...pool.map(l => [
    l.grupo, l.quando, semEmoji(nomeOk(l)),
    l.tel || 'SEM TELEFONE — responder no ZenPro',
    l.tel ? `https://wa.me/${wa(l.telefone)}` : '',
    l.data, l.dias, l.origem === 'SEM REF' ? 'sem codigo' : l.origem, l.codigo,
    l.msgsLead, l.motivo, '', '', '', '', '',
  ].map(esc).join(',')),
].join('\n');
fs.writeFileSync(path.join(OUT, `repescagem-${slug}.csv`), csv, 'utf8');

// 4b. HTML → briefing da Luciana (o "por que agora"). Vira PDF com o Chrome.
const h = (s) => String(s ?? '').replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
const TAG = { Google: 'g', 'Instagram/Meta': 'i', Organico: 'o', 'SEM REF': 's' };
const tabela = (arr) => `<table><thead><tr><th>Nome no WhatsApp</th><th>Telefone</th><th>Entrou</th><th>Origem</th><th>Msgs</th></tr></thead><tbody>${
  arr.map(l => `<tr><td class="nm">${h(nomeOk(l))}</td><td class="tel">${
    l.tel ? `<a href="https://wa.me/${wa(l.telefone)}">${l.tel}</a>` : '<i>só pelo ZenPro</i>'
  }</td><td>${l.data}<span class="d">${l.dias}d</span></td><td><span class="tag ${TAG[l.origem]}">${
    l.origem === 'SEM REF' ? 'sem código' : l.origem
  }</span></td><td class="c">${l.msgsLead}</td></tr>`).join('')
}</tbody></table>`;

const bloco = (n, chip, cls, titulo, sub) => `<div class="grp">
<div class="ghd ${cls}"><span class="q">${G(n).length}</span><span class="ch">${chip}</span>
<div class="t">${titulo}</div><div class="s">${sub}</div></div>${tabela(G(n))}</div>`;

const t1 = G(1);
const media = t1.length ? Math.round(t1.reduce((a, x) => a + x.msgsLead, 0) / t1.length) : 0;

fs.writeFileSync(path.join(OUT, `repescagem-${slug}.html`), `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Repescagem — leads quentes · Holos</title><style>
*{box-sizing:border-box;margin:0;padding:0}@page{size:A4;margin:12mm}
body{font-family:Arial,Helvetica,sans-serif;color:#333;line-height:1.6;padding:22px;max-width:1000px;margin:0 auto}
h1{color:#1E2560;font-size:27px;line-height:1.2}h2{color:#1E2560;font-size:20px;margin:32px 0 10px;padding-bottom:7px;border-bottom:2px solid #6272C4}
h3{break-after:avoid;color:#1E2560;font-size:16px;margin:18px 0 8px}
.head{border-bottom:4px solid #6272C4;padding-bottom:16px;margin-bottom:22px}
.sub{color:#6272C4;font-weight:bold;margin-top:4px}.meta{color:#888;font-size:13px;margin-top:6px}
.why{background:#F5F6FF;border-left:5px solid #6272C4;padding:17px 19px;margin:20px 0;border-radius:0 8px 8px 0}
.why b{color:#1E2560}
.alert{background:#FFF6E9;border-left:5px solid #FF8C00;padding:17px 19px;margin:18px 0;border-radius:0 8px 8px 0}
.kpis{display:flex;gap:12px;margin:20px 0;flex-wrap:wrap}
.kpi{flex:1;min-width:150px;background:#F5F6FF;border:1px solid #e3e6fb;border-radius:9px;padding:15px;text-align:center}
.kpi .n{font-size:31px;font-weight:bold;color:#6272C4}.kpi .l{font-size:12px;color:#555;margin-top:5px}
.rule li{margin:6px 0 6px 20px;font-size:14px}
.grp{margin:24px 0;border:1px solid #e3e6fb;border-radius:10px;overflow:hidden}
.ghd{padding:14px 18px;background:#F5F6FF;border-bottom:1px solid #e3e6fb;break-inside:avoid;break-after:avoid}
.ghd.urg{background:#FFF6E9;border-bottom-color:#ffe0b8}
.ghd .q{float:right;background:#6272C4;color:#fff;border-radius:20px;padding:2px 13px;font-weight:bold}
.ghd.urg .q{background:#FF8C00}
.ch{font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:.1em;color:#6272C4}
.ghd.urg .ch{color:#c2600a}
.ghd .t{font-size:17px;font-weight:bold;color:#1E2560;margin-top:2px}.ghd .s{font-size:13px;color:#666}
table{width:100%;border-collapse:collapse;font-size:13px}thead{display:table-header-group}
th{background:#fafbff;text-align:left;padding:8px 10px;font-size:11px;text-transform:uppercase;letter-spacing:.4px;color:#6272C4;border-bottom:1px solid #e3e6fb}
td{padding:7px 10px;border-bottom:1px solid #f0f1f8}tr{break-inside:avoid}
tr:nth-child(even) td{background:#fcfcff}
.nm{font-weight:600;color:#1E2560}.tel a{color:#6272C4;text-decoration:none;font-weight:600;white-space:nowrap}
.c{text-align:center;font-weight:bold;color:#6272C4}.d{color:#aaa;font-size:11px;margin-left:5px}
.tag{display:inline-block;border-radius:4px;padding:1px 7px;font-size:11px;font-weight:bold;white-space:nowrap}
.tag.g{background:#e8f0fe;color:#1a56c4}.tag.i{background:#fde8f3;color:#b03080}
.tag.o{background:#e6f6ec;color:#1a7a40}.tag.s{background:#f0f0f0;color:#777}
.script{background:#fafbff;border:1px dashed #b9c0e8;border-radius:8px;padding:15px 17px;margin:8px 0 16px;color:#1E2560;line-height:1.75}
.foot{margin-top:32px;padding-top:14px;border-top:1px solid #eee;text-align:center;color:#bbb;font-size:12px}
</style></head><body>
<div class="head"><h1>Repescagem — os leads que ainda dá tempo de fechar</h1>
<div class="sub">Chip Vendas · a linha do comercial de massoterapia</div>
<div class="meta">Leads que entraram entre <b>${DE.split('-').reverse().join('/')}</b> e <b>${ATE.split('-').reverse().join('/')}</b> · Fonte: ZenPro × Meta de Vendas · Gerado em ${hoje.split('-').reverse().join('/')}</div></div>

<div class="why"><b>Por que essa lista, e por que agora.</b><br>
A matrícula não sai do lead da semana: a maioria fecha entre <b>2 e 13 dias</b> depois de chegar
(mediana ~11). Os leads desta lista estão dentro dessa janela. Não é resgate de lead frio —
é colher no ponto. Semana que vem, boa parte já esfriou.</div>

<div class="kpis">
<div class="kpi"><div class="n">${pool.length}</div><div class="l">pessoas na lista<br>(quem comprou já saiu)</div></div>
<div class="kpi"><div class="n">${t1.length}</div><div class="l">mandaram mensagem e<br><b>ficaram sem resposta</b></div></div>
<div class="kpi"><div class="n">${pool.filter(x => x.masso).length}</div><div class="l">clicaram num<br>anúncio de masso</div></div>
<div class="kpi"><div class="n">${fora.length}</div><div class="l">já compraram<br>(fora da lista)</div></div></div>

${t1.length ? `<div class="alert"><b>${t1.length} pessoas mandaram a última mensagem e ninguém respondeu.</b>
Não são curiosos: trocaram em média <b>${media} mensagens</b> com a escola antes do vácuo.
São as pessoas mais quentes que a Holos tem hoje, e a bola parou do nosso lado. <b>Começar por elas.</b></div>` : ''}

<h2>Como trabalhar</h2>
<ul class="rule">
<li><b>A primeira mensagem não vende — ela descobre o que travou.</b> Pergunta aberta, sem oferta.</li>
<li><b>A ordem importa.</b> Grupo 1 hoje, grupo 2 até amanhã, grupo 3 nesta semana.</li>
<li><b>Anotar o motivo na planilha</b> (valor, horário, indecisão, concorrente, sumiu) — é o que diz o que consertar no anúncio e na oferta, e é onde o time se coordena pra ninguém falar duas vezes com a mesma pessoa.</li>
<li>Quem aparece como <i>"só pelo ZenPro"</i> não tem telefone no banco — responder dentro da conversa.</li>
</ul>

${bloco(1, 'Agora', 'urg', 'Ficaram no vácuo', 'Conversaram com a gente e a última palavra foi delas. Ninguém respondeu.')}
<h3>Mensagem sugerida — grupo 1</h3>
<div class="script">Oi [Nome], aqui é a [seu nome] da Holos.<br><br>
Fui rever a nossa conversa sobre a formação em massoterapia e vi que <b>a última mensagem foi sua e a gente
não te respondeu</b>. Isso foi falha nossa, me desculpa de verdade.<br><br>
Você ainda está procurando? Me conta em que ponto você parou que eu resolvo daqui.</div>

${bloco(2, 'Até amanhã', '', 'No limite da janela', 'Clicaram no anúncio de masso e já têm 8 dias ou mais. Fecham agora ou esfriam.')}
<h3>Mensagem sugerida — grupo 2</h3>
<div class="script">Oi [Nome], aqui é a [seu nome] da Holos.<br><br>
Você procurou a gente semana passada sobre a <b>formação em massoterapia</b>. Não vim te empurrar nada —
só queria entender uma coisa: <b>o que ficou faltando pra você decidir?</b><br><br>
Se for valor, horário ou alguma dúvida específica, me fala que eu vejo o que consigo fazer por você.</div>

${bloco(3, 'Esta semana', '', 'Dentro da janela', 'Clicaram no anúncio de masso nos últimos dias. Ainda quentes.')}
<h3>Mensagem sugerida — grupo 3</h3>
<div class="script">Oi [Nome], aqui é a [seu nome] da Holos.<br><br>
Vi que você se interessou pela <b>formação em massoterapia</b> esses dias. Estou aqui pra tirar qualquer
dúvida — carga horária, valor, horários, como funciona o certificado.<br><br>
<b>O que você mais quer saber antes de decidir?</b></div>

<div class="grp"><div class="ghd"><span class="q">${G(4).length + G(5).length}</span>
<span class="ch">Depois</span><div class="t">Sem código de campanha</div>
<div class="s">Estão na planilha, não nesta página (${G(4).length} conversaram de verdade · ${G(5).length} mal falaram).
Como esse chip é o destino da verba de massoterapia, quase certamente também são leads de masso —
só não carimbaram a origem na entrada.</div></div></div>

<div class="foot">Holos Cursos e Terapias · ZenPro × Meta de Vendas · chip ${CHIP.slice(-4)}<br>
Planilha de trabalho: <b>repescagem-${slug}.csv</b> — é lá que o time anota contato, motivo e próximo passo</div>
</body></html>`, 'utf8');

// ------------------------------------------------------------------ 5. relatório
console.log(`\nREPESCAGEM ${DE} → ${ATE} · chip ${CHIP.slice(-4)}`);
console.log(`  estrearam .......... ${leads.length}`);
console.log(`  ja compraram ....... ${fora.length}  (fora da lista)`);
fora.forEach(f => console.log(`      ✓ ${f.v.nome} — entrou ${f.l.data}, origem ${f.l.origem}`));
console.log(`  NA LISTA ........... ${pool.length}`);
[1, 2, 3, 4, 5].forEach(n => console.log(`      grupo ${n} (${G(n)[0]?.quando ?? '-'}) ... ${G(n).length}`));
console.log(`  sem telefone (LID) . ${pool.filter(x => !x.tel).length}  → responder no ZenPro`);
console.log(`\n  saidas/repescagem-${slug}.csv   → subir no Drive (vira Google Sheets)`);
console.log(`  saidas/repescagem-${slug}.html  → PDF:`);
console.log(`     google-chrome --headless --no-pdf-header-footer \\`);
console.log(`       --print-to-pdf=saidas/repescagem-${slug}.pdf saidas/repescagem-${slug}.html\n`);
