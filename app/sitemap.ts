import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://creativefusion.llc"

  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    baseUrl = `https://${baseUrl}`
  }

  // Main pages
  const mainPages = ["", "/about", "/services", "/portfolio", "/pricing", "/contact", "/shop", "/login", "/register"]

  // Service pages
  const servicePages = [
    "/services/creative-branding",
    "/services/digital-marketing",
    "/services/web-development",
    "/services/graphic-design",
    "/services/photography",
    "/services/videography",
    "/services/software-apps",
    "/services/custom-software",
    "/services/whatsapp-marketing",
    "/services/consulting",
    "/services/marketing-pr",
    "/services/print-exhibitions",
    "/services/photo-lab",
    "/services/gift-items",
    "/services/sales-retail",
    "/services/exhibition-stands",
    "/services/support-maintenance",
  ]

  const allPages = [...mainPages, ...servicePages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : page.startsWith("/services") ? 0.8 : 0.7,
  }))
}
