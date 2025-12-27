import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Door-to-Door Sales Dubai | D2D Campaigns UAE GCC",
  description:
    "Professional door-to-door sales services in Dubai, UAE & GCC. Residential campaigns, building access, and personal selling directly to consumers at their homes.",
  keywords: ["door to door sales dubai", "d2d campaigns uae", "residential sales gcc", "home sales dubai"],
}

export default function DoorToDoorPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          }}
          title="Door-to-Door Sales"
          subtitle="Personal Residential Sales"
          description="Reach consumers at their doorstep with professional door-to-door sales services in Dubai, UAE & GCC. Our trained teams navigate building access and deliver results."
          heroImage="/door-to-door-sales-dubai.jpg"
          benefits={[
            "Experienced D2D sales teams",
            "Building and community access expertise",
            "Compliance with regulations",
            "GPS tracking and route optimization",
            "Real-time sales reporting",
            "Customer data verification",
          ]}
          process={[
            { step: 1, title: "Area Planning", description: "Mapping target neighborhoods and buildings" },
            { step: 2, title: "Access Coordination", description: "Securing building and community access" },
            { step: 3, title: "Campaign Execution", description: "Systematic door-to-door coverage" },
            { step: 4, title: "Follow-up", description: "Lead verification and follow-up calls" },
          ]}
          pricing={{ startingFrom: "AED 1,500/day", includes: ["Sales team", "GPS tracking", "Reports", "ID badges"] }}
          faqs={[
            {
              question: "Do you have access to residential buildings?",
              answer:
                "We have established relationships with many building managements and know the proper procedures for accessing residential communities.",
            },
            {
              question: "What products work well for D2D?",
              answer:
                "Home services, telecommunications, insurance, home appliances, and subscription services perform well in D2D campaigns.",
            },
          ]}
          relatedCategories={[
            { title: "B2C Sales", href: "/services/sales-retail/direct-sales/b2c-sales" },
            { title: "Field Sales", href: "/services/sales-retail/direct-sales/field-sales" },
            { title: "Telemarketing", href: "/services/sales-retail/direct-sales/telemarketing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
