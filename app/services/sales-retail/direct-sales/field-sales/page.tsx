import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Field Sales Services Dubai | Outside Sales UAE GCC",
  description:
    "Professional field sales services in Dubai, UAE & GCC. Mobile sales teams, territory coverage, and outside sales operations across Middle East markets.",
  keywords: ["field sales dubai", "outside sales uae", "territory sales gcc", "mobile sales dubai"],
}

export default function FieldSalesPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="Field Sales"
          subtitle="Territory Coverage"
          description="Expand your market presence with professional field sales teams across Dubai, UAE & GCC. Our mobile sales force covers territories systematically for maximum market penetration."
          heroImage="/field-sales-team-dubai.jpg"
          benefits={[
            "Dedicated territory sales reps",
            "Vehicle and mobility included",
            "GPS tracking and route optimization",
            "Mobile sales tools and apps",
            "Real-time reporting",
            "Key account development",
          ]}
          process={[
            { step: 1, title: "Territory Planning", description: "Mapping areas and setting coverage targets" },
            { step: 2, title: "Team Assignment", description: "Assigning reps to territories" },
            { step: 3, title: "Field Operations", description: "Systematic territory coverage and selling" },
            { step: 4, title: "Performance Review", description: "Territory analysis and optimization" },
          ]}
          pricing={{ startingFrom: "AED 10,000/month", includes: ["Sales rep", "Vehicle", "Mobile tools", "Reports"] }}
          faqs={[
            {
              question: "Which areas do you cover?",
              answer: "We cover all UAE emirates and can extend to GCC countries based on your expansion needs.",
            },
            {
              question: "Do your reps have their own vehicles?",
              answer:
                "Yes, our field sales reps are equipped with vehicles and mobile devices for efficient territory coverage.",
            },
          ]}
          relatedCategories={[
            { title: "B2B Sales", href: "/services/sales-retail/direct-sales/b2b-sales" },
            { title: "Account Management", href: "/services/sales-retail/direct-sales/account-management" },
            { title: "Door-to-Door", href: "/services/sales-retail/direct-sales/door-to-door" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
