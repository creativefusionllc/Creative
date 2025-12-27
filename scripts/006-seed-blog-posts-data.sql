-- Insert sample blog posts with past published_at date
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, status, read_time, author_name, published_at) VALUES
(
  'The Future of Digital Marketing in UAE 2025',
  'future-digital-marketing-uae-2025',
  'Discover the latest trends shaping digital marketing in the UAE and how businesses can stay ahead of the competition.',
  '<p>The digital marketing landscape in the UAE is evolving rapidly with AI integration, personalization, and data-driven strategies becoming increasingly important. Businesses must adapt to these changes to maintain competitive advantage.</p>',
  '/placeholder.svg?height=400&width=600',
  'Digital Marketing',
  ARRAY['digital marketing', 'UAE', 'trends', '2025'],
  'published',
  8,
  'Creative Fusion Team',
  NOW() - INTERVAL '1 day'
),
(
  'Brand Identity Design: A Complete Guide',
  'brand-identity-design-complete-guide',
  'Learn how to create a powerful brand identity that resonates with your target audience and stands out in the market.',
  '<p>A strong brand identity is essential for business success. From logo design to brand guidelines, every element matters in creating a cohesive brand experience.</p>',
  '/placeholder.svg?height=400&width=600',
  'Branding',
  ARRAY['branding', 'design', 'identity', 'logo'],
  'published',
  10,
  'Creative Fusion Team',
  NOW() - INTERVAL '2 days'
),
(
  'SEO Strategies That Actually Work in 2025',
  'seo-strategies-that-work-2025',
  'Proven SEO techniques to improve your website ranking and drive organic traffic to your business.',
  '<p>Search engine optimization continues to be crucial for online visibility. Technical SEO, content optimization, and link building remain fundamental pillars of successful SEO strategy.</p>',
  '/placeholder.svg?height=400&width=600',
  'SEO',
  ARRAY['SEO', 'search engine', 'optimization', 'ranking'],
  'published',
  7,
  'Creative Fusion Team',
  NOW() - INTERVAL '3 days'
);
