DELETE FROM public.packages 
WHERE name IN ('Photography', 'Digital Marketing', 'Videography') 
AND category IN ('photography', 'digital-marketing', 'videography');

-- Verify remaining packages
SELECT DISTINCT name, category FROM public.packages ORDER BY category, name;
