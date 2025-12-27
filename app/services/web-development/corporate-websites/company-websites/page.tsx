import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Company Website Design Dubai | Corporate Web Development | Creative Fusion LLC",
  description:
    "Professional company website design and development in Dubai UAE. Modern, responsive corporate websites that showcase your business.",
}

export default function CompanyWebsitesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Corporate Websites", href: "/services/web-development/corporate-websites" }}
        title="Company Websites"
        subtitle="Professional corporate web presence"
        description="Create a powerful online presence with a professionally designed company website that represents your brand and engages your audience."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Custom design",
          "Responsive layout",
          "SEO optimized",
          "Fast loading",
          "CMS integration",
          "Analytics",
          "Security",
          "Support",
        ]}
        process={[
          { title: "Discovery", description: "Requirements analysis" },
          { title: "Design", description: "UI/UX creation" },
          { title: "Develop", description: "Build & integrate" },
          { title: "Launch", description: "Deploy & optimize" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "3,500",
            description: "5 pages",
            features: ["Custom design", "Mobile responsive", "Contact form", "Basic SEO"],
          },
          {
            name: "Business",
            price: "7,500",
            description: "10 pages",
            features: ["Everything in Starter", "CMS integration", "Blog", "Analytics"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "15,000",
            description: "20+ pages",
            features: ["Everything in Business", "Custom features", "Multi-language", "Priority support"],
          },
        ]}
        relatedCategories={[
          { title: "Portfolio Sites", href: "/services/web-development/corporate-websites/portfolio-sites" },
          { title: "Multi-page", href: "/services/web-development/corporate-websites/multi-page" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
