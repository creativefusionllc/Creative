-- Create admin user record in clients table
INSERT INTO clients (email, user_type, is_active, status)
VALUES ('admin@creativefusion.llc', 'admin', true, 'active')
ON CONFLICT (email) 
DO UPDATE SET 
  user_type = 'admin',
  is_active = true,
  status = 'active';
