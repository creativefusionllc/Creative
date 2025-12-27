import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Support Bot Dubai | Customer Service Bot UAE | Creative Fusion LLC",
  description:
    "WhatsApp customer support chatbots in Dubai & UAE. 24/7 automated support with human handoff for businesses in GCC.",
  keywords: ["whatsapp support bot dubai", "customer service bot uae", "support automation gcc"],
}

export default function SupportBotPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Support Bots"
          description="Automated customer support with intelligent ticket routing and seamless human handoff. Resolve common queries instantly while escalating complex issues."
          heroImage="/whatsapp-support-bot-customer-service.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "24/7 instant responses",
            "Ticket creation",
            "Human handoff",
            "FAQ automation",
            "Status updates",
            "CSAT collection",
          ]}
          process={[
            { step: 1, title: "Analysis", description: "Analyze support queries" },
            { step: 2, title: "Build", description: "Create support flows" },
            { step: 3, title: "Integrate", description: "Connect to helpdesk" },
            { step: 4, title: "Train", description: "Train support team" },
          ]}
          pricing={{
            startingFrom: "AED 4,500",
            includes: ["Support flows", "Ticket integration", "Human handoff", "CSAT surveys"],
          }}
          faqs={[
            {
              question: "Which helpdesks are supported?",
              answer: "Zendesk, Freshdesk, Intercom, and custom ticketing systems.",
            },
            {
              question: "How does handoff work?",
              answer: "Bot detects when human needed and transfers with full context to agents.",
            },
            {
              question: "Can it track ticket status?",
              answer: "Yes, customers can check ticket status and get updates via WhatsApp.",
            },
          ]}
          relatedCategories={[
            { name: "AI Chatbots", href: "/services/whatsapp-marketing/chatbot/ai-chatbot" },
            { name: "Survey Bots", href: "/services/whatsapp-marketing/chatbot/survey-bot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
