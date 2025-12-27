import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Google Workspace Email Hosting | Creative Fusion",
  description: "Professional Google Workspace setup with Gmail, Drive, Docs, Meet for business collaboration.",
}

export default function GoogleWorkspacePage() {
  return (
    <CategoryPageTemplate
      title="Google Workspace"
      subtitle="Complete business productivity suite with professional Gmail"
      description="Get professional email @yourcompany.com with the full power of Google Workspace including Gmail, Drive, Docs, Sheets, Meet, and Calendar for seamless team collaboration."
      heroIcon={<Mail className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Email Hosting", href: "/services/domain-hosting/email-hosting" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Professional Gmail", description: "Custom email with 30GB-5TB storage per user" },
        { title: "Google Drive", description: "Cloud storage for files, folders, and collaboration" },
        { title: "Google Meet", description: "HD video meetings with screen sharing" },
        { title: "Google Docs Suite", description: "Docs, Sheets, Slides, Forms for productivity" },
        { title: "Admin Console", description: "Complete control over users and security" },
        { title: "24/7 Support", description: "Google and our team available for assistance" },
      ]}
      process={[
        { step: 1, title: "Domain Verification", description: "Verify domain ownership with Google" },
        { step: 2, title: "MX Records Setup", description: "Configure DNS for email routing" },
        { step: 3, title: "User Creation", description: "Set up user accounts and groups" },
        { step: 4, title: "Data Migration", description: "Migrate existing emails if needed" },
        { step: 5, title: "Security Setup", description: "Configure 2FA and security policies" },
        { step: 6, title: "Training", description: "Team training on Google Workspace tools" },
      ]}
      pricing={[
        {
          name: "Business Starter",
          price: "AED 22/user/mo",
          features: ["30GB storage", "Custom email", "Video meetings (100)", "Standard support"],
        },
        {
          name: "Business Standard",
          price: "AED 45/user/mo",
          features: ["2TB storage", "Recording meetings", "Shared drives", "Enhanced support"],
          isPopular: true,
        },
        {
          name: "Business Plus",
          price: "AED 66/user/mo",
          features: ["5TB storage", "Vault & eDiscovery", "Advanced security", "Premium support"],
        },
      ]}
      faqs={[
        {
          question: "Can I migrate from existing email?",
          answer:
            "Yes, we handle complete email migration from any provider including Outlook, Yahoo, or other hosts with zero data loss.",
        },
        {
          question: "How many users can I have?",
          answer:
            "Google Workspace supports unlimited users. Pricing is per user per month with volume discounts available.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Google provides enterprise-grade security with 2FA, encryption, and compliance with GDPR, HIPAA, and other standards.",
        },
      ]}
      relatedCategories={[
        { name: "Microsoft 365", href: "/services/domain-hosting/email-hosting/microsoft-365" },
        { name: "Business Email", href: "/services/domain-hosting/email-hosting/business-email" },
        { name: "Email Migration", href: "/services/domain-hosting/email-hosting/email-migration" },
      ]}
    />
  )
}
