import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Feedback Collection Dubai | CSAT Surveys UAE | Creative Fusion LLC",
  description: "WhatsApp feedback and CSAT collection in Dubai & UAE. Post-support surveys for businesses in GCC.",
  keywords: ["whatsapp feedback dubai", "csat surveys uae", "customer feedback gcc"],
}

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Feedback Collection"
          description="Automated post-support feedback collection via WhatsApp. CSAT surveys, NPS scores, and detailed feedback to improve customer experience continuously."
          heroImage="/whatsapp-feedback-csat-collection.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "High response rates",
            "CSAT tracking",
            "NPS measurement",
            "Agent performance",
            "Trend analysis",
            "Action triggers",
          ]}
          process={[
            { step: 1, title: "Design", description: "Create survey questions" },
            { step: 2, title: "Trigger", description: "Set up auto-send rules" },
            { step: 3, title: "Collect", description: "Gather responses" },
            { step: 4, title: "Analyze", description: "Dashboard and reports" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["Survey design", "Auto-triggers", "Dashboard", "Monthly reports"],
          }}
          faqs={[
            {
              question: "When are surveys sent?",
              answer: "Automatically after ticket resolution or conversation close.",
            },
            { question: "What's typical response rate?", answer: "60-80% via WhatsApp vs 10-20% via email surveys." },
            {
              question: "Can I act on negative feedback?",
              answer: "Yes, instant alerts for low scores trigger follow-up workflows.",
            },
          ]}
          relatedCategories={[
            { name: "FAQ Automation", href: "/services/whatsapp-marketing/customer-support/faq" },
            { name: "Escalation", href: "/services/whatsapp-marketing/customer-support/escalation" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
