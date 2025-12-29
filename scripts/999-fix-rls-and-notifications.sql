-- Fix RLS Policies for website_settings to allow proper save operations
DROP POLICY IF EXISTS "Authenticated manage website_settings" ON website_settings;

CREATE POLICY "Admin manage website_settings" ON website_settings
  FOR ALL USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM clients 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Fix RLS Policies for website_cms_sections
DROP POLICY IF EXISTS "Authenticated users can manage sections" ON website_cms_sections;

CREATE POLICY "Authenticated insert sections" ON website_cms_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update sections" ON website_cms_sections
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete sections" ON website_cms_sections
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  
  -- Notification details
  type TEXT NOT NULL, -- approval, message, alert, update, booking_confirmation, etc.
  title TEXT NOT NULL,
  message TEXT,
  description TEXT,
  
  -- Link/Action
  action_url TEXT,
  action_label TEXT,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (
    user_id = auth.uid() 
    OR client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage own notifications" ON notifications
  FOR UPDATE USING (
    user_id = auth.uid() 
    OR client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  
  -- Email notifications
  email_notifications BOOLEAN DEFAULT true,
  email_approvals BOOLEAN DEFAULT true,
  email_messages BOOLEAN DEFAULT true,
  email_bookings BOOLEAN DEFAULT true,
  email_updates BOOLEAN DEFAULT true,
  
  -- In-app notifications
  app_notifications BOOLEAN DEFAULT true,
  app_approvals BOOLEAN DEFAULT true,
  app_messages BOOLEAN DEFAULT true,
  app_bookings BOOLEAN DEFAULT true,
  app_updates BOOLEAN DEFAULT true,
  
  -- Push notifications
  push_notifications BOOLEAN DEFAULT false,
  push_approvals BOOLEAN DEFAULT true,
  push_messages BOOLEAN DEFAULT true,
  push_bookings BOOLEAN DEFAULT true,
  
  -- WhatsApp notifications
  whatsapp_notifications BOOLEAN DEFAULT false,
  whatsapp_approvals BOOLEAN DEFAULT true,
  whatsapp_messages BOOLEAN DEFAULT false,
  whatsapp_bookings BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences" ON notification_preferences
  FOR ALL USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_client ON notifications(client_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);
