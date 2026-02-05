-- ============================================
-- SUPABASE ADMIN USER SETUP
-- ============================================
-- Run these SQL commands in your Supabase SQL Editor
-- to set up authentication and security for your admin dashboard

-- ============================================
-- STEP 1: Create Admin User (Simple Method)
-- ============================================
-- Note: It's easier to create users via the Supabase Dashboard UI
-- Go to Authentication → Users → Add User
-- But if you prefer SQL, use the command below:

-- Replace 'your-admin-email@example.com' and 'YourSecurePassword123!' with your credentials
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'your-admin-email@example.com', -- CHANGE THIS
    crypt('YourSecurePassword123!', gen_salt('bf')), -- CHANGE THIS
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
);

-- ============================================
-- STEP 2: Enable Row Level Security (RLS)
-- ============================================
-- This ensures only authenticated admins can access the data

-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admins) to read all enquiries
CREATE POLICY "Allow authenticated users to read enquiries"
ON enquiries FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update enquiry status
CREATE POLICY "Allow authenticated users to update enquiries"
ON enquiries FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public (anonymous) to insert enquiries from contact form
CREATE POLICY "Allow public to insert enquiries"
ON enquiries FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admins) full access to customers
CREATE POLICY "Allow authenticated users full access to customers"
ON customers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- STEP 3: Verify Setup (Optional)
-- ============================================
-- Check if your admin user was created successfully
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
WHERE email = 'your-admin-email@example.com'; -- CHANGE THIS

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('enquiries', 'customers');

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- If you need to delete a user and start over:
-- DELETE FROM auth.users WHERE email = 'your-admin-email@example.com';

-- If you need to reset a user's password:
-- UPDATE auth.users
-- SET encrypted_password = crypt('NewPassword123!', gen_salt('bf'))
-- WHERE email = 'your-admin-email@example.com';

-- If you need to confirm a user's email manually:
-- UPDATE auth.users
-- SET email_confirmed_at = NOW()
-- WHERE email = 'your-admin-email@example.com';

-- ============================================
-- NOTES
-- ============================================
-- 1. Always use strong passwords (12+ characters, mixed case, numbers, symbols)
-- 2. Keep your credentials secure
-- 3. The RLS policies ensure data security at the database level
-- 4. Authenticated users = logged-in admins
-- 5. Anon users = public visitors (can only submit contact forms)
