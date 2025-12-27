-- Ensure Lead Generation & CRM tables exist
-- This script is idempotent (safe to run multiple times)

-- Create leads table if not exists
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  country TEXT NOT NULL DEFAULT 'UAE',
  city TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  priority TEXT NOT NULL DEFAULT 'medium',
  service_interest TEXT[],
  budget_range TEXT,
  notes TEXT,
  lead_score INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES auth.users(id),
  converted_to_client_id UUID REFERENCES clients(id),
  converted_at TIMESTAMP WITH TIME ZONE,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  next_followup_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_activities table if not exists
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  outcome TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_sources table if not exists
CREATE TABLE IF NOT EXISTS lead_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  campaign_id TEXT,
  cost NUMERIC DEFAULT 0,
  leads_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lead_social_connections table if not exists
CREATE TABLE IF NOT EXISTS lead_social_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  username TEXT,
  profile_url TEXT,
  profile_image_url TEXT,
  bio TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  engagement_rate NUMERIC DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_lead_sources table if not exists
CREATE TABLE IF NOT EXISTS social_lead_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  social_account_id UUID REFERENCES social_accounts(id),
  source_type TEXT NOT NULL,
  source_post_url TEXT,
  source_post_id TEXT,
  campaign_name TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_lead_sources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads
DROP POLICY IF EXISTS "Authenticated manage leads" ON leads;
CREATE POLICY "Authenticated manage leads" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for lead_activities
DROP POLICY IF EXISTS "Authenticated manage lead_activities" ON lead_activities;
CREATE POLICY "Authenticated manage lead_activities" ON lead_activities
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for lead_sources
DROP POLICY IF EXISTS "Authenticated manage lead_sources" ON lead_sources;
CREATE POLICY "Authenticated manage lead_sources" ON lead_sources
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for lead_social_connections
DROP POLICY IF EXISTS "Auth manage lead_social_connections" ON lead_social_connections;
CREATE POLICY "Auth manage lead_social_connections" ON lead_social_connections
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for social_lead_sources
DROP POLICY IF EXISTS "Auth manage social_lead_sources" ON social_lead_sources;
CREATE POLICY "Auth manage social_lead_sources" ON social_lead_sources
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_country ON leads(country);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_social_connections_lead_id ON lead_social_connections(lead_id);

SELECT 'Lead Generation & CRM tables are ready! Your system is fully functional.' as message;
