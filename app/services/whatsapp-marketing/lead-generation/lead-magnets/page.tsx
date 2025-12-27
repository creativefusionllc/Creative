import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Lead Magnets Dubai | Content Delivery UAE | Creative Fusion LLC",
  description:
    "WhatsApp lead magnet delivery in Dubai & UAE. Deliver ebooks, guides, and resources via WhatsApp for businesses in GCC.",
  keywords: ["whatsapp lead magnets dubai", "content delivery uae", "ebook delivery gcc"],
}

export default function LeadMagnetsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Lead Magnets"
          description="Deliver lead magnets via WhatsApp for higher engagement. Ebooks, guides, templates, and resources delivered instantly while capturing lead information."
          heroImage="/whatsapp-lead-magnet-delivery.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Instant delivery",
            "Higher engagement",
            "Contact capture",
            "Follow-up enabled",
            "Rich media support",
            "Tracking analytics",
          ]}
          process={[
            { step: 1, title: "Create", description: "Create lead magnet content" },
            { step: 2, title: "Setup", description: "Configure delivery bot" },
            { step: 3, title: "Promote", description: "Drive traffic to opt-in" },
            { step: 4, title: "Nurture", description: "Follow-up sequences" },
          ]}
          pricing={{
            startingFrom: "AED 2,000",
            includes: ["Delivery bot", "Opt-in flows", "Basic nurturing", "Analytics"],
          }}
          faqs={[
            {
              question: "What content can be delivered?",
              answer: "PDFs, images, videos, documents - any WhatsApp-supported media.",
            },
            { question: "Is it GDPR compliant?", answer: "Yes, includes opt-in confirmation and consent tracking." },
            { question: "Can I track downloads?", answer: "Yes, full tracking of delivery, opens, and engagement." },
          ]}
          relatedCategories={[
            { name: "Lead Nurturing", href: "/services/whatsapp-marketing/lead-generation/nurturing" },
            { name: "QR Campaigns", href: "/services/whatsapp-marketing/lead-generation/qr-campaigns" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
