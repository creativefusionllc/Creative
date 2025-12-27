import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Website Updates | Support & Maintenance | Creative Fusion",
  description: "Regular website update services in Dubai & UAE.",
}

export default function WebsiteUpdatesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Website Maintenance"
      subServiceSlug="website-maintenance"
      categoryName="Website Updates"
      categorySlug="updates"
      description="Regular website updates keeping your CMS, plugins, and themes current and secure."
      features={[
        "CMS updates",
        "Plugin updates",
        "Theme updates",
        "Compatibility testing",
        "Staged rollouts",
        "Rollback capability",
      ]}
      benefits={["Security patches", "New features", "Bug fixes", "Compatibility", "Optimal performance"]}
      processSteps={[
        "Update assessment",
        "Backup creation",
        "Staging test",
        "Update application",
        "Testing",
        "Documentation",
      ]}
      brandColor="slate"
    />
  )
}
