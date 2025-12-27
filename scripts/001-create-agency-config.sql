CREATE TABLE IF NOT EXISTS agency_config (
  id text PRIMARY KEY DEFAULT 'main_config',
  credit_balance numeric DEFAULT 300.00,
  updated_at timestamp with time zone DEFAULT now()
);

INSERT INTO agency_config (id, credit_balance)
VALUES ('main_config', 300.00)
ON CONFLICT (id) DO NOTHING;
