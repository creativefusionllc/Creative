import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Software Upgrades | Support & Maintenance | Creative Fusion",
  description: "Software upgrade services in Dubai & UAE.",
}

export default function SoftwareUpgradesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Software Support"
      subServiceSlug="software-support"
      categoryName="Software Upgrades"
      categorySlug="upgrades"
      description="Software upgrade services keeping your applications current with new features and improvements."
      features={[
        "Version upgrades",
        "Feature additions",
        "Performance improvements",
        "Security updates",
        "Migration assistance",
        "Training",
      ]}
      benefits={["Latest features", "Better security", "Improved performance", "Competitive edge", "User satisfaction"]}
      processSteps={["Upgrade assessment", "Planning", "Development", "Testing", "Staged deployment", "User training"]}
      brandColor="slate"
    />
  )
}
