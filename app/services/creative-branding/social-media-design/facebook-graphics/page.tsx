export const metadata = {
  title: "Facebook Graphics Design | Creative Fusion Dubai",
  description:
    "Professional Facebook graphics design services including cover photos, posts, ads, and event graphics. Creative Fusion delivers engaging Facebook visuals in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function FacebookGraphicsPage() {
  return (
    <ServicePageTemplate
      title="Facebook Graphics Design"
      description="Create eye-catching Facebook graphics that stop the scroll and drive engagement with professional designs optimized for the platform."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="facebook"
      features={[
        "Facebook cover photo design",
        "Post graphics and templates",
        "Facebook ad creatives",
        "Event graphics and banners",
        "Profile picture design",
        "Story graphics",
        "Video thumbnail design",
        "Carousel post designs",
        "Facebook shop graphics",
        "Group cover designs",
      ]}
      benefits={[
        "Optimized for Facebook specs",
        "Brand-consistent designs",
        "Engagement-focused visuals",
        "Multiple format variations",
        "Fast turnaround times",
      ]}
      process={[
        "Brief and Facebook strategy",
        "Concept development",
        "Design creation",
        "Revisions and approval",
        "Final delivery in all formats",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 500",
          features: ["5 Facebook graphics", "2 revisions", "Basic templates"],
        },
        {
          name: "Professional",
          price: "AED 1,200",
          features: ["15 Facebook graphics", "Unlimited revisions", "Custom designs", "Ad variations"],
        },
        {
          name: "Enterprise",
          price: "AED 3,000",
          features: ["Unlimited graphics", "Monthly content calendar", "Video thumbnails", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "What Facebook graphic sizes do you provide?",
          answer:
            "We provide all standard Facebook sizes including cover photos (820x312px), posts (1200x630px), ads (1080x1080px), stories (1080x1920px), and profile pictures (180x180px).",
        },
        {
          question: "Can you create Facebook ad campaigns?",
          answer:
            "Yes, we design complete Facebook ad campaigns with multiple variations for A/B testing, including carousel ads, video ads, and collection ads.",
        },
      ]}
      relatedServices={[
        { name: "Instagram Graphics", href: "/services/creative-branding/social-media-design/instagram-graphics" },
        { name: "LinkedIn Graphics", href: "/services/creative-branding/social-media-design/linkedin-graphics" },
        { name: "Social Media Strategy", href: "/services/digital-marketing/social-media-marketing/strategy" },
      ]}
    />
  )
}
