-- Create website_cms_sections table for comprehensive website content management
CREATE TABLE IF NOT EXISTS website_cms_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  section_name TEXT NOT NULL,
  section_type TEXT NOT NULL, -- hero, services, about, portfolio, testimonials, pricing, cta, footer, etc.
  is_enabled BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- Content fields (JSON for flexibility)
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB DEFAULT '{}',
  
  -- Styling
  background_color TEXT,
  text_color TEXT,
  accent_color TEXT,
  background_image TEXT,
  font_family TEXT,
  font_size TEXT,
  
  -- Images and media
  images JSONB DEFAULT '[]',
  videos JSONB DEFAULT '[]',
  
  -- Items (for sections with multiple items like services, testimonials, etc.)
  items JSONB DEFAULT '[]',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE website_cms_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view enabled sections" ON website_cms_sections
  FOR SELECT USING (is_enabled = true);

CREATE POLICY "Authenticated users can manage sections" ON website_cms_sections
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default sections
INSERT INTO website_cms_sections (section_key, section_name, section_type, sort_order, title, subtitle, description, content, is_enabled) VALUES
-- Hero Section
('hero', 'Hero Section', 'hero', 1, 'Transform Your Brand With Creative Excellence', 'Premium digital solutions that elevate your business presence', 'Full-service creative agency delivering exceptional results', 
'{"slides": [
  {"title": "Transform Your Brand", "subtitle": "Creative Excellence", "cta_text": "Start Your Project", "cta_link": "/contact", "image": "/hero-slide-1.jpg"},
  {"title": "Photography Services", "subtitle": "Capturing Moments", "cta_text": "View Portfolio", "cta_link": "/portfolio", "image": "/hero-slide-2.jpg"},
  {"title": "Digital Marketing", "subtitle": "Growth Strategies", "cta_text": "Learn More", "cta_link": "/services", "image": "/hero-slide-3.jpg"}
], "stats": [
  {"value": "15+", "label": "Years Experience"},
  {"value": "500+", "label": "Projects Completed"},
  {"value": "200+", "label": "Happy Clients"},
  {"value": "98%", "label": "Client Satisfaction"}
]}'::jsonb, true),

-- Services Section
('services', 'Services Section', 'services', 2, 'Our Services', 'What We Offer', 'Comprehensive digital solutions for your business',
'{"display_count": 6, "show_view_all": true, "layout": "grid"}'::jsonb, true),

-- About Section
('about', 'About Section', 'about', 3, 'About Us', 'Who We Are', 'A team of passionate creatives and technologists',
'{"image": "/founder.jpg", "experience_years": 15, "features": [
  {"icon": "CheckCircle", "title": "Expert Team", "description": "Skilled professionals"},
  {"icon": "Award", "title": "Award Winning", "description": "Recognized excellence"},
  {"icon": "Users", "title": "Client Focused", "description": "Your success is our priority"}
]}'::jsonb, true),

-- Portfolio Section
('portfolio', 'Portfolio Section', 'portfolio', 4, 'Our Work', 'Featured Projects', 'Showcasing our best creative work',
'{"display_count": 6, "show_view_all": true, "layout": "bento"}'::jsonb, true),

-- Testimonials Section
('testimonials', 'Testimonials Section', 'testimonials', 5, 'Client Reviews', 'What Our Clients Say', 'Trusted by businesses across UAE and GCC',
'{"auto_scroll": true, "scroll_interval": 5000}'::jsonb, true),

-- Pricing Section
('pricing', 'Pricing Section', 'pricing', 6, 'Pricing Packages', 'Choose Your Plan', 'Flexible packages to suit your needs',
'{"show_categories": true, "auto_scroll_categories": true, "scroll_interval": 10000}'::jsonb, true),

-- CTA Section
('cta', 'CTA Section', 'cta', 7, 'Ready to Start?', 'Let''s Create Something Amazing', 'Contact us today to discuss your project',
'{"cta_text": "Get Started", "cta_link": "/contact", "show_phone": true, "show_email": true, "show_whatsapp": true}'::jsonb, true),

