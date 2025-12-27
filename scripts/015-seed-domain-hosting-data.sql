-- Seed Domain TLDs based on creativeon.com
INSERT INTO domain_tlds (extension, category, registration_price, renewal_price, transfer_price, is_popular, description, sort_order) VALUES
-- Popular TLDs
('.com', 'generic', 45.00, 55.00, 55.00, true, 'Most popular domain extension worldwide', 1),
('.net', 'generic', 50.00, 60.00, 60.00, true, 'Perfect for network and tech businesses', 2),
('.org', 'generic', 50.00, 60.00, 60.00, true, 'Ideal for organizations and nonprofits', 3),
('.ae', 'country', 250.00, 250.00, 250.00, true, 'United Arab Emirates country domain', 4),
('.co.ae', 'country', 150.00, 150.00, 150.00, true, 'Commercial UAE domain', 5),
('.io', 'generic', 150.00, 160.00, 160.00, true, 'Popular for tech startups', 6),
('.co', 'generic', 100.00, 110.00, 110.00, true, 'Short alternative to .com', 7),
('.me', 'generic', 80.00, 90.00, 90.00, false, 'Personal branding domain', 8),
('.info', 'generic', 45.00, 55.00, 55.00, false, 'Information websites', 9),
('.biz', 'generic', 50.00, 60.00, 60.00, false, 'Business domain', 10),
('.online', 'generic', 35.00, 45.00, 45.00, false, 'Modern online presence', 11),
('.store', 'generic', 40.00, 50.00, 50.00, false, 'E-commerce stores', 12),
('.shop', 'generic', 35.00, 45.00, 45.00, false, 'Online shops', 13),
('.tech', 'generic', 45.00, 55.00, 55.00, false, 'Technology companies', 14),
('.site', 'generic', 30.00, 40.00, 40.00, false, 'General websites', 15),
('.xyz', 'generic', 25.00, 35.00, 35.00, false, 'Next generation domain', 16),
('.pk', 'country', 80.00, 80.00, 80.00, false, 'Pakistan country domain', 17),
('.com.pk', 'country', 60.00, 60.00, 60.00, false, 'Commercial Pakistan domain', 18),
('.sa', 'country', 300.00, 300.00, 300.00, false, 'Saudi Arabia domain', 19),
('.com.sa', 'country', 200.00, 200.00, 200.00, false, 'Commercial Saudi domain', 20)
ON CONFLICT (extension) DO NOTHING;

