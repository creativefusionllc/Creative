import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp CRM Integration Dubai | Salesforce HubSpot UAE | Creative Fusion LLC",
  description:
    "WhatsApp CRM integration services in Dubai & UAE. Connect WhatsApp with Salesforce, HubSpot, Zoho, and other CRMs for unified customer communication.",
  keywords: ["whatsapp crm integration dubai", "salesforce whatsapp uae", "hubspot whatsapp gcc"],
}

export default function CrmIntegrationPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="CRM Integration"
          description="Seamlessly connect WhatsApp with your CRM for unified customer communication. Integrate with Salesforce, HubSpot, Zoho, and custom CRMs in Dubai, UAE & GCC."
          heroImage="/whatsapp-crm-integration-dashboard.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "Unified customer view",
            "Auto-sync conversations",
            "Lead capture automation",
            "Contact enrichment",
            "Activity tracking",
            "Custom field mapping",
          ]}
          process={[
            { step: 1, title: "Mapping", description: "Map WhatsApp fields to CRM" },
            { step: 2, title: "Integration", description: "API connection setup" },
            { step: 3, title: "Automation", description: "Workflow configuration" },
            { step: 4, title: "Training", description: "Team training and handover" },
          ]}
          pricing={{
            startingFrom: "AED 3,500",
            includes: ["CRM connector", "Field mapping", "Workflow setup", "Training session"],
          }}
          faqs={[
            {
              question: "Which CRMs are supported?",
              answer: "Salesforce, HubSpot, Zoho, Pipedrive, Microsoft Dynamics, and custom CRMs via API.",
            },
            {
              question: "Can it sync historical data?",
              answer: "Yes, we can import historical WhatsApp conversations into your CRM.",
            },
            {
              question: "Is real-time sync possible?",
              answer: "Yes, conversations sync in real-time with webhook-based integration.",
            },
          ]}
          relatedCategories={[
            { name: "Multi-Agent Setup", href: "/services/whatsapp-marketing/business-api/multi-agent" },
            { name: "Analytics Dashboard", href: "/services/whatsapp-marketing/business-api/analytics" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
