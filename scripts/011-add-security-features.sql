-- Add security and account status fields to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS admin_approved BOOLEAN DEFAULT FALSE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'pending'; -- 'pending', 'active', 'suspended', 'banned'
ALTER TABLE clients ADD COLUMN IF NOT EXISTS verification_token TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS verification_sent_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS login_attempts INTEGER DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP WITH TIME ZONE;

-- Create security_logs table for tracking security events
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL, -- 'login_success', 'login_failed', 'captcha_failed', 'account_locked', etc.
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rate_limiting table
CREATE TABLE IF NOT EXISTS rate_limiting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- IP address or user ID
  action_type TEXT NOT NULL, -- 'login', 'register', 'api_call'
  attempt_count INTEGER DEFAULT 1,
  first_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(identifier, action_type)
);

-- Enable RLS
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limiting ENABLE ROW LEVEL SECURITY;

-- RLS Policies for security_logs (admin only)
CREATE POLICY "Authenticated manage security_logs" ON security_logs
  FOR ALL USING (auth.jwt() ->> 'email' = 'admin@creativefusion.llc');

-- RLS Policies for rate_limiting (admin only)
CREATE POLICY "Authenticated manage rate_limiting" ON rate_limiting
  FOR ALL USING (auth.jwt() ->> 'email' = 'admin@creativefusion.llc');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_event_type ON security_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limiting_identifier ON rate_limiting(identifier);
CREATE INDEX IF NOT EXISTS idx_clients_email_verified ON clients(email_verified);
CREATE INDEX IF NOT EXISTS idx_clients_admin_approved ON clients(admin_approved);
CREATE INDEX IF NOT EXISTS idx_clients_account_status ON clients(account_status);
