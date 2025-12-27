import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "YouTube Marketing Dubai | Video Content Strategy | Creative Fusion",
  description:
    "YouTube marketing services in Dubai. Channel management, video SEO, content strategy, and YouTube advertising for brand growth.",
}

export default function YouTubeMarketingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="YouTube Marketing"
        subtitle="Video Content Excellence"
        description="Build a powerful YouTube presence that drives engagement and conversions. We manage channels, optimize videos, and run effective ad campaigns."
        heroImage="/youtube-marketing-video-content.jpg"
        parentService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
        benefits={[
          "Channel management",
          "Video SEO",
          "YouTube Ads",
          "Shorts strategy",
          "Thumbnail design",
          "Analytics & growth",
        ]}
        process={[
          { step: "01", title: "Channel Audit", description: "Analyze current YouTube presence" },
          { step: "02", title: "Content Strategy", description: "Plan video content calendar" },
          { step: "03", title: "Optimization", description: "SEO and thumbnail optimization" },
          { step: "04", title: "Promotion", description: "Advertise and cross-promote" },
        ]}
        pricing={{ startingAt: "AED 5,000", unit: "per month" }}
        relatedCategories={[
          { name: "Video Production", href: "/services/videography" },
          { name: "YouTube Ads", href: "/services/digital-marketing/ppc/youtube-ads" },
          { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
