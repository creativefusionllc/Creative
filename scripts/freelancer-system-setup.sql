-- Create freelancer profiles table with technical and partner types
CREATE TABLE IF NOT EXISTS freelancers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  freelancer_type TEXT NOT NULL CHECK (freelancer_type IN ('TECHNICAL', 'PARTNER')),
  profile_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  portfolio_url TEXT,
  expertise ARRAY NOT NULL DEFAULT '{}',
  skills ARRAY NOT NULL DEFAULT '{}',
  years_experience INTEGER,
  hourly_rate NUMERIC,
  fixed_price_per_project NUMERIC,
  commission_rate NUMERIC,
  portfolio_images ARRAY DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  verification_documents ARRAY DEFAULT '{}',
  bank_account_info JSONB,
  payment_method TEXT,
  tax_id TEXT,
  rating NUMERIC DEFAULT 0,
  total_projects INTEGER DEFAULT 0,
  completion_rate NUMERIC DEFAULT 0,
  on_time_delivery_rate NUMERIC DEFAULT 0,
  quality_score NUMERIC DEFAULT 0,
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'on_leave', 'inactive')),
  working_hours JSONB,
  timezone TEXT,
  languages ARRAY DEFAULT '{}',
  max_concurrent_projects INTEGER DEFAULT 5,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'suspended', 'inactive')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer job assignments table
CREATE TABLE IF NOT EXISTS freelancer_job_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES erp_projects(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  job_type TEXT CHECK (job_type IN ('fixed_price', 'hourly', 'project_based')),
  budget NUMERIC,
  hourly_rate NUMERIC,
  estimated_hours NUMERIC,
  start_date DATE,
  delivery_deadline DATE NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'submitted', 'approved', 'completed', 'rejected', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  milestone_1 TEXT,
  milestone_1_deadline DATE,
  milestone_1_payment NUMERIC,
  milestone_1_status TEXT DEFAULT 'pending',
  milestone_2 TEXT,
  milestone_2_deadline DATE,
  milestone_2_payment NUMERIC,
  milestone_2_status TEXT DEFAULT 'pending',
  milestone_3 TEXT,
  milestone_3_deadline DATE,
  milestone_3_payment NUMERIC,
  milestone_3_status TEXT DEFAULT 'pending',
  terms_accepted BOOLEAN DEFAULT FALSE,
  contract_signed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer work submissions table
CREATE TABLE IF NOT EXISTS freelancer_work_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_assignment_id UUID NOT NULL REFERENCES freelancer_job_assignments(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancers(id),
  submission_number INTEGER,
  description TEXT,
  delivery_files ARRAY DEFAULT '{}',
  file_urls ARRAY DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revision_requested BOOLEAN DEFAULT FALSE,
  revision_reason TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revision_requested', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer contracts table
CREATE TABLE IF NOT EXISTS freelancer_contracts (
  id UUID PRIMARYKey DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
  job_assignment_id UUID REFERENCES freelancer_job_assignments(id),
  contract_type TEXT NOT NULL CHECK (contract_type IN ('NDA', 'SERVICE_AGREEMENT', 'PROJECT_AGREEMENT', 'RATE_CARD')),
  contract_title TEXT,
  contract_content TEXT,
  terms_and_conditions TEXT,
  payment_terms TEXT,
  dispute_resolution TEXT,
  confidentiality_clause TEXT,
  deliverables TEXT,
  project_timeline TEXT,
  intellectual_property TEXT,
  liability_clause TEXT,
  termination_clause TEXT,
  signature_required BOOLEAN DEFAULT TRUE,
  signed_at TIMESTAMP WITH TIME ZONE,
  signed_by UUID REFERENCES auth.users(id),
  valid_from DATE,
  valid_until DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'expired', 'cancelled')),
  document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer privacy policy & T&C table
CREATE TABLE IF NOT EXISTS freelancer_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID REFERENCES freelancers(id) ON DELETE SET NULL,
  policy_type TEXT NOT NULL CHECK (policy_type IN ('PRIVACY_POLICY', 'TERMS_CONDITIONS', 'BOTH')),
  version TEXT DEFAULT '1.0',
  privacy_policy_content TEXT,
  terms_conditions_content TEXT,
  data_protection_clause TEXT,
  intellectual_property_rights TEXT,
  confidentiality_agreement TEXT,
  payment_policies TEXT,
  cancellation_policy TEXT,
  liability_limitations TEXT,
  user_obligations TEXT,
  accepted_by UUID REFERENCES auth.users(id),
  accepted_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT,
  acceptance_status TEXT DEFAULT 'pending' CHECK (acceptance_status IN ('pending', 'accepted', 'rejected')),
  effective_from DATE,
  effective_until DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer payment & earnings table
CREATE TABLE IF NOT EXISTS freelancer_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
  job_assignment_id UUID REFERENCES freelancer_job_assignments(id),
  amount NUMERIC NOT NULL,
  commission_amount NUMERIC DEFAULT 0,
  net_amount NUMERIC,
  currency TEXT DEFAULT 'AED',
  earning_type TEXT CHECK (earning_type IN ('fixed', 'hourly', 'milestone', 'commission')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'processing', 'completed', 'failed')),
  payment_method TEXT,
  payment_reference TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  invoice_number TEXT,
  invoice_url TEXT,
  tax_deducted NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer availability calendar table
CREATE TABLE IF NOT EXISTS freelancer_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'busy', 'off', 'vacation')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(freelancer_id, date)
);

-- Create freelancer dispute table
CREATE TABLE IF NOT EXISTS freelancer_disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_assignment_id UUID NOT NULL REFERENCES freelancer_job_assignments(id),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id),
  reported_by UUID NOT NULL REFERENCES auth.users(id),
  dispute_type TEXT CHECK (dispute_type IN ('quality', 'deadline', 'payment', 'communication', 'other')),
  description TEXT NOT NULL,
  evidence_urls ARRAY DEFAULT '{}',
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed', 'escalated')),
  resolution TEXT,
  refund_amount NUMERIC,
  arbitrator_id UUID REFERENCES auth.users(id),
  arbitration_notes TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer portfolio/public profile table
CREATE TABLE IF NOT EXISTS freelancer_public_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES freelancers(id) ON DELETE CASCADE,
  profile_url TEXT UNIQUE,
  profile_headline TEXT,
  profile_bio TEXT,
  portfolio_items ARRAY DEFAULT '{}',
  featured_projects ARRAY DEFAULT '{}',
  testimonials ARRAY DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  seo_keywords ARRAY DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  contact_form_enabled BOOLEAN DEFAULT TRUE,
  show_email BOOLEAN DEFAULT FALSE,
  show_phone BOOLEAN DEFAULT FALSE,
  show_rate BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_job_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_work_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_public_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for freelancers table
CREATE POLICY "Freelancers can view own profile" ON freelancers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all freelancers" ON freelancers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Public can view approved freelancers" ON freelancers
  FOR SELECT USING (status = 'active' AND is_verified = TRUE);
