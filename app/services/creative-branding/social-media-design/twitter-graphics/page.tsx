export const metadata = {
  title: "Twitter Graphics Design | Creative Fusion Dubai",
  description:
    "Professional Twitter graphics design including header images, post graphics, and Twitter ad creatives. Creative Fusion creates engaging Twitter visuals in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function TwitterGraphicsPage() {
  return (
    <ServicePageTemplate
      title="Twitter Graphics Design"
      description="Design impactful Twitter graphics that drive retweets and engagement with attention-grabbing visuals optimized for the fast-paced platform."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="twitter"
      features={[
        "Twitter header design (1500x500px)",
        "Post graphics (1200x675px)",
        "Twitter card images",
        "Thread graphics",
        "Twitter ad creatives",
        "Profile photo optimization",
        "GIF animations",
        "Quote graphics",
        "Poll visuals",
        "Event graphics",
      ]}
      benefits={[
        "Twitter-optimized dimensions",
        "Fast-loading graphics",
        "Retweet-worthy designs",
        "Brand recognition",
        "Engagement optimization",
      ]}
      process={[
        "Twitter strategy discussion",
        "Visual concept development",
        "Graphic design",
        "Optimization and testing",
        "Final delivery",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 500",
          features: ["Twitter header", "10 post graphics", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 1,300",
          features: ["Header + 30 graphics", "Thread templates", "Animated GIFs", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 3,200",
          features: ["Unlimited graphics", "Daily content", "Twitter Spaces graphics", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "What's the best image size for Twitter posts?",
          answer:
            "The optimal Twitter image size is 1200x675px (16:9 ratio). We design all graphics at this size to ensure they display perfectly in feeds and maximize engagement.",
        },
        {
          question: "Can you create animated Twitter graphics?",
          answer:
            "Yes, we create animated GIFs optimized for Twitter that capture attention without autoplay sound, keeping file sizes under 5MB for optimal loading.",
        },
      ]}
      relatedServices={[
        { name: "LinkedIn Graphics", href: "/services/creative-branding/social-media-design/linkedin-graphics" },
        { name: "Social Media Strategy", href: "/services/digital-marketing/social-media-marketing/strategy" },
        { name: "Content Creation", href: "/services/digital-marketing/content-marketing/content-creation" },
      ]}
    />
  )
}
