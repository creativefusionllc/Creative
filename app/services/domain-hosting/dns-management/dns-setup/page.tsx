import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Settings } from "lucide-react"

export const metadata = {
  title: "DNS Setup Services | Creative Fusion",
  description: "Professional DNS configuration for domains, email, and web services.",
}

export default function DNSSetupPage() {
  return (
    <CategoryPageTemplate
      title="DNS Setup"
      subtitle="Professional DNS configuration services"
      description="Expert DNS setup and configuration for your domains. We configure A records, MX records, CNAME, TXT (SPF, DKIM, DMARC), and all DNS settings for optimal website and email performance."
      heroIcon={<Settings className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "DNS Management", href: "/services/domain-hosting/dns-management" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Complete Configuration", description: "All record types properly set up" },
        { title: "Email Authentication", description: "SPF, DKIM, DMARC configured" },
        { title: "Fast Propagation", description: "Optimal TTL settings" },
        { title: "No Downtime", description: "Careful migration planning" },
        { title: "Documentation", description: "Complete DNS documentation provided" },
        { title: "Ongoing Support", description: "Future changes assistance" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Review current DNS and requirements" },
        { step: 2, title: "Planning", description: "Document all required records" },
        { step: 3, title: "Configuration", description: "Set up all DNS records" },
        { step: 4, title: "Verification", description: "Test all services work correctly" },
        { step: 5, title: "Documentation", description: "Provide DNS documentation" },
      ]}
      pricing={[
        {
          name: "Basic Setup",
          price: "AED 199",
          features: ["Single domain", "Website + email DNS", "Basic records", "Email support"],
        },
        {
          name: "Professional",
          price: "AED 399",
          features: ["Up to 5 domains", "Full email auth (SPF/DKIM/DMARC)", "CDN configuration", "Priority support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 799",
          features: ["Unlimited domains", "Complex multi-service setup", "Geo-DNS", "Dedicated support"],
        },
      ]}
      faqs={[
        {
          question: "What DNS records do I need?",
          answer:
            "Typically: A/AAAA for website, MX for email, TXT for SPF/DKIM/DMARC, CNAME for subdomains. We assess and configure all needed records.",
        },
        {
          question: "How long does DNS propagation take?",
          answer: "Changes typically propagate within 1-24 hours. We use optimal TTL values to speed this up.",
        },
        {
          question: "Do you support all DNS providers?",
          answer:
            "Yes, we can configure DNS at any registrar or DNS provider including Cloudflare, Route53, GoDaddy, etc.",
        },
      ]}
      relatedCategories={[
        { name: "DNS Migration", href: "/services/domain-hosting/dns-management/dns-migration" },
        { name: "DNS Security", href: "/services/domain-hosting/dns-management/dns-security" },
        { name: "Email Hosting", href: "/services/domain-hosting/email-hosting" },
      ]}
    />
  )
}
