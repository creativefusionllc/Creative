-- Seed initial services from existing structure
INSERT INTO cms_services (slug, title, subtitle, description, short_description, icon_name, is_featured, display_order) VALUES
('photography', 'Photography', 'Professional Photography Services', 'Capture stunning moments with our professional photography services. From real estate to corporate events, we deliver high-quality images that tell your story.', 'Professional photography for all occasions', 'Camera', true, 1),
('videography', 'Videography', 'Professional Video Production', 'Create compelling video content that engages your audience. From corporate videos to cinematic productions, we bring your vision to life.', 'High-quality video production services', 'Video', true, 2),
('digital-marketing', 'Digital Marketing', 'Results-Driven Marketing', 'Boost your online presence with our comprehensive digital marketing services. SEO, social media, PPC, and more to grow your business.', 'Complete digital marketing solutions', 'TrendingUp', true, 3),
('web-development', 'Web Development', 'Custom Web Solutions', 'Build powerful websites and web applications that drive results. From corporate sites to e-commerce platforms, we deliver excellence.', 'Professional web development services', 'Globe', true, 4),
('creative-branding', 'Creative Branding', 'Brand Identity Design', 'Create a memorable brand identity that stands out. Logo design, brand guidelines, and complete visual systems for your business.', 'Complete branding solutions', 'Palette', true, 5),
('graphic-design', 'Graphic Design', 'Visual Design Services', 'Transform your ideas into stunning visuals. From print to digital, we create designs that capture attention and communicate effectively.', 'Professional graphic design services', 'PenTool', true, 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed sub-services for Photography
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'real-estate', 'Real Estate Photography', 'Property Photography', 'High-resolution, wide-angle shots with minimal distortion. Perfect for property listings, architectural showcases, and interior design portfolios.', 'Building', 1
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'corporate', 'Corporate Photography', 'Business Photography', 'Professional portraits, team photos, and office environment shots that showcase your company culture and professionalism.', 'Briefcase', 2
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'wedding', 'Wedding Photography', 'Wedding Coverage', 'Cinematic and emotive captures for timeless memories. We document your special day with artistry and attention to every precious moment.', 'Heart', 3
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'product', 'Product Photography', 'E-commerce Photography', 'High-quality images for e-commerce, catalogs, and marketing materials. Make your products shine with professional lighting and styling.', 'Package', 4
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'event', 'Event Photography', 'Event Coverage', 'Dynamic coverage of parties, conferences, launches, and corporate events. We capture the energy and key moments of your gatherings.', 'PartyPopper', 5
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, '360-degree', '360-Degree Photography', 'Virtual Tours', 'Immersive visuals for virtual tours and interactive experiences. Perfect for real estate, hospitality, and retail spaces.', 'RotateCcw', 6
FROM cms_services s WHERE s.slug = 'photography'
ON CONFLICT (service_id, slug) DO NOTHING;

-- Seed sub-services for Videography
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'corporate-videos', 'Corporate Videos', 'Business Video Production', 'Professional corporate videos including company profiles, training videos, and internal communications that reflect your brand values.', 'Building2', 1
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'tv-commercials', 'TV Commercials', 'Broadcast Advertising', 'High-impact TV commercials and advertisements that capture attention and drive results for your brand.', 'Tv', 2
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'wedding-films', 'Wedding Films', 'Cinematic Wedding Videos', 'Cinematic wedding films that tell your love story. From highlight reels to full-day documentaries, we capture every magical moment.', 'Heart', 3
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'product-videos', 'Product Videos', 'E-commerce Video Content', 'Engaging product videos for e-commerce and marketing. Showcase features, demonstrate usage, and drive conversions.', 'ShoppingBag', 4
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'drone-aerial', 'Drone & Aerial', 'Aerial Videography', 'Stunning aerial footage using state-of-the-art drone technology. Perfect for real estate, events, and cinematic productions.', 'Plane', 5
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'social-media-content', 'Social Media Content', 'Short-Form Video', 'Engaging short-form video content optimized for Instagram Reels, TikTok, YouTube Shorts, and other social platforms.', 'Share2', 6
FROM cms_services s WHERE s.slug = 'videography'
ON CONFLICT (service_id, slug) DO NOTHING;

-- Seed sub-services for Digital Marketing
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'seo', 'SEO Services', 'Search Engine Optimization', 'Improve your search rankings and drive organic traffic with our comprehensive SEO services including on-page, off-page, and technical SEO.', 'Search', 1
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'social-media', 'Social Media Marketing', 'Social Media Management', 'Build your brand presence across social platforms. Strategy, content creation, community management, and paid advertising.', 'Share2', 2
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'ppc', 'PPC Advertising', 'Pay-Per-Click Marketing', 'Drive targeted traffic with Google Ads, Facebook Ads, and other PPC platforms. Maximize ROI with data-driven campaigns.', 'Target', 3
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'content-marketing', 'Content Marketing', 'Content Strategy', 'Create compelling content that attracts and converts. Blog posts, articles, whitepapers, and content strategy development.', 'FileText', 4
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'email-marketing', 'Email Marketing', 'Email Campaigns', 'Build customer relationships with targeted email campaigns. Newsletter design, automation, and performance optimization.', 'Mail', 5
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'analytics', 'Analytics & Reporting', 'Data Analytics', 'Make data-driven decisions with comprehensive analytics and reporting. Track performance and optimize your marketing efforts.', 'BarChart3', 6
FROM cms_services s WHERE s.slug = 'digital-marketing'
ON CONFLICT (service_id, slug) DO NOTHING;

-- Seed sub-services for Web Development
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'corporate-websites', 'Corporate Websites', 'Business Websites', 'Professional corporate websites that establish credibility and drive business growth. Custom designs tailored to your brand.', 'Building2', 1
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'ecommerce', 'E-Commerce Solutions', 'Online Stores', 'Powerful e-commerce platforms that drive sales. From Shopify to custom solutions, we build stores that convert.', 'ShoppingCart', 2
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'landing-pages', 'Landing Pages', 'Conversion-Focused Pages', 'High-converting landing pages designed to capture leads and drive conversions. A/B testing and optimization included.', 'MousePointerClick', 3
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'ui-ux-design', 'UI/UX Design', 'User Experience Design', 'Create intuitive, user-friendly interfaces that delight users. Research-driven design for optimal user experience.', 'Layers', 4
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'web-applications', 'Web Applications', 'Custom Web Apps', 'Custom web applications built with modern technologies. Scalable, secure, and tailored to your business needs.', 'AppWindow', 5
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'cloud-hosting', 'Cloud Hosting', 'Hosting & Maintenance', 'Reliable cloud hosting with 99.9% uptime. Ongoing maintenance, security updates, and performance optimization.', 'Cloud', 6
FROM cms_services s WHERE s.slug = 'web-development'
ON CONFLICT (service_id, slug) DO NOTHING;

-- Seed sub-services for Creative Branding
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'logo-design', 'Logo Design', 'Brand Mark Design', 'Create a memorable logo that represents your brand essence. Multiple concepts, unlimited revisions, and all file formats included.', 'Sparkles', 1
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'brand-identity', 'Brand Identity', 'Visual Identity System', 'Complete visual identity systems including colors, typography, imagery style, and brand applications across all touchpoints.', 'Palette', 2
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'business-stationery', 'Business Stationery', 'Corporate Stationery', 'Professional business stationery including business cards, letterheads, envelopes, and presentation folders.', 'CreditCard', 3
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'brand-guidelines', 'Brand Guidelines', 'Brand Style Guide', 'Comprehensive brand guidelines that ensure consistency across all communications and touchpoints.', 'BookOpen', 4
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'company-profile', 'Company Profile', 'Corporate Profile Design', 'Stunning company profiles that tell your story and impress stakeholders. Print and digital formats available.', 'FileText', 5
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'social-media-design', 'Social Media Design', 'Social Media Branding', 'Consistent social media branding across all platforms. Profile designs, cover images, and post templates.', 'Share2', 6
FROM cms_services s WHERE s.slug = 'creative-branding'
ON CONFLICT (service_id, slug) DO NOTHING;

-- Seed sub-services for Graphic Design
INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'print-design', 'Print Design', 'Print Materials', 'Professional print designs including brochures, flyers, posters, and marketing collateral that make an impact.', 'Printer', 1
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'packaging-design', 'Packaging Design', 'Product Packaging', 'Eye-catching packaging designs that stand out on shelves and communicate your brand value effectively.', 'Package', 2
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'motion-graphics', 'Motion Graphics', 'Animated Graphics', 'Dynamic motion graphics and animations for videos, presentations, and digital marketing campaigns.', 'Play', 3
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'infographics', 'Infographics', 'Data Visualization', 'Transform complex data into visually engaging infographics that communicate clearly and drive engagement.', 'BarChart', 4
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'illustration', 'Illustration', 'Custom Illustrations', 'Custom illustrations that bring your ideas to life. From character design to editorial illustrations.', 'Pencil', 5
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;

INSERT INTO cms_sub_services (service_id, slug, title, subtitle, description, icon_name, display_order)
SELECT s.id, 'signage-design', 'Signage Design', 'Environmental Graphics', 'Impactful signage designs for retail, offices, events, and outdoor advertising that capture attention.', 'Signpost', 6
FROM cms_services s WHERE s.slug = 'graphic-design'
ON CONFLICT (service_id, slug) DO NOTHING;
