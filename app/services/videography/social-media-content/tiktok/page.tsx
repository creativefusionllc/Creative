import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "TikTok Content | Social Media Content | Creative Fusion",
  description: "TikTok video production. Native content for the platform driving culture.",
}

export default function TikTokPage() {
  return (
    <CategoryPageTemplate
      title="TikTok Content"
      subtitle="Native to the Platform"
      description="TikTok has unique content styles and trends. We create native TikTok content that feels authentic while building your brand presence."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Reach", description: "Massive organic reach" },
        { title: "Gen Z", description: "Younger demographics" },
        { title: "Trending", description: "Leverage viral sounds" },
        { title: "Authentic", description: "Platform-native feel" },
      ]}
      process={[
        { step: 1, title: "Trend Watch", description: "Current trends research" },
        { step: 2, title: "Concept", description: "Brand-safe adaptations" },
        { step: 3, title: "Creation", description: "Native filming style" },
        { step: 4, title: "Effects", description: "Platform effects and audio" },
        { step: 5, title: "Post", description: "Optimal timing and tags" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 600",
          features: ["1 TikTok", "Trending Format", "Native Style"],
          popular: false,
        },
        {
          name: "Creator",
          price: "AED 2,500",
          features: ["5 TikToks", "Trend Adaptation", "Hashtag Strategy"],
          popular: true,
        },
        {
          name: "Brand",
          price: "AED 8,000",
          features: ["20 TikToks", "Full Management", "Creator Collabs", "Analytics"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Should our brand be on TikTok?",
          answer: "If your audience is under 40, TikTok offers unmatched organic reach potential.",
        },
        {
          question: "How do you stay on top of trends?",
          answer: "Our team monitors TikTok daily to catch trends in their early stages.",
        },
      ]}
      relatedCategories={[
        { name: "Instagram Reels", href: "/services/videography/social-media-content/reels" },
        { name: "YouTube Shorts", href: "/services/videography/social-media-content/shorts" },
        { name: "Influencer Content", href: "/services/digital-marketing/social-media/influencer-marketing" },
      ]}
    />
  )
}
