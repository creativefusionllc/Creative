import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Product Catalog Dubai | Catalog Setup UAE | Creative Fusion LLC",
  description:
    "WhatsApp product catalog setup in Dubai & UAE. Display products and prices in WhatsApp for businesses in GCC.",
  keywords: ["whatsapp catalog dubai", "product catalog uae", "whatsapp products gcc"],
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Product Catalog"
          description="Display your products beautifully in WhatsApp. Full catalog with images, descriptions, prices, and variants - customers browse and buy without leaving the app."
          heroImage="/whatsapp-product-catalog-display.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "E-commerce", href: "/services/whatsapp-marketing/ecommerce" },
          }}
          benefits={[
            "Visual product display",
            "Category organization",
            "Price and variants",
            "Easy updates",
            "Store sync",
            "Share products",
          ]}
          process={[
            { step: 1, title: "Setup", description: "Configure catalog" },
            { step: 2, title: "Import", description: "Import products" },
            { step: 3, title: "Organize", description: "Set up categories" },
            { step: 4, title: "Publish", description: "Go live" },
          ]}
          pricing={{
            startingFrom: "AED 2,000",
            includes: ["Catalog setup", "Up to 100 products", "Category structure", "Store sync"],
          }}
          faqs={[
            {
              question: "How many products can I add?",
              answer: "Up to 500 products in WhatsApp catalog, unlimited with store sync.",
            },
            {
              question: "Can I update prices easily?",
              answer: "Yes, manual updates or automatic sync from your store.",
            },
            {
              question: "Do products show in search?",
              answer: "Yes, customers can search your catalog within WhatsApp.",
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
