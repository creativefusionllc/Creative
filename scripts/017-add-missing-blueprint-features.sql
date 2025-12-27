-- Add missing features from V0 Blueprint

-- Add website monitoring table
CREATE TABLE IF NOT EXISTS website_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL,
  
  -- Monitoring Data
  status TEXT DEFAULT 'unknown', -- up, down, slow, unknown
  response_time_ms INTEGER,
  uptime_percentage NUMERIC(5,2) DEFAULT 100.00,
  last_check_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_downtime_at TIMESTAMP WITH TIME ZONE,
  
  -- Performance Metrics
  page_speed_score INTEGER, -- 0-100
  mobile_speed_score INTEGER, -- 0-100
  seo_score INTEGER, -- 0-100
  
  -- AI Recommendations
  ai_issues JSONB DEFAULT '[]',
  ai_suggestions JSONB DEFAULT '[]',
  
  -- Alerts
  alerts_enabled BOOLEAN DEFAULT true,
  alert_email TEXT,
  alert_threshold_ms INTEGER DEFAULT 3000,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add GMB (Google Business) integration table
CREATE TABLE IF NOT EXISTS gmb_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- GMB Details
  business_name TEXT NOT NULL,
  gmb_id TEXT UNIQUE,
  place_id TEXT,
  
  -- Location
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  lat NUMERIC,
  lng NUMERIC,
  
  -- Business Info
  phone TEXT,
  website TEXT,
  category TEXT,
  
  -- Stats
  average_rating NUMERIC(3,2),
  total_reviews INTEGER DEFAULT 0,
  total_photos INTEGER DEFAULT 0,
  
  -- API Connection
  api_connected BOOLEAN DEFAULT false,
  api_access_token TEXT,
  api_refresh_token TEXT,
  api_token_expiry TIMESTAMP WITH TIME ZONE,
  
  -- AI Features
  auto_reply_enabled BOOLEAN DEFAULT false,
  auto_post_enabled BOOLEAN DEFAULT false,
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft', -- draft, pending, active, suspended
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add GMB reviews table
CREATE TABLE IF NOT EXISTS gmb_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gmb_profile_id UUID REFERENCES gmb_profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Review Details
  review_id TEXT UNIQUE,
  reviewer_name TEXT,
  reviewer_photo_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMP WITH TIME ZONE,
  
  -- Reply
  has_reply BOOLEAN DEFAULT false,
  reply_text TEXT,
  reply_date TIMESTAMP WITH TIME ZONE,
  reply_by TEXT, -- 'ai' or 'manual'
  
  -- AI Analysis
  sentiment TEXT, -- positive, negative, neutral
  ai_suggested_reply TEXT,
  ai_keywords JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add AI action log table (for Action Feed)
CREATE TABLE IF NOT EXISTS ai_action_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Action Details
  action_type TEXT NOT NULL, -- 'campaign_launched', 'review_replied', 'content_posted', 'lead_nurtured', 'website_updated', 'seo_optimized'
  action_title TEXT NOT NULL,
  action_description TEXT,
  
  -- Results
  results JSONB DEFAULT '{}',
  success BOOLEAN DEFAULT true,
  
  -- Visibility
  is_visible_to_client BOOLEAN DEFAULT true,
  
  -- Related Entities
  related_entity_type TEXT, -- 'campaign', 'review', 'post', 'lead', 'page'
  related_entity_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add website write access config
CREATE TABLE IF NOT EXISTS website_write_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  domain_id UUID REFERENCES client_domains(id),
  
  -- Platform
  platform TEXT, -- 'wordpress', 'wix', 'shopify', 'custom'
  
  -- API Credentials
  api_url TEXT,
  api_key TEXT,
  api_secret TEXT,
  username TEXT,
  
  -- Permissions
  can_update_content BOOLEAN DEFAULT false,
  can_publish_posts BOOLEAN DEFAULT false,
  can_update_seo BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT false,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE website_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE gmb_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gmb_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_action_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_write_config ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Auth manage website_monitoring" ON website_monitoring FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage gmb_profiles" ON gmb_profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage gmb_reviews" ON gmb_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage ai_action_log" ON ai_action_log FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Clients view their action log" ON ai_action_log FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()) AND is_visible_to_client = true);
CREATE POLICY "Auth manage website_write_config" ON website_write_config FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_website_monitoring_client_id ON website_monitoring(client_id);
CREATE INDEX IF NOT EXISTS idx_gmb_profiles_client_id ON gmb_profiles(client_id);
CREATE INDEX IF NOT EXISTS idx_gmb_reviews_gmb_profile_id ON gmb_reviews(gmb_profile_id);
CREATE INDEX IF NOT EXISTS idx_ai_action_log_client_id ON ai_action_log(client_id);
CREATE INDEX IF NOT EXISTS idx_ai_action_log_created_at ON ai_action_log(created_at DESC);

SELECT 'Blueprint features added! You now have: Website Monitoring, GMB Integration, Review Management, AI Action Feed, and Website Write Access.' as message;
