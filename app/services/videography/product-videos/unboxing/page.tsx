import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Unboxing Videos | Product Videos | Creative Fusion",
  description: "Professional unboxing video production. Create excitement around your product reveal.",
}

export default function UnboxingPage() {
  return (
    <CategoryPageTemplate
      title="Unboxing Videos"
      subtitle="First Impressions That Sell"
      description="Unboxing videos capture the excitement of opening your product for the first time, showcasing packaging, presentation, and initial reactions."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/unboxing-video-production.jpg"
      benefits={[
        { title: "Excitement", description: "Build anticipation" },
        { title: "Experience", description: "Show customer journey" },
        { title: "Details", description: "Highlight packaging quality" },
        { title: "Trust", description: "Transparency builds confidence" },
      ]}
      process={[
        { step: 1, title: "Product Prep", description: "Perfect packaging setup" },
        { step: 2, title: "Set Design", description: "Attractive backdrop" },
        { step: 3, title: "Filming", description: "Multi-angle capture" },
        { step: 4, title: "Reactions", description: "Genuine reveal moments" },
        { step: 5, title: "Edit", description: "Engaging final cut" },
      ]}
      pricing={[
        { name: "Simple", price: "AED 2,000", features: ["1 Product", "2-3 min Video", "Basic Setup"], popular: false },
        {
          name: "Professional",
          price: "AED 4,500",
          features: ["1 Product", "Multiple Angles", "Lifestyle Setting", "Graphics"],
          popular: true,
        },
        {
          name: "Influencer Style",
          price: "AED 8,000",
          features: ["On-camera Presenter", "Full Review", "Social Cuts", "Thumbnails"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Do you provide presenters?",
          answer: "Yes, we have on-camera talent or can work with influencers.",
        },
        {
          question: "How many angles do you use?",
          answer: "Typically 2-4 camera angles for dynamic unboxing coverage.",
        },
      ]}
      relatedCategories={[
        { name: "Product Reviews", href: "/services/videography/product-videos/reviews" },
        { name: "Demo Videos", href: "/services/videography/product-videos/demo-videos" },
        { name: "Lifestyle Videos", href: "/services/videography/product-videos/lifestyle" },
      ]}
    />
  )
}
