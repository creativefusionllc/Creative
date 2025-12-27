import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "DNS Management Dubai | DNS Hosting | Creative Fusion LLC",
  description:
    "Advanced DNS management in Dubai UAE. Fast propagation, DDoS protection, and global CDN for optimal performance.",
  keywords: ["dns management dubai", "dns hosting uae", "domain dns"],
}

export default function DNSManagementPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="DNS Management"
      subtitle="Advanced DNS Control"
      description="Enterprise-grade DNS management with global CDN, DDoS protection, and instant propagation. Full control over your domain's DNS records."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Managed DNS",
          description: "Reliable DNS hosting with redundancy",
          href: "/services/domain-hosting/dns-management/managed-dns",
        },
        {
          title: "Premium DNS",
          description: "Enterprise features and SLA",
          href: "/services/domain-hosting/dns-management/premium-dns",
        },
        {
          title: "DNS Security",
          description: "DNSSEC and DDoS protection",
          href: "/services/domain-hosting/dns-management/dns-security",
        },
        {
          title: "GeoDNS",
          description: "Location-based DNS routing",
          href: "/services/domain-hosting/dns-management/geo-dns",
        },
        {
          title: "Failover DNS",
          description: "Automatic failover protection",
          href: "/services/domain-hosting/dns-management/failover-dns",
        },
        {
          title: "DNS Migration",
          description: "Seamless DNS transfer service",
          href: "/services/domain-hosting/dns-management/dns-migration",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "Free",
          description: "With hosting",
          features: ["Standard DNS", "Web interface", "A, CNAME, MX records", "24hr propagation"],
        },
        {
          name: "Premium",
          price: "AED 49/mo",
          description: "Advanced features",
          features: ["Instant propagation", "DNSSEC", "100% uptime SLA", "API access"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 199/mo",
          description: "Full control",
          features: ["GeoDNS", "Failover", "DDoS protection", "Dedicated support"],
        },
      ]}
      relatedSubServices={[
        { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
        { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
      ]}
    />
  )
}
