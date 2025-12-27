import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Remote IT Support | Support & Maintenance | Creative Fusion",
  description: "Remote IT support and troubleshooting in Dubai & UAE.",
}

export default function RemoteSupportPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="IT Support"
      subServiceSlug="it-support"
      categoryName="Remote IT Support"
      categorySlug="remote"
      description="Remote IT support providing instant assistance through secure remote access tools."
      features={[
        "Remote access",
        "Screen sharing",
        "Quick connection",
        "Secure sessions",
        "Multi-platform",
        "Session recording",
      ]}
      benefits={["Instant support", "No travel time", "Cost-effective", "Quick fixes", "Minimal disruption"]}
      processSteps={[
        "Support request",
        "Secure connection",
        "Issue diagnosis",
        "Remote fix",
        "Testing",
        "Session close",
      ]}
      brandColor="slate"
    />
  )
}
