-- Add client types (Client, Agent, Agency, Freelancer)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_type TEXT DEFAULT 'client' CHECK (client_type IN ('client', 'agent', 'agency', 'freelancer'));
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'banned'));
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS skills TEXT[];
ALTER TABLE clients ADD COLUMN IF NOT EXISTS portfolio_images TEXT[];
ALTER TABLE clients ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS availability TEXT;

-- Super Admin and User Rights Management
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'manager', 'client', 'agent', 'agency', 'freelancer')),
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, role)
);

CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  module TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, permission_id)
);

-- Freelancer Projects
CREATE TABLE IF NOT EXISTS freelancer_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES erp_projects(id) ON DELETE CASCADE,
  freelancer_id UUID REFERENCES clients(id),
  hired_by UUID REFERENCES auth.users(id),
  budget NUMERIC NOT NULL,
  deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security and CAPTCHA
CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address TEXT,
  success BOOLEAN DEFAULT FALSE,
  failure_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clients ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMPTZ;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- Insert default permissions
INSERT INTO permissions (code, name, description, module) VALUES
('view_dashboard', 'View Dashboard', 'Access to main dashboard', 'dashboard'),
('manage_clients', 'Manage Clients', 'Create, edit, delete clients', 'clients'),
('manage_projects', 'Manage Projects', 'Create, edit, delete projects', 'projects'),
('manage_invoices', 'Manage Invoices', 'Create, edit, delete invoices', 'invoices'),
('manage_bookings', 'Manage Bookings', 'View and manage bookings', 'bookings'),
('view_reports', 'View Reports', 'Access to reports', 'reports'),
('manage_cms', 'Manage CMS', 'Edit website content', 'cms'),
('manage_users', 'Manage Users', 'Create and manage users', 'users'),
('manage_permissions', 'Manage Permissions', 'Assign permissions and roles', 'permissions'),
('view_analytics', 'View Analytics', 'Access to analytics', 'analytics')
ON CONFLICT (code) DO NOTHING;

-- Super admin gets all permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'super_admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- Admin gets most permissions except manage_permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions WHERE code != 'manage_permissions'
ON CONFLICT (role, permission_id) DO NOTHING;

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Authenticated manage user_roles" ON user_roles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated read permissions" ON permissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated read role_permissions" ON role_permissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated manage user_permissions" ON user_permissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated manage freelancer_projects" ON freelancer_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated manage security_events" ON security_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated manage login_attempts" ON login_attempts FOR ALL USING (auth.role() = 'authenticated');
