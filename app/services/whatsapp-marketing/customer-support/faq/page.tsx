import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp FAQ Automation Dubai | Instant Answers UAE | Creative Fusion LLC",
  description: "WhatsApp FAQ automation in Dubai & UAE. Instant answers to common questions for businesses in GCC.",
  keywords: ["whatsapp faq dubai", "instant answers uae", "automated faq gcc"],
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="FAQ Automation"
          description="Instant answers to frequently asked questions via WhatsApp. Reduce support load by automatically handling common queries with accurate, consistent responses."
          heroImage="/whatsapp-faq-automation-instant.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Customer Support", href: "/services/whatsapp-marketing/customer-support" },
          }}
          benefits={[
            "Instant FAQ answers",
            "24/7 availability",
            "Consistent responses",
            "Easy updates",
            "Multi-language",
            "Analytics tracking",
          ]}
          process={[
            { step: 1, title: "Collect", description: "Gather common questions" },
            { step: 2, title: "Create", description: "Write FAQ responses" },
            { step: 3, title: "Train", description: "Train recognition" },
            { step: 4, title: "Deploy", description: "Launch FAQ bot" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["FAQ analysis", "50 Q&A pairs", "Keyword training", "CMS access"],
          }}
          faqs={[
            {
              question: "How many FAQs can I add?",
              answer: "Unlimited - pricing includes initial 50, easy to add more.",
            },
            { question: "Can I update answers myself?", answer: "Yes, simple CMS to update FAQ content anytime." },
            {
              question: "Does it understand variations?",
              answer: "Yes, AI understands different ways of asking same question.",
            },
          ]}
          relatedCategories={[
            { name: "Automated Support", href: "/services/whatsapp-marketing/customer-support/automated" },
            { name: "Feedback", href: "/services/whatsapp-marketing/customer-support/feedback" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
