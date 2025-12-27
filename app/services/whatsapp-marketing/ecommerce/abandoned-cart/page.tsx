import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Abandoned Cart Recovery Dubai | Cart Reminders UAE | Creative Fusion LLC",
  description:
    "WhatsApp abandoned cart recovery in Dubai & UAE. Recover lost sales with cart reminders for e-commerce in GCC.",
  keywords: ["whatsapp abandoned cart dubai", "cart recovery uae", "cart reminders gcc"],
}

export default function AbandonedCartPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Abandoned Cart Recovery"
          description="Recover lost sales with WhatsApp cart reminders. Automated follow-ups with cart contents, incentives, and one-click checkout to complete purchases."
          heroImage="/whatsapp-abandoned-cart-recovery.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "Recover lost sales",
            "Automated reminders",
            "Cart contents shown",
            "Discount incentives",
            "One-click checkout",
            "High recovery rates",
          ]}
          process={[
            { step: 1, title: "Connect", description: "Connect to your store" },
            { step: 2, title: "Configure", description: "Set up recovery rules" },
            { step: 3, title: "Messages", description: "Create reminder templates" },
            { step: 4, title: "Launch", description: "Activate and track" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Store integration", "3 reminder sequence", "Discount codes", "Recovery tracking"],
          }}
          faqs={[
            {
              question: "When are reminders sent?",
              answer: "Configurable - typically 1 hour, 24 hours, and 72 hours after abandonment.",
            },
            {
              question: "What's typical recovery rate?",
              answer: "15-25% cart recovery rate via WhatsApp vs 5-10% via email.",
            },
            {
              question: "Can I offer discounts?",
              answer: "Yes, escalating discounts like 5%, then 10% in follow-up messages.",
            },
          ]}
          relatedCategories={[
            { name: "In-Chat Ordering", href: "/services/whatsapp-marketing/ecommerce/ordering" },
            { name: "Store Sync", href: "/services/whatsapp-marketing/ecommerce/store-sync" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
