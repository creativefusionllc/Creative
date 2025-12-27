import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "SEO Services Dubai | Search Engine Optimization | Creative Fusion LLC",
  description:
    "Professional SEO services in Dubai UAE. On-page, off-page, technical SEO, and local SEO to rank higher on Google and drive organic traffic.",
  keywords: ["seo services dubai", "search engine optimization uae", "google ranking dubai", "local seo sharjah"],
}

export default function SEOPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Digital Marketing", href: "/services/digital-marketing" }}
      title="Search Engine Optimization"
      subtitle="Rank Higher on Google"
      description="Rank higher on Google with our proven SEO strategies. On-page, off-page, technical SEO, and local SEO optimization."
      heroImage="/images/digital-marketing-strategy.png"
      features={[
        { title: "On-Page SEO", description: "Content optimization, meta tags, and keyword strategy" },
        { title: "Off-Page SEO", description: "Link building and authority development" },
        { title: "Technical SEO", description: "Site speed, mobile-first, and crawlability" },
        { title: "Local SEO", description: "Google My Business and local rankings" },
        { title: "Keyword Research", description: "Data-driven keyword targeting" },
        { title: "SEO Audits", description: "Comprehensive site analysis and recommendations" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 2,500/mo",
          description: "Small business SEO",
          features: ["10 keywords", "On-page optimization", "Monthly reporting", "Basic link building"],
        },
        {
          name: "Growth",
          price: "AED 5,000/mo",
          description: "Growing businesses",
          features: [
            "25 keywords",
            "Full on-page + off-page",
            "Technical SEO",
            "Weekly reporting",
            "Content recommendations",
          ],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 10,000/mo",
          description: "Large scale SEO",
          features: [
            "50+ keywords",
            "Full SEO strategy",
            "Content creation",
            "Link building campaign",
            "Dedicated manager",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Social Media Marketing", href: "/services/digital-marketing/social-media" },
        { title: "PPC Advertising", href: "/services/digital-marketing/ppc" },
      ]}
    />
  )
}
