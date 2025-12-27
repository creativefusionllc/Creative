import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Re-engagement Campaigns Dubai | Win-back UAE | Creative Fusion LLC",
  description:
    "WhatsApp re-engagement and win-back campaigns in Dubai & UAE. Reactivate dormant customers and recover abandoned carts for businesses in GCC.",
  keywords: ["whatsapp re-engagement dubai", "win-back campaigns uae", "cart recovery gcc"],
}

export default function ReEngagementPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Re-engagement Campaigns"
          description="Win back inactive customers and recover abandoned carts with WhatsApp re-engagement campaigns. Personalized offers and reminders that drive action."
          heroImage="/whatsapp-re-engagement-winback.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "Recover lost customers",
            "Abandoned cart recovery",
            "Personalized offers",
            "Win-back sequences",
            "Lapsed customer reactivation",
            "High ROI campaigns",
          ]}
          process={[
            { step: 1, title: "Segment", description: "Identify inactive customers" },
            { step: 2, title: "Strategy", description: "Create win-back offers" },
            { step: 3, title: "Sequence", description: "Set up drip campaigns" },
            { step: 4, title: "Track", description: "Measure reactivations" },
          ]}
          pricing={{
            startingFrom: "AED 2,000",
            includes: ["Segmentation", "Win-back sequence", "Offer strategy", "Performance tracking"],
          }}
          faqs={[
            {
              question: "When to target inactive users?",
              answer: "Typically after 30-90 days of no activity, depending on your business.",
            },
            {
              question: "What offers work best?",
              answer: "Exclusive discounts, free shipping, or personalized product recommendations.",
            },
            {
              question: "What's typical recovery rate?",
              answer: "15-25% cart recovery and 10-15% customer reactivation rates.",
            },
          ]}
          relatedCategories={[
            { name: "Promotional", href: "/services/whatsapp-marketing/broadcast/promotional" },
            { name: "Transactional", href: "/services/whatsapp-marketing/broadcast/transactional" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
