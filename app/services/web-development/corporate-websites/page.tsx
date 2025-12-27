import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Corporate Website Development Dubai | Business Websites | Creative Fusion LLC",
  description:
    "Professional corporate website development in Dubai UAE. Modern business websites with SEO optimization and responsive design.",
  keywords: ["corporate website dubai", "business website uae", "company website dubai", "web development sharjah"],
}

export default function CorporateWebsitesPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="Corporate Website Development"
      subtitle="Professional Online Presence"
      description="Professional business websites with modern design, powerful functionality, and SEO optimization built-in."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "Custom Design", description: "Unique designs tailored to your brand" },
        { title: "Responsive Layout", description: "Perfect display on all devices" },
        { title: "SEO Optimized", description: "Built to rank on search engines" },
        { title: "CMS Integration", description: "Easy content management" },
        { title: "Contact Forms", description: "Lead capture and inquiries" },
        { title: "Analytics Setup", description: "Track visitor behavior" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 5,000",
          description: "5-page website",
          features: ["5 pages", "Responsive design", "Contact form", "Basic SEO", "1 month support"],
        },
        {
          name: "Professional",
          price: "AED 12,000",
          description: "10-page website",
          features: ["10 pages", "Custom design", "CMS integration", "Full SEO", "Blog setup", "3 months support"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 25,000",
          description: "Unlimited pages",
          features: [
            "Unlimited pages",
            "Premium design",
            "Advanced features",
            "Multi-language",
            "1 year support",
            "Priority updates",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "E-Commerce Solutions", href: "/services/web-development/ecommerce" },
        { title: "Landing Pages", href: "/services/web-development/landing-pages" },
      ]}
    />
  )
}
