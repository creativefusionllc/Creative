import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Shopify Development Dubai | E-commerce Store Design | Creative Fusion LLC",
  description:
    "Professional Shopify store development in Dubai UAE. Custom themes, app integration, and full e-commerce solutions.",
}

export default function ShopifyPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="Shopify Development"
        subtitle="Powerful e-commerce platform"
        description="Build your online store on Shopify with custom themes, seamless payments, and powerful e-commerce features."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Custom themes",
          "Payment gateways",
          "Inventory management",
          "Order tracking",
          "App integration",
          "Mobile commerce",
          "Analytics",
          "24/7 support",
        ]}
        process={[
          { title: "Setup", description: "Store configuration" },
          { title: "Design", description: "Theme customization" },
          { title: "Products", description: "Catalog setup" },
          { title: "Launch", description: "Go live" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "3,500",
            description: "Basic store",
            features: ["Theme customization", "50 products", "Payment setup", "Basic SEO"],
          },
          {
            name: "Growth",
            price: "7,500",
            description: "Advanced store",
            features: ["Custom theme", "Unlimited products", "App integration", "Advanced SEO"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "15,000",
            description: "Full solution",
            features: ["Custom development", "Shopify Plus", "API integration", "Priority support"],
          },
        ]}
        relatedCategories={[
          { title: "WooCommerce", href: "/services/web-development/ecommerce/woocommerce" },
          { title: "Custom E-commerce", href: "/services/web-development/ecommerce/custom-ecommerce" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
