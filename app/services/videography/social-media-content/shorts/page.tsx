import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "YouTube Shorts | Social Media Content | Creative Fusion",
  description: "YouTube Shorts production. Vertical content for YouTube's fastest-growing format.",
}

export default function ShortsPage() {
  return (
    <CategoryPageTemplate
      title="YouTube Shorts"
      subtitle="YouTube's Viral Format"
      description="YouTube Shorts are vertical videos under 60 seconds that reach massive audiences. We create Shorts that grow subscribers and drive channel visibility."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Discovery", description: "Reach new audiences" },
        { title: "Subscribers", description: "Grow your channel" },
        { title: "Algorithm", description: "YouTube promotion" },
        { title: "Crosspost", description: "Repurpose to other platforms" },
      ]}
      process={[
        { step: 1, title: "Hook", description: "Attention-grabbing starts" },
        { step: 2, title: "Script", description: "Concise messaging" },
        { step: 3, title: "Film", description: "Vertical capture" },
        { step: 4, title: "Edit", description: "Fast-paced editing" },
        { step: 5, title: "Optimize", description: "Titles and hashtags" },
      ]}
      pricing={[
        {
          name: "Single",
          price: "AED 1,000",
          features: ["1 Short", "Up to 60 sec", "Optimized Title"],
          popular: false,
        },
        {
          name: "Pack",
          price: "AED 4,000",
          features: ["5 Shorts", "Custom Concepts", "Channel Strategy"],
          popular: true,
        },
        {
          name: "Monthly",
          price: "AED 12,000",
          features: ["20 Shorts", "Full Management", "Analytics", "Long-form Clips"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you make Shorts from long videos?",
          answer: "Yes, we can clip the best moments from existing content for Shorts.",
        },
        {
          question: "What makes a Short viral?",
          answer: "Strong hooks, fast pacing, trending topics, and clear value delivery.",
        },
      ]}
      relatedCategories={[
        { name: "Instagram Reels", href: "/services/videography/social-media-content/reels" },
        { name: "TikTok Content", href: "/services/videography/social-media-content/tiktok" },
        { name: "YouTube Videos", href: "/services/videography/social-media-content/youtube" },
      ]}
    />
  )
}
