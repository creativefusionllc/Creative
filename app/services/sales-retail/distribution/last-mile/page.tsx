import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Last-Mile Delivery Dubai | Same Day Delivery UAE GCC",
  description:
    "Professional last-mile delivery services in Dubai, UAE & GCC. Same-day delivery, express shipping, and final mile logistics for e-commerce and retail.",
  keywords: ["last mile delivery dubai", "same day delivery uae", "express delivery gcc", "final mile dubai"],
}

export default function LastMilePage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Distribution", href: "/services/sales-retail/distribution" },
          }}
          title="Last-Mile Delivery"
          subtitle="Final Mile Excellence"
          description="Delight customers with fast, reliable last-mile delivery services in Dubai, UAE & GCC. Same-day and express options that create exceptional delivery experiences."
          heroImage="/last-mile-delivery-dubai.jpg"
          benefits={[
            "Same-day delivery in Dubai",
            "Next-day across UAE",
            "Live delivery tracking",
            "Flexible delivery windows",
            "Cash on delivery support",
            "High first-attempt success rate",
          ]}
          process={[
            { step: 1, title: "Order Receipt", description: "Receiving shipments for delivery" },
            { step: 2, title: "Route Optimization", description: "Planning efficient delivery routes" },
            { step: 3, title: "Delivery", description: "Professional doorstep delivery" },
            { step: 4, title: "Confirmation", description: "POD and customer feedback" },
          ]}
          pricing={{
            startingFrom: "AED 12/delivery",
            includes: ["Delivery attempt", "Tracking", "POD", "COD handling"],
          }}
          faqs={[
            {
              question: "What are your same-day delivery cutoffs?",
              answer: "For same-day delivery in Dubai, orders must be dispatched by 3 PM.",
            },
            {
              question: "Do you handle cash on delivery?",
              answer: "Yes, we handle COD with daily remittances to your account.",
            },
          ]}
          relatedCategories={[
            { title: "Fulfillment", href: "/services/sales-retail/distribution/fulfillment" },
            { title: "Logistics", href: "/services/sales-retail/distribution/logistics" },
            { title: "Returns", href: "/services/sales-retail/distribution/returns" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
