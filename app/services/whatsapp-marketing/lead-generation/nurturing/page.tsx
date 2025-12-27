import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Lead Nurturing Dubai | Drip Campaigns UAE | Creative Fusion LLC",
  description: "WhatsApp lead nurturing campaigns in Dubai & UAE. Automated follow-up sequences for businesses in GCC.",
  keywords: ["whatsapp lead nurturing dubai", "drip campaigns uae", "follow-up sequences gcc"],
}

export default function NurturingPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Lead Nurturing"
          description="Automated WhatsApp follow-up sequences to nurture leads to conversion. Drip campaigns, educational content, and timely follow-ups that convert."
          heroImage="/whatsapp-lead-nurturing-drip.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Automated follow-ups",
            "Drip sequences",
            "Personalization",
            "Behavior triggers",
            "Conversion tracking",
            "A/B testing",
          ]}
          process={[
            { step: 1, title: "Map", description: "Map buyer journey" },
            { step: 2, title: "Content", description: "Create nurture content" },
            { step: 3, title: "Build", description: "Build drip sequences" },
            { step: 4, title: "Optimize", description: "Test and optimize" },
          ]}
          pricing={{
            startingFrom: "AED 3,500",
            includes: ["Journey mapping", "5 sequence messages", "Triggers setup", "Analytics"],
          }}
          faqs={[
            {
              question: "How many messages in a sequence?",
              answer: "Typically 3-7 messages over days or weeks, based on your sales cycle.",
            },
            {
              question: "Can I personalize messages?",
              answer: "Yes, full personalization with lead data and behavior.",
            },
            {
              question: "What triggers follow-ups?",
              answer: "Time-based, behavior-based, or engagement-based triggers.",
            },
          ]}
          relatedCategories={[
            { name: "Lead Magnets", href: "/services/whatsapp-marketing/lead-generation/lead-magnets" },
            { name: "CRM Sync", href: "/services/whatsapp-marketing/lead-generation/crm-sync" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
