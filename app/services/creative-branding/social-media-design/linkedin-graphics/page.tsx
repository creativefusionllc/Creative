export const metadata = {
  title: "LinkedIn Graphics Design | Creative Fusion Dubai",
  description:
    "Professional LinkedIn graphics design including banner images, post graphics, and company page visuals. Creative Fusion delivers corporate LinkedIn designs in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function LinkedInGraphicsPage() {
  return (
    <ServicePageTemplate
      title="LinkedIn Graphics Design"
      description="Create professional LinkedIn graphics that establish authority and drive B2B engagement with corporate-quality designs."
      category="Creative Branding"
      subcategory="Social Media Design"
      icon="linkedin"
      features={[
        "LinkedIn banner design (1584x396px)",
        "Post graphics (1200x627px)",
        "Article header images",
        "Company page visuals",
        "Carousel post designs",
        "LinkedIn ad creatives",
        "Profile photo optimization",
        "Video thumbnail design",
        "Event graphics",
        "Corporate infographics",
      ]}
      benefits={[
        "Professional corporate aesthetic",
        "LinkedIn-optimized formats",
        "B2B engagement focus",
        "Authority-building visuals",
        "Consistent brand presence",
      ]}
      process={[
        "LinkedIn strategy consultation",
        "Corporate design development",
        "Content creation",
        "Professional review",
        "Final delivery",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 700",
          features: ["LinkedIn banner", "10 post graphics", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 1,800",
          features: ["Banner + 25 posts", "Carousel designs", "Article headers", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 4,000",
          features: ["Complete LinkedIn branding", "Monthly content", "Employee advocacy graphics", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "What makes LinkedIn graphics different from other platforms?",
          answer:
            "LinkedIn graphics require a more professional, corporate aesthetic with focus on business value, data visualization, and industry authority rather than casual social content.",
        },
        {
          question: "Do you create LinkedIn carousel posts?",
          answer:
            "Yes, we design multi-slide LinkedIn carousels (up to 10 slides) that tell compelling business stories and drive engagement through professional layouts.",
        },
      ]}
      relatedServices={[
        { name: "Facebook Graphics", href: "/services/creative-branding/social-media-design/facebook-graphics" },
        { name: "Twitter Graphics", href: "/services/creative-branding/social-media-design/twitter-graphics" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
      ]}
    />
  )
}
