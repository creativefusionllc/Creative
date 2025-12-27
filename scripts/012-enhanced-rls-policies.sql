-- Enhanced RLS Policies for Security

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anon can read clients for admin" ON clients;
DROP POLICY IF EXISTS "Allow users to insert their own client record" ON clients;
DROP POLICY IF EXISTS "allow_public_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_public_select_portfolio" ON portfolio;

-- Clients table - Strict RLS
DROP POLICY IF EXISTS "Clients can view own data" ON clients;
DROP POLICY IF EXISTS "Clients can update own data" ON clients;

CREATE POLICY "Clients view own active approved data" ON clients
  FOR SELECT USING (
    auth.uid() = user_id 
    AND email_verified = true 
    AND admin_approved = true 
    AND account_status = 'active'
  );

CREATE POLICY "Clients update own non-critical data" ON clients
  FOR UPDATE USING (
    auth.uid() = user_id 
    AND email_verified = true 
    AND admin_approved = true 
    AND account_status = 'active'
  )
  WITH CHECK (
    auth.uid() = user_id
    -- Prevent clients from changing security fields
    AND (NEW.email_verified IS NOT DISTINCT FROM OLD.email_verified)
    AND (NEW.admin_approved IS NOT DISTINCT FROM OLD.admin_approved)
    AND (NEW.account_status IS NOT DISTINCT FROM OLD.account_status)
    AND (NEW.wallet_balance IS NOT DISTINCT FROM OLD.wallet_balance)
    AND (NEW.points_balance IS NOT DISTINCT FROM OLD.points_balance)
  );

-- Admin full access to clients
CREATE POLICY "Admin full access to clients" ON clients
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'admin@creativefusion.llc'
  );

-- Bookings - Enhanced security
DROP POLICY IF EXISTS "Clients can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Clients can update own bookings" ON bookings;

CREATE POLICY "Public can create bookings with verification" ON bookings
  FOR INSERT WITH CHECK (
    -- Allow public to create but store IP and user agent for verification
    ip_address IS NOT NULL 
    AND user_agent IS NOT NULL
  );

CREATE POLICY "Clients view own verified bookings" ON bookings
  FOR SELECT USING (
    (auth.uid() = user_id OR email = auth.jwt() ->> 'email')
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.user_id = auth.uid() 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

CREATE POLICY "Clients update own bookings restricted" ON bookings
  FOR UPDATE USING (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.user_id = auth.uid() 
      AND email_verified = true 
      AND admin_approved = true
    )
  )
  WITH CHECK (
    auth.uid() = user_id
    -- Prevent changing critical fields
    AND (NEW.booking_number IS NOT DISTINCT FROM OLD.booking_number)
    AND (NEW.status = 'modification_requested' OR NEW.status = 'cancelled')
  );

-- Portfolio - Public read but admin manage
CREATE POLICY "Public view published portfolio only" ON portfolio
  FOR SELECT USING (status = 'published' AND is_featured IS NOT NULL);

CREATE POLICY "Admin manage portfolio" ON portfolio
  FOR ALL USING (auth.jwt() ->> 'email' = 'admin@creativefusion.llc');

-- Wallet Transactions - Strict RLS
DROP POLICY IF EXISTS "Clients can add their own funds" ON wallet_transactions;

CREATE POLICY "Clients view own verified wallet" ON wallet_transactions
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = wallet_transactions.client_id 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

CREATE POLICY "Clients request fund additions" ON wallet_transactions
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND type = 'deposit'
    AND verification_status = 'pending'
    AND payment_proof_url IS NOT NULL
  );

-- Invoices - Clients can only view their approved invoices
DROP POLICY IF EXISTS "Clients can view own invoices" ON invoices;

CREATE POLICY "Clients view own verified invoices" ON invoices
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = invoices.client_id 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

-- Social Media Calendar - Restrict to assigned clients
CREATE POLICY "Clients view assigned content only" ON social_media_calendar
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND is_visible_to_client = true
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = social_media_calendar.client_id 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

-- Notifications - Clients view own only
CREATE POLICY "Clients view own verified notifications" ON notifications
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = notifications.client_id 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

-- Agency Settings - Admin only
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only agency settings" ON agency_settings
  FOR ALL USING (auth.jwt() ->> 'email' = 'admin@creativefusion.llc');

-- Content Calendar - Admin and assigned clients
CREATE POLICY "Clients view assigned calendar" ON content_calendar
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM clients WHERE id = client_id)
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = content_calendar.client_id 
      AND email_verified = true 
      AND admin_approved = true
    )
  );

-- ERP Tables - Admin only access
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'erp_%'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Admin only %s" ON %I', tbl, tbl);
        EXECUTE format(
            'CREATE POLICY "Admin only %s" ON %I FOR ALL USING (auth.jwt() ->> ''email'' = ''admin@creativefusion.llc'')',
            tbl, tbl
        );
    END LOOP;
END $$;

-- Create function to check if user is active and verified
CREATE OR REPLACE FUNCTION is_active_verified_client(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM clients 
    WHERE user_id = check_user_id 
    AND email_verified = true 
    AND admin_approved = true 
    AND account_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
