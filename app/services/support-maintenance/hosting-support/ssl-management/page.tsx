import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "SSL Management | Support & Maintenance | Creative Fusion",
  description: "SSL certificate management in Dubai & UAE.",
}

export default function SslManagementPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Hosting Support"
      subServiceSlug="hosting-support"
      categoryName="SSL Management"
      categorySlug="ssl-management"
      description="SSL certificate management ensuring your websites remain secure and trusted."
      features={[
        "Certificate installation",
        "Renewal management",
        "Configuration",
        "Multi-domain SSL",
        "Wildcard SSL",
        "Monitoring",
      ]}
      benefits={["Secure connections", "Customer trust", "SEO benefits", "Compliance", "Never expire"]}
      processSteps={[
        "SSL audit",
        "Certificate selection",
        "Installation",
        "Configuration",
        "Renewal calendar",
        "Monitoring",
      ]}
      brandColor="slate"
    />
  )
}
