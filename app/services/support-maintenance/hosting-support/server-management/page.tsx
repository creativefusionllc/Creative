import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Server Management | Support & Maintenance | Creative Fusion",
  description: "Professional server management in Dubai & UAE.",
}

export default function ServerManagementPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Hosting Support"
      subServiceSlug="hosting-support"
      categoryName="Server Management"
      categorySlug="server-management"
      description="Professional server management ensuring optimal performance, security, and uptime."
      features={[
        "Server monitoring",
        "Performance tuning",
        "Security hardening",
        "OS updates",
        "Resource scaling",
        "24/7 support",
      ]}
      benefits={["Maximum uptime", "Optimal performance", "Security assurance", "Expert management", "Peace of mind"]}
      processSteps={[
        "Server audit",
        "Monitoring setup",
        "Security configuration",
        "Performance tuning",
        "Ongoing management",
        "Regular reviews",
      ]}
      brandColor="slate"
    />
  )
}
