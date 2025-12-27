-- Blog Tables Creation
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#C4D600',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Script 005 already creates blog_posts with INSERT statements for sample data
-- Removed duplicate blog_posts table creation - using script 005 instead

CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view active categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage categories" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view published posts" ON blog_posts FOR SELECT USING (status = 'published' AND published_at <= NOW());
CREATE POLICY "Authenticated can manage posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view approved comments" ON blog_comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can insert comments" ON blog_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can manage comments" ON blog_comments FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_approved ON blog_comments(is_approved);
