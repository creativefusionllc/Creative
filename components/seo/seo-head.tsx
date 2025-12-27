// Universal SEO Head component for all pages
// Ensures SEMrush compliance across entire site

import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage?: string
  ogType?: "website" | "article" | "service"
  schema?: any
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-default.jpg",
  ogType = "website",
  schema,
}: SEOHeadProps) {
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `https://creativefusion.llc${ogImage}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Canonical URL - Critical for SEMrush */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Creative Fusion LLC" />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@creativefusionllc" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Creative Fusion LLC" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai, Sharjah, UAE" />
      <meta name="geo.position" content="25.3463;55.4209" />
      <meta name="ICBM" content="25.3463, 55.4209" />

      {/* Schema.org JSON-LD */}
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </Head>
  )
}
