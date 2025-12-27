import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Store Operations Management Dubai | Retail Operations UAE GCC",
  description:
    "Professional store operations management in Dubai, UAE & GCC. End-to-end retail operations, staff scheduling, cash management, and performance optimization.",
  keywords: ["store operations dubai", "retail operations uae", "store management gcc", "retail management dubai"],
}

export default function StoreOperationsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="Store Operations"
          subtitle="Retail Excellence"
          description="Optimize your retail store performance with professional operations management in Dubai, UAE & GCC. We handle everything from opening to closing, ensuring smooth daily operations."
          heroImage="/store-operations-management-dubai.jpg"
          benefits={[
            "Daily operations management",
            "Staff scheduling and supervision",
            "Cash management and reconciliation",
            "Opening and closing procedures",
            "Compliance with mall regulations",
            "Performance monitoring and reporting",
          ]}
          process={[
            { step: 1, title: "Operations Audit", description: "Assessment of current store processes" },
            { step: 2, title: "SOP Development", description: "Creating standardized operating procedures" },
            { step: 3, title: "Team Training", description: "Training staff on new procedures" },
            { step: 4, title: "Ongoing Management", description: "Daily oversight and continuous improvement" },
          ]}
          pricing={{
            startingFrom: "AED 8,000/month",
            includes: ["Store manager", "Daily reports", "SOP manual", "Performance reviews"],
          }}
          faqs={[
            {
              question: "Do you provide store managers?",
              answer: "Yes, we provide experienced store managers who oversee all aspects of daily operations.",
            },
            {
              question: "How do you handle cash management?",
              answer:
                "We implement strict cash handling procedures including daily reconciliation, safe management, and banking coordination.",
            },
          ]}
          relatedCategories={[
            { title: "Inventory Management", href: "/services/sales-retail/retail-management/inventory" },
            { title: "Staff Management", href: "/services/sales-retail/retail-management/staff-management" },
            { title: "Customer Service", href: "/services/sales-retail/retail-management/customer-service" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
