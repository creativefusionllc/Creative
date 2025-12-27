-- Remove duplicate packages with different capitalization
DELETE FROM packages 
WHERE name IN ('Photography', 'Digital Marketing', 'Videography')
AND id NOT IN (
  SELECT MIN(id) 
  FROM packages 
  WHERE name IN ('Photography', 'Digital Marketing', 'Videography', 'photography', 'digital-marketing', 'videography')
  GROUP BY LOWER(name)
);

-- Ensure packages are consistent and unique
DELETE FROM packages WHERE name IN ('Photography', 'Digital Marketing', 'Videography');
