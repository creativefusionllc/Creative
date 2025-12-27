import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "B2C Sales Services Dubai | Consumer Sales UAE GCC",
  description:
    "Professional B2C sales services in Dubai, UAE & GCC. Consumer-focused sales teams, direct-to-consumer campaigns, and personal selling for your products.",
  keywords: ["b2c sales dubai", "consumer sales uae", "direct selling gcc", "personal selling dubai"],
}

export default function B2CSalesPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="B2C Sales"
          subtitle="Consumer Sales Excellence"
          description="Connect directly with consumers through professional B2C sales services in Dubai, UAE & GCC. Our teams drive product trials, conversions, and brand loyalty."
          heroImage="/b2c-consumer-sales-dubai.jpg"
          benefits={[
            "Consumer-trained sales teams",
            "Product sampling campaigns",
            "High-traffic location activations",
            "Instant sales conversion",
            "Customer data collection",
            "Real-time sales tracking",
          ]}
          process={[
            { step: 1, title: "Campaign Planning", description: "Defining targets and locations" },
            { step: 2, title: "Team Training", description: "Product and sales technique training" },
            { step: 3, title: "Execution", description: "Direct consumer engagement and selling" },
            { step: 4, title: "Reporting", description: "Sales data and customer insights" },
          ]}
          pricing={{
            startingFrom: "AED 2,000/day",
            includes: ["Sales team", "Location setup", "Materials", "Daily reports"],
          }}
          faqs={[
            {
              question: "Where do you conduct B2C sales?",
              answer:
                "We operate in malls, supermarkets, residential areas, events, and high-traffic public locations across UAE.",
            },
            {
              question: "Can you handle product sampling?",
              answer:
                "Yes, we manage complete product sampling campaigns including logistics, staff, and waste disposal.",
            },
          ]}
          relatedCategories={[
            { title: "Door-to-Door", href: "/services/sales-retail/direct-sales/door-to-door" },
            { title: "Field Sales", href: "/services/sales-retail/direct-sales/field-sales" },
            { title: "B2B Sales", href: "/services/sales-retail/direct-sales/b2b-sales" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
