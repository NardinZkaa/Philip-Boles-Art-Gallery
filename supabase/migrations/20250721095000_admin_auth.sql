-- Enable authentication
-- Note: This is typically done through the Supabase dashboard, but we'll include it here for completeness

-- Create admin user (you'll need to set this up through the Supabase dashboard)
-- The password should be changed after first login
-- Email: admin@artgallery.com
-- Password: admin123456

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.role() = 'authenticated';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to require authentication for admin operations
-- Paintings table
DROP POLICY IF EXISTS "Public access to paintings" ON paintings;
DROP POLICY IF EXISTS "Authenticated users can manage paintings" ON paintings;
CREATE POLICY "Authenticated users can manage paintings"
  ON paintings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Collections table
DROP POLICY IF EXISTS "Public access to collections" ON collections;
DROP POLICY IF EXISTS "Authenticated users can manage collections" ON collections;
CREATE POLICY "Authenticated users can manage collections"
  ON collections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Pages table
DROP POLICY IF EXISTS "Public access to pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can manage pages" ON pages;
CREATE POLICY "Authenticated users can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Website settings table
DROP POLICY IF EXISTS "Public access to website_settings" ON website_settings;
DROP POLICY IF EXISTS "Authenticated users can manage website_settings" ON website_settings;
CREATE POLICY "Authenticated users can manage website_settings"
  ON website_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Keep public read access for paintings (for the gallery)
CREATE POLICY "Public can view paintings"
  ON paintings
  FOR SELECT
  TO public
  USING (true);

-- Keep public read access for collections
CREATE POLICY "Public can view collections"
  ON collections
  FOR SELECT
  TO public
  USING (true);

-- Keep public read access for pages
CREATE POLICY "Public can view pages"
  ON pages
  FOR SELECT
  TO public
  USING (true);

-- Keep public read access for website settings
CREATE POLICY "Public can view website_settings"
  ON website_settings
  FOR SELECT
  TO public
  USING (true); 