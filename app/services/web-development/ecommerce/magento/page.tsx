import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Magento Development Dubai | Enterprise E-commerce | Creative Fusion LLC",
  description:
    "Professional Magento development in Dubai. Enterprise-grade e-commerce solutions for large catalogs and high traffic.",
}

export default function MagentoPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="Magento Development"
        subtitle="Enterprise e-commerce"
        description="Build powerful enterprise e-commerce with Magento. Handle large catalogs, high traffic, and complex requirements."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Enterprise scale",
          "Multi-store",
          "B2B features",
          "Advanced inventory",
          "ERP integration",
          "Custom modules",
          "High performance",
          "Security",
        ]}
        process={[
          { title: "Architecture", description: "System design" },
          { title: "Development", description: "Custom build" },
          { title: "Integration", description: "ERP/CRM connect" },
          { title: "Deploy", description: "Cloud hosting" },
        ]}
        pricing={[
          {
            name: "Open Source",
            price: "15,000",
            description: "Community edition",
            features: ["Custom theme", "Essential modules", "Basic integration", "Support"],
          },
          {
            name: "Commerce",
            price: "35,000",
            description: "Adobe Commerce",
            features: ["Everything in Open Source", "B2B features", "Cloud hosting", "Premium support"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "75,000+",
            description: "Full solution",
            features: ["Everything in Commerce", "ERP integration", "Multi-store", "Dedicated team"],
          },
        ]}
        relatedCategories={[
          { title: "Custom E-commerce", href: "/services/web-development/ecommerce/custom-ecommerce" },
          { title: "B2B E-commerce", href: "/services/web-development/ecommerce/b2b-ecommerce" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
