-- ============================================================================
-- PROVA DOS NOVE — leads por NÚMERO e por CANAL (ZenPro)
--
-- Rodar:  node scripts/zenpro-query.js "$(grep -v '^--' scripts/zenpro-leads-por-numero.sql)"
--         (ou colar direto no SQL Editor do Supabase)
--
-- Trocar as datas nos dois lugares marcados >>> JANELA <<<
--
-- POR QUE ESSA QUERY EXISTE (13/07/2026):
--   A Holos tem 8 números conectados no ZenPro. Contar `conversations` da org inteira
--   NÃO dá "leads de massoterapia" — mistura Recepção, ADM/RH, Cris(cabala), estágio
--   social e auriculoterapia. No D1 de julho isso deu 445 quando o real de masso era 148.
--
-- RÉGUA DE LEAD MASSO (canon):
--   Google     = tracking_code LIKE 'GC-%'
--   Instagram  = tracking_code LIKE 'IS-%' OR 'FB-%' OR = 'mensalistas'
--   Orgânico   = tracking_code = 'OR-massoterapia'
--   FORA       = 'estagio-social', 'auriculo_google', 'WC-%', IDs numéricos órfãos
--   sem código = não classificável → fora da capa, citado em nota
--
-- ⚠️ ONDE NASCE ≠ ONDE É ATENDIDO (Lucio, 13/07/2026):
--   `tracking_code`       = ONDE O LEAD NASCEU (o anúncio que ele clicou). Cola na conversa. ✅ é a régua.
--   `whatsapp_session_id` = QUEM ATENDEU. **MUDA** — quando o chip da Recepção fala com o lead,
--                            a conversa passa a contar pra ela. NÃO usar pra medir origem.
--   Prova: 14 leads `FB-69e9d0` (anúncio de masso, o mesmo que fechou a matrícula do Alex dos Santos)
--   aparecem na Recepção. Nasceram no Facebook; a Recepção só atendeu.
--   → POR ISSO esta query agrupa por número só pra AUDITORIA de atendimento.
--     O número do relatório (lead masso) sai do `tracking_code`, SEM filtrar por número.
--
-- Roteamento da verba (Lucio): anúncio de MASSO → telefone da Lu (8429) · CURSOS LIVRES → Giovanna (Com.2).
--
-- Números (jul/2026):
--   vendas - 8429  (5511976378429) comercial-1 → Luciana/Leo/Laura. Destino da verba de MASSO.
--                                   Os 110 sem-ref daqui quase certamente SÃO masso → o 148 é PISO, não teto.
--   Com.2          (5511976994647) comercial-2 → Giovanna. Destino da verba de CURSOS LIVRES.
--   Recepção       (5511989889617) recepcao    → cai estágio social/auriculo + rouba atribuição de atendimento
--   ADM-6672 · Cris-cabala · Holos-Antigo-5303 · HolosEAD · disparos-3131
-- ============================================================================

SELECT
  s.channel_name                                                                  AS numero,
  s.department                                                                     AS depto,
  COUNT(*) FILTER (WHERE c.tracking_code LIKE 'GC-%')                              AS google_com_ref,
  COUNT(*) FILTER (WHERE c.tracking_code LIKE 'IS-%'
                      OR c.tracking_code LIKE 'FB-%'
                      OR c.tracking_code =  'mensalistas')                         AS instagram_com_ref,
  COUNT(*) FILTER (WHERE c.tracking_code =  'OR-massoterapia')                     AS organico_masso,
  COUNT(*) FILTER (WHERE c.tracking_code LIKE 'GC-%'
                      OR c.tracking_code LIKE 'IS-%'
                      OR c.tracking_code LIKE 'FB-%'
                      OR c.tracking_code =  'mensalistas'
                      OR c.tracking_code =  'OR-massoterapia')                     AS masso_total,
  COUNT(*) FILTER (WHERE c.tracking_code IN ('estagio-social','auriculo_google'))  AS nao_masso,
  COUNT(*) FILTER (WHERE COALESCE(NULLIF(c.tracking_code,''),'') = '')             AS sem_ref,
  COUNT(*)                                                                         AS total_bruto
FROM conversations c
JOIN whatsapp_sessions s ON s.id = c.whatsapp_session_id
WHERE c.organization_id = '742cc473-e27e-4973-9b2d-bb9d88abda65'   -- Holos (multi-tenant!)
  AND NOT c.is_group
  AND (c.created_at AT TIME ZONE 'America/Sao_Paulo')::date
      BETWEEN '2026-07-01' AND '2026-07-10'                        -- >>> JANELA <<<
GROUP BY s.channel_name, s.department
ORDER BY masso_total DESC;

-- ----------------------------------------------------------------------------
-- VARIANTE: só o número da Luciana (vendas - 8429), detalhado por origem
-- ----------------------------------------------------------------------------
-- SELECT
--   CASE
--     WHEN c.tracking_code LIKE 'GC-%'                             THEN '1. Google (com ref#)'
--     WHEN c.tracking_code LIKE 'IS-%' OR c.tracking_code LIKE 'FB-%'
--          OR c.tracking_code = 'mensalistas'                      THEN '2. Instagram/Meta (com ref#)'
--     WHEN c.tracking_code = 'OR-massoterapia'                     THEN '3. Orgânico masso (com ref#)'
--     WHEN c.tracking_code IN ('estagio-social','auriculo_google') THEN '4. Outro produto (não é masso)'
--     WHEN COALESCE(NULLIF(c.tracking_code,''),'') <> ''           THEN '5. Outro código'
--     WHEN COALESCE(NULLIF(c.campaign_source,''),'') <> ''         THEN '6. SEM ref# — mas com fonte: ' || c.campaign_source
--     ELSE                                                              '7. SEM ref# e SEM fonte (chip manual)'
--   END AS origem,
--   COUNT(*) AS leads
-- FROM conversations c
-- JOIN whatsapp_sessions s ON s.id = c.whatsapp_session_id
-- WHERE c.organization_id = '742cc473-e27e-4973-9b2d-bb9d88abda65'
--   AND s.phone_number = '5511976378429'
--   AND NOT c.is_group
--   AND (c.created_at AT TIME ZONE 'America/Sao_Paulo')::date
--       BETWEEN '2026-07-01' AND '2026-07-10'                      -- >>> JANELA <<<
-- GROUP BY 1 ORDER BY 1;

-- RESULTADO CONFERIDO — D1 julho/2026 (01–10):
--   vendas-8429   G 77 · I 38 · org 9 · MASSO 124 · não-masso 0 · sem-ref 110 · bruto 234
--   Recepção      G  1 · I 15 · org 0 · MASSO  16 · não-masso 39 · sem-ref  33 · bruto  89
--   Com.2         G  6 · I  2 · org 0 · MASSO   8 · não-masso 14 · sem-ref  88 · bruto 111
--   outros        —                     MASSO   0                 sem-ref  11 · bruto  11
--   TOTAL         G 84 · I 55 · org 9 · MASSO 148 · não-masso 53 · sem-ref 242 · bruto 445
