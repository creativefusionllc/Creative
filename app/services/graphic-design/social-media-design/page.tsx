import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Social Media Design Dubai | Content Creation | Creative Fusion LLC",
  description:
    "Professional social media design services. Engaging posts, stories, reels, and content templates for Instagram, Facebook, LinkedIn, and TikTok.",
  keywords: ["social media design dubai", "instagram design uae", "social media content", "social media templates"],
}

export default function SocialMediaDesignPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="Social Media Design"
        subtitle="Engaging Content & Templates"
        description="Stand out on social media with professionally designed posts, stories, and content that drives engagement and builds your brand."
        heroImage="/images/social-media-design.jpg"
        icon={Share2}
        features={[
          "Instagram post & story templates",
          "Facebook cover & post designs",
          "LinkedIn banners & graphics",
          "TikTok thumbnail designs",
          "YouTube thumbnails",
          "Monthly content calendars",
        ]}
        pricingTiers={[
          { name: "Basic", price: "AED 1,500/mo", features: ["12 posts/month", "4 stories", "Basic revisions"] },
          {
            name: "Growth",
            price: "AED 3,500/mo",
            features: ["24 posts/month", "12 stories", "Reels graphics", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Premium",
            price: "AED 6,000/mo",
            features: ["Unlimited posts", "Full content calendar", "Strategy included"],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
          { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
