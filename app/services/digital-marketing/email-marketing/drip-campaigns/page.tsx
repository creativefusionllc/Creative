import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Drip Campaign Services Dubai | Email Sequences | Creative Fusion",
  description:
    "Drip campaign services in Dubai. Automated email sequences that nurture leads, onboard customers, and drive conversions over time.",
}

export default function DripCampaignsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Drip Campaigns"
        subtitle="Automated Sequences"
        description="Nurture leads automatically with strategic drip campaigns. We create email sequences that guide prospects through the buyer journey."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        benefits={[
          "Lead nurturing",
          "Onboarding sequences",
          "Re-engagement",
          "Sales follow-up",
          "Customer retention",
          "Trigger-based emails",
        ]}
        process={[
          { step: "01", title: "Journey Mapping", description: "Map customer journey" },
          { step: "02", title: "Sequence Design", description: "Plan email flow" },
          { step: "03", title: "Content Creation", description: "Write compelling emails" },
          { step: "04", title: "Automation Setup", description: "Configure and launch" },
        ]}
        pricing={{ startingAt: "AED 3,000", unit: "per sequence" }}
        relatedCategories={[
          { name: "Email Automation", href: "/services/digital-marketing/email-marketing/automation" },
          { name: "Newsletters", href: "/services/digital-marketing/email-marketing/newsletters" },
          { name: "CRM Solutions", href: "/services/software-apps/crm-solutions" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
