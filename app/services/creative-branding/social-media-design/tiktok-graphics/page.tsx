export const metadata = {
  title: "TikTok Graphics Design | Creative Fusion Dubai",
  description:
    "Professional TikTok graphics design including profile images, video covers, and TikTok ad creatives. Creative Fusion creates viral-ready TikTok visuals in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function TikTokGraphicsPage() {
  return (
    <ServicePageTemplate
      title="TikTok Graphics Design"
      description="Design scroll-stopping TikTok graphics that capture Gen Z attention and drive viral engagement with trend-aware visual content."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="tiktok"
      features={[
        "TikTok profile picture design",
        "Video thumbnail graphics",
        "TikTok ad creatives",
        "Branded effects graphics",
        "Sticker designs",
        "Text overlay templates",
        "Transition graphics",
        "Challenge graphics",
        "Live stream covers",
        "TikTok Shop graphics",
      ]}
      benefits={[
        "Trend-aware designs",
        "Viral-optimized visuals",
        "Gen Z aesthetic",
        "Platform-specific formats",
        "Engagement-driven content",
      ]}
      process={[
        "TikTok trend analysis",
        "Visual concept development",
        "Graphic creation",
        "Trend adaptation",
        "Delivery with usage guide",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 600",
          features: ["Profile picture", "15 video covers", "Basic templates", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 1,500",
          features: ["Complete TikTok branding", "40 graphics", "Sticker pack", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 3,800",
          features: ["Unlimited graphics", "Weekly trend updates", "Branded effects", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "How are TikTok graphics different from Instagram?",
          answer:
            "TikTok graphics focus on bold, playful, and trend-aware aesthetics that appeal to Gen Z. They often incorporate popular memes, challenges, and viral trends rather than polished brand content.",
        },
        {
          question: "Can you create branded TikTok effects?",
          answer:
            "Yes, we design custom branded effects graphics that work with TikTok's Effect House, allowing users to apply your branded graphics to their videos.",
        },
      ]}
      relatedServices={[
        { name: "Instagram Graphics", href: "/services/creative-branding/social-media-design/instagram-graphics" },
        { name: "Video Editing", href: "/services/videography/video-editing/short-form" },
        { name: "Influencer Marketing", href: "/services/digital-marketing/influencer-marketing" },
      ]}
    />
  )
}
