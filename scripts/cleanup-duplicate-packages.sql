-- Delete duplicate packages with mixed capitalization
-- Keep only the lowercase slug versions

DELETE FROM packages 
WHERE name IN ('Photography', 'Digital Marketing', 'Videography')
AND slug IN ('Photography', 'Digital Marketing', 'Videography');

-- Verify we have exactly 9 unique packages
SELECT COUNT(*), COUNT(DISTINCT slug) FROM packages;
