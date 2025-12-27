import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "POS Systems Dubai | Point of Sale Solutions UAE GCC",
  description:
    "Professional POS system setup and management in Dubai, UAE & GCC. Modern point of sale solutions, payment integration, and retail technology for your business.",
  keywords: ["pos systems dubai", "point of sale uae", "retail pos gcc", "payment systems dubai"],
}

export default function POSSystemsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Retail Management", href: "/services/sales-retail/retail-management" },
          }}
          title="POS Systems"
          subtitle="Smart Retail Technology"
          description="Implement modern POS systems for seamless retail operations in Dubai, UAE & GCC. We set up, configure, and manage point of sale solutions that integrate with your business needs."
          heroImage="/pos-system-retail-dubai.jpg"
          benefits={[
            "Modern cloud-based POS systems",
            "Multiple payment method support",
            "Inventory integration",
            "Sales reporting and analytics",
            "Staff training on POS usage",
            "Technical support and maintenance",
          ]}
          process={[
            { step: 1, title: "Requirements Analysis", description: "Understanding your retail POS needs" },
            { step: 2, title: "System Selection", description: "Recommending the best POS solution" },
            { step: 3, title: "Setup & Configuration", description: "Installing and configuring the system" },
            { step: 4, title: "Training & Support", description: "Staff training and ongoing support" },
          ]}
          pricing={{
            startingFrom: "AED 2,500/setup",
            includes: ["POS configuration", "Staff training", "30-day support", "Documentation"],
          }}
          faqs={[
            {
              question: "Which POS systems do you recommend?",
              answer:
                "We work with Lightspeed, Square, Vend, Clover, and can recommend the best fit based on your business type and size.",
            },
            {
              question: "Do you integrate with UAE payment systems?",
              answer:
                "Yes, we integrate with all UAE payment methods including Network, Visa, Mastercard, Apple Pay, and Samsung Pay.",
            },
          ]}
          relatedCategories={[
            { title: "Inventory Management", href: "/services/sales-retail/retail-management/inventory" },
            { title: "Retail Analytics", href: "/services/sales-retail/retail-management/analytics" },
            { title: "Store Operations", href: "/services/sales-retail/retail-management/store-operations" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
