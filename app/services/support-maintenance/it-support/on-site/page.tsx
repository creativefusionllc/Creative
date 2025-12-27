import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "On-Site IT Support | Support & Maintenance | Creative Fusion",
  description: "On-site IT support services in Dubai & UAE.",
}

export default function OnSiteSupportPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="IT Support"
      subServiceSlug="it-support"
      categoryName="On-Site IT Support"
      categorySlug="on-site"
      description="On-site IT support with technicians visiting your location for hands-on assistance."
      features={[
        "Physical presence",
        "Hardware repairs",
        "Network setup",
        "Equipment installation",
        "Training sessions",
        "Emergency response",
      ]}
      benefits={["Hands-on support", "Hardware issues", "Complex problems", "Training delivery", "Personal service"]}
      processSteps={[
        "Service request",
        "Scheduling",
        "Technician dispatch",
        "On-site diagnosis",
        "Resolution",
        "Documentation",
      ]}
      brandColor="slate"
    />
  )
}
