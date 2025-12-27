import { CategoryPageTemplate } from "@/components/services/category-page-template"

export default function SocialCRMPage() {
  return (
    <CategoryPageTemplate
      title="Social CRM"
      description="Social media integrated CRM to manage customer interactions across all social platforms in one place."
      parentService="Software & Apps"
      parentServiceHref="/services/software-apps"
      subService="CRM Solutions"
      subServiceHref="/services/software-apps/crm-solutions"
      features={[
        "Social listening",
        "Multi-platform management",
        "Sentiment analysis",
        "Social engagement tracking",
        "Influencer management",
        "Social analytics",
      ]}
      benefits={["Unified social presence", "Better customer engagement", "Real-time responses", "Brand monitoring"]}
      brandColor="cyan"
    />
  )
}
