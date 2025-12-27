import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Ticketing System Dubai | Issue Tracking UAE | Creative Fusion LLC",
  description:
    "WhatsApp ticketing and issue tracking in Dubai & UAE. Integrated support ticketing for businesses in GCC.",
  keywords: ["whatsapp ticketing dubai", "issue tracking uae", "support tickets gcc"],
}

export default function TicketingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Ticket Management"
          description="WhatsApp-integrated ticketing system for organized issue tracking. Create, track, and resolve support tickets directly from WhatsApp conversations."
          heroImage="/whatsapp-ticketing-system-support.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "Auto ticket creation",
            "Status tracking",
            "Priority management",
            "SLA monitoring",
            "Agent assignment",
            "Resolution tracking",
          ]}
          process={[
            { step: 1, title: "Configure", description: "Set up ticketing rules" },
            { step: 2, title: "Integrate", description: "Connect to helpdesk" },
            { step: 3, title: "Automate", description: "Auto-create tickets" },
            { step: 4, title: "Track", description: "Monitor SLAs" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Helpdesk integration", "Auto ticket creation", "Status updates", "SLA dashboard"],
          }}
          faqs={[
            {
              question: "Which helpdesks are supported?",
              answer: "Zendesk, Freshdesk, Jira, and custom systems via API.",
            },
            {
              question: "Can customers check status?",
              answer: "Yes, customers can check ticket status via WhatsApp anytime.",
            },
            { question: "Are SLAs tracked?", answer: "Yes, full SLA monitoring with alerts for breaches." },
          ]}
          relatedCategories={[
            { name: "Live Chat", href: "/services/whatsapp-marketing/customer-support/live-chat" },
            { name: "Escalation", href: "/services/whatsapp-marketing/customer-support/escalation" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
