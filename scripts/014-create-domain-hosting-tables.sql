-- Domain & Hosting Management System Tables
-- Based on creativeon.com structure

-- Domain TLDs (extensions) and their pricing
CREATE TABLE IF NOT EXISTS domain_tlds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  extension TEXT NOT NULL UNIQUE, -- .com, .ae, .pk, .net, etc.
  category TEXT DEFAULT 'generic', -- generic, country, premium
  registration_price NUMERIC(10,2) NOT NULL,
  renewal_price NUMERIC(10,2) NOT NULL,
  transfer_price NUMERIC(10,2) NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  min_years INTEGER DEFAULT 1,
  max_years INTEGER DEFAULT 10,
  description TEXT,
  icon_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hosting Plans
CREATE TABLE IF NOT EXISTS hosting_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- shared, vps, dedicated, wordpress, cloud, reseller
  description TEXT,
  short_description TEXT,
  
  -- Pricing
  price_monthly NUMERIC(10,2),
  price_yearly NUMERIC(10,2),
  price_biennial NUMERIC(10,2),
  price_triennial NUMERIC(10,2),
  setup_fee NUMERIC(10,2) DEFAULT 0,
  
  -- Specifications
  disk_space TEXT, -- 10GB, Unlimited
  bandwidth TEXT, -- 100GB, Unlimited
  websites INTEGER, -- Number of websites allowed
  email_accounts INTEGER, -- Number of email accounts
  databases INTEGER, -- Number of databases
  subdomains INTEGER,
  ftp_accounts INTEGER,
  
  -- Server Specs (for VPS/Dedicated)
  cpu_cores INTEGER,
  ram TEXT, -- 2GB, 4GB, etc.
  storage_type TEXT, -- SSD, NVMe, HDD
  
  -- Features (JSONB for flexibility)
  features JSONB DEFAULT '[]',
  
  -- Display
  is_popular BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  badge_text TEXT, -- "Best Seller", "New", etc.
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SSL Certificates
CREATE TABLE IF NOT EXISTS ssl_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  provider TEXT, -- Comodo, RapidSSL, GeoTrust, etc.
  type TEXT, -- DV, OV, EV, Wildcard
  description TEXT,
  
  -- Pricing
  price_yearly NUMERIC(10,2),
  price_biennial NUMERIC(10,2),
  
  -- Features
  validation_level TEXT, -- Domain, Organization, Extended
  warranty_amount NUMERIC(12,2),
  issuance_time TEXT, -- Minutes, Days
  domains_covered INTEGER DEFAULT 1,
  wildcard BOOLEAN DEFAULT false,
  
  features JSONB DEFAULT '[]',
  
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Hosting Plans
CREATE TABLE IF NOT EXISTS email_hosting_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  provider TEXT, -- Google Workspace, Microsoft 365, Custom
  description TEXT,
  
  -- Pricing
  price_monthly NUMERIC(10,2),
  price_yearly NUMERIC(10,2),
  
  -- Specifications
  storage_per_user TEXT, -- 30GB, Unlimited
  max_users INTEGER,
  max_attachment_size TEXT,
  
  features JSONB DEFAULT '[]',
  
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Domains (purchased/managed domains)
CREATE TABLE IF NOT EXISTS client_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL,
  tld_id UUID REFERENCES domain_tlds(id),
  
  -- Registration Details
  registration_date DATE,
  expiry_date DATE,
  auto_renew BOOLEAN DEFAULT true,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, expired, pending, suspended, transferring
  
  -- DNS Settings
  nameservers JSONB DEFAULT '[]',
  dns_records JSONB DEFAULT '[]',
  
  -- Privacy & Protection
  whois_privacy BOOLEAN DEFAULT false,
  domain_lock BOOLEAN DEFAULT true,
  
  -- Registrar Info
  registrar TEXT,
  auth_code TEXT, -- For transfers
  
  -- Pricing
  purchase_price NUMERIC(10,2),
  renewal_price NUMERIC(10,2),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Hosting Subscriptions
