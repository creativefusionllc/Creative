import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Warehouse Management Dubai | Storage Services UAE GCC",
  description:
    "Professional warehouse management services in Dubai, UAE & GCC. Storage solutions, inventory control, pick and pack, and fulfillment center operations.",
  keywords: ["warehouse management dubai", "storage services uae", "fulfillment center gcc", "inventory storage dubai"],
}

export default function WarehousePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Warehouse Management"
          subtitle="Storage Excellence"
          description="Optimize your storage and fulfillment with professional warehouse management in Dubai, UAE & GCC. Modern facilities, inventory systems, and efficient operations."
          heroImage="/warehouse-management-dubai.jpg"
          benefits={[
            "Strategic warehouse locations in Dubai, Abu Dhabi",
            "Temperature-controlled storage available",
            "Real-time inventory management",
            "Pick, pack, and ship services",
            "Cross-docking capabilities",
            "Security and insurance coverage",
          ]}
          process={[
            { step: 1, title: "Requirements Analysis", description: "Understanding storage and handling needs" },
            { step: 2, title: "Space Allocation", description: "Setting up dedicated storage areas" },
            { step: 3, title: "System Integration", description: "Connecting inventory management systems" },
            { step: 4, title: "Operations", description: "Daily receiving, storage, and dispatch" },
          ]}
          pricing={{
            startingFrom: "AED 15/sqft/month",
            includes: ["Storage", "Basic handling", "Inventory tracking", "Security"],
          }}
          faqs={[
            {
              question: "Where are your warehouses located?",
              answer:
                "We have facilities in Dubai Investment Park, JAFZA, and Abu Dhabi with easy access to ports and airports.",
            },
            {
              question: "Do you offer temperature-controlled storage?",
              answer: "Yes, we have ambient, chilled, and frozen storage options for temperature-sensitive products.",
            },
          ]}
          relatedCategories={[
            { title: "Logistics", href: "/services/sales-retail/distribution/logistics" },
            { title: "Order Fulfillment", href: "/services/sales-retail/distribution/fulfillment" },
            { title: "Wholesale", href: "/services/sales-retail/distribution/wholesale" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
