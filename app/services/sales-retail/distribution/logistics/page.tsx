import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Logistics Services Dubai | Transport & Delivery UAE GCC",
  description:
    "Professional logistics and transportation services in Dubai, UAE & GCC. Freight, delivery, supply chain coordination, and distribution logistics across Middle East.",
  keywords: ["logistics dubai", "transport uae", "delivery services gcc", "freight dubai", "supply chain middle east"],
}

export default function LogisticsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Logistics Coordination"
          subtitle="Seamless Supply Chain"
          description="Streamline your supply chain with professional logistics services in Dubai, UAE & GCC. We coordinate transportation, customs, and delivery for efficient distribution."
          heroImage="/logistics-transportation-dubai.jpg"
          benefits={[
            "UAE-wide delivery network",
            "GCC cross-border logistics",
            "Customs clearance support",
            "Real-time shipment tracking",
            "Flexible delivery options",
            "Route optimization",
          ]}
          process={[
            { step: 1, title: "Route Planning", description: "Optimizing delivery routes and schedules" },
            { step: 2, title: "Carrier Management", description: "Coordinating transport partners" },
            { step: 3, title: "Shipment Execution", description: "Pick up, transport, and delivery" },
            { step: 4, title: "Tracking & POD", description: "Real-time tracking and proof of delivery" },
          ]}
          pricing={{ startingFrom: "AED 25/delivery", includes: ["Collection", "Transport", "Tracking", "POD"] }}
          faqs={[
            {
              question: "Do you deliver to all UAE emirates?",
              answer:
                "Yes, we deliver to Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ with varying timeframes.",
            },
            {
              question: "Can you handle cross-border GCC shipments?",
              answer:
                "Yes, we coordinate shipments to Saudi Arabia, Oman, Kuwait, Qatar, and Bahrain with customs support.",
            },
          ]}
          relatedCategories={[
            { title: "Warehouse", href: "/services/sales-retail/distribution/warehouse" },
            { title: "Last-Mile", href: "/services/sales-retail/distribution/last-mile" },
            { title: "Fulfillment", href: "/services/sales-retail/distribution/fulfillment" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
