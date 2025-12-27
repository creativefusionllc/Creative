import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Social Media Animation | Motion Graphics",
  description: "Eye-catching animated content for Instagram, TikTok, and social media platforms.",
}

export default function SocialAnimationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Social Media Animation"
      subtitle="Animated Social Content"
      description="Create scroll-stopping animated content that boosts engagement across social platforms."
      heroImage="/social-media-animation.jpg"
      benefits={[
        "Higher engagement",
        "Platform optimized",
        "Shareable content",
        "Brand consistency",
        "Quick production",
        "Trend-aware",
      ]}
      process={[
        { step: 1, title: "Brief", description: "Define content goals" },
        { step: 2, title: "Concept", description: "Creative direction" },
        { step: 3, title: "Animate", description: "Create animations" },
        { step: 4, title: "Optimize", description: "Platform-ready files" },
      ]}
      pricing={{
        startingFrom: "AED 1,000",
        includes: ["5 animated posts", "Story animations", "Multiple formats", "Source files"],
      }}
      faqs={[
        {
          question: "What platforms do you optimize for?",
          answer: "Instagram, TikTok, Facebook, LinkedIn, and Twitter.",
        },
        { question: "How long are social animations?", answer: "Typically 3-15 seconds depending on platform." },
      ]}
      relatedCategories={[
        { title: "Instagram Graphics", href: "/services/graphic-design/social-media-design/instagram-graphics" },
        { title: "Logo Animation", href: "/services/graphic-design/motion-graphics/logo-animation" },
      ]}
    />
  )
}
