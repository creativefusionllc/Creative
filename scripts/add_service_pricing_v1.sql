-- Add pricing column to services table
ALTER TABLE services
ADD COLUMN subservice_prices INT[] DEFAULT '{}'::INT[];

-- Update existing services with empty prices array if needed
UPDATE services
SET subservice_prices = ARRAY_FILL(0, ARRAY[ARRAY_LENGTH(subservices, 1)])
WHERE subservice_prices IS NULL OR ARRAY_LENGTH(subservice_prices, 1) IS NULL;
