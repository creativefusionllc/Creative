-- Create portfolio categories table
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create portfolio projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES portfolio_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  client_name TEXT,
  featured_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create portfolio images table with orientation detection
CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  orientation TEXT, -- 'portrait', 'landscape', 'square'
  width INT,
  height INT,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Create CMS pages table
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  page_type TEXT NOT NULL, -- 'home', 'about', 'services', 'blog', 'contact', 'custom'
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  content JSONB, -- Store page sections and content
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create CMS page sections table
CREATE TABLE IF NOT EXISTS cms_page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- 'hero', 'content', 'gallery', 'testimonials', 'cta', 'form'
  section_title TEXT,
  section_content JSONB, -- Flexible content structure
  background_image TEXT,
  background_color TEXT,
  text_color TEXT,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_page_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public reading
CREATE POLICY "Allow public reading portfolio categories"
  ON portfolio_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow public reading published portfolio projects"
  ON portfolio_projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow public reading portfolio images"
  ON portfolio_images FOR SELECT
  USING (true);

CREATE POLICY "Allow public reading published CMS pages"
  ON cms_pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "Allow public reading visible CMS sections"
  ON cms_page_sections FOR SELECT
  USING (is_visible = true);

-- RLS Policies for admin operations
CREATE POLICY "Allow admin to manage portfolio categories"
  ON portfolio_categories FOR ALL
  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Allow admin to manage portfolio projects"
  ON portfolio_projects FOR ALL
  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Allow admin to manage portfolio images"
  ON portfolio_images FOR ALL
  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Allow admin to manage CMS pages"
  ON cms_pages FOR ALL
  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Allow admin to manage CMS page sections"
  ON cms_page_sections FOR ALL
  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND role = 'super_admin'));
