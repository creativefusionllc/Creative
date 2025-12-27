-- Delete duplicate capitalized entries from packages table
DELETE FROM public.packages 
WHERE name IN ('Photography', 'Digital Marketing', 'Videography');

-- Verify remaining packages are clean
SELECT id, name, category, slug FROM public.packages ORDER BY category, name;
