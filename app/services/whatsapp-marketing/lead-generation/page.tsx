import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Target } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Lead Generation Dubai | Lead Capture UAE | Creative Fusion LLC",
  description:
    "WhatsApp lead generation services in Dubai & UAE. Automated lead capture and qualification for businesses in GCC.",
  keywords: ["whatsapp lead generation dubai", "lead capture uae", "lead qualification gcc"],
}

export default function LeadGenerationPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Lead Generation"
          subtitle="WhatsApp Marketing"
          description="Capture and qualify leads automatically through WhatsApp. Click-to-WhatsApp ads, lead bots, and automated qualification for higher conversion rates."
          heroImage="/whatsapp-lead-generation-capture.jpg"
          icon={Target}
          features={[
            {
              title: "Click-to-WhatsApp Ads",
              description: "Facebook and Instagram ads that open WhatsApp directly",
              href: "/services/whatsapp-marketing/lead-generation/click-to-chat",
            },
            {
              title: "Lead Qualification Bots",
              description: "Automated lead scoring and qualification via conversation",
              href: "/services/whatsapp-marketing/lead-generation/qualification",
            },
            {
              title: "Lead Magnets",
              description: "Deliver lead magnets and collect contact info via WhatsApp",
              href: "/services/whatsapp-marketing/lead-generation/lead-magnets",
            },
            {
              title: "CRM Sync",
              description: "Automatic lead sync to your CRM with full conversation history",
              href: "/services/whatsapp-marketing/lead-generation/crm-sync",
            },
            {
              title: "Lead Nurturing",
              description: "Automated follow-up sequences to nurture leads to conversion",
              href: "/services/whatsapp-marketing/lead-generation/nurturing",
            },
            {
              title: "QR Code Campaigns",
              description: "Offline-to-online lead capture with WhatsApp QR codes",
              href: "/services/whatsapp-marketing/lead-generation/qr-campaigns",
            },
          ]}
          processSteps={[
            { title: "Strategy", description: "Define lead capture strategy and qualification criteria" },
            { title: "Setup", description: "Create lead bots and capture mechanisms" },
            { title: "Integration", description: "Connect to CRM and marketing tools" },
            { title: "Optimize", description: "A/B test and optimize conversion rates" },
          ]}
          benefits={[
            "3x higher conversion than forms",
            "Instant lead engagement",
            "Automated qualification",
            "Rich lead data collection",
            "CRM auto-sync",
            "Lead scoring and prioritization",
          ]}
          relatedServices={[
            { title: "Digital Marketing", href: "/services/digital-marketing" },
            { title: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
            { title: "CRM Solutions", href: "/services/software-apps/crm-solutions" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
