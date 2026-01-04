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

  const trimmedTitle = title.length > 55 ? title.substring(0, 55).trim() + "..." : title
  const trimmedDescription = description.length > 155 ? description.substring(0, 155).trim() + "..." : description

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
    title: trimmedTitle,
    description: trimmedDescription,
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
      title: `${trimmedTitle} | Creative Fusion LLC`.substring(0, 65),
      description: trimmedDescription,
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
      title: `${trimmedTitle} | Creative Fusion LLC`,
      description: trimmedDescription,
      images: [image],
      creator: "@creativefusionllc",
      site: "@creativefusionllc",
    },
    alternates: {
      canonical: fullUrl.replace("https://creativefusion.llc", "https://www.creativefusion.llc"),
      languages: {
        "en-AE": fullUrl.replace("https://creativefusion.llc", "https://www.creativefusion.llc"),
        "en-US": fullUrl.replace("https://creativefusion.llc", "https://www.creativefusion.llc"),
      },
    },
    category: "business",
    classification: "Creative Agency, Digital Marketing, Branding",
  }
}
