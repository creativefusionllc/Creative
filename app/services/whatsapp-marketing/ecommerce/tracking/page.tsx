import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Order Tracking Dubai | Delivery Updates UAE | Creative Fusion LLC",
  description: "WhatsApp order tracking in Dubai & UAE. Automated order and delivery updates for e-commerce in GCC.",
  keywords: ["whatsapp order tracking dubai", "delivery updates uae", "shipping notifications gcc"],
}

export default function TrackingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Order Tracking"
          description="Keep customers informed with automated WhatsApp order updates. Confirmation, processing, shipping, and delivery notifications with tracking links."
          heroImage="/whatsapp-order-tracking-updates.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "Automated updates",
            "Tracking links",
            "Delivery ETA",
            "Driver contact",
            "Proof of delivery",
            "Return updates",
          ]}
          process={[
            { step: 1, title: "Integrate", description: "Connect to shipping" },
            { step: 2, title: "Templates", description: "Create message templates" },
            { step: 3, title: "Automate", description: "Set up triggers" },
            { step: 4, title: "Test", description: "Test end-to-end" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Shipping integration", "5 status templates", "Tracking links", "Delivery notifications"],
          }}
          faqs={[
            {
              question: "Which couriers are supported?",
              answer: "Aramex, DHL, FedEx, Emirates Post, and local UAE couriers.",
            },
            {
              question: "Can customers reply with issues?",
              answer: "Yes, two-way communication for delivery issues and rescheduling.",
            },
            {
              question: "Is proof of delivery included?",
              answer: "Yes, delivery confirmation with photo/signature where available.",
            },
          ]}
          relatedCategories={[
            { name: "Payments", href: "/services/whatsapp-marketing/ecommerce/payments" },
            { name: "Abandoned Cart", href: "/services/whatsapp-marketing/ecommerce/abandoned-cart" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
