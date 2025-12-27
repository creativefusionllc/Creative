import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Lead Qualification Dubai | Lead Scoring UAE | Creative Fusion LLC",
  description:
    "Automated WhatsApp lead qualification in Dubai & UAE. Lead scoring and qualification bots for businesses in GCC.",
  keywords: ["whatsapp lead qualification dubai", "lead scoring uae", "qualification bots gcc"],
}

export default function QualificationPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Lead Qualification Bots"
          description="Automatically qualify leads through conversational WhatsApp flows. Collect information, score leads, and route hot prospects to your sales team instantly."
          heroImage="/whatsapp-lead-qualification-scoring.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Automated qualification",
            "Lead scoring",
            "BANT framework",
            "Hot lead alerts",
            "Sales routing",
            "Data enrichment",
          ]}
          process={[
            { step: 1, title: "Criteria", description: "Define qualification criteria" },
            { step: 2, title: "Build", description: "Create qualification flows" },
            { step: 3, title: "Score", description: "Set up lead scoring" },
            { step: 4, title: "Route", description: "Configure sales routing" },
          ]}
          pricing={{
            startingFrom: "AED 4,000",
            includes: ["Qualification flows", "Lead scoring", "CRM sync", "Sales alerts"],
          }}
          faqs={[
            {
              question: "What's BANT qualification?",
              answer: "Budget, Authority, Need, Timeline - standard B2B qualification framework.",
            },
            {
              question: "How are leads scored?",
              answer: "Points assigned based on responses, behavior, and engagement level.",
            },
            { question: "How fast are sales notified?", answer: "Instant WhatsApp/SMS alerts for high-scoring leads." },
          ]}
          relatedCategories={[
            { name: "Click-to-Chat", href: "/services/whatsapp-marketing/lead-generation/click-to-chat" },
            { name: "CRM Sync", href: "/services/whatsapp-marketing/lead-generation/crm-sync" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
