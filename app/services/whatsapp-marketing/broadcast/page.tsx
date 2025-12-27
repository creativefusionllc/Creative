import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Radio } from "lucide-react"

export const metadata: Metadata = {
  title: "WhatsApp Broadcast Campaigns Dubai | Mass Messaging UAE | Creative Fusion LLC",
  description:
    "WhatsApp broadcast campaign services in Dubai & UAE. Targeted mass messaging, promotional campaigns, and bulk WhatsApp marketing for businesses in GCC.",
  keywords: ["whatsapp broadcast dubai", "mass messaging uae", "bulk whatsapp gcc", "whatsapp campaigns dubai"],
}

export default function BroadcastPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Broadcast Campaigns"
          subtitle="WhatsApp Marketing"
          description="Reach thousands of customers instantly with WhatsApp broadcast campaigns. Promotional messages, product launches, and targeted marketing with 98% open rates."
          heroImage="/whatsapp-broadcast-campaign-marketing.jpg"
          icon={Radio}
          features={[
            {
              title: "Promotional Campaigns",
              description: "Sales promotions, discounts, and special offers broadcast",
              href: "/services/whatsapp-marketing/broadcast/promotional",
            },
            {
              title: "Product Launches",
              description: "New product announcements and launch campaigns",
              href: "/services/whatsapp-marketing/broadcast/product-launch",
            },
            {
              title: "Event Invitations",
              description: "Event announcements and RSVP collection",
              href: "/services/whatsapp-marketing/broadcast/events",
            },
            {
              title: "Newsletter Campaigns",
              description: "Regular content updates and newsletter distribution",
              href: "/services/whatsapp-marketing/broadcast/newsletter",
            },
            {
              title: "Transactional Updates",
              description: "Order confirmations, shipping updates, and receipts",
              href: "/services/whatsapp-marketing/broadcast/transactional",
            },
            {
              title: "Re-engagement Campaigns",
              description: "Win-back campaigns for inactive customers",
              href: "/services/whatsapp-marketing/broadcast/re-engagement",
            },
          ]}
          processSteps={[
            { title: "Segmentation", description: "Segment your audience for targeted messaging" },
            { title: "Content", description: "Create compelling message templates" },
            { title: "Approval", description: "Get templates approved by Meta" },
            { title: "Broadcast", description: "Send and track campaign performance" },
          ]}
          benefits={[
            "98% open rate guaranteed",
            "Rich media support (images, videos)",
            "Audience segmentation",
            "A/B testing capabilities",
            "Detailed analytics and ROI tracking",
            "Compliance with WhatsApp policies",
          ]}
          relatedServices={[
            { title: "Business API", href: "/services/whatsapp-marketing/business-api" },
            { title: "Email Marketing", href: "/services/digital-marketing/email-marketing" },
            { title: "Social Media Marketing", href: "/services/digital-marketing/social-media" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
