import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Business Email Hosting | Creative Fusion",
  description: "Affordable professional email hosting with custom domain, webmail, and IMAP/POP3 access.",
}

export default function BusinessEmailPage() {
  return (
    <CategoryPageTemplate
      title="Business Email"
      subtitle="Professional email hosting at affordable prices"
      description="Get professional email@yourdomain.com without the cost of full productivity suites. Includes webmail, mobile sync, spam filtering, and reliable delivery."
      heroIcon={<Mail className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Email Hosting", href: "/services/domain-hosting/email-hosting" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Custom Domain Email", description: "Professional email@yourcompany.com" },
        { title: "Webmail Access", description: "Access emails from any browser" },
        { title: "Mobile Sync", description: "IMAP/POP3 for all devices" },
        { title: "Spam Protection", description: "Advanced spam and virus filtering" },
        { title: "99.9% Uptime", description: "Reliable email delivery guaranteed" },
        { title: "Unlimited Aliases", description: "Create multiple email addresses" },
      ]}
      process={[
        { step: 1, title: "Plan Selection", description: "Choose mailbox size and features" },
        { step: 2, title: "Domain Setup", description: "Configure MX and SPF records" },
        { step: 3, title: "Account Creation", description: "Set up email accounts" },
        { step: 4, title: "Client Setup", description: "Configure Outlook, mobile apps" },
        { step: 5, title: "Testing", description: "Verify send/receive functionality" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 15/mo",
          features: ["5 mailboxes", "5GB per mailbox", "Webmail", "Basic spam filter"],
        },
        {
          name: "Professional",
          price: "AED 35/mo",
          features: ["15 mailboxes", "15GB per mailbox", "Advanced spam filter", "Email forwarding"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 75/mo",
          features: ["Unlimited mailboxes", "50GB per mailbox", "Priority support", "Custom rules"],
        },
      ]}
      faqs={[
        {
          question: "What's the difference from Gmail/Outlook?",
          answer:
            "Business email provides custom domain email without the full productivity suite, making it more affordable for email-only needs.",
        },
        {
          question: "Can I access on mobile?",
          answer:
            "Yes, business email supports IMAP/POP3 protocols compatible with all email apps including iPhone Mail, Android, and Outlook.",
        },
        {
          question: "Is migration included?",
          answer:
            "Yes, we offer free email migration from your existing provider for all Professional and Enterprise plans.",
        },
      ]}
      relatedCategories={[
        { name: "Google Workspace", href: "/services/domain-hosting/email-hosting/google-workspace" },
        { name: "Microsoft 365", href: "/services/domain-hosting/email-hosting/microsoft-365" },
        { name: "Email Migration", href: "/services/domain-hosting/email-hosting/email-migration" },
      ]}
    />
  )
}
