-- Delete duplicate packages with mixed capitalization, keeping only lowercase versions
DELETE FROM public.packages
WHERE name IN ('Photography', 'Digital Marketing', 'Videography');

-- Verify we have exactly 6 unique packages now
SELECT COUNT(*) as total_packages, STRING_AGG(name, ', ' ORDER BY name) as package_names
FROM public.packages;
