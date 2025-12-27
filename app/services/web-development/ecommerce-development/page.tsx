import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "E-Commerce Development Dubai | Online Store Solutions | Creative Fusion LLC",
  description:
    "Professional e-commerce website development in Dubai UAE. Custom shopping cart, payment integration, inventory management, and conversion optimization for online sales.",
  keywords: [
    "ecommerce development dubai",
    "online store dubai",
    "shopify development uae",
    "woocommerce dubai",
    "ecommerce website design",
    "online shop development",
    "shopping cart development",
    "payment gateway integration",
    "ecommerce seo",
    "conversion rate optimization",
  ],
  openGraph: {
    title: "E-Commerce Development Dubai | Creative Fusion LLC",
    description: "Custom e-commerce solutions that drive online sales",
  },
}

export default function EcommerceDevelopmentPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Web Development",
          href: "/services/web-development",
        }}
        title="E-Commerce Development"
        subtitle="Complete Online Store Solutions"
        description="We build powerful e-commerce platforms that convert visitors into customers. From product catalogs to secure payments, inventory management to marketing integration."
        heroImage="/ecommerce-online-store-shopping-platform.jpg"
        icon={ShoppingCart}
        features={[
          {
            title: "Custom Shop Platform",
            description: "Tailored e-commerce solutions for your business model.",
            icon: "🛍️",
          },
          {
            title: "Product Management",
            description: "Easy-to-use inventory and product catalog management.",
            icon: "📦",
          },
          {
            title: "Payment Gateway Integration",
            description: "Secure integration with multiple payment providers.",
            icon: "💳",
          },
          {
            title: "Shopping Cart Optimization",
            description: "High-converting checkout process to reduce cart abandonment.",
            icon: "🛒",
          },
          {
            title: "Mobile Commerce",
            description: "Fully optimized for mobile shopping and checkout.",
            icon: "📱",
          },
          {
            title: "Analytics & Reporting",
            description: "Detailed sales and customer analytics dashboard.",
            icon: "📊",
          },
        ]}
        pricing={[
          {
            name: "Starter Store",
            price: "AED 8,000",
            features: ["10-50 Products", "Payment Integration", "Basic SEO", "3 Months Support"],
          },
          {
            name: "Professional Store",
            price: "AED 15,000",
            features: ["50-500 Products", "Advanced Features", "Marketing Tools", "Analytics", "6 Months Support"],
            popular: true,
          },
          {
            name: "Enterprise Store",
            price: "AED 30,000+",
            features: [
              "Unlimited Products",
              "Custom Features",
              "API Integration",
              "Marketing Automation",
              "Annual Support",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Website Design", href: "/services/web-development/website-design" },
          { title: "CMS Development", href: "/services/web-development/cms-development" },
          { title: "Payment Integration", href: "/services/web-development/payment-integration" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
