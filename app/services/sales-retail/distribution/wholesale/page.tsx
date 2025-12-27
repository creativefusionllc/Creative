import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Wholesale Distribution Dubai | B2B Distribution UAE GCC",
  description:
    "Professional wholesale distribution services in Dubai, UAE & GCC. B2B distribution network, retailer partnerships, and wholesale channel management.",
  keywords: [
    "wholesale distribution dubai",
    "b2b distribution uae",
    "wholesale network gcc",
    "retailer distribution dubai",
  ],
}

export default function WholesalePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Wholesale Distribution"
          subtitle="B2B Channel Excellence"
          description="Expand your wholesale reach with professional distribution services in Dubai, UAE & GCC. We connect your products with retailers, supermarkets, and business customers."
          heroImage="/wholesale-distribution-dubai.jpg"
          benefits={[
            "Established retailer network",
            "Supermarket and hypermarket access",
            "HORECA channel coverage",
            "Credit management",
            "Merchandising support",
            "Sales team coverage",
          ]}
          process={[
            { step: 1, title: "Channel Strategy", description: "Identifying target wholesale channels" },
            { step: 2, title: "Partner Development", description: "Building retailer relationships" },
            { step: 3, title: "Distribution Setup", description: "Logistics and credit arrangements" },
            { step: 4, title: "Ongoing Management", description: "Order management and growth" },
          ]}
          pricing={{
            startingFrom: "Margin-based",
            includes: ["Distribution", "Sales coverage", "Credit management", "Reporting"],
          }}
          faqs={[
            {
              question: "Which retail channels do you cover?",
              answer:
                "We distribute to supermarkets, hypermarkets, grocery stores, pharmacies, HORECA, and specialty retailers.",
            },
            {
              question: "Do you handle credit to retailers?",
              answer: "Yes, we can extend credit facilities to qualified retailers with proper credit management.",
            },
          ]}
          relatedCategories={[
            { title: "Warehouse", href: "/services/sales-retail/distribution/warehouse" },
            { title: "Logistics", href: "/services/sales-retail/distribution/logistics" },
            { title: "Field Sales", href: "/services/sales-retail/direct-sales/field-sales" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
