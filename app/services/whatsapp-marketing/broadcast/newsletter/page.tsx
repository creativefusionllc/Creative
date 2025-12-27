import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Newsletter Dubai | Content Updates UAE | Creative Fusion LLC",
  description:
    "WhatsApp newsletter services in Dubai & UAE. Regular content updates, industry news, and subscriber engagement for businesses in GCC.",
  keywords: ["whatsapp newsletter dubai", "content updates uae", "whatsapp subscribers gcc"],
}

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Newsletter Campaigns"
          description="Engage subscribers with regular WhatsApp newsletters. Industry updates, tips, exclusive content, and community building with high engagement rates."
          heroImage="/whatsapp-newsletter-content-updates.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "98% read rates",
            "Rich media content",
            "Subscriber management",
            "Content scheduling",
            "Engagement tracking",
            "Opt-out management",
          ]}
          process={[
            { step: 1, title: "Strategy", description: "Content calendar planning" },
            { step: 2, title: "Create", description: "Newsletter content creation" },
            { step: 3, title: "Schedule", description: "Automate sending" },
            { step: 4, title: "Analyze", description: "Track engagement" },
          ]}
          pricing={{
            startingFrom: "AED 2,000/month",
            includes: ["4 newsletters", "Content creation", "Subscriber management", "Analytics"],
          }}
          faqs={[
            {
              question: "How often should I send?",
              answer: "Weekly or bi-weekly maintains engagement without overwhelming subscribers.",
            },
            {
              question: "What content works best?",
              answer: "Mix of tips, news, behind-the-scenes, and exclusive offers.",
            },
            {
              question: "How to grow subscribers?",
              answer: "Website opt-in, QR codes, social media, and in-store signups.",
            },
          ]}
          relatedCategories={[
            { name: "Events", href: "/services/whatsapp-marketing/broadcast/events" },
            { name: "Transactional Updates", href: "/services/whatsapp-marketing/broadcast/transactional" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
