import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Social Media Ad Creatives | Graphic Design",
  description: "High-converting ad creatives for Facebook, Instagram, LinkedIn, and Google Display.",
}

export default function AdCreativesPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="Ad Creatives"
      subtitle="Paid Media Design"
      description="Create high-converting ad creatives that drive clicks, conversions, and ROI."
      heroImage="/social-media-ad-creative-design.jpg"
      benefits={[
        "Conversion focused",
        "A/B testing variants",
        "All ad sizes",
        "Platform optimized",
        "Fast turnaround",
        "Performance tracking",
      ]}
      process={[
        { step: 1, title: "Brief", description: "Understand campaign goals" },
        { step: 2, title: "Concepts", description: "Create ad variations" },
        { step: 3, title: "Sizes", description: "Adapt for all platforms" },
        { step: 4, title: "Deliver", description: "Ad-ready files" },
      ]}
      pricing={{ startingFrom: "AED 2,500", includes: ["3 concepts", "5 sizes each", "A/B variants", "Source files"] }}
      faqs={[
        {
          question: "What platforms do you design for?",
          answer: "Facebook, Instagram, LinkedIn, Google Display, TikTok, and more.",
        },
        { question: "Do you offer video ads?", answer: "Yes, we create static, animated, and video ad creatives." },
      ]}
      relatedCategories={[
        { title: "Facebook Graphics", href: "/services/graphic-design/social-media-design/facebook-graphics" },
        { title: "PPC Campaigns", href: "/services/digital-marketing/ppc" },
      ]}
    />
  )
}
