import type { Metadata } from "next"

interface SEOMetadataProps {
  title: string
  description: string
  keywords?: string[]
  path: string
  image?: string
  type?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  path,
  image = "/images/og-default.jpg",
  type = "website",
}: SEOMetadataProps): Metadata {
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://creativefusion.llc"

  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    baseUrl = `https://${baseUrl}`
  }

  let metadataBase: URL
  let validBaseUrl: string
  try {
    metadataBase = new URL(baseUrl)
    validBaseUrl = baseUrl
  } catch {
    // Fallback to default if URL is invalid
    metadataBase = new URL("https://creativefusion.llc")
    validBaseUrl = "https://creativefusion.llc"
  }

  const fullUrl = `${validBaseUrl}${path}`
  const fullImageUrl = image.startsWith("http") ? image : `${validBaseUrl}${image}`

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      type: type as any,
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "Creative Fusion LLC",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@creativefusion",
      site: "@creativefusion",
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: "Creative Fusion LLC" }],
    creator: "Creative Fusion LLC",
    publisher: "Creative Fusion LLC",
    category: "Business Services",
    metadataBase,
  }
}

// Helper function for specific page types
export function generateServiceMetadata(serviceName: string, description: string, keywords: string[], path: string) {
  return generateSEOMetadata({
    title: `${serviceName} | Creative Fusion LLC Dubai UAE`,
    description: `${description} Expert ${serviceName.toLowerCase()} services in Dubai, UAE & GCC by Creative Fusion LLC.`,
    keywords: [
      ...keywords,
      "dubai",
      "uae",
      "gcc",
      "saudi arabia",
      "qatar",
      "kuwait",
      "bahrain",
      "oman",
      "abu dhabi",
      "sharjah",
    ],
    path,
    type: "website",
  })
}
