import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Custom E-commerce Development Dubai | Bespoke Online Stores | Creative Fusion LLC",
  description: "Custom e-commerce development in Dubai. Fully bespoke online stores built to your exact requirements.",
}

export default function CustomEcommercePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "E-commerce", href: "/services/web-development/ecommerce" }}
        title="Custom E-commerce"
        subtitle="Bespoke online stores"
        description="Build fully custom e-commerce solutions tailored to your unique business requirements with no platform limitations."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Fully custom",
          "No limitations",
          "Unique features",
          "Own your code",
          "Scale freely",
          "Full control",
          "API-first",
          "Future-proof",
        ]}
        process={[
          { title: "Analyze", description: "Requirements deep-dive" },
          { title: "Architect", description: "System design" },
          { title: "Build", description: "Custom development" },
          { title: "Scale", description: "Growth optimization" },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "20,000",
            description: "Core features",
            features: ["Custom frontend", "Basic backend", "Payment integration", "Admin panel"],
          },
          {
            name: "Professional",
            price: "45,000",
            description: "Full featured",
            features: ["Everything in Starter", "Advanced features", "API development", "Mobile app"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "100,000+",
            description: "Complex solution",
            features: ["Everything in Professional", "Multi-vendor", "ERP integration", "Dedicated team"],
          },
        ]}
        relatedCategories={[
          { title: "Web Applications", href: "/services/web-development/web-applications" },
          { title: "B2B E-commerce", href: "/services/web-development/ecommerce/b2b-ecommerce" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