-- Why Choose Section
('why_choose', 'Why Choose Us', 'features', 8, 'Why Choose Us', 'Our Advantages', 'What makes us different',
'{"features": [
  {"icon": "Target", "title": "Strategic Approach", "description": "Data-driven strategies"},
  {"icon": "TrendingUp", "title": "Measurable ROI", "description": "Track your success"},
  {"icon": "Users", "title": "Expert Team", "description": "Industry professionals"},
  {"icon": "Clock", "title": "Fast Turnaround", "description": "Quick delivery"}
]}'::jsonb, true),

-- Process Section
('process', 'Our Process', 'process', 9, 'Our Process', 'How We Work', 'Simple steps to success',
'{"steps": [
  {"number": 1, "title": "Discovery", "description": "Understanding your needs"},
  {"number": 2, "title": "Strategy", "description": "Planning the approach"},
  {"number": 3, "title": "Creation", "description": "Bringing ideas to life"},
  {"number": 4, "title": "Delivery", "description": "Launch and support"}
]}'::jsonb, true),

-- Trust Badges Section
('trust_badges', 'Trust Badges', 'trust', 10, 'Trusted By', 'Our Certifications', 'Quality assurance',
'{"badges": [
  {"icon": "Award", "title": "ISO Certified", "description": "Quality management"},
  {"icon": "Shield", "title": "Secure", "description": "Data protection"},
  {"icon": "Clock", "title": "24/7 Support", "description": "Always available"}
]}'::jsonb, true),

-- Blog Section
('blog', 'Blog Section', 'blog', 11, 'Latest Insights', 'From Our Blog', 'Stay updated with industry trends',
'{"display_count": 3, "show_view_all": true}'::jsonb, true),

-- Booking Section
('booking', 'Booking Section', 'booking', 12, 'Book a Consultation', 'Get Started Today', 'Schedule your free consultation',
'{"show_services": true, "show_calendar": true}'::jsonb, true)

ON CONFLICT (section_key) DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cms_sections_key ON website_cms_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_cms_sections_type ON website_cms_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_cms_sections_enabled ON website_cms_sections(is_enabled);

-- Create social_calendar table if not exists (for AI social media posting)
CREATE TABLE IF NOT EXISTS social_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  social_account_id UUID REFERENCES social_accounts(id),
  
  -- Post content
  title TEXT NOT NULL,
  caption TEXT,
  hashtags TEXT[],
  media_urls TEXT[],
  
  -- Scheduling
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  timezone TEXT DEFAULT 'Asia/Dubai',
  
  -- Platform info
  platform TEXT NOT NULL, -- instagram, facebook, linkedin, twitter, tiktok, youtube
  content_type TEXT NOT NULL, -- post, reel, story, carousel, video, short
  
  -- AI features
  ai_generated BOOLEAN DEFAULT false,
  ai_prompt TEXT,
  ai_suggestions JSONB,
  
  -- Status
  status TEXT DEFAULT 'draft', -- draft, scheduled, pending_approval, approved, published, failed
  published_at TIMESTAMPTZ,
  publish_error TEXT,
  
  -- Engagement tracking
  engagement_likes INTEGER DEFAULT 0,
  engagement_comments INTEGER DEFAULT 0,
  engagement_shares INTEGER DEFAULT 0,
  engagement_views INTEGER DEFAULT 0,
  engagement_saves INTEGER DEFAULT 0,
  
  -- Approvals
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on social_calendar
ALTER TABLE social_calendar ENABLE ROW LEVEL SECURITY;

-- RLS Policies for social_calendar
CREATE POLICY "Authenticated can manage social_calendar" ON social_calendar
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients can view own approved posts" ON social_calendar
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
    AND status IN ('approved', 'published', 'scheduled')
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_social_calendar_client ON social_calendar(client_id);
CREATE INDEX IF NOT EXISTS idx_social_calendar_date ON social_calendar(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_social_calendar_platform ON social_calendar(platform);
CREATE INDEX IF NOT EXISTS idx_social_calendar_status ON social_calendar(status);
