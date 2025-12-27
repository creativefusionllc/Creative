import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Instagram Marketing | Social Media | Creative Fusion",
  description: "Instagram marketing services. Visual content strategy and growth for Instagram.",
}

export default function InstagramMarketingPage() {
  return (
    <CategoryPageTemplate
      title="Instagram Marketing"
      subtitle="Visual Brand Building"
      description="Instagram is the platform for visual storytelling. We create stunning content and growth strategies that build engaged followings and drive business."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
      heroImage="/instagram-marketing-visual.jpg"
      benefits={[
        { title: "Visual", description: "Stunning content" },
        { title: "Engagement", description: "High interaction rates" },
        { title: "Discovery", description: "Reels and Explore" },
        { title: "Shopping", description: "Direct sales" },
      ]}
      process={[
        { step: 1, title: "Aesthetic", description: "Define visual style" },
        { step: 2, title: "Content", description: "Create feed and Reels" },
        { step: 3, title: "Stories", description: "Daily engagement" },
        { step: 4, title: "Growth", description: "Hashtag and collaboration strategy" },
        { step: 5, title: "Analytics", description: "Performance optimization" },
      ]}
      pricing={[
        { name: "Starter", price: "AED 3,500/mo", features: ["12 Posts", "Stories", "Basic Reels"], popular: false },
        {
          name: "Growth",
          price: "AED 7,000/mo",
          features: ["20 Posts", "Daily Stories", "8 Reels", "Engagement"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 15,000/mo",
          features: ["Daily Content", "Full Reels Strategy", "Influencer Collabs"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How important are Reels?", answer: "Very important - Reels get 2x more reach than static posts." },
        {
          question: "How often should we post?",
          answer: "4-7 feed posts per week, daily Stories, 3-5 Reels per week is optimal.",
        },
      ]}
      relatedCategories={[
        { name: "Facebook Marketing", href: "/services/digital-marketing/social-media/facebook-marketing" },
        { name: "Instagram Reels", href: "/services/videography/social-media-content/reels" },
        { name: "Influencer Marketing", href: "/services/digital-marketing/social-media/influencer-marketing" },
      ]}
    />
  )
}
