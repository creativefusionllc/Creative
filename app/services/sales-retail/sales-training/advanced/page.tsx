import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Advanced Sales Training Dubai | Professional Selling UAE GCC",
  description:
    "Advanced sales training programs in Dubai, UAE & GCC. Consultative selling, complex sales, and advanced techniques for experienced sales professionals.",
  keywords: [
    "advanced sales training dubai",
    "professional selling uae",
    "consultative selling gcc",
    "complex sales dubai",
  ],
}

export default function AdvancedPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Advanced Selling"
          subtitle="Professional Sales Excellence"
          description="Elevate your sales team with advanced training programs in Dubai, UAE & GCC. Consultative selling, complex sales strategies, and techniques for top performers."
          heroImage="/advanced-sales-training-dubai.jpg"
          benefits={[
            "Consultative selling approach",
            "Complex sales navigation",
            "Multi-stakeholder selling",
            "Value proposition development",
            "Strategic account planning",
            "Executive-level selling",
          ]}
          process={[
            { step: 1, title: "Skill Assessment", description: "Identifying areas for development" },
            { step: 2, title: "Advanced Workshop", description: "Intensive training sessions" },
            { step: 3, title: "Live Coaching", description: "Real deal coaching and support" },
            { step: 4, title: "Performance Review", description: "Measuring skill application" },
          ]}
          pricing={{
            startingFrom: "AED 2,500/person",
            includes: ["3-day workshop", "Coaching session", "Assessment", "Resources"],
          }}
          faqs={[
            {
              question: "What experience level is required?",
              answer:
                "Participants should have 2+ years of sales experience and be handling complex or enterprise sales.",
            },
            {
              question: "Do you offer ongoing coaching?",
              answer: "Yes, we offer follow-up coaching packages to reinforce learning and address real situations.",
            },
          ]}
          relatedCategories={[
            { title: "Negotiation Skills", href: "/services/sales-retail/sales-training/negotiation" },
            { title: "Sales Leadership", href: "/services/sales-retail/sales-training/leadership" },
            { title: "Sales Fundamentals", href: "/services/sales-retail/sales-training/fundamentals" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
