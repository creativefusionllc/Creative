import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Social Media Video Production Dubai | Reels & TikTok | Creative Fusion LLC",
  description:
    "Professional social media video production in Dubai UAE. Instagram Reels, TikTok, YouTube Shorts, and platform-optimized content.",
  keywords: ["social media video dubai", "reels production uae", "tiktok video dubai", "youtube shorts sharjah"],
}

export default function SocialMediaContentPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="Social Media Content"
      subtitle="Platform-Optimized Videos"
      description="Short-form videos optimized for Instagram Reels, TikTok, YouTube Shorts, and other social platforms."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Instagram Reels", description: "Engaging vertical content for Instagram" },
        { title: "TikTok Videos", description: "Trend-aware content that goes viral" },
        { title: "YouTube Shorts", description: "Quick, engaging clips for YouTube" },
        { title: "Stories Content", description: "24-hour format optimized content" },
        { title: "Behind-the-Scenes", description: "Authentic brand content" },
        { title: "Trend Integration", description: "Current trends and challenges" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 2,000",
          description: "5 videos/month",
          features: ["5 short videos", "Platform optimized", "Captions included", "Trending audio"],
        },
        {
          name: "Growth",
          price: "AED 5,000",
          description: "12 videos/month",
          features: [
            "12 short videos",
            "Content calendar",
            "Multiple platforms",
            "Hashtag strategy",
            "Analytics report",
          ],
          popular: true,
        },
        {
          name: "Influencer",
          price: "AED 10,000",
          description: "25 videos/month",
          features: ["25 short videos", "Daily content", "Story content", "Trend monitoring", "Engagement strategy"],
        },
      ]}
      relatedSubServices={[
        { title: "Product Videos", href: "/services/videography/product-videos" },
        { title: "TV Commercials", href: "/services/videography/tv-commercials" },
      ]}
    />
  )
}
