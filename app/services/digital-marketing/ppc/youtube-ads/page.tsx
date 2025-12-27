import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "YouTube Ads | PPC Advertising | Creative Fusion",
  description: "YouTube video advertising services. Reach audiences with engaging video ads.",
}

export default function YoutubeAdsPage() {
  return (
    <CategoryPageTemplate
      title="YouTube Ads"
      subtitle="Video Advertising at Scale"
      description="YouTube is the world's second-largest search engine. We create and manage video ad campaigns that build brand awareness and drive action."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/youtube-ads-video-advertising.jpg"
      benefits={[
        { title: "Scale", description: "2 billion monthly users" },
        { title: "Video", description: "Engaging format" },
        { title: "Targeting", description: "Interest and intent" },
        { title: "Cost", description: "Pay for views" },
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Campaign objectives" },
        { step: 2, title: "Video", description: "Ad creative production" },
        { step: 3, title: "Targeting", description: "Audience selection" },
        { step: 4, title: "Launch", description: "Campaign activation" },
        { step: 5, title: "Optimize", description: "View and conversion optimization" },
      ]}
      pricing={[
        {
          name: "Awareness",
          price: "AED 3,000/mo",
          features: ["Skippable Ads", "Up to AED 15K Spend", "Basic Targeting"],
          popular: false,
        },
        {
          name: "Performance",
          price: "AED 6,000/mo",
          features: ["Multi-format", "Advanced Targeting", "Video Production"],
          popular: true,
        },
        {
          name: "Scale",
          price: "AED 12,000/mo",
          features: ["Full Funnel", "Unlimited Spend", "A/B Testing"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What video length works best?",
          answer: "6-15 seconds for bumper ads, 15-30 seconds for skippable ads.",
        },
        {
          question: "Do you produce video ads?",
          answer: "Yes, we offer full video production for YouTube advertising.",
        },
      ]}
      relatedCategories={[
        { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
        { name: "Video Production", href: "/services/videography/tv-commercials" },
        { name: "Display Ads", href: "/services/digital-marketing/ppc/display-ads" },
      ]}
    />
  )
}
