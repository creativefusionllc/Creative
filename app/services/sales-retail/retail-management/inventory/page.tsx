import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Inventory Management Dubai | Stock Control UAE GCC",
  description:
    "Professional inventory management services in Dubai, UAE & GCC. Stock control, replenishment planning, cycle counting, and inventory optimization for retail success.",
  keywords: ["inventory management dubai", "stock control uae", "retail inventory gcc", "warehouse management dubai"],
}

export default function InventoryPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="Inventory Management"
          subtitle="Smart Stock Control"
          description="Optimize your inventory with professional management services in Dubai, UAE & GCC. Reduce stockouts, minimize excess inventory, and improve cash flow with data-driven stock control."
          heroImage="/inventory-management-warehouse-dubai.jpg"
          benefits={[
            "Real-time inventory tracking",
            "Automated reorder point alerts",
            "Cycle counting programs",
            "Shrinkage control measures",
            "Inventory optimization analytics",
            "Multi-location stock management",
          ]}
          process={[
            { step: 1, title: "Inventory Audit", description: "Complete stock count and system setup" },
            { step: 2, title: "System Implementation", description: "Deploy inventory management tools" },
            { step: 3, title: "Process Establishment", description: "Receiving, storage, and counting procedures" },
            { step: 4, title: "Ongoing Management", description: "Regular audits and optimization" },
          ]}
          pricing={{
            startingFrom: "AED 5,000/month",
            includes: ["Inventory system", "Weekly reports", "Cycle counts", "Optimization"],
          }}
          faqs={[
            {
              question: "Which inventory systems do you work with?",
              answer:
                "We work with all major POS and inventory systems including Lightspeed, Vend, Square, and can implement new systems.",
            },
            {
              question: "How do you prevent inventory shrinkage?",
              answer:
                "We implement cycle counting, access controls, receiving verification, and security measures to minimize shrinkage.",
            },
          ]}
          relatedCategories={[
            { title: "Store Operations", href: "/services/sales-retail/retail-management/store-operations" },
            { title: "POS Systems", href: "/services/sales-retail/retail-management/pos-systems" },
            { title: "Retail Analytics", href: "/services/sales-retail/retail-management/analytics" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
