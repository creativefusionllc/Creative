import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Animated Ads | TV Commercials | Creative Fusion",
  description: "Animated TV commercial production. Eye-catching motion graphics and character animation.",
}

export default function AnimatedAdsPage() {
  return (
    <CategoryPageTemplate
      title="Animated Ads"
      subtitle="Motion That Captivates"
      description="Animated commercials use motion graphics, 2D, or 3D animation to create eye-catching ads. Perfect for explaining complex concepts or creating memorable visuals."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/animated-commercial-production.jpg"
      benefits={[
        { title: "Flexibility", description: "Any concept possible" },
        { title: "Consistency", description: "Perfect brand control" },
        { title: "Scalability", description: "Easy to modify" },
        { title: "Engagement", description: "Highly memorable" },
      ]}
      process={[
        { step: 1, title: "Concept", description: "Creative direction" },
        { step: 2, title: "Storyboard", description: "Frame-by-frame planning" },
        { step: 3, title: "Design", description: "Visual asset creation" },
        { step: 4, title: "Animation", description: "Bringing it to life" },
        { step: 5, title: "Sound", description: "Audio design and music" },
      ]}
      pricing={[
        {
          name: "Motion Graphics",
          price: "AED 12,000",
          features: ["30-sec Ad", "2D Graphics", "Stock Music"],
          popular: false,
        },
        {
          name: "2D Animation",
          price: "AED 25,000",
          features: ["30-sec Ad", "Character Animation", "Custom Music"],
          popular: true,
        },
        {
          name: "3D Animation",
          price: "AED 50,000",
          features: ["30-sec Ad", "3D Modeling", "Original Score", "Multiple Versions"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How long does animation take?", answer: "Typically 4-8 weeks depending on complexity and style." },
        {
          question: "Can you match our brand style?",
          answer: "Yes, we create custom animations that align with your brand guidelines.",
        },
      ]}
      relatedCategories={[
        { name: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
        { name: "Explainer Videos", href: "/services/videography/product-videos/explainer" },
        { name: "Brand Commercials", href: "/services/videography/tv-commercials/brand-commercials" },
      ]}
    />
  )
}
