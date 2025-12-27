-- Create super admin user account
-- Email: admin@creativefusion.llc
-- Password: Admin@123456 (bcrypt hashed)
-- Note: This user is pre-verified and has admin role

DO $$
DECLARE
  admin_uid uuid;
  hashed_password text;
BEGIN
  -- Delete existing admin if exists
  DELETE FROM auth.users WHERE email = 'admin@creativefusion.llc';

  -- Create the admin user with hashed password
  -- Using Supabase's default password hashing
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    is_super_admin
  ) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'admin@creativefusion.llc',
    crypt('Admin@123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    jsonb_build_object(
      'role', 'admin',
      'is_admin', true,
      'email_verified', true
    ),
    false
  );

  RAISE NOTICE 'Super admin account created: admin@creativefusion.llc';
END $$;
