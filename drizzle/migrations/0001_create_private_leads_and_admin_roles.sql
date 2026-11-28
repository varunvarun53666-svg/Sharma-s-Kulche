CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_type TEXT NOT NULL CHECK (lead_type IN ('catering', 'franchise')),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  phone TEXT NOT NULL CHECK (phone ~ '^[0-9]{10}$'),
  email TEXT,
  event_type TEXT,
  guests INTEGER CHECK (guests IS NULL OR guests BETWEEN 1 AND 100000),
  event_date DATE,
  branch TEXT,
  city TEXT,
  budget TEXT,
  has_property BOOLEAN,
  experience TEXT,
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1200),
  source_page TEXT NOT NULL DEFAULT '/',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted'))
);
GRANT SELECT ON public.leads TO authenticated;
GRANT UPDATE (status) ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read leads"
ON public.leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can mark leads contacted"
ON public.leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.lead_rate_limits (
  key_hash TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  attempt_count INTEGER NOT NULL DEFAULT 0
);
GRANT ALL ON public.lead_rate_limits TO service_role;
ALTER TABLE public.lead_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_lead_rate_limit(
  p_key_hash TEXT,
  p_limit INTEGER,
  p_window_seconds INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO public.lead_rate_limits (key_hash, window_started_at, attempt_count)
  VALUES (p_key_hash, now(), 1)
  ON CONFLICT (key_hash) DO UPDATE SET
    window_started_at = CASE
      WHEN public.lead_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
      THEN now()
      ELSE public.lead_rate_limits.window_started_at
    END,
    attempt_count = CASE
      WHEN public.lead_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
      THEN 1
      ELSE public.lead_rate_limits.attempt_count + 1
    END
  RETURNING attempt_count INTO v_count;

  RETURN v_count <= p_limit;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_lead_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_lead_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;