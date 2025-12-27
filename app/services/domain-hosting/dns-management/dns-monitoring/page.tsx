import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Eye } from "lucide-react"

export const metadata = {
  title: "DNS Monitoring Services | Creative Fusion",
  description: "24/7 DNS monitoring with instant alerts for changes, outages, and performance issues.",
}

export default function DNSMonitoringPage() {
  return (
    <CategoryPageTemplate
      title="DNS Monitoring"
      subtitle="24/7 DNS health and change monitoring"
      description="Continuous monitoring of your DNS records, propagation, response times, and availability. Get instant alerts for unauthorized changes, outages, or performance degradation."
      heroIcon={<Eye className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "DNS Management", href: "/services/domain-hosting/dns-management" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "24/7 Monitoring", description: "Continuous DNS health checks" },
        { title: "Change Detection", description: "Instant alerts on record changes" },
        { title: "Performance Metrics", description: "DNS response time tracking" },
        { title: "Global Checks", description: "Monitor from multiple locations" },
        { title: "Historical Data", description: "DNS history and trends" },
        { title: "Multi-Channel Alerts", description: "Email, SMS, Slack, webhook" },
      ]}
      process={[
        { step: 1, title: "Setup", description: "Add domains to monitoring" },
        { step: 2, title: "Baseline", description: "Record current DNS state" },
        { step: 3, title: "Configure Alerts", description: "Set up notification preferences" },
        { step: 4, title: "Monitor", description: "Continuous 24/7 monitoring begins" },
        { step: 5, title: "Reports", description: "Regular status reports delivered" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 29/mo",
          features: ["5 domains", "5-minute checks", "Email alerts", "7-day history"],
        },
        {
          name: "Professional",
          price: "AED 79/mo",
          features: ["25 domains", "1-minute checks", "Multi-channel alerts", "90-day history"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 199/mo",
          features: ["Unlimited domains", "Real-time monitoring", "API access", "1-year history"],
        },
      ]}
      faqs={[
        {
          question: "What do you monitor?",
          answer:
            "All DNS record types (A, MX, CNAME, TXT, NS, etc.), response times, propagation status, and DNSSEC validity.",
        },
        {
          question: "How fast are alerts?",
          answer:
            "Alerts are sent within seconds of detecting an issue or change, depending on your monitoring interval.",
        },
        {
          question: "Can I monitor competitors?",
          answer:
            "Yes, you can monitor any domain. Useful for tracking competitor changes or domains you're acquiring.",
        },
      ]}
      relatedCategories={[
        { name: "DNS Security", href: "/services/domain-hosting/dns-management/dns-security" },
        { name: "DNS Setup", href: "/services/domain-hosting/dns-management/dns-setup" },
        { name: "Website Maintenance", href: "/services/support-maintenance/website-maintenance" },
      ]}
    />
  )
}
