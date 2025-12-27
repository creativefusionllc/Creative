import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Multi-Agent Inbox Dubai | Team Inbox UAE | Creative Fusion LLC",
  description:
    "WhatsApp multi-agent inbox setup in Dubai & UAE. Team inbox, agent assignment, and collaborative customer support solutions for businesses in GCC.",
  keywords: ["whatsapp multi-agent dubai", "team inbox uae", "whatsapp support team gcc"],
}

export default function MultiAgentPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Multi-Agent Setup"
          description="Enable multiple team members to handle WhatsApp conversations from a shared inbox. Agent assignment, queues, and performance tracking for customer support teams."
          heroImage="/whatsapp-multi-agent-team-inbox.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Business API", href: "/services/whatsapp-marketing/business-api" },
          }}
          benefits={[
            "Shared team inbox",
            "Auto agent assignment",
            "Queue management",
            "Canned responses",
            "Internal notes",
            "Performance metrics",
          ]}
          process={[
            { step: 1, title: "Setup", description: "Configure team inbox platform" },
            { step: 2, title: "Agents", description: "Add team members and roles" },
            { step: 3, title: "Rules", description: "Set up routing and assignment" },
            { step: 4, title: "Launch", description: "Go live with team support" },
          ]}
          pricing={{
            startingFrom: "AED 2,000",
            includes: ["Inbox setup", "5 agent seats", "Routing rules", "Canned responses"],
          }}
          faqs={[
            {
              question: "How many agents can use it?",
              answer: "Unlimited agents supported - pricing scales with number of seats needed.",
            },
            {
              question: "Can managers monitor conversations?",
              answer: "Yes, supervisors can view all conversations and agent performance in real-time.",
            },
            {
              question: "Is there mobile access?",
              answer: "Yes, agents can respond from mobile apps as well as desktop.",
            },
          ]}
          relatedCategories={[
            { name: "CRM Integration", href: "/services/whatsapp-marketing/business-api/crm-integration" },
            { name: "Analytics Dashboard", href: "/services/whatsapp-marketing/business-api/analytics" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
