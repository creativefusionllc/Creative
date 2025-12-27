import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "SaaS Development Dubai | Software as a Service | Creative Fusion LLC",
  description: "Professional SaaS application development in Dubai. Build scalable software-as-a-service products.",
}

export default function SaasPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="SaaS Development"
        subtitle="Build scalable software"
        description="Build powerful SaaS applications with subscription billing, multi-tenancy, and scalable cloud architecture."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Multi-tenant",
          "Subscription billing",
          "User management",
          "API development",
          "Scalable architecture",
          "Security",
          "Analytics",
          "Integrations",
        ]}
        process={[
          { title: "Discovery", description: "Product planning" },
          { title: "Architecture", description: "System design" },
          { title: "Build", description: "Agile development" },
          { title: "Scale", description: "Growth optimization" },
        ]}
        pricing={[
          {
            name: "MVP",
            price: "25,000",
            description: "Core features",
            features: ["User authentication", "Core functionality", "Basic billing", "Admin panel"],
          },
          {
            name: "Full Product",
            price: "60,000",
            description: "Complete SaaS",
            features: ["Everything in MVP", "Advanced features", "Stripe integration", "API development"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "120,000+",
            description: "Complex SaaS",
            features: ["Everything in Full Product", "Multi-tenant", "Advanced analytics", "White-label"],
          },
        ]}
        relatedCategories={[
          { title: "CRM", href: "/services/web-development/web-applications/crm" },
          { title: "Dashboards", href: "/services/web-development/web-applications/dashboards" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
