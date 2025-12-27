export const metadata = {
  title: "Instagram Graphics Design | Creative Fusion Dubai",
  description:
    "Professional Instagram graphics design including posts, stories, reels covers, and IGTV thumbnails. Creative Fusion creates stunning Instagram visuals in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function InstagramGraphicsPage() {
  return (
    <ServicePageTemplate
      title="Instagram Graphics Design"
      description="Design beautiful Instagram content that captures attention and builds your brand with professional, scroll-stopping visuals."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="instagram"
      features={[
        "Instagram post designs (1080x1080px)",
        "Instagram Stories (1080x1920px)",
        "Reels cover graphics",
        "IGTV thumbnails",
        "Highlight covers",
        "Carousel post designs",
        "Instagram ad creatives",
        "Feed layout planning",
        "Story templates",
        "Brand-consistent aesthetics",
      ]}
      benefits={[
        "Instagram-optimized designs",
        "Cohesive feed aesthetics",
        "Story engagement boost",
        "Reels cover consistency",
        "Professional brand presence",
      ]}
      process={[
        "Instagram strategy discussion",
        "Visual theme development",
        "Template creation",
        "Content design",
        "Delivery and support",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 600",
          features: ["10 Instagram posts", "5 Stories", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 1,500",
          features: ["30 posts + 20 Stories", "Reels covers", "Highlight icons", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 3,500",
          features: ["Unlimited graphics", "Monthly content calendar", "Feed planning", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "Do you design for Instagram Reels?",
          answer:
            "Yes, we create Reels cover graphics (1080x1920px) that match your brand and make your Reels feed look cohesive and professional.",
        },
        {
          question: "Can you maintain a consistent Instagram aesthetic?",
          answer:
            "We develop a cohesive visual style guide for your Instagram that ensures all posts, stories, and graphics maintain brand consistency.",
        },
      ]}
      relatedServices={[
        { name: "Facebook Graphics", href: "/services/creative-branding/social-media-design/facebook-graphics" },
        { name: "TikTok Graphics", href: "/services/creative-branding/social-media-design/tiktok-graphics" },
        { name: "Social Media Marketing", href: "/services/digital-marketing/social-media-marketing" },
      ]}
    />
  )
}
