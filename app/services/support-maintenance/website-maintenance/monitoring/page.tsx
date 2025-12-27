import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Website Monitoring | Support & Maintenance | Creative Fusion",
  description: "24/7 website monitoring services in Dubai & UAE.",
}

export default function WebsiteMonitoringPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Website Maintenance"
      subServiceSlug="website-maintenance"
      categoryName="Website Monitoring"
      categorySlug="monitoring"
      description="24/7 website monitoring detecting issues before they impact your users and business."
      features={[
        "Uptime monitoring",
        "Performance tracking",
        "Error detection",
        "Alert notifications",
        "Response time tracking",
        "Reports",
      ]}
      benefits={["Early detection", "Quick response", "Minimal downtime", "Performance insights", "Proactive fixes"]}
      processSteps={[
        "Monitoring setup",
        "Alert configuration",
        "Threshold setting",
        "Testing alerts",
        "24/7 monitoring",
        "Issue response",
      ]}
      brandColor="slate"
    />
  )
}