-- Seed Hosting Plans
INSERT INTO hosting_plans (name, slug, category, description, short_description, price_monthly, price_yearly, disk_space, bandwidth, websites, email_accounts, databases, subdomains, features, is_popular, sort_order) VALUES
-- Shared Hosting
('Starter', 'shared-starter', 'shared', 'Perfect for personal websites and blogs', 'Entry level hosting', 15.00, 150.00, '10 GB SSD', '100 GB', 1, 5, 1, 5, '["Free SSL Certificate", "1-Click WordPress Install", "24/7 Support", "99.9% Uptime", "Daily Backups"]', false, 1),
('Professional', 'shared-professional', 'shared', 'Ideal for small business websites', 'Most popular choice', 25.00, 250.00, '50 GB SSD', '500 GB', 5, 25, 5, 25, '["Free SSL Certificate", "1-Click WordPress Install", "24/7 Priority Support", "99.9% Uptime", "Daily Backups", "Free Domain", "Staging Environment"]', true, 2),
('Business', 'shared-business', 'shared', 'For growing businesses with high traffic', 'High performance hosting', 45.00, 450.00, '100 GB SSD', 'Unlimited', 10, 50, 10, 50, '["Free SSL Certificate", "1-Click WordPress Install", "24/7 Priority Support", "99.9% Uptime", "Daily Backups", "Free Domain", "Staging Environment", "SSH Access", "Advanced Caching"]', false, 3),
('Enterprise', 'shared-enterprise', 'shared', 'Maximum resources for large websites', 'Ultimate shared hosting', 75.00, 750.00, 'Unlimited SSD', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["Free SSL Certificate", "1-Click WordPress Install", "24/7 VIP Support", "99.99% Uptime", "Real-time Backups", "Free Domain", "Staging Environment", "SSH Access", "Advanced Caching", "Dedicated Resources", "Malware Scanning"]', false, 4),

-- WordPress Hosting
('WP Starter', 'wordpress-starter', 'wordpress', 'Optimized WordPress hosting for beginners', 'Start your blog', 20.00, 200.00, '20 GB SSD', '100 GB', 1, 5, 1, 5, '["Pre-installed WordPress", "Auto Updates", "Free SSL", "24/7 Support", "Daily Backups", "WP-CLI Access"]', false, 5),
('WP Professional', 'wordpress-professional', 'wordpress', 'Fast WordPress hosting for professionals', 'Most popular WP plan', 35.00, 350.00, '50 GB SSD', '500 GB', 3, 15, 3, 15, '["Pre-installed WordPress", "Auto Updates", "Free SSL", "24/7 Priority Support", "Daily Backups", "WP-CLI Access", "Staging Site", "Free Premium Theme"]', true, 6),
('WP Business', 'wordpress-business', 'wordpress', 'High-performance WordPress for businesses', 'Enterprise WP hosting', 60.00, 600.00, '100 GB NVMe', 'Unlimited', 10, 50, 10, 50, '["Pre-installed WordPress", "Auto Updates", "Free SSL", "24/7 VIP Support", "Real-time Backups", "WP-CLI Access", "Staging Site", "Free Premium Theme", "Advanced Caching", "CDN Included"]', false, 7),

-- VPS Hosting
('VPS Basic', 'vps-basic', 'vps', 'Entry-level VPS for developers', 'Get started with VPS', 75.00, 750.00, '40 GB NVMe', '2 TB', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["2 vCPU Cores", "2 GB RAM", "Root Access", "Choice of OS", "Free SSL", "24/7 Support", "Weekly Backups"]', false, 8),
('VPS Standard', 'vps-standard', 'vps', 'Balanced VPS for growing applications', 'Popular VPS choice', 150.00, 1500.00, '80 GB NVMe', '4 TB', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["4 vCPU Cores", "4 GB RAM", "Root Access", "Choice of OS", "Free SSL", "24/7 Priority Support", "Daily Backups", "DDoS Protection"]', true, 9),
('VPS Premium', 'vps-premium', 'vps', 'High-performance VPS for demanding apps', 'Power VPS solution', 250.00, 2500.00, '160 GB NVMe', '8 TB', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["8 vCPU Cores", "8 GB RAM", "Root Access", "Choice of OS", "Free SSL", "24/7 VIP Support", "Real-time Backups", "DDoS Protection", "Dedicated IP"]', false, 10),

-- Dedicated Servers
('Dedicated Basic', 'dedicated-basic', 'dedicated', 'Entry dedicated server', 'Full server power', 500.00, 5000.00, '500 GB SSD', '10 TB', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["Intel Xeon E3", "16 GB RAM", "Full Root Access", "IPMI Access", "24/7 Support", "Free Setup"]', false, 11),
('Dedicated Pro', 'dedicated-pro', 'dedicated', 'Professional dedicated server', 'High performance server', 800.00, 8000.00, '1 TB NVMe', '20 TB', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', '["Intel Xeon E5", "32 GB RAM", "Full Root Access", "IPMI Access", "24/7 Priority Support", "Free Setup", "Hardware RAID"]', true, 12),

-- Cloud Hosting
('Cloud Starter', 'cloud-starter', 'cloud', 'Scalable cloud hosting', 'Start in the cloud', 40.00, 400.00, '30 GB SSD', '1 TB', 1, 10, 5, 10, '["Auto Scaling", "Load Balancing", "Free SSL", "24/7 Support", "Daily Backups", "99.99% Uptime SLA"]', false, 13),
('Cloud Business', 'cloud-business', 'cloud', 'Business cloud hosting', 'Scale your business', 80.00, 800.00, '100 GB SSD', '5 TB', 10, 50, 20, 50, '["Auto Scaling", "Load Balancing", "Free SSL", "24/7 Priority Support", "Real-time Backups", "99.99% Uptime SLA", "CDN Included", "Staging Environment"]', true, 14)
ON CONFLICT (slug) DO NOTHING;

-- Seed SSL Certificates
INSERT INTO ssl_certificates (name, slug, provider, type, description, price_yearly, price_biennial, validation_level, warranty_amount, issuance_time, domains_covered, wildcard, features, is_popular, sort_order) VALUES
('RapidSSL Standard', 'rapidssl-standard', 'RapidSSL', 'DV', 'Quick domain validation SSL', 35.00, 60.00, 'Domain', 10000.00, '5 Minutes', 1, false, '["256-bit Encryption", "99.9% Browser Compatibility", "Site Seal", "30-Day Money Back"]', false, 1),
('Comodo PositiveSSL', 'comodo-positivessl', 'Comodo', 'DV', 'Affordable SSL protection', 45.00, 80.00, 'Domain', 50000.00, '10 Minutes', 1, false, '["256-bit Encryption", "99.9% Browser Compatibility", "TrustLogo Site Seal", "30-Day Money Back"]', true, 2),
('GeoTrust QuickSSL', 'geotrust-quickssl', 'GeoTrust', 'DV', 'Fast issuance SSL', 99.00, 180.00, 'Domain', 100000.00, '10 Minutes', 1, false, '["256-bit Encryption", "99.9% Browser Compatibility", "Dynamic Site Seal", "30-Day Money Back"]', false, 3),
('Comodo SSL', 'comodo-ssl', 'Comodo', 'OV', 'Organization validated SSL', 150.00, 280.00, 'Organization', 250000.00, '1-3 Days', 1, false, '["256-bit Encryption", "Organization Validation", "TrustLogo Site Seal", "Green Address Bar Indicator"]', true, 4),
('GeoTrust True BusinessID', 'geotrust-businessid', 'GeoTrust', 'OV', 'Business identity SSL', 199.00, 380.00, 'Organization', 500000.00, '1-3 Days', 1, false, '["256-bit Encryption", "Organization Validation", "Dynamic Site Seal", "Verified Business Identity"]', false, 5),
('Comodo EV SSL', 'comodo-ev', 'Comodo', 'EV', 'Extended validation SSL', 299.00, 550.00, 'Extended', 1750000.00, '3-5 Days', 1, false, '["256-bit Encryption", "Extended Validation", "Green Address Bar", "Maximum Trust Indicators"]', true, 6),
('Comodo Wildcard SSL', 'comodo-wildcard', 'Comodo', 'Wildcard', 'Secure unlimited subdomains', 350.00, 650.00, 'Domain', 250000.00, '10 Minutes', 999, true, '["256-bit Encryption", "Unlimited Subdomains", "TrustLogo Site Seal", "Single Certificate Management"]', true, 7),
('GeoTrust Wildcard SSL', 'geotrust-wildcard', 'GeoTrust', 'Wildcard', 'Premium wildcard SSL', 499.00, 950.00, 'Domain', 500000.00, '10 Minutes', 999, true, '["256-bit Encryption", "Unlimited Subdomains", "Dynamic Site Seal", "Premium Support"]', false, 8)
ON CONFLICT (slug) DO NOTHING;

-- Seed Email Hosting Plans
INSERT INTO email_hosting_plans (name, slug, provider, description, price_monthly, price_yearly, storage_per_user, max_users, features, is_popular, sort_order) VALUES
('Business Email Starter', 'email-starter', 'Custom', 'Professional email for small teams', 5.00, 50.00, '10 GB', 5, '["Custom Domain Email", "Webmail Access", "Mobile Sync", "Spam Protection", "24/7 Support"]', false, 1),
('Business Email Pro', 'email-pro', 'Custom', 'Enhanced email for growing businesses', 10.00, 100.00, '25 GB', 25, '["Custom Domain Email", "Webmail Access", "Mobile Sync", "Advanced Spam Protection", "Email Archiving", "24/7 Priority Support"]', true, 2),
('Google Workspace Starter', 'google-workspace-starter', 'Google', 'Gmail for your business domain', 25.00, 250.00, '30 GB', 300, '["Gmail with Custom Domain", "Google Drive", "Google Meet", "Google Docs, Sheets, Slides", "Admin Console", "24/7 Support"]', true, 3),
('Google Workspace Business', 'google-workspace-business', 'Google', 'Enhanced Google Workspace', 50.00, 500.00, '2 TB', 300, '["Gmail with Custom Domain", "Google Drive 2TB", "Google Meet (150 participants)", "Google Docs, Sheets, Slides", "Admin Console", "Vault for eDiscovery", "24/7 Priority Support"]', false, 4),
('Microsoft 365 Basic', 'microsoft-365-basic', 'Microsoft', 'Essential Microsoft apps', 25.00, 250.00, '50 GB', 300, '["Outlook Email", "OneDrive 1TB", "Microsoft Teams", "Web Office Apps", "Admin Center", "24/7 Support"]', true, 5),
('Microsoft 365 Business', 'microsoft-365-business', 'Microsoft', 'Full Microsoft productivity suite', 55.00, 550.00, '50 GB', 300, '["Outlook Email", "OneDrive 1TB", "Microsoft Teams", "Desktop Office Apps", "Advanced Security", "Admin Center", "24/7 Priority Support"]', false, 6)
ON CONFLICT (slug) DO NOTHING;
