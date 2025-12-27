import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Distribution Services Dubai | Product Distribution UAE GCC",
  description:
    "Professional distribution services in Dubai, UAE & GCC. Warehouse management, logistics coordination, supply chain solutions, and product distribution across Middle East.",
  keywords: [
    "distribution services dubai",
    "product distribution uae",
    "warehouse management gcc",
    "logistics dubai",
    "supply chain uae",
    "wholesale distribution middle east",
  ],
}

export default function DistributionPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.4"
          title="Distribution Services"
          subtitle="Supply Chain Excellence"
          description="Complete distribution network solutions across Dubai, UAE & GCC. From warehouse management to last-mile delivery, we ensure your products reach every corner of the Middle East."
          heroImage="/distribution-warehouse-logistics-dubai.jpg"
          icon={Truck}
          brandColor="orange"
          features={[
            {
              title: "Warehouse Management",
              description: "Modern warehouse facilities and inventory management in Dubai.",
              icon: "🏭",
              href: "/services/sales-retail/distribution/warehouse",
            },
            {
              title: "Logistics Coordination",
              description: "End-to-end logistics management across UAE & GCC.",
              icon: "🚚",
              href: "/services/sales-retail/distribution/logistics",
            },
            {
              title: "Order Fulfillment",
              description: "Fast and accurate order processing and fulfillment.",
              icon: "📦",
              href: "/services/sales-retail/distribution/fulfillment",
            },
            {
              title: "Last-Mile Delivery",
              description: "Reliable last-mile delivery solutions across the region.",
              icon: "🏠",
              href: "/services/sales-retail/distribution/last-mile",
            },
            {
              title: "Wholesale Distribution",
              description: "B2B wholesale distribution network and partnerships.",
              icon: "🛒",
              href: "/services/sales-retail/distribution/wholesale",
            },
            {
              title: "Returns Management",
              description: "Efficient returns handling and reverse logistics.",
              icon: "↩️",
              href: "/services/sales-retail/distribution/returns",
            },
          ]}
          processSteps={[
            {
              title: "Network Assessment",
              description: "Analyzing distribution requirements and market coverage needs.",
            },
            { title: "Infrastructure Setup", description: "Setting up warehouse and logistics infrastructure." },
            { title: "Operations Launch", description: "Initiating distribution operations with quality controls." },
            { title: "Optimization", description: "Continuous improvement of distribution efficiency." },
          ]}
          benefits={[
            "Strategic warehouse locations in Dubai, Abu Dhabi",
            "Coverage across all GCC countries",
            "Real-time inventory tracking",
            "Same-day delivery options in UAE",
            "Temperature-controlled storage available",
          ]}
          relatedServices={[
            { title: "Retail Management", href: "/services/sales-retail/retail-management" },
            { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
            { title: "Merchandising", href: "/services/sales-retail/merchandising" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
