import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Negotiation Skills Training Dubai | Sales Negotiation UAE GCC",
  description:
    "Professional negotiation skills training in Dubai, UAE & GCC. Deal negotiation, pricing discussions, and closing techniques for sales teams.",
  keywords: ["negotiation training dubai", "sales negotiation uae", "deal closing gcc", "negotiation skills dubai"],
}

export default function NegotiationPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Negotiation Skills"
          subtitle="Win-Win Deal Making"
          description="Master the art of negotiation with professional training in Dubai, UAE & GCC. Our programs develop skills to negotiate better deals while maintaining relationships."
          heroImage="/negotiation-skills-training-dubai.jpg"
          benefits={[
            "Negotiation frameworks",
            "BATNA development",
            "Pricing and discount strategies",
            "Concession planning",
            "Cultural negotiation awareness",
            "Closing techniques",
          ]}
          process={[
            { step: 1, title: "Theory", description: "Negotiation principles and frameworks" },
            { step: 2, title: "Practice", description: "Negotiation simulations" },
            { step: 3, title: "Feedback", description: "Video review and coaching" },
            { step: 4, title: "Application", description: "Real-world implementation plan" },
          ]}
          pricing={{
            startingFrom: "AED 1,800/person",
            includes: ["2-day workshop", "Simulations", "Video review", "Materials"],
          }}
          faqs={[
            {
              question: "Do you cover cultural aspects of negotiation?",
              answer:
                "Yes, we include modules on negotiating in the Middle East context with diverse cultural considerations.",
            },
            {
              question: "Can this be combined with other training?",
              answer: "Yes, negotiation skills can be bundled with advanced selling or sales leadership programs.",
            },
          ]}
          relatedCategories={[
            { title: "Advanced Selling", href: "/services/sales-retail/sales-training/advanced" },
            { title: "Sales Fundamentals", href: "/services/sales-retail/sales-training/fundamentals" },
            { title: "Sales Leadership", href: "/services/sales-retail/sales-training/leadership" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
