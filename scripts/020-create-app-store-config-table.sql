-- Create app_store_config table to manage iOS and Android app store links
CREATE TABLE IF NOT EXISTS public.app_store_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ios_app_id TEXT NOT NULL,
  ios_app_url TEXT,
  android_package_name TEXT NOT NULL,
  android_app_url TEXT,
  is_active BOOLEAN DEFAULT true,
  auto_redirect BOOLEAN DEFAULT true,
  show_banner_on_mobile BOOLEAN DEFAULT true,
  banner_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.app_store_config ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only admins can read/write
CREATE POLICY app_store_config_admin_policy
  ON public.app_store_config
  FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid()
    )
  );

-- Allow service role full access
ALTER TABLE public.app_store_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_role_access ON public.app_store_config
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
