export const metadata = {
  title: "Pinterest Graphics Design | Creative Fusion Dubai",
  description:
    "Professional Pinterest pin design services including vertical pins, idea pins, and Pinterest ad creatives. Creative Fusion creates save-worthy Pinterest graphics in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function PinterestGraphicsPage() {
  return (
    <ServicePageTemplate
      title="Pinterest Graphics Design"
      description="Create highly shareable Pinterest pins that drive traffic and sales with visually stunning, save-worthy designs optimized for the platform."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="pinterest"
      features={[
        "Standard pins (1000x1500px)",
        "Idea pin designs",
        "Pinterest ad creatives",
        "Board cover designs",
        "Product pins",
        "Recipe pins",
        "Infographic pins",
        "Video pins",
        "Carousel pins",
        "Story pins",
      ]}
      benefits={[
        "Pinterest SEO optimization",
        "High save rates",
        "Traffic generation",
        "Long-term visibility",
        "E-commerce integration",
      ]}
      process={[
        "Pinterest strategy planning",
        "Pin design creation",
        "SEO optimization",
        "A/B testing variations",
        "Performance tracking",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 700",
          features: ["20 Pinterest pins", "Board covers", "Basic templates", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 1,800",
          features: ["50 pins", "Idea pins", "Video pins", "A/B variations", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 4,200",
          features: ["Unlimited pins", "Monthly strategy", "Shopping pins", "Analytics reporting"],
        },
      ]}
      faqs={[
        {
          question: "What's the best Pinterest pin size?",
          answer:
            "The optimal Pinterest pin size is 1000x1500px (2:3 ratio). This vertical format performs best in feeds and ensures your pins are fully visible without cropping.",
        },
        {
          question: "How do you optimize pins for Pinterest SEO?",
          answer:
            "We optimize pins with keyword-rich titles, descriptions, alt text, and strategic hashtags. We also design pins with clear, readable text overlays that communicate value quickly.",
        },
      ]}
      relatedServices={[
        { name: "Instagram Graphics", href: "/services/creative-branding/social-media-design/instagram-graphics" },
        { name: "SEO Services", href: "/services/digital-marketing/seo/on-page-seo" },
        { name: "E-commerce Marketing", href: "/services/digital-marketing/ecommerce-marketing" },
      ]}
    />
  )
}
