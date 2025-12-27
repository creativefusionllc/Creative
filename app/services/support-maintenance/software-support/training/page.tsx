import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Software Training | Support & Maintenance | Creative Fusion",
  description: "Software training services in Dubai & UAE.",
}

export default function SoftwareTrainingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Software Support"
      subServiceSlug="software-support"
      categoryName="Software Training"
      categorySlug="training"
      description="Software training services helping your team maximize productivity with your applications."
      features={[
        "On-site training",
        "Remote sessions",
        "Video tutorials",
        "Documentation",
        "Hands-on workshops",
        "Q&A sessions",
      ]}
      benefits={["User adoption", "Productivity boost", "Fewer errors", "Self-sufficiency", "ROI maximization"]}
      processSteps={[
        "Training needs assessment",
        "Curriculum development",
        "Material creation",
        "Training delivery",
        "Assessment",
        "Follow-up support",
      ]}
      brandColor="slate"
    />
  )
}
