import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Payments Dubai | In-Chat Payments UAE | Creative Fusion LLC",
  description: "WhatsApp payment integration in Dubai & UAE. Accept payments within WhatsApp for businesses in GCC.",
  keywords: ["whatsapp payments dubai", "in-chat payments uae", "whatsapp checkout gcc"],
}

export default function PaymentsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Payment Integration"
          description="Accept payments directly within WhatsApp conversations. Credit cards, Apple Pay, and local UAE payment methods for frictionless checkout."
          heroImage="/whatsapp-payment-integration-checkout.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "Multiple payment methods",
            "Secure transactions",
            "Instant confirmation",
            "Refund support",
            "Payment links",
            "Recurring payments",
          ]}
          process={[
            { step: 1, title: "Setup", description: "Configure payment gateway" },
            { step: 2, title: "Integrate", description: "Connect to WhatsApp" },
            { step: 3, title: "Test", description: "Test transactions" },
            { step: 4, title: "Launch", description: "Go live" },
          ]}
          pricing={{
            startingFrom: "AED 3,000",
            includes: ["Gateway setup", "WhatsApp integration", "Payment links", "Refund handling"],
          }}
          faqs={[
            {
              question: "Which payment methods?",
              answer: "Visa, Mastercard, Apple Pay, and local UAE options like PayBy.",
            },
            { question: "Are payments secure?", answer: "Yes, PCI-DSS compliant payment processing." },
            { question: "Can I do recurring billing?", answer: "Yes, subscription and installment payment support." },
          ]}
          relatedCategories={[
            { name: "In-Chat Ordering", href: "/services/whatsapp-marketing/ecommerce/ordering" },
            { name: "Order Tracking", href: "/services/whatsapp-marketing/ecommerce/tracking" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
