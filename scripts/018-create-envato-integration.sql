-- Envato Elements Integration Tables
CREATE TABLE IF NOT EXISTS envato_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_token TEXT NOT NULL,
  account_email TEXT,
  auto_sync_enabled BOOLEAN DEFAULT true,
  sync_frequency_hours INTEGER DEFAULT 24,
  last_sync_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS envato_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envato_id TEXT UNIQUE NOT NULL,
  asset_type TEXT NOT NULL, -- 'photo', 'template', 'graphic', 'video', 'ui-kit', 'mockup'
  title TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  download_url TEXT,
  thumbnail_url TEXT,
  tags ARRAY TEXT[],
  categories ARRAY TEXT[],
  file_size BIGINT,
  dimensions JSONB, -- {width, height}
  format TEXT, -- 'jpg', 'png', 'psd', 'ai', 'figma', etc.
  license_type TEXT DEFAULT 'unlimited',
  author_name TEXT,
  author_url TEXT,
  popularity_score INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMPTZ,
  metadata JSONB, -- colors, styles, moods, etc.
  is_optimized BOOLEAN DEFAULT false,
  optimized_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS envato_client_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES envato_assets(id) ON DELETE CASCADE,
  usage_type TEXT NOT NULL, -- 'website', 'social-media', 'seo-content', 'creative-project', 'blog-post'
  usage_context TEXT, -- where it was used
  used_at TIMESTAMPTZ DEFAULT NOW(),
  project_id UUID,
  created_by UUID,
  UNIQUE(client_id, asset_id, usage_type, project_id)
);

CREATE TABLE IF NOT EXISTS envato_search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT NOT NULL,
  asset_type TEXT,
  filters JSONB,
  results_count INTEGER,
  user_id UUID,
  client_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS envato_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS envato_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES envato_collections(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES envato_assets(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  notes TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, asset_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_envato_assets_type ON envato_assets(asset_type);
CREATE INDEX IF NOT EXISTS idx_envato_assets_tags ON envato_assets USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_envato_assets_categories ON envato_assets USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_envato_client_usage_client ON envato_client_usage(client_id);
CREATE INDEX IF NOT EXISTS idx_envato_client_usage_asset ON envato_client_usage(asset_id);
CREATE INDEX IF NOT EXISTS idx_envato_search_client ON envato_search_history(client_id);
CREATE INDEX IF NOT EXISTS idx_envato_collections_client ON envato_collections(client_id);

SELECT 'Envato Elements integration tables created successfully!' as message;
