import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Dashboard Development Dubai | Business Intelligence | Creative Fusion LLC",
  description:
    "Custom dashboard development in Dubai. Real-time data visualization and business intelligence solutions.",
}

export default function DashboardsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="Dashboard Development"
        subtitle="Visualize your data"
        description="Build powerful business dashboards with real-time data visualization, KPI tracking, and actionable insights."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Real-time data",
          "Custom charts",
          "KPI tracking",
          "Data integration",
          "Export reports",
          "Mobile friendly",
          "Role-based access",
          "Alerts",
        ]}
        process={[
          { title: "Define", description: "KPI identification" },
          { title: "Connect", description: "Data integration" },
          { title: "Visualize", description: "Chart design" },
          { title: "Deploy", description: "Launch & iterate" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "8,000",
            description: "Simple dashboard",
            features: ["5 widgets", "Single data source", "Basic charts", "Export to PDF"],
          },
          {
            name: "Advanced",
            price: "18,000",
            description: "Full dashboard",
            features: ["Everything in Basic", "Multiple sources", "Custom charts", "Real-time updates"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "40,000+",
            description: "BI platform",
            features: ["Everything in Advanced", "AI insights", "Predictive analytics", "White-label"],
          },
        ]}
        relatedCategories={[
          { title: "Analytics", href: "/services/digital-marketing/analytics" },
          { title: "Reporting", href: "/services/digital-marketing/analytics/reporting" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
