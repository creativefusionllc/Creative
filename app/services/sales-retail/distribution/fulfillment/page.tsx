import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Order Fulfillment Dubai | E-commerce Fulfillment UAE GCC",
  description:
    "Professional order fulfillment services in Dubai, UAE & GCC. E-commerce fulfillment, pick and pack, same-day shipping, and 3PL services for online businesses.",
  keywords: ["order fulfillment dubai", "ecommerce fulfillment uae", "3pl gcc", "pick and pack dubai"],
}

export default function FulfillmentPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Order Fulfillment"
          subtitle="E-commerce Excellence"
          description="Scale your online business with professional order fulfillment services in Dubai, UAE & GCC. Fast, accurate pick and pack with same-day shipping options."
          heroImage="/order-fulfillment-ecommerce-dubai.jpg"
          benefits={[
            "Same-day fulfillment cutoffs",
            "Multi-channel integration",
            "Custom packaging options",
            "Batch and serial tracking",
            "Returns processing",
            "Kitting and bundling",
          ]}
          process={[
            { step: 1, title: "Integration", description: "Connecting your sales channels" },
            { step: 2, title: "Receiving", description: "Inventory intake and storage" },
            { step: 3, title: "Fulfillment", description: "Pick, pack, and ship orders" },
            { step: 4, title: "Tracking", description: "Order updates and delivery confirmation" },
          ]}
          pricing={{
            startingFrom: "AED 8/order",
            includes: ["Pick & pack", "Basic packaging", "Shipping coordination", "Tracking"],
          }}
          faqs={[
            {
              question: "Which e-commerce platforms do you integrate with?",
              answer: "We integrate with Shopify, WooCommerce, Magento, Amazon, Noon, and custom platforms via API.",
            },
            {
              question: "What is your same-day fulfillment cutoff?",
              answer: "Orders received before 2 PM can be fulfilled same day for delivery within Dubai.",
            },
          ]}
          relatedCategories={[
            { title: "Warehouse", href: "/services/sales-retail/distribution/warehouse" },
            { title: "Last-Mile", href: "/services/sales-retail/distribution/last-mile" },
            { title: "Returns", href: "/services/sales-retail/distribution/returns" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
