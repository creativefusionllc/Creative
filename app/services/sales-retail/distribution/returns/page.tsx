import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Returns Management Dubai | Reverse Logistics UAE GCC",
  description:
    "Professional returns management and reverse logistics services in Dubai, UAE & GCC. Product returns, refurbishment, and disposal services for e-commerce and retail.",
  keywords: ["returns management dubai", "reverse logistics uae", "product returns gcc", "return handling dubai"],
}

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Returns Management"
          subtitle="Reverse Logistics"
          description="Handle product returns efficiently with professional returns management in Dubai, UAE & GCC. We process returns, assess conditions, and manage restocking or disposal."
          heroImage="/returns-management-warehouse-dubai.jpg"
          benefits={[
            "Customer return collection",
            "Quality inspection",
            "Restocking processing",
            "Refurbishment services",
            "Responsible disposal",
            "Return analytics and insights",
          ]}
          process={[
            { step: 1, title: "Return Collection", description: "Picking up returns from customers" },
            { step: 2, title: "Inspection", description: "Quality assessment and grading" },
            { step: 3, title: "Processing", description: "Restocking, refurbishment, or disposal" },
            { step: 4, title: "Reporting", description: "Return analytics and recommendations" },
          ]}
          pricing={{ startingFrom: "AED 15/return", includes: ["Collection", "Inspection", "Processing", "Reporting"] }}
          faqs={[
            {
              question: "How quickly can you process returns?",
              answer: "Standard returns are processed within 24-48 hours of receipt at our facility.",
            },
            {
              question: "Do you handle customer refunds?",
              answer:
                "We process the physical return and provide documentation; refund processing depends on your setup.",
            },
          ]}
          relatedCategories={[
            { title: "Fulfillment", href: "/services/sales-retail/distribution/fulfillment" },
            { title: "Last-Mile", href: "/services/sales-retail/distribution/last-mile" },
            { title: "Warehouse", href: "/services/sales-retail/distribution/warehouse" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
