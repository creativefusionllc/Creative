-- Blueprint Features: GMB, Website Write Access, Monitoring, Action Log
-- This completes the V0 Dev Blueprint requirements

-- 1. GMB (Google My Business) Integration
CREATE TABLE IF NOT EXISTS gmb_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  gmb_location_id TEXT,
  api_credentials JSONB,
  auto_reply_enabled BOOLEAN DEFAULT false,
  auto_post_enabled BOOLEAN DEFAULT false,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gmb_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gmb_profile_id UUID REFERENCES gmb_profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  reviewer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMPTZ,
  ai_reply_text TEXT,
  ai_replied_at TIMESTAMPTZ,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Website Write Access Configuration
CREATE TABLE IF NOT EXISTS website_write_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('wordpress', 'wix', 'shopify', 'custom')),
  api_url TEXT,
  api_key TEXT,
  api_secret TEXT,
  can_update_content BOOLEAN DEFAULT false,
  can_publish_posts BOOLEAN DEFAULT false,
  can_update_seo BOOLEAN DEFAULT false,
  last_access_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Website Monitoring
CREATE TABLE IF NOT EXISTS website_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  website_url TEXT NOT NULL,
  status TEXT DEFAULT 'unknown' CHECK (status IN ('online', 'offline', 'slow', 'unknown')),
  uptime_percentage DECIMAL(5,2),
  response_time_ms INTEGER,
  last_check_at TIMESTAMPTZ,
  performance_score INTEGER CHECK (performance_score >= 0 AND performance_score <= 100),
  mobile_score INTEGER CHECK (mobile_score >= 0 AND mobile_score <= 100),
  seo_score INTEGER CHECK (seo_score >= 0 AND seo_score <= 100),
  issues_detected JSONB DEFAULT '[]'::jsonb,
  ai_suggestions TEXT,
  alert_enabled BOOLEAN DEFAULT true,
  alert_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AI Action Log (Activity Feed for Clients)
CREATE TABLE IF NOT EXISTS ai_action_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN (
    'campaign_launched', 'review_replied', 'content_posted', 
    'lead_nurtured', 'website_updated', 'seo_optimized',
    'social_post_scheduled', 'email_sent', 'monitoring_alert'
  )),
  action_description TEXT NOT NULL,
  platform TEXT,
  results JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending')),
  visible_to_client BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gmb_profiles_client_id ON gmb_profiles(client_id);
CREATE INDEX IF NOT EXISTS idx_gmb_reviews_client_id ON gmb_reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_gmb_reviews_profile_id ON gmb_reviews(gmb_profile_id);
CREATE INDEX IF NOT EXISTS idx_website_write_config_client_id ON website_write_config(client_id);
CREATE INDEX IF NOT EXISTS idx_website_monitoring_client_id ON website_monitoring(client_id);
CREATE INDEX IF NOT EXISTS idx_ai_action_log_client_id ON ai_action_log(client_id);
CREATE INDEX IF NOT EXISTS idx_ai_action_log_created_at ON ai_action_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_action_log_visible ON ai_action_log(visible_to_client, created_at DESC);

-- Insert sample data for Creative Fusion to test
INSERT INTO ai_action_log (client_id, action_type, action_description, platform, results, visible_to_client)
SELECT 
  c.id,
  'campaign_launched',
  'AI launched Summer Promo campaign across Instagram, Facebook',
  'Social Media',
  jsonb_build_object(
    'impressions', 45230,
    'clicks', 1847,
    'conversions', 127,
    'spend', 8500
  ),
  true
FROM clients c
WHERE c.company_name = 'Creative Fusion'
LIMIT 1;

COMMENT ON TABLE gmb_profiles IS 'Stores Google My Business profile connections for each client';
COMMENT ON TABLE gmb_reviews IS 'Tracks GMB reviews and AI-generated replies';
COMMENT ON TABLE website_write_config IS 'Stores API credentials for website platforms to enable AI write access';
COMMENT ON TABLE website_monitoring IS 'Tracks website uptime, performance, and health metrics';
COMMENT ON TABLE ai_action_log IS 'Activity feed showing all AI actions performed for each client';
