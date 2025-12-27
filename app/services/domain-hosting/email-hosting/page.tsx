import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Business Email Hosting Dubai | Professional Email | Creative Fusion LLC",
  description:
    "Professional business email hosting in Dubai UAE. Secure, reliable email with your domain, spam protection, and 50GB storage.",
  keywords: ["email hosting dubai", "business email uae", "professional email"],
}

export default function EmailHostingPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="Email Hosting"
      subtitle="Professional Business Email"
      description="Professional business email with your domain. Secure, reliable email hosting with advanced spam protection, 50GB storage per mailbox, and mobile sync."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Business Email",
          description: "Professional email@yourdomain.com addresses",
          href: "/services/domain-hosting/email-hosting/business-email",
        },
        {
          title: "Microsoft 365",
          description: "Full Microsoft 365 suite with Exchange",
          href: "/services/domain-hosting/email-hosting/microsoft-365",
        },
        {
          title: "Google Workspace",
          description: "Gmail for business with Google apps",
          href: "/services/domain-hosting/email-hosting/google-workspace",
        },
        {
          title: "Email Migration",
          description: "Seamless migration from any provider",
          href: "/services/domain-hosting/email-hosting/email-migration",
        },
        {
          title: "Email Security",
          description: "Advanced spam and malware protection",
          href: "/services/domain-hosting/email-hosting/email-security",
        },
        {
          title: "Email Archiving",
          description: "Compliance-ready email archiving",
          href: "/services/domain-hosting/email-hosting/email-archiving",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 15/mo",
          description: "Per mailbox",
          features: ["10GB storage", "Webmail access", "Mobile sync", "Spam protection", "POP/IMAP"],
        },
        {
          name: "Business",
          price: "AED 35/mo",
          description: "Per mailbox",
          features: ["50GB storage", "Outlook compatible", "Calendar sync", "Advanced security", "Priority support"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 65/mo",
          description: "Per mailbox",
          features: ["Unlimited storage", "Email archiving", "eDiscovery", "DLP protection", "Dedicated support"],
        },
      ]}
      relatedSubServices={[
        { title: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
        { title: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" },
      ]}
    />
  )
}
