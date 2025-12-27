import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Visual Merchandising Dubai | Retail Display Design UAE GCC",
  description:
    "Professional visual merchandising services in Dubai, UAE & GCC. Creative retail displays, store design, and visual storytelling that drives sales.",
  keywords: ["visual merchandising dubai", "retail displays uae", "store design gcc", "merchandise display dubai"],
}

export default function VisualPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          }}
          title="Visual Merchandising"
          subtitle="Creative Retail Displays"
          description="Transform your retail space with professional visual merchandising in Dubai, UAE & GCC. Our creative displays capture attention and drive customer engagement."
          heroImage="/visual-merchandising-store-dubai.jpg"
          benefits={[
            "Creative display concepts",
            "Brand-aligned designs",
            "Traffic flow optimization",
            "Focal point creation",
            "Color psychology application",
            "Regular refresh schedules",
          ]}
          process={[
            { step: 1, title: "Space Assessment", description: "Evaluating retail space and brand guidelines" },
            { step: 2, title: "Concept Design", description: "Creating visual merchandising concepts" },
            { step: 3, title: "Implementation", description: "Professional display installation" },
            { step: 4, title: "Performance Review", description: "Measuring impact on sales" },
          ]}
          pricing={{
            startingFrom: "AED 3,500/project",
            includes: ["Concept", "Materials", "Installation", "Photography"],
          }}
          faqs={[
            {
              question: "How often should displays be updated?",
              answer:
                "We recommend monthly updates for fashion, quarterly for other retail, with special changes for seasonal campaigns.",
            },
            {
              question: "Do you provide props and materials?",
              answer: "Yes, we source or create props, signage, and display materials as part of our service.",
            },
          ]}
          relatedCategories={[
            { title: "Window Displays", href: "/services/sales-retail/merchandising/window-displays" },
            { title: "Product Placement", href: "/services/sales-retail/merchandising/placement" },
            { title: "Seasonal", href: "/services/sales-retail/merchandising/seasonal" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
