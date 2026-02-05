-- Quick check for Jan 11 birthdays
-- Copy and paste this into Supabase SQL Editor

SELECT 
  id,
  name,
  email,
  phone,
  birthday,
  TO_CHAR(birthday, 'DD Mon YYYY') as birthday_formatted,
  CASE 
    WHEN email IS NULL THEN '❌ Email is NULL'
    WHEN email = '' THEN '❌ Email is empty string'
    ELSE '✅ Email: ' || email
  END as email_status,
  CASE 
    WHEN email IS NOT NULL AND email != '' THEN '✅ CAN SEND EMAIL'
    ELSE '❌ CANNOT SEND - NO EMAIL'
  END as can_send
FROM customers
WHERE 
  EXTRACT(MONTH FROM birthday) = 1 
  AND EXTRACT(DAY FROM birthday) = 11
ORDER BY name;
