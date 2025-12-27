import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { RefreshCw } from "lucide-react"

export const metadata = {
  title: "DNS Failover Services | Creative Fusion",
  description: "Automatic DNS failover to backup servers for maximum uptime and availability.",
}

export default function DNSFailoverPage() {
  return (
    <CategoryPageTemplate
      title="DNS Failover"
      subtitle="Automatic failover for maximum uptime"
      description="DNS failover automatically redirects traffic to backup servers when your primary server fails. Ensure maximum availability and protect against outages with intelligent health checks."
      heroIcon={<RefreshCw className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "DNS Management", href: "/services/domain-hosting/dns-management" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Automatic Failover", description: "Instant switch to backup on failure" },
        { title: "Health Checks", description: "Continuous server monitoring" },
        { title: "Multiple Backups", description: "Chain multiple failover targets" },
        { title: "Fast TTL", description: "Quick DNS updates for fast failover" },
        { title: "Global Monitoring", description: "Health checks from multiple regions" },
        { title: "Custom Rules", description: "Define failover conditions" },
      ]}
      process={[
        { step: 1, title: "Setup", description: "Configure primary and backup servers" },
        { step: 2, title: "Health Checks", description: "Define monitoring parameters" },
        { step: 3, title: "Failover Rules", description: "Set failover triggers and order" },
        { step: 4, title: "Testing", description: "Test failover scenarios" },
        { step: 5, title: "Go Live", description: "Enable automatic failover" },
      ]}
      pricing={[
        {
          name: "Basic Failover",
          price: "AED 49/mo",
          features: ["1 domain", "2 endpoints", "30-second checks", "Email alerts"],
        },
        {
          name: "Professional",
          price: "AED 129/mo",
          features: ["5 domains", "5 endpoints each", "10-second checks", "Multi-channel alerts"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 299/mo",
          features: ["Unlimited domains", "Unlimited endpoints", "Real-time checks", "SLA guarantee"],
        },
      ]}
      faqs={[
        {
          question: "How fast is failover?",
          answer:
            "Detection within seconds based on check interval. DNS update is instant with low TTL. Total failover typically under 60 seconds.",
        },
        {
          question: "What triggers failover?",
          answer:
            "Customizable: HTTP errors, timeout, specific content missing, SSL errors, or custom health check endpoints.",
        },
        {
          question: "Does it fail back automatically?",
          answer:
            "Yes, once primary recovers and passes health checks, traffic automatically returns (configurable delay).",
        },
      ]}
      relatedCategories={[
        { name: "DNS Monitoring", href: "/services/domain-hosting/dns-management/dns-monitoring" },
        { name: "Cloud Hosting", href: "/services/domain-hosting/web-hosting/cloud-hosting" },
        { name: "Website Maintenance", href: "/services/support-maintenance/website-maintenance" },
      ]}
    />
  )
}
