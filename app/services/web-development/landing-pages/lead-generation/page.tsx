import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Lead Generation Landing Pages Dubai | Convert Visitors | Creative Fusion LLC",
  description:
    "High-converting lead generation landing pages in Dubai. Capture leads with optimized forms and compelling designs.",
}

export default function LeadGenerationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Landing Pages", href: "/services/web-development/landing-pages" }}
        title="Lead Generation Pages"
        subtitle="Convert visitors to leads"
        description="Create high-converting lead generation landing pages that capture qualified leads and grow your business pipeline."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "High conversion",
          "A/B testing",
          "Form optimization",
          "CRM integration",
          "Lead scoring",
          "Auto-responders",
          "Analytics",
          "Mobile optimized",
        ]}
        process={[
          { title: "Strategy", description: "Conversion planning" },
          { title: "Design", description: "Persuasive layout" },
          { title: "Build", description: "Form integration" },
          { title: "Optimize", description: "A/B testing" },
        ]}
        pricing={[
          {
            name: "Single",
            price: "1,200",
            description: "1 landing page",
            features: ["Custom design", "Lead form", "Thank you page", "Basic tracking"],
          },
          {
            name: "Campaign",
            price: "3,500",
            description: "3 variations",
            features: ["Everything in Single", "A/B testing", "CRM integration", "Analytics"],
            popular: true,
          },
          {
            name: "Growth",
            price: "7,500",
            description: "Full funnel",
            features: ["Everything in Campaign", "Multiple pages", "Automation", "Optimization"],
          },
        ]}
        relatedCategories={[
          { title: "Sales Pages", href: "/services/web-development/landing-pages/sales-pages" },
          { title: "PPC Campaigns", href: "/services/digital-marketing/ppc" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
