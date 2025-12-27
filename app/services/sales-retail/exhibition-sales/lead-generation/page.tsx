import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Exhibition Lead Generation Dubai | Trade Show Leads UAE GCC",
  description:
    "Professional lead generation services at exhibitions in Dubai, UAE & GCC. Systematic lead capture, qualification, and CRM integration for maximum exhibition ROI.",
  keywords: [
    "exhibition leads dubai",
    "trade show lead generation uae",
    "lead capture gcc",
    "exhibition marketing dubai",
  ],
}

export default function LeadGenerationPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
          }}
          title="Lead Generation"
          subtitle="Quality Leads at Exhibitions"
          description="Maximize your exhibition investment with systematic lead generation services in Dubai, UAE & GCC. We capture, qualify, and deliver high-quality leads integrated with your CRM."
          heroImage="/exhibition-lead-generation-dubai.jpg"
          benefits={[
            "Digital lead capture systems",
            "Real-time CRM integration",
            "Lead scoring and qualification",
            "Badge scanning technology",
            "Contact data enrichment",
            "Post-show lead nurturing support",
          ]}
          process={[
            { step: 1, title: "System Setup", description: "Configure lead capture tools and CRM integration" },
            { step: 2, title: "Team Training", description: "Train staff on lead qualification criteria" },
            { step: 3, title: "Active Capture", description: "Systematic lead collection during the event" },
            { step: 4, title: "Data Delivery", description: "Clean, enriched leads delivered to your CRM" },
          ]}
          pricing={{
            startingFrom: "AED 3,000/event",
            includes: ["Lead capture system", "CRM integration", "Data cleaning", "Analytics report"],
          }}
          faqs={[
            {
              question: "Which CRM systems do you integrate with?",
              answer: "We integrate with Salesforce, HubSpot, Zoho, Microsoft Dynamics, and most major CRM platforms.",
            },
            {
              question: "How do you qualify leads?",
              answer:
                "We use customized qualification criteria based on your ideal customer profile, including budget, authority, need, and timeline (BANT).",
            },
          ]}
          relatedCategories={[
            { title: "Trade Shows", href: "/services/sales-retail/exhibition-sales/trade-shows" },
            { title: "Product Demos", href: "/services/sales-retail/exhibition-sales/product-demos" },
            { title: "Sales Staffing", href: "/services/sales-retail/exhibition-sales/sales-staffing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
