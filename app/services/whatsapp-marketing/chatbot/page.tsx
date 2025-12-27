import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Bot } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Chatbot Development Dubai | AI Chatbot UAE | Creative Fusion LLC",
  description:
    "Professional WhatsApp chatbot development in Dubai & UAE. AI-powered chatbots for customer support, lead generation, and sales automation in GCC.",
  keywords: ["whatsapp chatbot dubai", "ai chatbot uae", "chatbot development gcc", "whatsapp automation dubai"],
}

export default function ChatbotPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Chatbot Development"
          subtitle="WhatsApp Marketing"
          description="Intelligent AI-powered WhatsApp chatbots for 24/7 customer engagement. Automate support, qualify leads, and drive sales with conversational AI in Dubai, UAE & GCC."
          heroImage="/whatsapp-chatbot-ai-development.jpg"
          icon={Bot}
          features={[
            {
              title: "AI Chatbots",
              description: "GPT-powered intelligent chatbots with natural language understanding",
              href: "/services/whatsapp-marketing/chatbot/ai-chatbot",
            },
            {
              title: "Rule-Based Bots",
              description: "Menu-driven chatbots for structured customer interactions",
              href: "/services/whatsapp-marketing/chatbot/rule-based",
            },
            {
              title: "Sales Bots",
              description: "Automated product recommendations and order processing",
              href: "/services/whatsapp-marketing/chatbot/sales-bot",
            },
            {
              title: "Support Bots",
              description: "Customer service automation with human handoff",
              href: "/services/whatsapp-marketing/chatbot/support-bot",
            },
            {
              title: "Booking Bots",
              description: "Appointment scheduling and reservation management",
              href: "/services/whatsapp-marketing/chatbot/booking-bot",
            },
            {
              title: "Survey Bots",
              description: "Automated feedback collection and NPS surveys",
              href: "/services/whatsapp-marketing/chatbot/survey-bot",
            },
          ]}
          processSteps={[
            { title: "Discovery", description: "Understand your use cases and conversation flows" },
            { title: "Design", description: "Create conversation scripts and bot personality" },
            { title: "Development", description: "Build and train the chatbot with your content" },
            { title: "Deployment", description: "Launch, test, and optimize performance" },
          ]}
          benefits={[
            "24/7 instant customer responses",
            "80% reduction in support tickets",
            "Natural language understanding",
            "Seamless human handoff when needed",
            "Multi-language support (Arabic & English)",
            "Continuous learning and improvement",
          ]}
          relatedServices={[
            { title: "Business API", href: "/services/whatsapp-marketing/business-api" },
            { title: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
            { title: "Software & Apps", href: "/services/software-apps" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
