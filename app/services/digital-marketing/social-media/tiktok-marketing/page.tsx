import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "TikTok Marketing | Social Media | Creative Fusion",
  description: "TikTok marketing services. Reach younger audiences with viral content strategies.",
}

export default function TiktokMarketingPage() {
  return (
    <CategoryPageTemplate
      title="TikTok Marketing"
      subtitle="Viral Content Strategy"
      description="TikTok offers unprecedented organic reach. We create native content strategies that tap into trends and build authentic connections with younger audiences."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
      heroImage="/tiktok-marketing-viral.jpg"
      benefits={[
        { title: "Reach", description: "Massive organic potential" },
        { title: "Youth", description: "Gen Z and Millennials" },
        { title: "Viral", description: "Trend-driven growth" },
        { title: "Authentic", description: "Real, unpolished content" },
      ]}
      process={[
        { step: 1, title: "Trends", description: "Trend research" },
        { step: 2, title: "Content", description: "Native content creation" },
        { step: 3, title: "Post", description: "Optimal timing strategy" },
        { step: 4, title: "Engage", description: "Community building" },
        { step: 5, title: "Analyze", description: "Performance optimization" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 3,000/mo",
          features: ["8 TikToks", "Trend Adaptation", "Basic Strategy"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 6,000/mo",
          features: ["16 TikToks", "Full Management", "Engagement"],
          popular: true,
        },
        {
          name: "Viral",
          price: "AED 12,000/mo",
          features: ["Daily Content", "Creator Collabs", "TikTok Ads"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is TikTok right for our brand?",
          answer: "If your audience includes anyone under 40, TikTok offers unmatched reach potential.",
        },
        {
          question: "Do we need to be trendy?",
          answer: "Yes, TikTok rewards trend participation and authentic, native content.",
        },
      ]}
      relatedCategories={[
        { name: "TikTok Content", href: "/services/videography/social-media-content/tiktok" },
        { name: "Instagram Reels", href: "/services/videography/social-media-content/reels" },
        { name: "Influencer Marketing", href: "/services/digital-marketing/social-media/influencer-marketing" },
      ]}
    />
  )
}
