import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Website Backups | Support & Maintenance | Creative Fusion",
  description: "Automated website backup services in Dubai & UAE.",
}

export default function WebsiteBackupsPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Website Maintenance"
      subServiceSlug="website-maintenance"
      categoryName="Website Backups"
      categorySlug="backups"
      description="Automated website backup services ensuring your data is always recoverable."
      features={[
        "Automated backups",
        "Daily/weekly schedules",
        "Off-site storage",
        "Easy restoration",
        "Database backups",
        "File backups",
      ]}
      benefits={["Data protection", "Quick recovery", "Peace of mind", "Disaster recovery", "Version history"]}
      processSteps={[
        "Backup strategy",
        "Schedule setup",
        "Storage configuration",
        "Testing restoration",
        "Monitoring",
        "Regular verification",
      ]}
      brandColor="slate"
    />
  )
}
