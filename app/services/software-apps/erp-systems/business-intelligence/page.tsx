import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { BarChart3 } from "lucide-react"

export const metadata = {
  title: "Business Intelligence Solutions | Creative Fusion",
  description: "Custom BI dashboards and analytics for data-driven decision making.",
}

export default function BusinessIntelligencePage() {
  return (
    <CategoryPageTemplate
      title="Business Intelligence"
      subtitle="Data-driven insights"
      description="Custom business intelligence solutions with interactive dashboards, advanced analytics, and automated reporting to transform your data into actionable insights."
      heroIcon={<BarChart3 className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "ERP Systems", href: "/services/software-apps/erp-systems" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Dashboards", description: "Real-time visual insights" },
        { title: "Analytics", description: "Deep data analysis" },
        { title: "Reporting", description: "Automated reports" },
        { title: "Data Integration", description: "All sources in one place" },
        { title: "Predictions", description: "AI-powered forecasting" },
        { title: "Mobile Access", description: "Insights on the go" },
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Identify KPIs and metrics" },
        { step: 2, title: "Data Audit", description: "Assess data sources" },
        { step: 3, title: "Design", description: "Dashboard wireframes" },
        { step: 4, title: "Development", description: "Build BI solution" },
        { step: 5, title: "Integration", description: "Connect data sources" },
        { step: 6, title: "Training", description: "User enablement" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 20,000",
          features: ["5 dashboards", "Basic reports", "2 data sources", "Monthly refresh"],
        },
        {
          name: "Professional",
          price: "AED 50,000",
          features: ["Unlimited dashboards", "Advanced analytics", "All data sources", "Real-time"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["AI/ML analytics", "Predictive models", "Custom development", "Managed service"],
        },
      ]}
      faqs={[
        {
          question: "What tools do you use?",
          answer: "We build custom solutions or implement Power BI, Tableau, Looker based on your needs.",
        },
        {
          question: "Can it connect to our ERP?",
          answer: "Yes, we connect to any data source - ERP, CRM, spreadsheets, databases, APIs.",
        },
      ]}
      relatedCategories={[
        { name: "Analytics", href: "/services/digital-marketing/analytics" },
        { name: "Custom Software", href: "/services/software-apps/custom-software" },
      ]}
    />
  )
}
