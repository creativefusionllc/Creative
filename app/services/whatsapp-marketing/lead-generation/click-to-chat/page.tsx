import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Click-to-WhatsApp Ads Dubai | CTWA Campaigns UAE | Creative Fusion LLC",
  description:
    "Click-to-WhatsApp advertising in Dubai & UAE. Facebook and Instagram ads that drive WhatsApp conversations for businesses in GCC.",
  keywords: ["click to whatsapp ads dubai", "ctwa campaigns uae", "whatsapp ads gcc"],
}

export default function ClickToChatPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Click-to-WhatsApp Ads"
          description="Drive high-intent leads directly to WhatsApp from Facebook and Instagram ads. Skip landing pages and start conversations instantly with interested prospects."
          heroImage="/click-to-whatsapp-ads-facebook.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Lead Generation", href: "/services/whatsapp-marketing/lead-generation" },
          }}
          benefits={[
            "Direct conversation start",
            "No landing page needed",
            "Higher conversion rates",
            "Lower cost per lead",
            "Instant engagement",
            "Full Meta integration",
          ]}
          process={[
            { step: 1, title: "Strategy", description: "Plan ad campaigns" },
            { step: 2, title: "Create", description: "Design ad creatives" },
            { step: 3, title: "Launch", description: "Deploy CTWA ads" },
            { step: 4, title: "Optimize", description: "A/B test and scale" },
          ]}
          pricing={{
            startingFrom: "AED 3,000/month",
            includes: ["Campaign setup", "Ad creatives", "Bot integration", "Weekly optimization"],
          }}
          faqs={[
            {
              question: "Which platforms support CTWA?",
              answer: "Facebook, Instagram, and Messenger - all Meta platforms.",
            },
            { question: "Is ad spend included?", answer: "No, ad budget is separate and managed based on your goals." },
            {
              question: "What's typical cost per lead?",
              answer: "30-50% lower than traditional landing page funnels.",
            },
          ]}
          relatedCategories={[
            { name: "Lead Qualification", href: "/services/whatsapp-marketing/lead-generation/qualification" },
            { name: "QR Campaigns", href: "/services/whatsapp-marketing/lead-generation/qr-campaigns" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
