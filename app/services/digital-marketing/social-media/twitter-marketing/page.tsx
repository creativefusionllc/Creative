import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "X (Twitter) Marketing | Social Media | Creative Fusion",
  description: "X (Twitter) marketing services. Real-time engagement and brand building on X.",
}

export default function TwitterMarketingPage() {
  return (
    <CategoryPageTemplate
      title="X (Twitter) Marketing"
      subtitle="Real-Time Engagement"
      description="X (formerly Twitter) is the platform for real-time conversation and brand personality. We manage your presence with engaging content and timely interactions."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
      heroImage="/twitter-x-marketing.jpg"
      benefits={[
        { title: "Real-time", description: "Instant engagement" },
        { title: "Personality", description: "Brand voice" },
        { title: "Trends", description: "Trending conversations" },
        { title: "Support", description: "Customer service" },
      ]}
      process={[
        { step: 1, title: "Voice", description: "Define brand personality" },
        { step: 2, title: "Content", description: "Tweet strategy" },
        { step: 3, title: "Engage", description: "Community interaction" },
        { step: 4, title: "Trends", description: "Trend participation" },
        { step: 5, title: "Monitor", description: "Brand monitoring" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 2,500/mo",
          features: ["Daily Tweets", "Basic Engagement", "Monitoring"],
          popular: false,
        },
        {
          name: "Active",
          price: "AED 5,000/mo",
          features: ["Multiple Daily Tweets", "Trend Participation", "Customer Support"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 10,000/mo",
          features: ["Full Management", "Crisis Response", "X Premium", "Analytics"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is X still relevant for brands?",
          answer: "Yes, especially for B2B, tech, news, and brands with strong personalities.",
        },
        { question: "How often should we tweet?", answer: "3-5 times daily for optimal engagement and visibility." },
      ]}
      relatedCategories={[
        { name: "LinkedIn Marketing", href: "/services/digital-marketing/social-media/linkedin-marketing" },
        { name: "Brand Voice", href: "/services/creative-branding/brand-identity/brand-voice" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
