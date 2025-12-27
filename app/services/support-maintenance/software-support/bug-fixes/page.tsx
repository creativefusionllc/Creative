import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Bug Fixes | Support & Maintenance | Creative Fusion",
  description: "Software bug fixing services in Dubai & UAE.",
}

export default function BugFixesPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Software Support"
      subServiceSlug="software-support"
      categoryName="Bug Fixes"
      categorySlug="bug-fixes"
      description="Software bug fixing services identifying and resolving issues in your applications."
      features={[
        "Issue diagnosis",
        "Root cause analysis",
        "Code fixes",
        "Testing",
        "Regression testing",
        "Documentation",
      ]}
      benefits={["Stable software", "Improved UX", "Fewer errors", "User satisfaction", "Business continuity"]}
      processSteps={[
        "Bug report",
        "Issue reproduction",
        "Root cause analysis",
        "Fix development",
        "Testing",
        "Deployment",
      ]}
      brandColor="slate"
    />
  )
}
