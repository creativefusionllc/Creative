import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Domain Management | Support & Maintenance | Creative Fusion",
  description: "Domain name management services in Dubai & UAE.",
}

export default function DomainManagementPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Hosting Support"
      subServiceSlug="hosting-support"
      categoryName="Domain Management"
      categorySlug="domain-management"
      description="Domain name management services handling registrations, renewals, and DNS configuration."
      features={[
        "Domain registration",
        "Renewal management",
        "DNS configuration",
        "Domain transfers",
        "Privacy protection",
        "Portfolio management",
      ]}
      benefits={[
        "Never lose domains",
        "Expert configuration",
        "Centralized management",
        "Cost optimization",
        "Security protection",
      ]}
      processSteps={[
        "Domain audit",
        "Consolidation",
        "Renewal calendar",
        "DNS optimization",
        "Security setup",
        "Ongoing monitoring",
      ]}
      brandColor="slate"
    />
  )
}
