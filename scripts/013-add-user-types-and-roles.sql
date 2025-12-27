-- Add user types and roles system

-- Add user_type column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'client' CHECK (user_type IN ('client', 'agent', 'agency', 'freelancer'));
ALTER TABLE clients ADD COLUMN IF NOT EXISTS specializations TEXT[];
ALTER TABLE clients ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS portfolio_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS experience_years INTEGER;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable'));
ALTER TABLE clients ADD COLUMN IF NOT EXISTS profile_images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS skills TEXT[];
ALTER TABLE clients ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb;

-- Create super admin roles table
CREATE TABLE IF NOT EXISTS super_admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name TEXT UNIQUE NOT NULL,
  role_level INTEGER NOT NULL,
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user rights management table
CREATE TABLE IF NOT EXISTS user_rights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES super_admin_roles(id) ON DELETE CASCADE,
  module_access JSONB DEFAULT '{}'::jsonb,
  can_view BOOLEAN DEFAULT true,
  can_create BOOLEAN DEFAULT false,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  can_approve BOOLEAN DEFAULT false,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create freelancer marketplace table
CREATE TABLE IF NOT EXISTS freelancer_marketplace (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min NUMERIC,
  budget_max NUMERIC,
  duration_days INTEGER,
  required_skills TEXT[],
  posted_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES clients(id),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create freelancer bids table
CREATE TABLE IF NOT EXISTS freelancer_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES freelancer_marketplace(id) ON DELETE CASCADE,
  freelancer_id UUID REFERENCES clients(id),
  bid_amount NUMERIC NOT NULL,
  delivery_days INTEGER NOT NULL,
  cover_letter TEXT,
  portfolio_links TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create freelancer reviews table
CREATE TABLE IF NOT EXISTS freelancer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES freelancer_marketplace(id),
  freelancer_id UUID REFERENCES clients(id),
  reviewer_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  timeliness_rating INTEGER CHECK (timeliness_rating >= 1 AND timeliness_rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default super admin roles
INSERT INTO super_admin_roles (role_name, role_level, permissions) VALUES
('Super Admin', 100, '{"all": true}'::jsonb),
('Admin', 80, '{"users": true, "content": true, "settings": true}'::jsonb),
('Manager', 60, '{"content": true, "reports": true}'::jsonb),
('Editor', 40, '{"content": true}'::jsonb),
('Viewer', 20, '{"view_only": true}'::jsonb)
ON CONFLICT (role_name) DO NOTHING;

-- Enable RLS
ALTER TABLE super_admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rights ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Auth manage super_admin_roles" ON super_admin_roles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage user_rights" ON user_rights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage freelancer_marketplace" ON freelancer_marketplace FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage freelancer_bids" ON freelancer_bids FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage freelancer_reviews" ON freelancer_reviews FOR ALL USING (auth.role() = 'authenticated');
