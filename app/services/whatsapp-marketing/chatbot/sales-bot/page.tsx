import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Sales Bot Dubai | E-commerce Chatbot UAE | Creative Fusion LLC",
  description:
    "WhatsApp sales chatbots in Dubai & UAE. Automated product recommendations, cart management, and order processing for e-commerce businesses in GCC.",
  keywords: ["whatsapp sales bot dubai", "ecommerce chatbot uae", "sales automation gcc"],
}

export default function SalesBotPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Sales Bots"
          description="E-commerce focused chatbots for product discovery, recommendations, cart management, and order processing. Drive sales 24/7 through WhatsApp automation."
          heroImage="/whatsapp-sales-bot-ecommerce.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "Product recommendations",
            "Cart management",
            "Order processing",
            "Payment integration",
            "Upselling automation",
            "Abandoned cart recovery",
          ]}
          process={[
            { step: 1, title: "Catalog", description: "Sync product catalog" },
            { step: 2, title: "Flows", description: "Design sales flows" },
            { step: 3, title: "Payment", description: "Integrate payments" },
            { step: 4, title: "Launch", description: "Go live with sales bot" },
          ]}
          pricing={{
            startingFrom: "AED 6,000",
            includes: ["Catalog sync", "Sales flows", "Basic payments", "Order notifications"],
          }}
          faqs={[
            {
              question: "Can it sync with my store?",
              answer: "Yes, integrates with Shopify, WooCommerce, Magento, and custom stores.",
            },
            {
              question: "Which payments are supported?",
              answer: "Credit cards, Apple Pay, and local UAE payment methods.",
            },
            {
              question: "Can it handle returns?",
              answer: "Yes, automated return requests and status tracking included.",
            },
          ]}
          relatedCategories={[
            { name: "Booking Bots", href: "/services/whatsapp-marketing/chatbot/booking-bot" },
            { name: "Support Bots", href: "/services/whatsapp-marketing/chatbot/support-bot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
