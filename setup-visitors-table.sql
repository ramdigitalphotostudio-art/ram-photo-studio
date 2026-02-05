-- Create a simple visitor statistics table with just counts
CREATE TABLE IF NOT EXISTS visitor_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial row (only one row will ever exist)
INSERT INTO visitor_stats (id, total_count, last_updated)
VALUES (1, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read stats
CREATE POLICY "Admin users can view visitor stats"
    ON visitor_stats
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow anonymous updates (for incrementing count)
CREATE POLICY "Allow anonymous visitor count increment"
    ON visitor_stats
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON visitor_stats TO authenticated;
GRANT UPDATE ON visitor_stats TO anon;

-- Create a function to increment visitor count
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE visitor_stats
    SET total_count = total_count + 1,
        last_updated = NOW()
    WHERE id = 1;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
