import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "E-Commerce Hosting Dubai | Online Store Hosting | Creative Fusion LLC",
  description:
    "High-performance e-commerce hosting in Dubai UAE. Optimized for WooCommerce, Magento, and Shopify stores.",
  keywords: ["ecommerce hosting dubai", "online store hosting uae", "woocommerce hosting"],
}

export default function EcommerceHostingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Domain & Hosting", href: "/services/domain-hosting" },
        subService: { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      }}
      title="E-Commerce Hosting"
      subtitle="Built for Online Sales"
      description="High-performance hosting optimized for online stores. Fast checkout, secure transactions, and PCI-DSS compliance for peace of mind."
      heroImage="/images/creative-team-brainstorming.jpg"
      benefits={[
        "PCI-DSS compliant",
        "Fast page loads",
        "SSL included",
        "Daily backups",
        "DDoS protection",
        "24/7 support",
      ]}
      process={[
        { step: 1, title: "Assess", description: "Analyze store needs" },
        { step: 2, title: "Setup", description: "Configure e-commerce" },
        { step: 3, title: "Secure", description: "SSL and PCI setup" },
        { step: 4, title: "Launch", description: "Go live securely" },
      ]}
      pricing={{
        startingFrom: "AED 249/month",
        includes: [
          "WooCommerce/Magento",
          "Premium SSL",
          "PCI compliance",
          "CDN included",
          "Daily backups",
          "Priority support",
        ],
      }}
      faqs={[
        {
          question: "Is the hosting PCI compliant?",
          answer: "Yes, our e-commerce hosting meets PCI-DSS requirements for secure payment processing.",
        },
        {
          question: "Which platforms do you support?",
          answer: "We support WooCommerce, Magento, PrestaShop, OpenCart, and custom e-commerce solutions.",
        },
        {
          question: "Can you handle high traffic sales?",
          answer: "Yes, our infrastructure is designed to handle traffic spikes during sales and promotions.",
        },
      ]}
      relatedCategories={[
        { title: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
        { title: "Dedicated Servers", href: "/services/domain-hosting/web-hosting/dedicated-server" },
        { title: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" },
      ]}
    />
  )
}
