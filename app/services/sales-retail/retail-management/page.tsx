import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Retail Management Services Dubai | Store Operations UAE GCC",
  description:
    "Professional retail management services in Dubai, UAE & GCC. Store operations, inventory management, staff training, and retail space optimization across Middle East.",
  keywords: [
    "retail management dubai",
    "store operations uae",
    "retail staff training",
    "inventory management gcc",
    "retail space management",
    "store management dubai",
  ],
}

export default function RetailManagementPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="16.2"
          title="Retail Management"
          subtitle="Store Excellence"
          description="Complete retail management solutions for your brand in Dubai, UAE & GCC. From store operations to staff training, we ensure your retail presence delivers results."
          heroImage="/modern-retail-store-management-dubai.jpg"
          icon={Building2}
          brandColor="blue"
          features={[
            {
              title: "Store Operations",
              description: "End-to-end store operations management for optimal performance.",
              icon: "🏪",
              href: "/services/sales-retail/retail-management/store-operations",
            },
            {
              title: "Inventory Management",
              description: "Smart inventory control and stock management systems.",
              icon: "📦",
              href: "/services/sales-retail/retail-management/inventory",
            },
            {
              title: "Staff Management",
              description: "Recruitment, training, and scheduling of retail staff.",
              icon: "👥",
              href: "/services/sales-retail/retail-management/staff-management",
            },
            {
              title: "POS Systems",
              description: "Point of sale setup and management for seamless transactions.",
              icon: "💳",
              href: "/services/sales-retail/retail-management/pos-systems",
            },
            {
              title: "Customer Service",
              description: "Excellence in customer experience and satisfaction.",
              icon: "🌟",
              href: "/services/sales-retail/retail-management/customer-service",
            },
            {
              title: "Retail Analytics",
              description: "Data-driven insights for retail performance optimization.",
              icon: "📊",
              href: "/services/sales-retail/retail-management/analytics",
            },
          ]}
          processSteps={[
            {
              title: "Store Assessment",
              description: "Analyzing current retail operations and identifying opportunities.",
            },
            { title: "Strategy Planning", description: "Developing customized retail management strategy." },
            { title: "Implementation", description: "Deploying systems, training staff, and optimizing operations." },
            { title: "Continuous Improvement", description: "Ongoing monitoring and performance optimization." },
          ]}
          benefits={[
            "Experience with Dubai Mall, Mall of Emirates retail spaces",
            "Trained retail professionals",
            "Modern POS and inventory systems",
            "Performance-based management",
            "Regular reporting and analytics",
          ]}
          relatedServices={[
            { title: "Exhibition Sales", href: "/services/sales-retail/exhibition-sales" },
            { title: "Merchandising", href: "/services/sales-retail/merchandising" },
            { title: "Direct Sales", href: "/services/sales-retail/direct-sales" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
