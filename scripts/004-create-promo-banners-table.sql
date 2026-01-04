-- Create promo_banners table for promotional banners
CREATE TABLE IF NOT EXISTS promo_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT DEFAULT 'Learn More',
  cta_link TEXT,
  background_color TEXT DEFAULT '#C4D600',
  text_color TEXT DEFAULT '#1f2937',
  is_active BOOLEAN DEFAULT true,
  show_form BOOLEAN DEFAULT false,
  form_type TEXT DEFAULT 'inquiry',
  position TEXT DEFAULT 'bottom',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE promo_banners ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view active banners
CREATE POLICY "Anyone can view active banners"
ON promo_banners FOR SELECT
USING (is_active = true);

-- RLS Policy: Super admin can manage all banners
CREATE POLICY "Super admin can manage banners"
ON promo_banners FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Create index for performance
CREATE INDEX idx_promo_banners_active_position ON promo_banners(is_active, position);
CREATE INDEX idx_promo_banners_created_at ON promo_banners(created_at);
