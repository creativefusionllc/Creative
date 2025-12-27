import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Software Licensing | Support & Maintenance | Creative Fusion",
  description: "Software licensing management in Dubai & UAE.",
}

export default function SoftwareLicensingPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Software Support"
      subServiceSlug="software-support"
      categoryName="Software Licensing"
      categorySlug="licensing"
      description="Software licensing management ensuring compliance and optimizing your software investments."
      features={[
        "License tracking",
        "Renewal management",
        "Compliance audits",
        "Cost optimization",
        "Vendor management",
        "Usage analysis",
      ]}
      benefits={["Compliance assurance", "Cost savings", "Audit readiness", "Optimized usage", "Risk reduction"]}
      processSteps={[
        "License audit",
        "Inventory creation",
        "Compliance check",
        "Optimization plan",
        "Implementation",
        "Ongoing management",
      ]}
      brandColor="slate"
    />
  )
}
