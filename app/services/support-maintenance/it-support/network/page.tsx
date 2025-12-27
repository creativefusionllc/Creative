import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Network Support | Support & Maintenance | Creative Fusion",
  description: "Professional network support services in Dubai & UAE.",
}

export default function NetworkSupportPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="IT Support"
      subServiceSlug="it-support"
      categoryName="Network Support"
      categorySlug="network"
      description="Professional network support ensuring reliable connectivity and optimal performance."
      features={[
        "Network monitoring",
        "Troubleshooting",
        "Configuration",
        "Security setup",
        "WiFi optimization",
        "VPN management",
      ]}
      benefits={["Reliable connectivity", "Fast performance", "Security assurance", "Minimal downtime", "Expert setup"]}
      processSteps={[
        "Network assessment",
        "Issue identification",
        "Configuration",
        "Testing",
        "Monitoring setup",
        "Ongoing support",
      ]}
      brandColor="slate"
    />
  )
}
