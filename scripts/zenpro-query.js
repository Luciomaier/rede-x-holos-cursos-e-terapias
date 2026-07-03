#!/usr/bin/env node
// Consulta o banco do ZenPro (somente leitura). Uso:
//   node zenpro-query.js "select count(*) from conversations where organization_id='742cc473-e27e-4973-9b2d-bb9d88abda65'"
// Credencial: dados/.env.zenpro (fora do git). Precisa do pacote 'pg' (npm i pg).
const { Client } = require('pg'); const fs = require('fs'); const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '..', 'dados', '.env.zenpro'), 'utf8');
const pass = env.match(/claude_readonly:([^@]+)@/)[1];
const url = `postgresql://claude_readonly.wympympkabncrihdavxn:${pass}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`;
const sql = process.argv[2];
if (!sql) { console.error('passe o SQL como argumento'); process.exit(1); }
(async () => {
  const c = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await c.connect();
  const r = await c.query(sql);
  console.log(JSON.stringify(r.rows, null, 2));
  await c.end();
})().catch(e => { console.error(e.message); process.exit(1); });
