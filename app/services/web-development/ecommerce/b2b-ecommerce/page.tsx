import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "B2B E-commerce Development Dubai | Wholesale Platforms | Creative Fusion LLC",
  description:
    "Professional B2B e-commerce development in Dubai. Wholesale platforms, dealer portals, and business-to-business solutions.",
}

export default function B2BEcommercePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="B2B E-commerce"
        subtitle="Business-to-business solutions"
        description="Build powerful B2B e-commerce platforms with dealer portals, bulk ordering, custom pricing, and account management."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Dealer portals",
          "Bulk ordering",
          "Custom pricing",
          "Quote requests",
          "Credit terms",
          "Account management",
          "Order approval",
          "ERP integration",
        ]}
        process={[
          { title: "Requirements", description: "B2B needs analysis" },
          { title: "Design", description: "Portal experience" },
          { title: "Build", description: "Feature development" },
          { title: "Integrate", description: "System connections" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "25,000",
            description: "Dealer portal",
            features: ["Account management", "Custom pricing", "Bulk orders", "Basic reporting"],
          },
          {
            name: "Advanced",
            price: "50,000",
            description: "Full B2B",
            features: ["Everything in Basic", "Quote system", "Credit management", "ERP sync"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "100,000+",
            description: "Complete solution",
            features: ["Everything in Advanced", "Multi-warehouse", "Sales rep portal", "Custom workflows"],
          },
        ]}
        relatedCategories={[
          { title: "Custom E-commerce", href: "/services/web-development/ecommerce/custom-ecommerce" },
          { title: "Web Applications", href: "/services/web-development/web-applications" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
