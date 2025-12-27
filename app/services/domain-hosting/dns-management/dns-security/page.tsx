import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Shield } from "lucide-react"

export const metadata = {
  title: "DNS Security Services | Creative Fusion",
  description: "Protect your domains with DNSSEC, DDoS protection, and DNS security monitoring.",
}

export default function DNSSecurityPage() {
  return (
    <CategoryPageTemplate
      title="DNS Security"
      subtitle="Protect your domains from DNS attacks"
      description="Comprehensive DNS security including DNSSEC implementation, DDoS protection, DNS filtering, and real-time monitoring to protect your domains from hijacking and attacks."
      heroIcon={<Shield className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "DNS Management", href: "/services/domain-hosting/dns-management" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "DNSSEC", description: "Cryptographic DNS authentication" },
        { title: "DDoS Protection", description: "Absorb DNS DDoS attacks" },
        { title: "DNS Filtering", description: "Block malicious queries" },
        { title: "Monitoring", description: "Real-time DNS monitoring" },
        { title: "Alerting", description: "Instant alerts on anomalies" },
        { title: "Audit Logs", description: "Complete DNS change history" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Audit current DNS security posture" },
        { step: 2, title: "DNSSEC Setup", description: "Enable and configure DNSSEC" },
        { step: 3, title: "Protection", description: "Enable DDoS and filtering" },
        { step: 4, title: "Monitoring", description: "Set up real-time monitoring" },
        { step: 5, title: "Alerting", description: "Configure alert notifications" },
        { step: 6, title: "Testing", description: "Verify security measures" },
      ]}
      pricing={[
        {
          name: "Basic Security",
          price: "AED 49/mo",
          features: ["DNSSEC enabled", "Basic monitoring", "Email alerts", "Single domain"],
        },
        {
          name: "Advanced",
          price: "AED 149/mo",
          features: ["DNSSEC + DDoS protection", "Real-time monitoring", "SMS + email alerts", "Up to 10 domains"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 399/mo",
          features: ["Full DNS security suite", "24/7 SOC monitoring", "Unlimited domains", "SLA guarantee"],
        },
      ]}
      faqs={[
        {
          question: "What is DNSSEC?",
          answer:
            "DNSSEC adds cryptographic signatures to DNS records, preventing DNS spoofing and cache poisoning attacks.",
        },
        {
          question: "Do I need DNS DDoS protection?",
          answer:
            "If your business depends on your website/email being available, yes. DNS DDoS can take your entire online presence offline.",
        },
        {
          question: "How does monitoring help?",
          answer:
            "We detect unauthorized DNS changes, unusual query patterns, and potential attacks before they cause damage.",
        },
      ]}
      relatedCategories={[
        { name: "DNS Setup", href: "/services/domain-hosting/dns-management/dns-setup" },
        { name: "Email Security", href: "/services/domain-hosting/email-hosting/email-security" },
        { name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" },
      ]}
    />
  )
}
