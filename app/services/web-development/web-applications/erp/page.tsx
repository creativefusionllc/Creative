import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Custom ERP Development Dubai | Enterprise Resource Planning | Creative Fusion LLC",
  description:
    "Custom ERP development in Dubai. Integrated business management systems for operations, finance, and HR.",
}

export default function ERPPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="ERP Development"
        subtitle="Integrate your business"
        description="Build custom ERP systems that integrate all your business operations including finance, HR, inventory, and more."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Financial management",
          "Inventory control",
          "HR management",
          "Procurement",
          "Production planning",
          "Reporting",
          "Multi-branch",
          "Integration",
        ]}
        process={[
          { title: "Assessment", description: "Business analysis" },
          { title: "Design", description: "System architecture" },
          { title: "Develop", description: "Module development" },
          { title: "Deploy", description: "Implementation & training" },
        ]}
        pricing={[
          {
            name: "Core ERP",
            price: "50,000",
            description: "Essential modules",
            features: ["Finance module", "Inventory", "Basic reporting", "User management"],
          },
          {
            name: "Business ERP",
            price: "100,000",
            description: "Full ERP",
            features: ["Everything in Core", "HR module", "Procurement", "Advanced reporting"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "200,000+",
            description: "Complete solution",
            features: ["Everything in Business", "Manufacturing", "Multi-company", "Custom modules"],
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
