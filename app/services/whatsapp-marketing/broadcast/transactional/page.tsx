import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Transactional Messages Dubai | Order Updates UAE | Creative Fusion LLC",
  description:
    "WhatsApp transactional messaging in Dubai & UAE. Order confirmations, shipping updates, and automated notifications for e-commerce in GCC.",
  keywords: ["whatsapp transactional messages dubai", "order updates uae", "shipping notifications gcc"],
}

export default function TransactionalPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Transactional Updates"
          description="Automated order and transaction notifications via WhatsApp. Confirmations, shipping updates, delivery alerts, and receipts for enhanced customer experience."
          heroImage="/whatsapp-transactional-order-updates.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "Instant delivery",
            "Reduces support calls",
            "Order tracking links",
            "Payment confirmations",
            "Delivery scheduling",
            "Return updates",
          ]}
          process={[
            { step: 1, title: "Integration", description: "Connect to your store" },
            { step: 2, title: "Templates", description: "Create message templates" },
            { step: 3, title: "Triggers", description: "Set up automation" },
            { step: 4, title: "Test", description: "Test and go live" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Store integration", "5 template types", "Automation setup", "Testing"],
          }}
          faqs={[
            {
              question: "Which stores are supported?",
              answer: "Shopify, WooCommerce, Magento, and custom via API/webhooks.",
            },
            {
              question: "Are these messages free?",
              answer: "Transactional messages have lower rates than promotional on WhatsApp API.",
            },
            {
              question: "Can I customize messages?",
              answer: "Yes, fully customizable templates with your branding and tone.",
            },
          ]}
          relatedCategories={[
            { name: "Newsletter", href: "/services/whatsapp-marketing/broadcast/newsletter" },
            { name: "Re-engagement", href: "/services/whatsapp-marketing/broadcast/re-engagement" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
