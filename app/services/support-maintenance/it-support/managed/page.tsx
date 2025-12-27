import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Managed IT Services | Support & Maintenance | Creative Fusion",
  description: "Comprehensive managed IT services in Dubai & UAE.",
}

export default function ManagedServicesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="IT Support"
      subServiceSlug="it-support"
      categoryName="Managed IT Services"
      categorySlug="managed"
      description="Comprehensive managed IT services handling all your technology needs proactively."
      features={[
        "Proactive monitoring",
        "Regular maintenance",
        "Security management",
        "Vendor management",
        "Strategic planning",
        "Reporting",
      ]}
      benefits={["Predictable costs", "Proactive approach", "Expert team", "Reduced risk", "Focus on business"]}
      processSteps={[
        "IT assessment",
        "Service agreement",
        "System onboarding",
        "Ongoing monitoring",
        "Regular reviews",
        "Continuous improvement",
      ]}
      brandColor="slate"
    />
  )
}
