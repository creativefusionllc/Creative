-- Create comprehensive website content tables for full CMS functionality

-- Hero Section Content
CREATE TABLE IF NOT EXISTS website_hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  subheadline TEXT,
  cta_button_text TEXT,
  cta_button_url TEXT,
  background_image_url TEXT,
  background_color TEXT,
  text_color TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Services Content (replaces hardcoded services)
CREATE TABLE IF NOT EXISTS website_services_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id),
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  icon_name TEXT,
  category TEXT,
  equipment TEXT,
  technologies JSONB,
  benefits JSONB,
  subservices JSONB,
  display_order INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Testimonials Content
CREATE TABLE IF NOT EXISTS website_testimonials_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_title TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER,
  client_image_url TEXT,
  service_category TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Pricing Packages Content
CREATE TABLE IF NOT EXISTS website_pricing_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  currency TEXT DEFAULT 'AED',
  features JSONB,
  is_popular BOOLEAN DEFAULT false,
  button_text TEXT,
  button_url TEXT,
  display_order INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- About Section Content
CREATE TABLE IF NOT EXISTS website_about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  image_url TEXT,
  background_color TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Process/Steps Section
CREATE TABLE IF NOT EXISTS website_process_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Blog Section Content
CREATE TABLE IF NOT EXISTS website_blog_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  category TEXT,
  author TEXT,
  read_time INTEGER,
  is_published BOOLEAN DEFAULT false,
  publish_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Footer Content
CREATE TABLE IF NOT EXISTS website_footer_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  company_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  whatsapp_number TEXT,
  address TEXT,
  copyright_text TEXT,
  social_links JSONB,
  quick_links JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Global Settings (Header, Meta tags, etc.)
CREATE TABLE IF NOT EXISTS website_global_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID
);

-- Enable RLS for all content tables
ALTER TABLE website_hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_testimonials_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_pricing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_process_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_blog_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_global_content ENABLE ROW LEVEL SECURITY;

-- Public can read published content, authenticated can manage all
CREATE POLICY "public_read_hero" ON website_hero_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_hero" ON website_hero_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_services" ON website_services_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_services" ON website_services_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_testimonials" ON website_testimonials_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_testimonials" ON website_testimonials_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_pricing" ON website_pricing_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_pricing" ON website_pricing_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_about" ON website_about_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_about" ON website_about_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_process" ON website_process_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_process" ON website_process_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_blog" ON website_blog_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_blog" ON website_blog_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_footer" ON website_footer_content FOR SELECT USING (is_published = true);
CREATE POLICY "auth_manage_footer" ON website_footer_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_global" ON website_global_content FOR SELECT USING (true);
CREATE POLICY "auth_manage_global" ON website_global_content FOR ALL USING (auth.role() = 'authenticated');
