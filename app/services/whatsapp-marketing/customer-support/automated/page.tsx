import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Automated WhatsApp Support Dubai | AI Support UAE | Creative Fusion LLC",
  description:
    "Automated WhatsApp customer support in Dubai & UAE. AI-powered responses and chatbots for 24/7 service in GCC.",
  keywords: ["automated whatsapp support dubai", "ai support uae", "chatbot support gcc"],
}

export default function AutomatedPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Automated Support"
          description="AI-powered automated customer support via WhatsApp. Handle common queries instantly with intelligent chatbots while routing complex issues to humans."
          heroImage="/automated-whatsapp-support-ai.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "24/7 availability",
            "Instant responses",
            "Cost reduction",
            "Scalable support",
            "Consistent answers",
            "Human handoff",
          ]}
          process={[
            { step: 1, title: "Analyze", description: "Analyze common queries" },
            { step: 2, title: "Build", description: "Create automation flows" },
            { step: 3, title: "Train", description: "Train AI on your data" },
            { step: 4, title: "Deploy", description: "Launch with monitoring" },
          ]}
          pricing={{
            startingFrom: "AED 4,000",
            includes: ["Query analysis", "Automation flows", "AI training", "Human handoff setup"],
          }}
          faqs={[
            {
              question: "What percentage can be automated?",
              answer: "Typically 60-80% of support queries can be automated.",
            },
            {
              question: "When does it transfer to human?",
              answer: "Configurable triggers - sentiment, keywords, or customer request.",
            },
            { question: "Can it learn over time?", answer: "Yes, AI improves from interactions and feedback." },
          ]}
          relatedCategories={[
            { name: "Live Chat", href: "/services/whatsapp-marketing/customer-support/live-chat" },
            { name: "FAQ Automation", href: "/services/whatsapp-marketing/customer-support/faq" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
