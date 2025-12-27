import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { ArrowRightLeft } from "lucide-react"

export const metadata = {
  title: "Email Migration Services | Creative Fusion",
  description: "Seamless email migration from any provider with zero data loss and minimal downtime.",
}

export default function EmailMigrationPage() {
  return (
    <CategoryPageTemplate
      title="Email Migration"
      subtitle="Seamless migration from any email provider"
      description="Move your emails, contacts, calendars, and folders from any email provider to your new hosting with zero data loss and minimal downtime."
      heroIcon={<ArrowRightLeft className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Email Hosting", href: "/services/domain-hosting/email-hosting" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Zero Data Loss", description: "Complete migration of all emails and attachments" },
        { title: "Folder Structure", description: "Preserve all folders and organization" },
        { title: "Contacts & Calendars", description: "Migrate contacts, calendars, tasks" },
        { title: "Minimal Downtime", description: "Seamless cutover with no disruption" },
        { title: "Any Source", description: "From Gmail, Yahoo, Outlook, cPanel, any IMAP" },
        { title: "Verification", description: "Complete audit and verification report" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Analyze current email setup and data size" },
        { step: 2, title: "Planning", description: "Create migration timeline and strategy" },
        { step: 3, title: "Pre-Migration", description: "Initial sync of historical emails" },
        { step: 4, title: "DNS Cutover", description: "Switch MX records to new server" },
        { step: 5, title: "Final Sync", description: "Sync remaining emails post-cutover" },
        { step: 6, title: "Verification", description: "Verify all data and train users" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 200",
          features: ["Up to 10 mailboxes", "Emails only", "Standard support", "5 business days"],
        },
        {
          name: "Professional",
          price: "AED 500",
          features: ["Up to 50 mailboxes", "Emails + contacts + calendars", "Priority support", "3 business days"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Unlimited mailboxes", "Full data migration", "Dedicated manager", "Weekend migration"],
        },
      ]}
      faqs={[
        {
          question: "How long does migration take?",
          answer:
            "Depends on data size. Typically 1-5 days for pre-migration sync, then instant cutover with minimal downtime.",
        },
        {
          question: "Will I lose any emails?",
          answer: "No, we perform multiple sync passes and verification to ensure 100% data integrity.",
        },
        {
          question: "Can users work during migration?",
          answer: "Yes, we sync in background. Users continue working normally until final cutover.",
        },
      ]}
      relatedCategories={[
        { name: "Google Workspace", href: "/services/domain-hosting/email-hosting/google-workspace" },
        { name: "Microsoft 365", href: "/services/domain-hosting/email-hosting/microsoft-365" },
        { name: "Business Email", href: "/services/domain-hosting/email-hosting/business-email" },
      ]}
    />
  )
}
