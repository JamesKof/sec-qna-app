
CREATE OR REPLACE FUNCTION public.get_leaderboard(limit_count integer DEFAULT 10)
RETURNS TABLE(
  full_name text,
  best_score integer,
  total_questions integer,
  best_percentage integer,
  attempts bigint,
  latest_completed_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT
    COALESCE(NULLIF(tr.certificate_name, ''), p.full_name, 'Anonymous') as full_name,
    MAX(tr.score) as best_score,
    MAX(tr.total_questions) as total_questions,
    MAX(ROUND((tr.score::numeric / tr.total_questions) * 100))::integer as best_percentage,
    COUNT(*)::bigint as attempts,
    MAX(tr.completed_at) as latest_completed_at
  FROM training_records tr
  LEFT JOIN profiles p ON p.user_id = tr.user_id
  WHERE tr.passed = true
  GROUP BY tr.user_id, COALESCE(NULLIF(tr.certificate_name, ''), p.full_name, 'Anonymous')
  ORDER BY best_percentage DESC, latest_completed_at ASC
  LIMIT limit_count;
$$;
