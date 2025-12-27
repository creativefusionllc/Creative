import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Store Sync Dubai | Shopify Integration UAE | Creative Fusion LLC",
  description:
    "WhatsApp e-commerce store sync in Dubai & UAE. Connect Shopify, WooCommerce to WhatsApp for businesses in GCC.",
  keywords: ["whatsapp store sync dubai", "shopify whatsapp uae", "woocommerce whatsapp gcc"],
}

export default function StoreSyncPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Store Sync"
          description="Sync your e-commerce store with WhatsApp. Products, inventory, orders, and customers automatically synced between Shopify, WooCommerce, and WhatsApp."
          heroImage="/whatsapp-store-sync-ecommerce.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "Automatic product sync",
            "Inventory updates",
            "Order sync",
            "Customer data sync",
            "Real-time updates",
            "Multi-store support",
          ]}
          process={[
            { step: 1, title: "Connect", description: "Connect your store" },
            { step: 2, title: "Map", description: "Map data fields" },
            { step: 3, title: "Sync", description: "Initial data sync" },
            { step: 4, title: "Automate", description: "Enable real-time sync" },
          ]}
          pricing={{
            startingFrom: "AED 3,500",
            includes: ["Store connector", "Product sync", "Order sync", "Customer sync"],
          }}
          faqs={[
            {
              question: "Which platforms are supported?",
              answer: "Shopify, WooCommerce, Magento, and custom stores via API.",
            },
            { question: "Is sync real-time?", answer: "Yes, products and orders sync in real-time." },
            { question: "What about inventory?", answer: "Inventory levels sync to prevent overselling." },
          ]}
          relatedCategories={[
            { name: "Product Catalog", href: "/services/whatsapp-marketing/ecommerce/catalog" },
            { name: "Order Tracking", href: "/services/whatsapp-marketing/ecommerce/tracking" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
