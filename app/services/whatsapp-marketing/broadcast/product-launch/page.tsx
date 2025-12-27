import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Product Launch Campaigns Dubai | Launch Announcements UAE | Creative Fusion LLC",
  description:
    "WhatsApp product launch campaigns in Dubai & UAE. New product announcements, pre-orders, and launch marketing for businesses in GCC.",
  keywords: ["whatsapp product launch dubai", "launch campaigns uae", "new product announcements gcc"],
}

export default function ProductLaunchPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Product Launches"
          description="Create buzz for new products with WhatsApp launch campaigns. Teasers, countdowns, exclusive previews, and launch-day announcements with maximum reach."
          heroImage="/whatsapp-product-launch-campaign.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "Build pre-launch hype",
            "Exclusive early access",
            "Countdown sequences",
            "Video teasers",
            "Pre-order links",
            "Launch day blast",
          ]}
          process={[
            { step: 1, title: "Planning", description: "Launch timeline creation" },
            { step: 2, title: "Content", description: "Teaser and reveal content" },
            { step: 3, title: "Sequence", description: "Set up drip campaign" },
            { step: 4, title: "Launch", description: "Execute launch sequence" },
          ]}
          pricing={{
            startingFrom: "AED 3,000",
            includes: ["Launch strategy", "Teaser sequence", "Launch blast", "Post-launch follow-up"],
          }}
          faqs={[
            {
              question: "How early to start teasers?",
              answer: "Typically 2-4 weeks before launch for maximum anticipation.",
            },
            {
              question: "Can I collect pre-orders?",
              answer: "Yes, integrate with your store for WhatsApp pre-order collection.",
            },
            {
              question: "What content works best?",
              answer: "Short videos, exclusive previews, and limited-time early access offers.",
            },
          ]}
          relatedCategories={[
            { name: "Promotional Campaigns", href: "/services/whatsapp-marketing/broadcast/promotional" },
            { name: "Event Invitations", href: "/services/whatsapp-marketing/broadcast/events" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
