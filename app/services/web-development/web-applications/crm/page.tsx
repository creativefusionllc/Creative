import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Custom CRM Development Dubai | Customer Management | Creative Fusion LLC",
  description:
    "Custom CRM development in Dubai. Build tailored customer relationship management systems for your business.",
}

export default function CRMPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="CRM Development"
        subtitle="Manage customer relationships"
        description="Build custom CRM systems tailored to your business processes for better customer management and sales tracking."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Contact management",
          "Sales pipeline",
          "Task automation",
          "Email integration",
          "Reporting",
          "Mobile access",
          "Custom fields",
          "Integrations",
        ]}
        process={[
          { title: "Analyze", description: "Business processes" },
          { title: "Design", description: "CRM architecture" },
          { title: "Build", description: "Custom development" },
          { title: "Train", description: "Team onboarding" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "15,000",
            description: "Essential CRM",
            features: ["Contact management", "Deal tracking", "Basic reporting", "Mobile app"],
          },
          {
            name: "Advanced",
            price: "35,000",
            description: "Full CRM",
            features: ["Everything in Basic", "Automation", "Email integration", "Custom reports"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "75,000+",
            description: "Enterprise CRM",
            features: ["Everything in Advanced", "AI insights", "Multiple pipelines", "API integration"],
          },
        ]}
        relatedCategories={[
          { title: "ERP", href: "/services/web-development/web-applications/erp" },
          { title: "Dashboards", href: "/services/web-development/web-applications/dashboards" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
