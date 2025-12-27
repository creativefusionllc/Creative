-- SEED INITIAL DATA FOR PRODUCTION
-- Add essential data needed for the website to function

-- Insert agency settings
INSERT INTO agency_settings (id, agency_name, agency_number, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Creative Fusion LLC',
  'CF-2024-001',
  now(),
  now()
) ON CONFLICT DO NOTHING;

-- Insert default service categories (if not exists)
INSERT INTO services (id, category, title, subtitle, description, features, benefits, icon_name, display_order, is_active, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Consulting', 'Business Consulting', 'Strategic Solutions', 'Expert consulting services for business growth', ARRAY['Strategy', 'Planning', 'Implementation'], ARRAY['Growth', 'Efficiency', 'Success'], 'briefcase', 1, true, now(), now()),
  (gen_random_uuid(), 'Creative', 'Creative Services', 'Design & Branding', 'Professional creative and design services', ARRAY['Branding', 'Design', 'Content'], ARRAY['Brand Identity', 'Visual Appeal', 'Engagement'], 'palette', 2, true, now(), now()),
  (gen_random_uuid(), 'Digital Marketing', 'Marketing Services', 'Growth & Reach', 'Comprehensive digital marketing solutions', ARRAY['SEO', 'Social Media', 'Ads'], ARRAY['Visibility', 'Traffic', 'Conversions'], 'megaphone', 3, true, now(), now()),
  (gen_random_uuid(), 'Web Development', 'Development Services', 'Custom Solutions', 'Professional web and software development', ARRAY['Websites', 'Apps', 'Systems'], ARRAY['Modern Tech', 'Scalable', 'Secure'], 'code', 4, true, now(), now())
ON CONFLICT DO NOTHING;

-- Insert default SMS templates
INSERT INTO sms_templates (id, code, name, category, content, variables, character_count, language, is_active, created_by, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'BOOKING_CONFIRMED', 'Booking Confirmation', 'booking', 'Hi {name}, your booking #{booking_number} for {service} on {date} has been confirmed. Creative Fusion', ARRAY['name', 'booking_number', 'service', 'date'], 120, 'en', true, NULL, now(), now()),
  (gen_random_uuid(), 'APPOINTMENT_REMINDER', 'Appointment Reminder', 'booking', 'Reminder: Your appointment for {service} is tomorrow at {time}. Creative Fusion - {phone}', ARRAY['service', 'time', 'phone'], 100, 'en', true, NULL, now(), now())
ON CONFLICT DO NOTHING;

SELECT 'Initial data seeded successfully!' as message;
