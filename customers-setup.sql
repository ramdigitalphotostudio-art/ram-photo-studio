-- ============================================
-- Ram Digital Photo Studio - Customers Table
-- ============================================
-- Run this SQL in your Supabase SQL Editor

-- 1. Create the customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    birthday DATE,  -- Optional: for birthday wishes
    anniversary DATE,  -- Optional: for anniversary wishes
    notes TEXT,  -- Optional: brief notes about customer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for faster queries
CREATE INDEX IF NOT EXISTS customers_name_idx ON customers(name);
CREATE INDEX IF NOT EXISTS customers_phone_idx ON customers(phone);
CREATE INDEX IF NOT EXISTS customers_birthday_idx ON customers(birthday);
CREATE INDEX IF NOT EXISTS customers_anniversary_idx ON customers(anniversary);
CREATE INDEX IF NOT EXISTS customers_created_at_idx ON customers(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow admin read customers" ON customers;
DROP POLICY IF EXISTS "Allow admin insert customers" ON customers;
DROP POLICY IF EXISTS "Allow admin update customers" ON customers;
DROP POLICY IF EXISTS "Allow admin delete customers" ON customers;

-- 5. Create RLS Policy: Allow service role to read all customers
CREATE POLICY "Allow admin read customers"
ON customers
FOR SELECT
TO service_role
USING (true);

-- 6. Create RLS Policy: Allow service role to insert customers
CREATE POLICY "Allow admin insert customers"
ON customers
FOR INSERT
TO service_role
WITH CHECK (true);

-- 7. Create RLS Policy: Allow service role to update customers
CREATE POLICY "Allow admin update customers"
ON customers
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- 8. Create RLS Policy: Allow service role to delete customers
CREATE POLICY "Allow admin delete customers"
ON customers
FOR DELETE
TO service_role
USING (true);

-- ============================================
-- Verification Queries (optional - run these to test)
-- ============================================

-- Check if table was created successfully
-- SELECT * FROM customers LIMIT 1;

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'customers';

-- View all policies
-- SELECT * FROM pg_policies WHERE tablename = 'customers';

-- ============================================
-- Sample Data (optional - for testing)
-- ============================================

-- INSERT INTO customers (name, phone, birthday, anniversary, notes) VALUES
-- ('Raj Kumar', '9412000718', '1990-01-15', '2015-02-14', 'Prefers outdoor shoots'),
-- ('Priya Sharma', '9876543210', '1992-03-22', NULL, 'Wedding photography client');
