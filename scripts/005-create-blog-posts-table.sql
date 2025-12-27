-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  read_time INTEGER DEFAULT 5,
  author_id UUID REFERENCES auth.users(id),
  author_name VARCHAR(255),
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Authenticated users can manage all posts
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, status, read_time, author_name, published_at) VALUES
(
  'The Future of Digital Marketing in UAE 2025',
  'future-digital-marketing-uae-2025',
  'Discover the latest trends shaping digital marketing in the UAE and how businesses can stay ahead of the competition.',
  '<p>The digital marketing landscape in the UAE is evolving rapidly...</p>',
  '/placeholder.svg?height=400&width=600',
  'Digital Marketing',
  ARRAY['digital marketing', 'UAE', 'trends', '2025'],
  'published',
  8,
  'Creative Fusion Team',
  NOW()
),
(
  'Brand Identity Design: A Complete Guide',
  'brand-identity-design-complete-guide',
  'Learn how to create a powerful brand identity that resonates with your target audience and stands out in the market.',
  '<p>A strong brand identity is essential for business success...</p>',
  '/placeholder.svg?height=400&width=600',
  'Branding',
  ARRAY['branding', 'design', 'identity', 'logo'],
  'published',
  10,
  'Creative Fusion Team',
  NOW()
),
(
  'SEO Strategies That Actually Work in 2025',
  'seo-strategies-that-work-2025',
  'Proven SEO techniques to improve your website ranking and drive organic traffic to your business.',
  '<p>Search engine optimization continues to be crucial...</p>',
  '/placeholder.svg?height=400&width=600',
  'SEO',
  ARRAY['SEO', 'search engine', 'optimization', 'ranking'],
  'published',
  7,
  'Creative Fusion Team',
  NOW()
);
