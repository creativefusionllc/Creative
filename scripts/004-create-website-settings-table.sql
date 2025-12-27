-- Create website_settings table for CMS
CREATE TABLE IF NOT EXISTS website_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Authenticated manage website_settings" ON website_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings
INSERT INTO website_settings (id, settings) VALUES ('main', '{
  "company_name": "Creative Fusion",
  "tagline": "Your Vision, Our Expertise",
  "email": "info@creativefusion.llc",
  "phone": "+971 58 117 4911",
  "address": "Sharjah Media City (SHAMS)",
  "city": "Sharjah",
  "country": "United Arab Emirates",
  "license_number": "2430411.01"
}')
ON CONFLICT (id) DO NOTHING;
