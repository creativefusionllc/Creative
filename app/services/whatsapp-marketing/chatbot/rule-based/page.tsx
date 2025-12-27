import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Rule-Based WhatsApp Chatbot Dubai | Menu Bot UAE | Creative Fusion LLC",
  description:
    "Rule-based WhatsApp chatbots in Dubai & UAE. Menu-driven, predictable conversation flows for structured customer interactions in GCC businesses.",
  keywords: ["rule based chatbot dubai", "menu chatbot uae", "structured bot gcc"],
}

export default function RuleBasedPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Rule-Based Bots"
          description="Menu-driven chatbots with structured conversation flows. Perfect for FAQs, service selection, and guided customer journeys with predictable outcomes."
          heroImage="/rule-based-chatbot-menu-flow.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "Predictable responses",
            "Easy to maintain",
            "Lower cost solution",
            "Quick deployment",
            "No AI training needed",
            "Perfect for FAQs",
          ]}
          process={[
            { step: 1, title: "Mapping", description: "Map conversation flows" },
            { step: 2, title: "Build", description: "Create menu structures" },
            { step: 3, title: "Test", description: "Test all pathways" },
            { step: 4, title: "Deploy", description: "Launch and monitor" },
          ]}
          pricing={{
            startingFrom: "AED 3,000",
            includes: ["Flow design", "Up to 50 responses", "WhatsApp integration", "30-day support"],
          }}
          faqs={[
            {
              question: "How is it different from AI bots?",
              answer: "Rule-based follows set scripts; AI understands natural language and context.",
            },
            {
              question: "Can I update responses myself?",
              answer: "Yes, we provide a simple CMS to update bot responses.",
            },
            { question: "What happens for unknown queries?", answer: "Redirect to human agent or fallback response." },
          ]}
          relatedCategories={[
            { name: "AI Chatbots", href: "/services/whatsapp-marketing/chatbot/ai-chatbot" },
            { name: "Sales Bots", href: "/services/whatsapp-marketing/chatbot/sales-bot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
