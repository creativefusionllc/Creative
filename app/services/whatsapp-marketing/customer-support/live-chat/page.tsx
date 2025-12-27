import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Live Chat Support Dubai | Live Agents UAE | Creative Fusion LLC",
  description:
    "WhatsApp live chat support in Dubai & UAE. Real-time customer service with trained agents for businesses in GCC.",
  keywords: ["whatsapp live chat dubai", "live support agents uae", "real-time support gcc"],
}

export default function LiveChatPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Live Chat Support"
          description="Real-time customer support with live agents via WhatsApp. Instant human assistance for complex queries requiring personal attention and problem-solving."
          heroImage="/whatsapp-live-chat-support-agents.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "Real-time responses",
            "Human touch",
            "Complex issue handling",
            "Multi-agent support",
            "Conversation history",
            "Customer satisfaction",
          ]}
          process={[
            { step: 1, title: "Setup", description: "Configure team inbox" },
            { step: 2, title: "Training", description: "Train support agents" },
            { step: 3, title: "Routing", description: "Set up chat routing" },
            { step: 4, title: "Launch", description: "Go live with support" },
          ]}
          pricing={{
            startingFrom: "AED 3,500/month",
            includes: ["Team inbox", "5 agent seats", "Routing rules", "Performance reports"],
          }}
          faqs={[
            {
              question: "What are support hours?",
              answer: "Flexible - we can provide 24/7 or business hours coverage.",
            },
            {
              question: "Can I use my own team?",
              answer: "Yes, we set up the platform and train your team to use it.",
            },
            {
              question: "What's average response time?",
              answer: "Under 2 minutes for live chat during working hours.",
            },
          ]}
          relatedCategories={[
            { name: "Automated Support", href: "/services/whatsapp-marketing/customer-support/automated" },
            { name: "Ticketing", href: "/services/whatsapp-marketing/customer-support/ticketing" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
