import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Display Ads | PPC Advertising | Creative Fusion",
  description: "Display advertising services. Banner ads across millions of websites.",
}

export default function DisplayAdsPage() {
  return (
    <CategoryPageTemplate
      title="Display Ads"
      subtitle="Visual Advertising at Scale"
      description="Display advertising places your brand across millions of websites. We design and manage campaigns that build awareness and drive retargeting conversions."
      parentService={{ name: "Digital Marketing", href: "/services/digital-marketing" }}
      subService={{ name: "PPC Advertising", href: "/services/digital-marketing/ppc" }}
      heroImage="/display-advertising-banners.jpg"
      benefits={[
        { title: "Reach", description: "Millions of sites" },
        { title: "Visual", description: "Brand awareness" },
        { title: "Retargeting", description: "Follow-up visitors" },
        { title: "Cost", description: "Low CPM" },
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Campaign goals" },
        { step: 2, title: "Creative", description: "Banner design" },
        { step: 3, title: "Targeting", description: "Audience and placement" },
        { step: 4, title: "Launch", description: "Campaign activation" },
        { step: 5, title: "Optimize", description: "Placement optimization" },
      ]}
      pricing={[
        {
          name: "Awareness",
          price: "AED 2,000/mo",
          features: ["Display Campaigns", "Up to AED 10K Spend", "Basic Banners"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 4,000/mo",
          features: ["Display + Retargeting", "Animated Banners", "Responsive Ads"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 8,000/mo",
          features: ["Full Display Suite", "Rich Media", "Dedicated Design"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What sizes do you need?",
          answer: "We create responsive ads plus key sizes: 300x250, 728x90, 160x600, 320x50.",
        },
        {
          question: "Is display advertising effective?",
          answer: "Best for awareness and retargeting; less effective for direct response alone.",
        },
      ]}
      relatedCategories={[
        { name: "Remarketing", href: "/services/digital-marketing/ppc/remarketing" },
        { name: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
        { name: "Graphic Design", href: "/services/graphic-design" },
      ]}
    />
  )
}
