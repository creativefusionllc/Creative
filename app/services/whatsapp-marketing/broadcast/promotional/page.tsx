import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Promotional Campaigns Dubai | Sales Broadcasts UAE | Creative Fusion LLC",
  description:
    "WhatsApp promotional campaign services in Dubai & UAE. Sales promotions, discount announcements, and special offers broadcast for businesses in GCC.",
  keywords: ["whatsapp promotional campaigns dubai", "sales broadcast uae", "discount announcements gcc"],
}

export default function PromotionalPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Promotional Campaigns"
          description="Drive sales with targeted WhatsApp promotions. Flash sales, seasonal discounts, exclusive offers, and limited-time deals delivered directly to customers."
          heroImage="/whatsapp-promotional-campaign-sales.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "Instant reach to customers",
            "Rich media promotions",
            "Trackable coupon codes",
            "High conversion rates",
            "Segment by purchase history",
            "A/B test offers",
          ]}
          process={[
            { step: 1, title: "Strategy", description: "Plan promotional calendar" },
            { step: 2, title: "Design", description: "Create promo content" },
            { step: 3, title: "Segment", description: "Target right audience" },
            { step: 4, title: "Send", description: "Broadcast and track" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["Campaign strategy", "Template design", "Audience targeting", "Performance report"],
          }}
          faqs={[
            {
              question: "How many messages can I send?",
              answer: "Depends on your API tier - from 1,000 to unlimited per day.",
            },
            {
              question: "Can I include images?",
              answer: "Yes, images, videos, documents, and interactive buttons supported.",
            },
            {
              question: "How to avoid being blocked?",
              answer: "We ensure compliance with WhatsApp policies and proper opt-in management.",
            },
          ]}
          relatedCategories={[
            { name: "Product Launches", href: "/services/whatsapp-marketing/broadcast/product-launch" },
            { name: "Re-engagement", href: "/services/whatsapp-marketing/broadcast/re-engagement" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
