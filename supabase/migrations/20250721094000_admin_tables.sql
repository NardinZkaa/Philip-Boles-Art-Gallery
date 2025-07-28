-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ar text,
  description text,
  description_ar text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Note: pages table already exists from previous migration

-- Create website_settings table
CREATE TABLE IF NOT EXISTS website_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name_en text,
  site_name_ar text,
  site_description_en text,
  site_description_ar text,
  contact_email text,
  contact_phone text,
  social_facebook text,
  social_instagram text,
  social_twitter text,
  primary_color text DEFAULT '#1f2937',
  secondary_color text DEFAULT '#f59e0b',
  maintenance_mode boolean DEFAULT false,
  analytics_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for collections
CREATE POLICY "Public access to collections"
  ON collections
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Note: pages policies already exist from previous migration

-- Create policies for website_settings
CREATE POLICY "Public access to website_settings"
  ON website_settings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS collections_display_order_idx ON collections(display_order);
CREATE INDEX IF NOT EXISTS collections_active_idx ON collections(is_active);
-- Note: pages indexes already exist from previous migration

-- Insert sample collections
INSERT INTO collections (name, name_ar, description, description_ar, display_order, is_active) VALUES
('Al-Faw''aliya', 'الفواليا', 'Contemporary urban consciousness through architectural forms', 'الوعي الحضري المعاصر من خلال الأشكال المعمارية', 1, true),
('Phenomenology', 'الظاهرة', 'Exploration of consciousness and perception', 'استكشاف الوعي والإدراك', 2, true),
('Philological Layers', 'الطبقات الفيلولوجية', 'Cultural and linguistic archaeology', 'الآثار الثقافية واللغوية', 3, true);

-- Note: pages already have sample data from previous migration

-- Insert default website settings
INSERT INTO website_settings (site_name_en, site_name_ar, site_description_en, site_description_ar, contact_email, contact_phone) VALUES
('Art Gallery', 'معرض الفن', 'Contemporary art gallery showcasing diverse collections', 'معرض فني معاصر يعرض مجموعات متنوعة', 'info@artgallery.com', '+20 123 456 789'); 