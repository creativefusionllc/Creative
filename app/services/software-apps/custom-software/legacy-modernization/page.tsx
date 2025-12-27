import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { RefreshCw } from "lucide-react"

export const metadata = {
  title: "Legacy System Modernization | Creative Fusion",
  description: "Update and modernize outdated software systems for improved performance and maintainability.",
}

export default function LegacyModernizationPage() {
  return (
    <CategoryPageTemplate
      title="Legacy Modernization"
      subtitle="Breathe new life into old systems"
      description="Transform outdated legacy systems into modern, maintainable applications. We help you migrate, refactor, or rebuild systems while preserving business logic and data."
      heroIcon={<RefreshCw className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Modern Tech Stack", description: "Current, supported technologies" },
        { title: "Better Performance", description: "Faster, more efficient" },
        { title: "Reduced Risk", description: "No more unsupported software" },
        { title: "Lower Costs", description: "Easier, cheaper maintenance" },
        { title: "New Features", description: "Add modern capabilities" },
        { title: "Cloud Ready", description: "Enable cloud deployment" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Analyze legacy system" },
        { step: 2, title: "Strategy", description: "Rehost, refactor, or rebuild" },
        { step: 3, title: "Planning", description: "Detailed migration plan" },
        { step: 4, title: "Development", description: "Build modern system" },
        { step: 5, title: "Migration", description: "Transfer data safely" },
        { step: 6, title: "Cutover", description: "Switch to new system" },
      ]}
      pricing={[
        {
          name: "Assessment",
          price: "AED 10,000",
          features: ["Full system audit", "Risk assessment", "Strategy recommendation", "Roadmap document"],
        },
        {
          name: "Modernization",
          price: "From AED 50,000",
          features: ["System rebuild", "Data migration", "User training", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Complex systems", "Phased migration", "Zero downtime", "Ongoing partnership"],
        },
      ]}
      faqs={[
        {
          question: "Rehost vs refactor vs rebuild?",
          answer:
            "Rehost moves as-is to cloud. Refactor updates code. Rebuild creates new. We recommend based on your situation.",
        },
        {
          question: "Will we lose data?",
          answer: "Never. We ensure complete data migration with validation and rollback capability.",
        },
      ]}
      relatedCategories={[
        { name: "Enterprise Software", href: "/services/software-apps/custom-software/enterprise-software" },
        { name: "Cloud Hosting", href: "/services/web-development/cloud-hosting" },
      ]}
    />
  )
}
