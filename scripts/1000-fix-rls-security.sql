-- FIX CRITICAL SECURITY ISSUES
-- Enable RLS on agency_settings table

ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for agency_settings
CREATE POLICY "Only authenticated users can manage agency settings"
ON agency_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify all tables have RLS enabled
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('schema_migrations')
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', r.tablename);
    END LOOP;
END$$;

SELECT 'All security policies enabled!' as message;
