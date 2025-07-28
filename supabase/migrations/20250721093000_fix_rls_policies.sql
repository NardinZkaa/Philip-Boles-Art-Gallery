-- Fix RLS policies to allow public access for admin operations
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view paintings" ON paintings;
DROP POLICY IF EXISTS "Authenticated users can manage paintings" ON paintings;

-- Create new policies that allow public access for all operations
CREATE POLICY "Public access to paintings"
  ON paintings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true); 