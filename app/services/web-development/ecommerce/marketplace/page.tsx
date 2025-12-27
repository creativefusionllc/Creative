import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Marketplace Development Dubai | Multi-vendor Platform | Creative Fusion LLC",
  description:
    "Multi-vendor marketplace development in Dubai. Build your own Amazon or Noon-style marketplace platform.",
}

export default function MarketplacePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="Marketplace Development"
        subtitle="Multi-vendor platforms"
        description="Build powerful multi-vendor marketplaces like Amazon or Noon. Vendor management, commission handling, and scalable architecture."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Multi-vendor",
          "Vendor onboarding",
          "Commission system",
          "Product moderation",
          "Split payments",
          "Vendor dashboard",
          "Reviews",
          "Scalable",
        ]}
        process={[
          { title: "Strategy", description: "Marketplace model" },
          { title: "Architecture", description: "Platform design" },
          { title: "Build", description: "Core development" },
          { title: "Scale", description: "Vendor growth" },
        ]}
        pricing={[
          {
            name: "MVP",
            price: "40,000",
            description: "Basic marketplace",
            features: ["Vendor portal", "Product listings", "Commission handling", "Basic payments"],
          },
          {
            name: "Growth",
            price: "80,000",
            description: "Full marketplace",
            features: ["Everything in MVP", "Advanced vendor tools", "Multiple categories", "Mobile apps"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "150,000+",
            description: "Full scale",
            features: ["Everything in Growth", "AI recommendations", "Advanced analytics", "Custom features"],
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
