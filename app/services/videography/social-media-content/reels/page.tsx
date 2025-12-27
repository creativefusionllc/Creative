import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Instagram Reels | Social Media Content | Creative Fusion",
  description: "Professional Instagram Reels production. Vertical video content that goes viral.",
}

export default function ReelsPage() {
  return (
    <CategoryPageTemplate
      title="Instagram Reels"
      subtitle="Vertical Content That Performs"
      description="Instagram Reels are vertical short-form videos that drive engagement and reach. We create trending, shareable content optimized for the algorithm."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Reach", description: "Algorithm-favored format" },
        { title: "Engagement", description: "High interaction rates" },
        { title: "Trending", description: "Leverage viral formats" },
        { title: "Growth", description: "Follower acquisition" },
      ]}
      process={[
        { step: 1, title: "Trends", description: "Current format research" },
        { step: 2, title: "Concept", description: "Brand-aligned ideas" },
        { step: 3, title: "Filming", description: "Vertical capture" },
        { step: 4, title: "Edit", description: "Trending audio and effects" },
        { step: 5, title: "Optimization", description: "Hashtags and captions" },
      ]}
      pricing={[
        { name: "Single Reel", price: "AED 800", features: ["1 Reel", "15-30 sec", "Trending Audio"], popular: false },
        { name: "Pack", price: "AED 3,000", features: ["5 Reels", "Custom Concepts", "Caption Copy"], popular: true },
        {
          name: "Monthly",
          price: "AED 8,000",
          features: ["15 Reels", "Strategy Session", "Performance Review", "Trend Alerts"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What length works best?",
          answer: "7-15 seconds for hooks, 15-30 for full content, depending on message.",
        },
        { question: "Do you follow trends?", answer: "Yes, we track trending audio and formats to maximize reach." },
      ]}
      relatedCategories={[
        { name: "TikTok Content", href: "/services/videography/social-media-content/tiktok" },
        { name: "YouTube Shorts", href: "/services/videography/social-media-content/shorts" },
        { name: "Stories", href: "/services/videography/social-media-content/stories" },
      ]}
    />
  )
}
