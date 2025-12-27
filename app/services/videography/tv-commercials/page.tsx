import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "TV Commercial Production Dubai | Advertising Videos | Creative Fusion LLC",
  description:
    "Professional TV commercial production in Dubai UAE. High-impact ads for television, digital platforms, and social media campaigns.",
  keywords: ["tv commercial dubai", "advertising video uae", "commercial production dubai", "ad film sharjah"],
}

export default function TVCommercialsPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="TV Commercials & Ads"
      subtitle="High-Impact Advertising"
      description="High-impact commercials designed to capture attention and drive action. From concept to final delivery."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Concept Development", description: "Creative ideas that resonate with your audience" },
        { title: "Scriptwriting", description: "Compelling narratives that drive action" },
        { title: "Casting & Talent", description: "Professional actors and models" },
        { title: "Location Scouting", description: "Perfect settings for your story" },
        { title: "Post-Production", description: "Color grading, VFX, and sound design" },
        { title: "Multi-Format Delivery", description: "TV, YouTube, social media versions" },
      ]}
      pricingTiers={[
        {
          name: "Digital Ad",
          price: "AED 8,000",
          description: "Social media commercial",
          features: ["15-30 sec duration", "1 day filming", "Basic talent", "Social optimized", "3 versions"],
        },
        {
          name: "TV Ready",
          price: "AED 25,000",
          description: "Broadcast quality",
          features: [
            "30-60 sec duration",
            "2 days filming",
            "Professional talent",
            "Full post-production",
            "TV + digital versions",
          ],
          popular: true,
        },
        {
          name: "Campaign",
          price: "AED 50,000+",
          description: "Full ad campaign",
          features: [
            "Multiple commercials",
            "Campaign strategy",
            "A-list talent",
            "Cinematic quality",
            "All platforms",
            "Media planning support",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
        { title: "Social Media Content", href: "/services/videography/social-media-content" },
      ]}
    />
  )
}
