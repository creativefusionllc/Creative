export const metadata = {
  title: "YouTube Graphics Design | Creative Fusion Dubai",
  description:
    "Professional YouTube graphics including channel banners, thumbnails, end screens, and intro graphics. Creative Fusion delivers YouTube branding in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function YouTubeGraphicsPage() {
  return (
    <ServicePageTemplate
      title="YouTube Graphics Design"
      description="Create professional YouTube channel branding and video graphics that increase click-through rates and build subscriber loyalty."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="youtube"
      features={[
        "YouTube channel banner (2560x1440px)",
        "Video thumbnail designs",
        "End screen templates",
        "Intro/outro graphics",
        "Channel watermark",
        "Playlist covers",
        "Community post graphics",
        "YouTube Shorts thumbnails",
        "Subscribe animations",
        "Lower thirds",
      ]}
      benefits={[
        "Higher click-through rates",
        "Professional channel branding",
        "Consistent visual identity",
        "Multi-device optimization",
        "Subscriber growth support",
      ]}
      process={[
        "Channel strategy consultation",
        "Brand guidelines review",
        "Template creation",
        "Thumbnail design",
        "Final delivery with templates",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 800",
          features: ["Channel banner", "10 thumbnails", "End screen template", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 2,000",
          features: ["Complete channel branding", "30 thumbnails", "Intro/outro", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 5,000",
          features: ["Full YouTube branding", "Unlimited thumbnails", "Animated intros", "Monthly templates"],
        },
      ]}
      faqs={[
        {
          question: "What makes a good YouTube thumbnail?",
          answer:
            "Effective YouTube thumbnails use bold text, high contrast colors, emotional faces, and clear focal points. We design thumbnails that achieve 10%+ CTR by following proven engagement patterns.",
        },
        {
          question: "Do you provide thumbnail templates?",
          answer:
            "Yes, we create editable thumbnail templates in Canva or Photoshop so you can quickly create consistent thumbnails for future videos while maintaining brand identity.",
        },
      ]}
      relatedServices={[
        { name: "Video Editing", href: "/services/videography/video-editing" },
        { name: "Video Marketing", href: "/services/digital-marketing/video-marketing" },
        { name: "Brand Identity", href: "/services/creative-branding/brand-identity" },
      ]}
    />
  )
}
