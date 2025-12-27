import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Multi-page Website Design Dubai | Complex Web Solutions | Creative Fusion LLC",
  description:
    "Professional multi-page website development in Dubai. Complex corporate websites with multiple sections and features.",
}

export default function MultiPagePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Corporate Websites", href: "/services/web-development/corporate-websites" }}
        title="Multi-page Websites"
        subtitle="Comprehensive web solutions"
        description="Build comprehensive multi-page websites with structured navigation, detailed content sections, and seamless user experience."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Structured navigation",
          "Content hierarchy",
          "Internal linking",
          "SEO structure",
          "Fast loading",
          "User flow",
          "Analytics",
          "Scalable",
        ]}
        process={[
          { title: "Plan", description: "Site architecture" },
          { title: "Design", description: "Page templates" },
          { title: "Build", description: "Development" },
          { title: "Test", description: "QA & launch" },
        ]}
        pricing={[
          {
            name: "Standard",
            price: "5,000",
            description: "10 pages",
            features: ["Custom design", "CMS", "SEO setup", "Contact forms"],
          },
          {
            name: "Advanced",
            price: "10,000",
            description: "25 pages",
            features: ["Everything in Standard", "Blog", "Team section", "Integrations"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "20,000",
            description: "50+ pages",
            features: ["Everything in Advanced", "Multi-language", "Custom features", "API integration"],
          },
        ]}
        relatedCategories={[
          { title: "Company Websites", href: "/services/web-development/corporate-websites/company-websites" },
          { title: "One-page", href: "/services/web-development/corporate-websites/one-page" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
