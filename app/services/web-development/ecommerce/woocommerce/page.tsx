import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WooCommerce Development Dubai | WordPress E-commerce | Creative Fusion LLC",
  description:
    "Professional WooCommerce development in Dubai. WordPress-based e-commerce solutions with full customization.",
}

export default function WooCommercePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="WooCommerce Development"
        subtitle="WordPress e-commerce power"
        description="Build flexible online stores with WooCommerce. Full WordPress integration, extensive plugins, and complete customization."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "WordPress integration",
          "Plugin ecosystem",
          "Custom extensions",
          "Payment flexibility",
          "Shipping options",
          "Tax management",
          "Reports",
          "Scalable",
        ]}
        process={[
          { title: "Install", description: "WooCommerce setup" },
          { title: "Theme", description: "Store design" },
          { title: "Configure", description: "Products & payments" },
          { title: "Launch", description: "Go live" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "2,500",
            description: "Simple store",
            features: ["Theme setup", "Basic plugins", "50 products", "Payment gateway"],
          },
          {
            name: "Professional",
            price: "6,000",
            description: "Full store",
            features: ["Custom theme", "Premium plugins", "Unlimited products", "Shipping setup"],
            popular: true,
          },
          {
            name: "Advanced",
            price: "12,000",
            description: "Enterprise",
            features: ["Custom development", "API integration", "Multi-vendor", "Priority support"],
          },
        ]}
        relatedCategories={[
          { title: "Shopify", href: "/services/web-development/ecommerce/shopify" },
          { title: "Magento", href: "/services/web-development/ecommerce/magento" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
