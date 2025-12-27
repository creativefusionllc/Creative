import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "B2B Sales Services Dubai | Corporate Sales UAE GCC",
  description:
    "Professional B2B sales services in Dubai, UAE & GCC. Corporate sales teams, enterprise selling, and business development for your products and services.",
  keywords: ["b2b sales dubai", "corporate sales uae", "enterprise selling gcc", "business development dubai"],
}

export default function B2BSalesPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="B2B Sales"
          subtitle="Corporate Sales Excellence"
          description="Drive business growth with professional B2B sales services in Dubai, UAE & GCC. Our corporate sales teams build relationships and close deals with enterprise clients."
          heroImage="/b2b-sales-corporate-meeting-dubai.jpg"
          benefits={[
            "Experienced B2B sales professionals",
            "Enterprise account development",
            "Proposal and RFP support",
            "CRM integration and tracking",
            "Pipeline management",
            "Regular progress reporting",
          ]}
          process={[
            { step: 1, title: "Market Mapping", description: "Identifying target companies and decision makers" },
            { step: 2, title: "Outreach", description: "Professional prospecting and relationship building" },
            { step: 3, title: "Sales Engagement", description: "Presentations, demos, and negotiations" },
            { step: 4, title: "Closing", description: "Contract negotiation and deal closure" },
          ]}
          pricing={{
            startingFrom: "AED 12,000/month",
            includes: ["Dedicated sales rep", "CRM access", "Weekly reports", "Target setting"],
          }}
          faqs={[
            {
              question: "Which industries do you cover?",
              answer:
                "We have B2B sales experience across technology, healthcare, FMCG, industrial, and professional services sectors.",
            },
            {
              question: "Do you work on commission basis?",
              answer: "Yes, we offer flexible compensation models including retainer plus commission structures.",
            },
          ]}
          relatedCategories={[
            { title: "Account Management", href: "/services/sales-retail/direct-sales/account-management" },
            { title: "Telemarketing", href: "/services/sales-retail/direct-sales/telemarketing" },
            { title: "Field Sales", href: "/services/sales-retail/direct-sales/field-sales" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
