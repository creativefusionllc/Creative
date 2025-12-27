import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Analytics & Reporting | Support & Maintenance | Creative Fusion",
  description: "Marketing analytics and reporting in Dubai & UAE.",
}

export default function AnalyticsReportsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Digital Marketing Support"
      subServiceSlug="digital-marketing-support"
      categoryName="Analytics & Reporting"
      categorySlug="analytics-reports"
      description="Marketing analytics and reporting providing insights to guide your business decisions."
      features={[
        "Custom dashboards",
        "Monthly reports",
        "KPI tracking",
        "Trend analysis",
        "ROI calculation",
        "Recommendations",
      ]}
      benefits={[
        "Data-driven decisions",
        "Performance visibility",
        "Opportunity identification",
        "Budget optimization",
        "Goal tracking",
      ]}
      processSteps={[
        "KPI definition",
        "Dashboard setup",
        "Data integration",
        "Report creation",
        "Insight generation",
        "Action planning",
      ]}
      brandColor="slate"
    />
  )
}
