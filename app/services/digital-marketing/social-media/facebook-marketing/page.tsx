import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Facebook Marketing | Social Media | Creative Fusion",
  description: "Facebook marketing and advertising services. Grow your audience and drive conversions on Facebook.",
}

export default function FacebookMarketingPage() {
  return (
    <CategoryPageTemplate
      title="Facebook Marketing"
      subtitle="Connect With Your Audience"
      description="Facebook remains the largest social platform. We create and manage Facebook marketing strategies that build communities and drive business results."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "Social Media Marketing", href: "/services/digital-marketing/social-media" }}
      heroImage="/facebook-marketing-social.jpg"
      benefits={[
        { title: "Reach", description: "Massive audience potential" },
        { title: "Targeting", description: "Precise audience targeting" },
        { title: "Engagement", description: "Community building" },
        { title: "Conversions", description: "Drive website traffic and sales" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Current presence analysis" },
        { step: 2, title: "Strategy", description: "Content and ad strategy" },
        { step: 3, title: "Content", description: "Create engaging posts" },
        { step: 4, title: "Ads", description: "Paid campaign management" },
        { step: 5, title: "Report", description: "Performance analytics" },
      ]}
      pricing={[
        {
          name: "Organic",
          price: "AED 3,000/mo",
          features: ["12 Posts", "Community Management", "Monthly Report"],
          popular: false,
        },
        {
          name: "Growth",
          price: "AED 6,000/mo",
          features: ["20 Posts", "Ad Management", "Audience Building"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 12,000/mo",
          features: ["Daily Posts", "Full Ad Suite", "Video Content", "Dedicated Manager"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is Facebook still relevant?",
          answer: "Yes, with 3 billion users, Facebook remains essential for most businesses.",
        },
        {
          question: "Should I use organic or paid?",
          answer: "Both - organic builds community, paid drives targeted results.",
        },
      ]}
      relatedCategories={[
        { name: "Instagram Marketing", href: "/services/digital-marketing/social-media/instagram-marketing" },
        { name: "Meta Ads", href: "/services/digital-marketing/ppc/meta-ads" },
        { name: "Content Creation", href: "/services/videography/social-media-content" },
      ]}
    />
  )
}
