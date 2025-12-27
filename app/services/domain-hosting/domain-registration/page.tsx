import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Domain Registration Dubai | .com .ae .io Domains | Creative Fusion LLC",
  description:
    "Register your perfect domain name in Dubai UAE. 500+ extensions including .com, .ae, .co, .io with free WHOIS privacy and DNS management.",
  keywords: ["domain registration dubai", "buy domain uae", ".ae domain registration", ".com domain dubai"],
}

export default function DomainRegistrationPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="Domain Registration"
      subtitle="Secure Your Online Identity"
      description="Register your perfect domain name with over 500+ extensions available. Get free WHOIS privacy protection, DNS management, and email forwarding included."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: ".com Domains",
          description: "The world's most popular domain extension for businesses",
          href: "/services/domain-hosting/domain-registration/com-domains",
        },
        {
          title: ".ae Domains",
          description: "UAE country code domain for local businesses",
          href: "/services/domain-hosting/domain-registration/ae-domains",
        },
        {
          title: ".io Domains",
          description: "Popular choice for tech startups and SaaS companies",
          href: "/services/domain-hosting/domain-registration/io-domains",
        },
        {
          title: ".co Domains",
          description: "Short, memorable alternative to .com",
          href: "/services/domain-hosting/domain-registration/co-domains",
        },
        {
          title: "Premium Domains",
          description: "Acquire high-value premium domain names",
          href: "/services/domain-hosting/domain-registration/premium-domains",
        },
        {
          title: "Bulk Registration",
          description: "Register multiple domains at discounted rates",
          href: "/services/domain-hosting/domain-registration/bulk-registration",
        },
      ]}
      pricingTiers={[
        {
          name: ".com Domain",
          price: "AED 55/yr",
          description: "Most popular extension",
          features: ["Free WHOIS privacy", "DNS management", "Email forwarding", "Auto-renewal"],
        },
        {
          name: ".ae Domain",
          price: "AED 150/yr",
          description: "UAE local domain",
          features: ["UAE presence", "Free WHOIS privacy", "DNS management", "Priority support"],
          popular: true,
        },
        {
          name: "Premium Domain",
          price: "Custom",
          description: "High-value domains",
          features: ["Acquisition service", "Negotiation support", "Legal transfer", "Brand protection"],
        },
      ]}
      relatedSubServices={[
        { title: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" },
        { title: "DNS Management", href: "/services/domain-hosting/dns-management" },
      ]}
    />
  )
}
