import { CategoryPageTemplate } from "@/components/services/category-page-template"

export default function AnalyticsCRMPage() {
  return (
    <CategoryPageTemplate
      title="Analytics CRM"
      description="Data-driven CRM with advanced analytics, reporting, and business intelligence for informed decision making."
      parentService="Software & Apps"
      parentServiceHref="/services/software-apps"
      subService="CRM Solutions"
      subServiceHref="/services/software-apps/crm-solutions"
      features={[
        "Real-time dashboards",
        "Predictive analytics",
        "Custom reports",
        "Data visualization",
        "Trend analysis",
        "Performance metrics",
      ]}
      benefits={["Data-driven decisions", "Identify opportunities", "Forecast accurately", "Measure performance"]}
      brandColor="cyan"
    />
  )
}
