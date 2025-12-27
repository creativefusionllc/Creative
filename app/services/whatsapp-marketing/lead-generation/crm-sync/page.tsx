import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp CRM Sync Dubai | Lead Sync UAE | Creative Fusion LLC",
  description:
    "WhatsApp to CRM lead sync in Dubai & UAE. Automatic lead capture to Salesforce, HubSpot, and more for businesses in GCC.",
  keywords: ["whatsapp crm sync dubai", "lead sync uae", "salesforce whatsapp gcc"],
}

export default function CrmSyncPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="CRM Sync"
          description="Automatic lead sync from WhatsApp to your CRM. Capture conversations, lead data, and engagement history in Salesforce, HubSpot, or your custom CRM."
          heroImage="/whatsapp-crm-sync-leads.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Auto lead creation",
            "Conversation sync",
            "Contact enrichment",
            "Custom field mapping",
            "Real-time updates",
            "Activity tracking",
          ]}
          process={[
            { step: 1, title: "Connect", description: "Connect WhatsApp to CRM" },
            { step: 2, title: "Map", description: "Map data fields" },
            { step: 3, title: "Automate", description: "Set up auto-sync" },
            { step: 4, title: "Test", description: "Test and validate" },
          ]}
          pricing={{
            startingFrom: "AED 3,000",
            includes: ["CRM connector", "Field mapping", "Sync automation", "30-day support"],
          }}
          faqs={[
            {
              question: "Which CRMs are supported?",
              answer: "Salesforce, HubSpot, Zoho, Pipedrive, and custom via API.",
            },
            { question: "Is sync real-time?", answer: "Yes, leads sync instantly as conversations happen." },
            {
              question: "Are conversations saved?",
              answer: "Yes, full conversation history attached to lead records.",
            },
          ]}
          relatedCategories={[
            { name: "Lead Qualification", href: "/services/whatsapp-marketing/lead-generation/qualification" },
            { name: "Lead Nurturing", href: "/services/whatsapp-marketing/lead-generation/nurturing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
