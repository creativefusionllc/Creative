import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Product Launch Pages Dubai | Launch Your Product | Creative Fusion LLC",
  description:
    "Professional product launch landing pages in Dubai. Create buzz and drive sales with compelling launch pages.",
}

export default function ProductLaunchPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Landing Pages", href: "/services/web-development/landing-pages" }}
        title="Product Launch Pages"
        subtitle="Launch with impact"
        description="Create powerful product launch landing pages that build excitement, showcase features, and drive pre-orders or sales."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Product showcase",
          "Feature highlights",
          "Pre-order system",
          "Video demos",
          "Testimonials",
          "FAQ section",
          "Social proof",
          "Urgency elements",
        ]}
        process={[
          { title: "Strategy", description: "Launch planning" },
          { title: "Story", description: "Product narrative" },
          { title: "Design", description: "Visual showcase" },
          { title: "Launch", description: "Go live & promote" },
        ]}
        pricing={[
          {
            name: "Soft Launch",
            price: "2,500",
            description: "Basic launch",
            features: ["Product showcase", "Feature sections", "Contact form", "Social sharing"],
          },
          {
            name: "Full Launch",
            price: "6,000",
            description: "Complete launch",
            features: ["Everything in Soft Launch", "Pre-order system", "Video integration", "Email capture"],
            popular: true,
          },
          {
            name: "Campaign",
            price: "15,000",
            description: "Launch campaign",
            features: ["Everything in Full Launch", "Multiple variations", "Marketing integration", "Full funnel"],
          },
        ]}
        relatedCategories={[
          { title: "Sales Pages", href: "/services/web-development/landing-pages/sales-pages" },
          { title: "Product Videos", href: "/services/videography/product-videos" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
