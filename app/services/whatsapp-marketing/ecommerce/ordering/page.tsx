import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp In-Chat Ordering Dubai | WhatsApp Cart UAE | Creative Fusion LLC",
  description: "WhatsApp in-chat ordering in Dubai & UAE. Complete checkout within WhatsApp for businesses in GCC.",
  keywords: ["whatsapp ordering dubai", "in-chat checkout uae", "whatsapp cart gcc"],
}

export default function OrderingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="In-Chat Ordering"
          description="Complete shopping experience within WhatsApp. Add to cart, apply coupons, select delivery, and checkout - all without leaving the conversation."
          heroImage="/whatsapp-in-chat-ordering-cart.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "In-app checkout",
            "Cart management",
            "Coupon support",
            "Delivery selection",
            "Order confirmation",
            "Guest checkout",
          ]}
          process={[
            { step: 1, title: "Configure", description: "Set up ordering flow" },
            { step: 2, title: "Cart", description: "Build cart system" },
            { step: 3, title: "Checkout", description: "Configure checkout" },
            { step: 4, title: "Test", description: "Test and launch" },
          ]}
          pricing={{
            startingFrom: "AED 4,000",
            includes: ["Cart system", "Checkout flow", "Coupon support", "Order notifications"],
          }}
          faqs={[
            { question: "Is checkout secure?", answer: "Yes, secure checkout with payment provider integration." },
            { question: "Can customers save addresses?", answer: "Yes, saved addresses for returning customers." },
            { question: "Are coupons supported?", answer: "Yes, percentage, fixed, and free shipping coupons." },
          ]}
          relatedCategories={[
            { name: "Product Catalog", href: "/services/whatsapp-marketing/ecommerce/catalog" },
            { name: "Payments", href: "/services/whatsapp-marketing/ecommerce/payments" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
