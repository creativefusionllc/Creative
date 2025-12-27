import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Domain Transfer Dubai | Move Your Domain | Creative Fusion LLC",
  description:
    "Seamless domain transfer service in Dubai UAE. Free transfer assistance, no downtime, and extended registration included.",
  keywords: ["domain transfer dubai", "move domain uae", "domain migration"],
}

export default function DomainTransferPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="Domain Transfer"
      subtitle="Move Your Domains"
      description="Seamlessly transfer your existing domains to Creative Fusion. Free transfer assistance, zero downtime, and get an extra year of registration added."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Single Domain Transfer",
          description: "Transfer one domain with full support",
          href: "/services/domain-hosting/domain-transfer/single-transfer",
        },
        {
          title: "Bulk Transfer",
          description: "Transfer multiple domains at once",
          href: "/services/domain-hosting/domain-transfer/bulk-transfer",
        },
        {
          title: "Registrar Transfer",
          description: "Move from any registrar",
          href: "/services/domain-hosting/domain-transfer/registrar-transfer",
        },
        {
          title: "Website Migration",
          description: "Transfer domain + website together",
          href: "/services/domain-hosting/domain-transfer/website-migration",
        },
        {
          title: "Email Migration",
          description: "Transfer domain + email together",
          href: "/services/domain-hosting/domain-transfer/email-migration",
        },
        {
          title: "Expired Domain Recovery",
          description: "Recover recently expired domains",
          href: "/services/domain-hosting/domain-transfer/expired-recovery",
        },
      ]}
      pricingTiers={[
        {
          name: "Standard",
          price: "AED 55",
          description: "Per domain",
          features: ["+1 year registration", "Free WHOIS privacy", "DNS migration", "Email support"],
        },
        {
          name: "Assisted",
          price: "AED 99",
          description: "Per domain",
          features: ["Full transfer support", "Priority processing", "Phone support", "No downtime guarantee"],
          popular: true,
        },
        {
          name: "Bulk",
          price: "AED 45/domain",
          description: "10+ domains",
          features: ["Volume discount", "Dedicated manager", "Consolidated billing", "Priority support"],
        },
      ]}
      relatedSubServices={[
        { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
        { title: "DNS Management", href: "/services/domain-hosting/dns-management" },
      ]}
    />
  )
}
