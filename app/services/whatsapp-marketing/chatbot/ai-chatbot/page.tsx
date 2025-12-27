import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "AI WhatsApp Chatbot Dubai | GPT Chatbot UAE | Creative Fusion LLC",
  description:
    "AI-powered WhatsApp chatbots with GPT in Dubai & UAE. Natural language understanding, contextual responses, and intelligent automation for businesses in GCC.",
  keywords: ["ai chatbot dubai", "gpt whatsapp bot uae", "intelligent chatbot gcc"],
}

export default function AiChatbotPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="AI Chatbots"
          description="Advanced AI-powered chatbots using GPT and natural language processing. Understand context, handle complex queries, and provide human-like responses 24/7."
          heroImage="/ai-chatbot-gpt-whatsapp-development.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "GPT-powered responses",
            "Context understanding",
            "Learning from interactions",
            "Multi-language support",
            "Sentiment analysis",
            "Complex query handling",
          ]}
          process={[
            { step: 1, title: "Training", description: "Train AI on your business data" },
            { step: 2, title: "Integration", description: "Connect to WhatsApp API" },
            { step: 3, title: "Testing", description: "Test and refine responses" },
            { step: 4, title: "Launch", description: "Deploy with monitoring" },
          ]}
          pricing={{
            startingFrom: "AED 8,000",
            includes: ["AI model training", "WhatsApp integration", "Arabic & English", "60-day optimization"],
          }}
          faqs={[
            {
              question: "How accurate is the AI?",
              answer: "90%+ accuracy after training on your business data, continuously improving.",
            },
            {
              question: "Can it understand Arabic?",
              answer: "Yes, fully supports Arabic, English, and mixed conversations.",
            },
            {
              question: "What if AI can't answer?",
              answer: "Automatic handoff to human agents with full conversation context.",
            },
          ]}
          relatedCategories={[
            { name: "Rule-Based Bots", href: "/services/whatsapp-marketing/chatbot/rule-based" },
            { name: "Support Bots", href: "/services/whatsapp-marketing/chatbot/support-bot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
