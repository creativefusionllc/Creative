import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Software Documentation | Support & Maintenance | Creative Fusion",
  description: "Software documentation services in Dubai & UAE.",
}

export default function SoftwareDocumentationPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Software Support"
      subServiceSlug="software-support"
      categoryName="Software Documentation"
      categorySlug="documentation"
      description="Software documentation services creating comprehensive guides for users and developers."
      features={["User manuals", "Technical docs", "API documentation", "Video guides", "FAQs", "Release notes"]}
      benefits={["Self-service support", "Knowledge transfer", "Onboarding aid", "Reduced support load", "Compliance"]}
      processSteps={["Documentation audit", "Content planning", "Writing", "Review", "Publication", "Maintenance"]}
      brandColor="slate"
    />
  )
}
