-- CMS Services Table (Main Services)
CREATE TABLE IF NOT EXISTS cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  short_description TEXT,
  icon_name TEXT DEFAULT 'Briefcase',
  hero_image TEXT,
  thumbnail_image TEXT,
  
  -- Styling
  primary_color TEXT DEFAULT '#C4D600',
  secondary_color TEXT DEFAULT '#1C1C1C',
  text_color TEXT DEFAULT '#111827',
  background_color TEXT DEFAULT '#FFFFFF',
  
  -- Typography
  heading_font TEXT DEFAULT 'Inter',
  body_font TEXT DEFAULT 'Inter',
  heading_size TEXT DEFAULT '4xl',
  body_size TEXT DEFAULT 'base',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,
  
  -- Settings
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMS Sub-Services Table
CREATE TABLE IF NOT EXISTS cms_sub_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  short_description TEXT,
  icon_name TEXT DEFAULT 'Star',
  hero_image TEXT,
  thumbnail_image TEXT,
  
  -- Styling (inherits from parent if null)
  primary_color TEXT,
  secondary_color TEXT,
  text_color TEXT,
  background_color TEXT,
  
  -- Typography
  heading_font TEXT,
  body_font TEXT,
  heading_size TEXT,
  body_size TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,
  
  -- Settings
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(service_id, slug)
);

-- CMS Service Features
CREATE TABLE IF NOT EXISTS cms_service_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '✨',
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- CMS Service Pricing
CREATE TABLE IF NOT EXISTS cms_service_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  price_suffix TEXT DEFAULT '',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Styling
  background_color TEXT,
  text_color TEXT,
  button_color TEXT,
  button_text_color TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- CMS Service Gallery
CREATE TABLE IF NOT EXISTS cms_service_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- CMS Service FAQs
CREATE TABLE IF NOT EXISTS cms_service_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- CMS Service Testimonials
CREATE TABLE IF NOT EXISTS cms_service_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_image TEXT,
  rating INTEGER DEFAULT 5,
  testimonial TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- CMS Service CTAs (Call to Action sections)
CREATE TABLE IF NOT EXISTS cms_service_ctas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  sub_service_id UUID REFERENCES cms_sub_services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  button_text TEXT DEFAULT 'Get Started',
  button_url TEXT DEFAULT '/contact',
  secondary_button_text TEXT,
  secondary_button_url TEXT,
  background_color TEXT DEFAULT '#C4D600',
  text_color TEXT DEFAULT '#111827',
  position TEXT DEFAULT 'bottom',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (service_id IS NOT NULL OR sub_service_id IS NOT NULL)
);

-- Enable RLS
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sub_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_ctas ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read cms_services" ON cms_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_sub_services" ON cms_sub_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_features" ON cms_service_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_pricing" ON cms_service_pricing FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_gallery" ON cms_service_gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_faqs" ON cms_service_faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_testimonials" ON cms_service_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read cms_service_ctas" ON cms_service_ctas FOR SELECT USING (is_active = true);

-- Auth manage policies
CREATE POLICY "Auth manage cms_services" ON cms_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_sub_services" ON cms_sub_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_features" ON cms_service_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_pricing" ON cms_service_pricing FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_gallery" ON cms_service_gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_faqs" ON cms_service_faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_testimonials" ON cms_service_testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage cms_service_ctas" ON cms_service_ctas FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_cms_services_slug ON cms_services(slug);
CREATE INDEX idx_cms_services_active ON cms_services(is_active);
CREATE INDEX idx_cms_sub_services_service ON cms_sub_services(service_id);
CREATE INDEX idx_cms_sub_services_slug ON cms_sub_services(slug);
