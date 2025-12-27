import type { Metadata } from "next"

interface SEOMetadataProps {
  title: string
  description: string
  keywords: string[]
  path: string
  image?: string
  type?: "website" | "article" | "service"
  publishedTime?: string
  modifiedTime?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  path,
  image = "/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
}: SEOMetadataProps): Metadata {
  const baseUrl = "https://creativefusion.llc"
  const fullUrl = `${baseUrl}${path}`

  // Add Dubai/UAE/GCC keywords to all pages
  const enhancedKeywords = [
    ...keywords,
    "dubai",
    "uae",
    "sharjah",
    "abu dhabi",
    "gcc",
    "middle east",
    "creative fusion llc",
  ]

  return {
    title,
    description,
    keywords: enhancedKeywords,
    authors: [{ name: "Creative Fusion LLC", url: baseUrl }],
    creator: "Creative Fusion LLC",
    publisher: "Creative Fusion LLC",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_AE",
      url: fullUrl,
      siteName: "Creative Fusion LLC",
      title: `${title} | Creative Fusion LLC`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Creative Fusion LLC`,
      description,
      images: [image],
      creator: "@creativefusionllc",
      site: "@creativefusionllc",
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-AE": fullUrl,
        "en-US": fullUrl,
      },
    },
    category: "business",
    classification: "Creative Agency, Digital Marketing, Branding",
  }
}
