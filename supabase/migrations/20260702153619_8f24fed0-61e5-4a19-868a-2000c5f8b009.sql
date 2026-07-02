CREATE TABLE IF NOT EXISTS public.presale_settings (
  id int PRIMARY KEY DEFAULT 1,
  start_time timestamptz,
  CONSTRAINT single_row CHECK (id = 1)
);

GRANT SELECT, UPDATE ON public.presale_settings TO anon;
GRANT SELECT, UPDATE ON public.presale_settings TO authenticated;
GRANT ALL ON public.presale_settings TO service_role;

INSERT INTO public.presale_settings (id, start_time)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.presale_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública do horário da pré-venda"
  ON public.presale_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Atualização pública do horário da pré-venda"
  ON public.presale_settings FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (id = 1);