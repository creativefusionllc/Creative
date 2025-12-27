import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Microsoft 365 Email Hosting | Creative Fusion",
  description: "Professional Microsoft 365 setup with Outlook, Teams, SharePoint for enterprise collaboration.",
}

export default function Microsoft365Page() {
  return (
    <CategoryPageTemplate
      title="Microsoft 365"
      subtitle="Enterprise productivity with Outlook, Teams & Office apps"
      description="Professional email with Microsoft Outlook plus the complete Office 365 suite including Word, Excel, PowerPoint, Teams, and SharePoint for maximum productivity."
      heroIcon={<Mail className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Email Hosting", href: "/services/domain-hosting/email-hosting" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Outlook Email", description: "Professional email with 50GB-100GB mailbox" },
        { title: "Microsoft Teams", description: "Chat, video calls, and collaboration hub" },
        { title: "Office Apps", description: "Word, Excel, PowerPoint desktop & web apps" },
        { title: "SharePoint", description: "Intranet and document management" },
        { title: "OneDrive", description: "1TB-unlimited cloud storage per user" },
        { title: "Enterprise Security", description: "Advanced threat protection and compliance" },
      ]}
      process={[
        { step: 1, title: "License Setup", description: "Choose and activate Microsoft 365 plans" },
        { step: 2, title: "Domain Configuration", description: "Add and verify your domain" },
        { step: 3, title: "User Provisioning", description: "Create accounts and assign licenses" },
        { step: 4, title: "Email Migration", description: "Migrate emails, contacts, calendars" },
        { step: 5, title: "Apps Deployment", description: "Install Office apps on devices" },
        { step: 6, title: "Training & Handover", description: "Team training and documentation" },
      ]}
      pricing={[
        {
          name: "Business Basic",
          price: "AED 22/user/mo",
          features: ["50GB mailbox", "Web Office apps", "Teams", "1TB OneDrive"],
        },
        {
          name: "Business Standard",
          price: "AED 45/user/mo",
          features: ["50GB mailbox", "Desktop Office apps", "Teams premium", "1TB OneDrive"],
          isPopular: true,
        },
        {
          name: "Business Premium",
          price: "AED 80/user/mo",
          features: ["100GB mailbox", "Advanced security", "Intune MDM", "Azure AD Premium"],
        },
      ]}
      faqs={[
        {
          question: "What's included in Microsoft 365?",
          answer:
            "All plans include Outlook email, Teams, OneDrive, and web apps. Standard and Premium add desktop Office applications.",
        },
        {
          question: "Can I use existing Office licenses?",
          answer:
            "Microsoft 365 includes latest Office apps. Existing perpetual licenses work separately but we recommend the subscription for updates.",
        },
        {
          question: "How does Teams compare to Zoom?",
          answer:
            "Teams offers integrated chat, video, file sharing, and app integrations within Microsoft 365, making it ideal for businesses already using Office.",
        },
      ]}
      relatedCategories={[
        { name: "Google Workspace", href: "/services/domain-hosting/email-hosting/google-workspace" },
        { name: "Business Email", href: "/services/domain-hosting/email-hosting/business-email" },
        { name: "Email Security", href: "/services/domain-hosting/email-hosting/email-security" },
      ]}
    />
  )
}
