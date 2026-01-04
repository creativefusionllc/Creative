import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://creativefusion.llc"

  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    baseUrl = `https://${baseUrl}`
  }

  const mainPages = [
    { url: "", priority: 1, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/pricing", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "daily" as const },
    { url: "/shop", priority: 0.6, changeFrequency: "weekly" as const },
  ]

  const servicePages = [
    // Creative Branding Services
    { url: "/services/creative-branding", priority: 0.85, category: "branding" },
    { url: "/services/creative-branding/brand-identity", priority: 0.8, category: "branding" },
    { url: "/services/creative-branding/logo-design", priority: 0.8, category: "branding" },
    { url: "/services/creative-branding/business-stationery", priority: 0.75, category: "branding" },
    { url: "/services/creative-branding/social-media-design", priority: 0.75, category: "branding" },
    { url: "/services/creative-branding/brand-guidelines", priority: 0.75, category: "branding" },
    { url: "/services/creative-branding/company-profile", priority: 0.75, category: "branding" },

    // Digital Marketing Services
    { url: "/services/digital-marketing", priority: 0.85, category: "marketing" },
    { url: "/services/digital-marketing/seo", priority: 0.8, category: "marketing" },
    { url: "/services/digital-marketing/social-media", priority: 0.8, category: "marketing" },
    { url: "/services/digital-marketing/content-marketing", priority: 0.75, category: "marketing" },
    { url: "/services/digital-marketing/ppc", priority: 0.75, category: "marketing" },
    { url: "/services/digital-marketing/email-marketing", priority: 0.75, category: "marketing" },
    { url: "/services/digital-marketing/analytics", priority: 0.75, category: "marketing" },

    // Web Development Services
    { url: "/services/web-development", priority: 0.85, category: "development" },
    { url: "/services/custom-software", priority: 0.8, category: "development" },

    // Creative Services
    { url: "/services/graphic-design", priority: 0.8, category: "creative" },
    { url: "/services/photography", priority: 0.8, category: "creative" },
    { url: "/services/videography", priority: 0.8, category: "creative" },

    // Additional Services
    { url: "/services/consulting", priority: 0.75, category: "consulting" },
    { url: "/services/marketing-pr", priority: 0.75, category: "marketing" },
    { url: "/services/print-exhibitions", priority: 0.75, category: "events" },
    { url: "/services/photo-lab", priority: 0.7, category: "creative" },
    { url: "/services/gift-items", priority: 0.7, category: "products" },
    { url: "/services/domain-hosting", priority: 0.75, category: "hosting" },
  ]

  const allPages = [
    ...mainPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...servicePages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
  ]

  return allPages
}
