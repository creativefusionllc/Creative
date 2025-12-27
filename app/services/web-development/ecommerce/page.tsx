import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "E-Commerce Development Dubai | Online Store Solutions | Creative Fusion LLC",
  description:
    "Professional e-commerce development in Dubai UAE. Shopify, WooCommerce, custom stores with payment integration and inventory management.",
  keywords: ["ecommerce development dubai", "online store uae", "shopify dubai", "woocommerce sharjah"],
}

export default function EcommercePage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="E-Commerce Solutions"
      subtitle="Sell Online Successfully"
      description="Complete online store development with payment integration, inventory management, and customer accounts."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "Product Catalog", description: "Easy product management system" },
        { title: "Payment Gateway", description: "Secure checkout with multiple options" },
        { title: "Inventory Management", description: "Stock tracking and alerts" },
        { title: "Customer Accounts", description: "Order history and wishlists" },
        { title: "Shipping Integration", description: "Automated shipping calculations" },
        { title: "Mobile Commerce", description: "Optimized for mobile shopping" },
      ]}
      pricingTiers={[
        {
          name: "Starter Store",
          price: "AED 8,000",
          description: "Up to 50 products",
          features: ["50 products", "Payment gateway", "Basic shipping", "Mobile responsive", "1 month support"],
        },
        {
          name: "Professional",
          price: "AED 18,000",
          description: "Up to 500 products",
          features: [
            "500 products",
            "Multiple payments",
            "Advanced shipping",
            "Customer accounts",
            "Inventory system",
            "3 months support",
          ],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 35,000",
          description: "Unlimited products",
          features: [
            "Unlimited products",
            "Multi-vendor option",
            "ERP integration",
            "Custom features",
            "1 year support",
            "Dedicated manager",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Websites", href: "/services/web-development/corporate-websites" },
        { title: "Web Applications", href: "/services/web-development/web-applications" },
      ]}
    />
  )
}
