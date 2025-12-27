import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Website Security | Support & Maintenance | Creative Fusion",
  description: "Website security services in Dubai & UAE.",
}

export default function WebsiteSecurityPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="Website Maintenance"
      subServiceSlug="website-maintenance"
      categoryName="Website Security"
      categorySlug="security"
      description="Website security services protecting your site from threats, malware, and vulnerabilities."
      features={[
        "Malware scanning",
        "Firewall setup",
        "SSL management",
        "Vulnerability patching",
        "Security hardening",
        "Incident response",
      ]}
      benefits={["Protection from attacks", "Data security", "Customer trust", "Compliance", "Peace of mind"]}
      processSteps={[
        "Security audit",
        "Vulnerability scan",
        "Hardening",
        "Monitoring setup",
        "Regular scans",
        "Incident handling",
      ]}
      brandColor="slate"
    />
  )
}
