-- STEP 1: CLEAN RESET - Delete ALL users and role records
DELETE FROM auth.users;
DELETE FROM clients WHERE user_type IN ('admin', 'super_admin', 'client');
DELETE FROM user_roles;
DELETE FROM erp_user_roles;

-- STEP 2: CREATE SUPER ADMIN USER in Supabase Auth
-- Note: This script creates the Super Admin structure
-- Email: creativefusionpro.com@gmail.com
-- Password: Naveed@1190
-- Role: super_admin

-- STEP 3: After running this, manually create the Super Admin in Supabase Auth Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add user"
-- 3. Email: creativefusionpro.com@gmail.com
-- 4. Password: Naveed@1190
-- 5. Check "Auto confirm user"
-- 6. Create User

-- STEP 4: Then run the following to create the Super Admin record in clients table
-- (This assumes the Super Admin user already exists in Supabase Auth)
INSERT INTO clients (
  id,
  email,
  user_type,
  is_active,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  'super_admin',
  true,
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'creativefusionpro.com@gmail.com'
ON CONFLICT (email) DO UPDATE SET
  user_type = 'super_admin',
  is_active = true;
