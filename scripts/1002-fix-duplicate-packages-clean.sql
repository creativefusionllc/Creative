DELETE FROM packages
WHERE category IN ('photography', 'videography', 'digital-marketing')
AND name IN ('Photography', 'Digital Marketing', 'Videography', 'Digital-Marketing')
AND name != 'Photography' 
AND name != 'Videography' 
AND name != 'Digital Marketing'
AND category = LOWER(category);

DELETE FROM packages 
WHERE id IN (
  SELECT p1.id FROM packages p1
  WHERE p1.category IN ('Photography', 'Digital Marketing', 'Videography')
  AND EXISTS (
    SELECT 1 FROM packages p2 
    WHERE LOWER(p1.category) = p2.category 
    AND LOWER(p1.name) = p2.name
    AND p1.id > p2.id
  )
);

SELECT * FROM packages ORDER BY category, name;
