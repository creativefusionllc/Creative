import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MessageSquare } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Communications Consultancy Dubai | Corporate PR UAE | Creative Fusion LLC",
  description:
    "Expert communications consultancy in Dubai UAE. Unified messaging, PR strategy, and corporate communications planning for effective stakeholder engagement.",
  keywords: [
    "communications consultancy dubai",
    "corporate PR uae",
    "PR strategy dubai",
    "corporate communications consulting",
  ],
}

export default function CommunicationsConsultancyPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.6"
        title="Communications Consultancy"
        subtitle="Unified Messaging"
        description="Unified messaging across channels, PR strategy, and corporate communications planning that builds trust and engages stakeholders effectively."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={MessageSquare}
        brandColor="orange"
        features={[
          {
            title: "PR Strategy",
            description: "Develop comprehensive public relations strategies.",
            icon: "📰",
            href: "/services/consulting/communications-consultancy/pr-strategy",
          },
          {
            title: "Crisis Communications",
            description: "Prepare and manage crisis communication plans.",
            icon: "🚨",
            href: "/services/consulting/communications-consultancy/crisis-communications",
          },
          {
            title: "Internal Communications",
            description: "Improve employee engagement and internal messaging.",
            icon: "👥",
            href: "/services/consulting/communications-consultancy/internal-communications",
          },
          {
            title: "Media Relations",
            description: "Build and manage media relationships effectively.",
            icon: "🎤",
            href: "/services/consulting/communications-consultancy/media-relations",
          },
          {
            title: "Stakeholder Engagement",
            description: "Develop strategies for key stakeholder communications.",
            icon: "🤝",
            href: "/services/consulting/communications-consultancy/stakeholder-engagement",
          },
          {
            title: "Content Strategy",
            description: "Plan and create compelling communication content.",
            icon: "✍️",
            href: "/services/consulting/communications-consultancy/content-strategy",
          },
        ]}
        process={[
          { number: "01", title: "Audit", description: "Evaluate current communications effectiveness." },
          { number: "02", title: "Strategy", description: "Develop comprehensive communications plan." },
          { number: "03", title: "Implementation", description: "Execute across all channels." },
          { number: "04", title: "Measurement", description: "Track impact and refine approach." },
        ]}
        benefits={[
          "Consistent brand messaging",
          "Improved stakeholder trust",
          "Effective crisis readiness",
          "Enhanced media presence",
          "Better employee engagement",
          "Strong reputation management",
        ]}
        relatedServices={[
          { title: "Marketing & PR", href: "/services/marketing-pr" },
          { title: "Brand Strategy", href: "/services/consulting/brand-strategy" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
