CREATE TABLE public.training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  first_name text NOT NULL DEFAULT '',
  middle_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  district text NOT NULL DEFAULT '',
  certificate_name text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT 'en',
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  score integer,
  total_questions integer,
  passed boolean DEFAULT false,
  status text NOT NULL DEFAULT 'in_progress'
);

ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert sessions" ON public.training_sessions
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Users can view own sessions" ON public.training_sessions
  FOR SELECT TO public USING (
    user_id IS NULL OR auth.uid() = user_id
  );

CREATE POLICY "Users can update own sessions" ON public.training_sessions
  FOR UPDATE TO public USING (
    user_id IS NULL OR auth.uid() = user_id
  );

CREATE POLICY "Admins can view all sessions" ON public.training_sessions
  FOR SELECT TO public USING (
    public.has_role(auth.uid(), 'admin')
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.training_sessions;