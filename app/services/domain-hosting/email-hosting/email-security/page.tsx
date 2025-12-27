import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Email Security Services | Creative Fusion",
  description: "Advanced email security with spam filtering, phishing protection, encryption, and threat detection.",
}

export default function EmailSecurityPage() {
  return (
    <CategoryPageTemplate
      title="Email Security"
      subtitle="Advanced protection against email threats"
      description="Protect your business from spam, phishing, malware, and ransomware with enterprise-grade email security including encryption, threat detection, and compliance tools."
      heroIcon={<Shield className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Email Hosting", href: "/services/domain-hosting/email-hosting" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Spam Filtering", description: "99.9% spam detection with AI filtering" },
        { title: "Phishing Protection", description: "Real-time phishing URL detection" },
        { title: "Malware Scanning", description: "Attachment scanning and sandboxing" },
        { title: "Email Encryption", description: "TLS encryption and S/MIME support" },
        { title: "DLP Protection", description: "Data loss prevention policies" },
        { title: "Compliance", description: "GDPR, HIPAA compliance tools" },
      ]}
      process={[
        { step: 1, title: "Security Audit", description: "Assess current email security posture" },
        { step: 2, title: "Gateway Setup", description: "Configure secure email gateway" },
        { step: 3, title: "Policy Configuration", description: "Set up filtering and DLP rules" },
        { step: 4, title: "DNS Updates", description: "Implement SPF, DKIM, DMARC" },
        { step: 5, title: "Testing", description: "Verify protection effectiveness" },
        { step: 6, title: "Monitoring", description: "Enable real-time threat monitoring" },
      ]}
      pricing={[
        {
          name: "Basic Protection",
          price: "AED 8/user/mo",
          features: ["Spam filtering", "Basic malware scan", "Quarantine", "Monthly reports"],
        },
        {
          name: "Advanced Protection",
          price: "AED 18/user/mo",
          features: ["AI-powered filtering", "Phishing protection", "Attachment sandboxing", "Real-time alerts"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 35/user/mo",
          features: ["Full ATP", "Email encryption", "DLP", "Compliance tools", "24/7 SOC"],
        },
      ]}
      faqs={[
        {
          question: "What threats does it protect against?",
          answer:
            "Protection against spam, phishing, malware, ransomware, BEC (business email compromise), and zero-day threats.",
        },
        {
          question: "Does it work with any email provider?",
          answer:
            "Yes, email security gateway works with any email provider including Google Workspace, Microsoft 365, or custom hosting.",
        },
        {
          question: "How does quarantine work?",
          answer:
            "Suspicious emails are held in quarantine. Users can review and release legitimate emails, or admins can manage centrally.",
        },
      ]}
      relatedCategories={[
        { name: "Google Workspace", href: "/services/domain-hosting/email-hosting/google-workspace" },
        { name: "Microsoft 365", href: "/services/domain-hosting/email-hosting/microsoft-365" },
        { name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" },
      ]}
    />
  )
}
