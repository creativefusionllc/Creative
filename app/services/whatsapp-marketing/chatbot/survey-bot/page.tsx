import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Survey Bot Dubai | NPS Feedback Bot UAE | Creative Fusion LLC",
  description:
    "WhatsApp survey and feedback chatbots in Dubai & UAE. Automated NPS, CSAT, and customer feedback collection for businesses in GCC.",
  keywords: ["whatsapp survey bot dubai", "nps bot uae", "feedback chatbot gcc"],
}

export default function SurveyBotPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Survey Bots"
          description="Automated customer feedback collection via WhatsApp. NPS surveys, CSAT scores, and detailed feedback forms with high response rates."
          heroImage="/whatsapp-survey-bot-feedback.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "80%+ response rates",
            "NPS & CSAT tracking",
            "Real-time analytics",
            "Conditional logic",
            "Multi-language",
            "Auto follow-ups",
          ]}
          process={[
            { step: 1, title: "Design", description: "Design survey questions" },
            { step: 2, title: "Build", description: "Create survey flows" },
            { step: 3, title: "Trigger", description: "Set up triggers" },
            { step: 4, title: "Analyze", description: "Dashboard and reports" },
          ]}
          pricing={{
            startingFrom: "AED 2,500",
            includes: ["Survey design", "WhatsApp delivery", "Analytics dashboard", "30-day data"],
          }}
          faqs={[
            {
              question: "Why WhatsApp for surveys?",
              answer: "80%+ open rates vs 20% for email, much higher completion rates.",
            },
            {
              question: "Can it branch based on answers?",
              answer: "Yes, conditional logic shows different questions based on responses.",
            },
            {
              question: "Where is data stored?",
              answer: "Secure cloud storage with export to Excel, Google Sheets, or your CRM.",
            },
          ]}
          relatedCategories={[
            { name: "Support Bots", href: "/services/whatsapp-marketing/chatbot/support-bot" },
            { name: "AI Chatbots", href: "/services/whatsapp-marketing/chatbot/ai-chatbot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
