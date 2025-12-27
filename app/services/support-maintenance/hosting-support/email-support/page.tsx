import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Email Support | Support & Maintenance | Creative Fusion",
  description: "Business email support services in Dubai & UAE.",
}

export default function EmailSupportPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Hosting Support"
      subServiceSlug="hosting-support"
      categoryName="Email Support"
      categorySlug="email-support"
      description="Business email support services ensuring reliable communication for your organization."
      features={[
        "Email setup",
        "Migration assistance",
        "Spam filtering",
        "Security configuration",
        "Mobile setup",
        "Troubleshooting",
      ]}
      benefits={["Reliable email", "Spam protection", "Professional communication", "Mobile access", "Expert support"]}
      processSteps={[
        "Email audit",
        "Setup/migration",
        "Security configuration",
        "User training",
        "Testing",
        "Ongoing support",
      ]}
      brandColor="slate"
    />
  )
}
