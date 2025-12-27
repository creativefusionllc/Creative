import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Escalation Management Dubai | Support Routing UAE | Creative Fusion LLC",
  description:
    "WhatsApp escalation and routing management in Dubai & UAE. Smart support workflows for businesses in GCC.",
  keywords: ["whatsapp escalation dubai", "support routing uae", "escalation management gcc"],
}

export default function EscalationPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Escalation Management"
          description="Smart routing and escalation workflows for WhatsApp support. Ensure complex issues reach the right team quickly with automated escalation rules."
          heroImage="/whatsapp-escalation-routing-management.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "Smart routing",
            "Priority escalation",
            "Skill-based assignment",
            "SLA compliance",
            "Manager alerts",
            "Audit trail",
          ]}
          process={[
            { step: 1, title: "Map", description: "Map support structure" },
            { step: 2, title: "Rules", description: "Define escalation rules" },
            { step: 3, title: "Setup", description: "Configure workflows" },
            { step: 4, title: "Monitor", description: "Track escalations" },
          ]}
          pricing={{
            startingFrom: "AED 2,000",
            includes: ["Workflow design", "Escalation rules", "Manager alerts", "Reporting"],
          }}
          faqs={[
            {
              question: "What triggers escalation?",
              answer: "Configurable - keywords, sentiment, time limits, or customer request.",
            },
            {
              question: "Can I have multiple levels?",
              answer: "Yes, multi-tier escalation to different teams and managers.",
            },
            {
              question: "Are managers notified?",
              answer: "Yes, instant WhatsApp, email, or SMS alerts for escalations.",
            },
          ]}
          relatedCategories={[
            { name: "Ticketing", href: "/services/whatsapp-marketing/customer-support/ticketing" },
            { name: "Live Chat", href: "/services/whatsapp-marketing/customer-support/live-chat" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
