import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "SSL Certificates Dubai | Website Security | Creative Fusion LLC",
  description:
    "Secure your website with SSL certificates in Dubai UAE. Free basic SSL, premium options for e-commerce and enterprise.",
  keywords: ["ssl certificate dubai", "https security uae", "website security"],
}

export default function SSLCertificatesPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="SSL Certificates"
      subtitle="Secure Your Website"
      description="Protect your website and customer data with industry-standard SSL certificates. From free basic SSL to premium EV certificates for maximum trust."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Domain Validation (DV)",
          description: "Basic encryption for personal websites",
          href: "/services/domain-hosting/ssl-certificates/domain-validation",
        },
        {
          title: "Organization Validation (OV)",
          description: "Business verification for companies",
          href: "/services/domain-hosting/ssl-certificates/organization-validation",
        },
        {
          title: "Extended Validation (EV)",
          description: "Maximum trust with green bar",
          href: "/services/domain-hosting/ssl-certificates/extended-validation",
        },
        {
          title: "Wildcard SSL",
          description: "Secure unlimited subdomains",
          href: "/services/domain-hosting/ssl-certificates/wildcard-ssl",
        },
        {
          title: "Multi-Domain SSL",
          description: "One certificate for multiple domains",
          href: "/services/domain-hosting/ssl-certificates/multi-domain",
        },
        {
          title: "Code Signing",
          description: "Sign software and applications",
          href: "/services/domain-hosting/ssl-certificates/code-signing",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic DV",
          price: "Free",
          description: "Let's Encrypt",
          features: ["Domain validation", "256-bit encryption", "Auto-renewal", "Unlimited reissues"],
        },
        {
          name: "Business OV",
          price: "AED 299/yr",
          description: "Organization verified",
          features: ["Company verification", "Trust seal", "Warranty included", "Priority support"],
          popular: true,
        },
        {
          name: "Premium EV",
          price: "AED 899/yr",
          description: "Extended validation",
          features: ["Green address bar", "Highest trust", "$1.75M warranty", "Dedicated support"],
        },
      ]}
      relatedSubServices={[
        { title: "Web Hosting", href: "/services/domain-hosting/web-hosting" },
        { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      ]}
    />
  )
}