CREATE TABLE IF NOT EXISTS client_hosting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES hosting_plans(id),
  domain_id UUID REFERENCES client_domains(id),
  
  -- Server Details
  server_ip TEXT,
  server_location TEXT,
  cpanel_username TEXT,
  cpanel_url TEXT,
  
  -- Subscription
  billing_cycle TEXT, -- monthly, yearly, biennial, triennial
  start_date DATE,
  expiry_date DATE,
  auto_renew BOOLEAN DEFAULT true,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, suspended, cancelled, pending
  
  -- Usage Stats
  disk_used TEXT,
  bandwidth_used TEXT,
  
  -- Pricing
  amount NUMERIC(10,2),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client SSL Certificates
CREATE TABLE IF NOT EXISTS client_ssl (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  certificate_id UUID REFERENCES ssl_certificates(id),
  domain_id UUID REFERENCES client_domains(id),
  
  -- Certificate Details
  common_name TEXT, -- Domain name
  issued_date DATE,
  expiry_date DATE,
  auto_renew BOOLEAN DEFAULT true,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, expired, pending, revoked
  
  -- Pricing
  amount NUMERIC(10,2),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Email Hosting
CREATE TABLE IF NOT EXISTS client_email_hosting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES email_hosting_plans(id),
  domain_id UUID REFERENCES client_domains(id),
  
  -- Subscription
  billing_cycle TEXT,
  start_date DATE,
  expiry_date DATE,
  auto_renew BOOLEAN DEFAULT true,
  
  -- Email Accounts
  email_accounts JSONB DEFAULT '[]', -- List of email addresses
  total_accounts INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active',
  
  -- Pricing
  amount NUMERIC(10,2),
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Domain/Hosting Orders
CREATE TABLE IF NOT EXISTS hosting_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE,
  client_id UUID REFERENCES clients(id),
  
  -- Order Details
  order_type TEXT, -- domain, hosting, ssl, email, bundle
  items JSONB NOT NULL, -- Array of items ordered
  
  -- Pricing
  subtotal NUMERIC(10,2),
  discount_amount NUMERIC(10,2) DEFAULT 0,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2),
  
  -- Payment
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method TEXT,
  payment_reference TEXT,
  paid_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'pending', -- pending, processing, completed, cancelled
  
  -- Promo
  coupon_code TEXT,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Domain Search History (for analytics)
CREATE TABLE IF NOT EXISTS domain_search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT NOT NULL,
  results JSONB, -- Available/unavailable domains
  client_id UUID REFERENCES clients(id),
  session_id TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE domain_tlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ssl_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_hosting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_hosting ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_ssl ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_email_hosting ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_search_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public tables (products)
CREATE POLICY "Public read domain_tlds" ON domain_tlds FOR SELECT USING (is_active = true);
CREATE POLICY "Public read hosting_plans" ON hosting_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public read ssl_certificates" ON ssl_certificates FOR SELECT USING (is_active = true);
CREATE POLICY "Public read email_hosting_plans" ON email_hosting_plans FOR SELECT USING (is_active = true);

-- Admin manage policies
CREATE POLICY "Auth manage domain_tlds" ON domain_tlds FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage hosting_plans" ON hosting_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage ssl_certificates" ON ssl_certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage email_hosting_plans" ON email_hosting_plans FOR ALL USING (auth.role() = 'authenticated');

-- Client data policies
CREATE POLICY "Clients view own domains" ON client_domains FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
CREATE POLICY "Auth manage client_domains" ON client_domains FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients view own hosting" ON client_hosting FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
CREATE POLICY "Auth manage client_hosting" ON client_hosting FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients view own ssl" ON client_ssl FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
CREATE POLICY "Auth manage client_ssl" ON client_ssl FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients view own email" ON client_email_hosting FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
CREATE POLICY "Auth manage client_email_hosting" ON client_email_hosting FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Clients view own orders" ON hosting_orders FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));
CREATE POLICY "Auth manage hosting_orders" ON hosting_orders FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone insert search_history" ON domain_search_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth manage search_history" ON domain_search_history FOR ALL USING (auth.role() = 'authenticated');

-- Generate order number function
CREATE OR REPLACE FUNCTION generate_hosting_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'HO-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('hosting_order_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS hosting_order_seq START 1;

CREATE TRIGGER set_hosting_order_number
  BEFORE INSERT ON hosting_orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_hosting_order_number();
