import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp QR Code Campaigns Dubai | Offline Lead Capture UAE | Creative Fusion LLC",
  description: "WhatsApp QR code lead capture in Dubai & UAE. Offline-to-online marketing for businesses in GCC.",
  keywords: ["whatsapp qr codes dubai", "offline lead capture uae", "qr marketing gcc"],
}

export default function QrCampaignsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="QR Code Campaigns"
          description="Bridge offline and online with WhatsApp QR codes. Capture leads from print materials, events, stores, and packaging with scannable WhatsApp links."
          heroImage="/whatsapp-qr-code-campaign.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Offline to online",
            "Easy lead capture",
            "Trackable campaigns",
            "Multiple QR codes",
            "Custom landing flows",
            "Attribution tracking",
          ]}
          process={[
            { step: 1, title: "Design", description: "Design QR code campaigns" },
            { step: 2, title: "Generate", description: "Create trackable QR codes" },
            { step: 3, title: "Deploy", description: "Place in print materials" },
            { step: 4, title: "Track", description: "Monitor scans and leads" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["5 unique QR codes", "Custom bot flows", "Analytics dashboard", "Attribution tracking"],
          }}
          faqs={[
            {
              question: "Can I track different locations?",
              answer: "Yes, unique QR codes for each location/campaign for attribution.",
            },
            {
              question: "What happens when scanned?",
              answer: "Opens WhatsApp with pre-filled message and starts your bot flow.",
            },
            { question: "Can QR codes be branded?", answer: "Yes, custom colors and logo in the center of QR code." },
          ]}
          relatedCategories={[
            { name: "Click-to-Chat", href: "/services/whatsapp-marketing/lead-generation/click-to-chat" },
            { name: "Lead Magnets", href: "/services/whatsapp-marketing/lead-generation/lead-magnets" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
