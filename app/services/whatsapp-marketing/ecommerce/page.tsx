import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp E-commerce Integration Dubai | WhatsApp Shopping UAE | Creative Fusion LLC",
  description:
    "WhatsApp e-commerce integration in Dubai & UAE. Catalog, ordering, and payments via WhatsApp for businesses in GCC.",
  keywords: ["whatsapp ecommerce dubai", "whatsapp shopping uae", "whatsapp catalog gcc"],
}

export default function EcommercePage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="E-commerce Integration"
          subtitle="WhatsApp Marketing"
          description="Transform WhatsApp into a sales channel. Product catalogs, in-chat ordering, payment integration, and order tracking for seamless shopping experiences."
          heroImage="/whatsapp-ecommerce-shopping-integration.jpg"
          icon={ShoppingBag}
          features={[
            {
              title: "Product Catalog",
              description: "WhatsApp product catalog with images, descriptions, and prices",
              href: "/services/whatsapp-marketing/ecommerce/catalog",
            },
            {
              title: "In-Chat Ordering",
              description: "Complete shopping cart and checkout within WhatsApp",
              href: "/services/whatsapp-marketing/ecommerce/ordering",
            },
            {
              title: "Payment Integration",
              description: "Accept payments directly in WhatsApp conversation",
              href: "/services/whatsapp-marketing/ecommerce/payments",
            },
            {
              title: "Order Tracking",
              description: "Automated order status and delivery updates",
              href: "/services/whatsapp-marketing/ecommerce/tracking",
            },
            {
              title: "Store Sync",
              description: "Sync inventory with Shopify, WooCommerce, and more",
              href: "/services/whatsapp-marketing/ecommerce/store-sync",
            },
            {
              title: "Abandoned Cart",
              description: "Recover abandoned carts with WhatsApp reminders",
              href: "/services/whatsapp-marketing/ecommerce/abandoned-cart",
            },
          ]}
          processSteps={[
            { title: "Integration", description: "Connect your store to WhatsApp" },
            { title: "Catalog", description: "Set up product catalog and pricing" },
            { title: "Checkout", description: "Configure ordering and payment flow" },
            { title: "Launch", description: "Go live with WhatsApp commerce" },
          ]}
          benefits={[
            "New sales channel",
            "Conversational commerce",
            "Higher conversion rates",
            "Reduced cart abandonment",
            "Personal shopping assistance",
            "Seamless checkout experience",
          ]}
          relatedServices={[
            { title: "Web Development", href: "/services/web-development" },
            { title: "Digital Marketing", href: "/services/digital-marketing" },
            { title: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
