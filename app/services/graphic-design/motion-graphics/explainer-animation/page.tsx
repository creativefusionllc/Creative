import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Explainer Animation | Motion Graphics",
  description: "Engaging animated explainer videos that simplify complex concepts and drive conversions.",
}

export default function ExplainerAnimationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Explainer Animation"
      subtitle="Animated Explainer Videos"
      description="Transform complex ideas into engaging animated stories that captivate and convert."
      heroImage="/explainer-video-animation.jpg"
      benefits={[
        "Simplified messaging",
        "Higher engagement",
        "Better retention",
        "Shareable content",
        "Multi-platform use",
        "Conversion focused",
      ]}
      process={[
        { step: 1, title: "Script", description: "Develop the narrative" },
        { step: 2, title: "Storyboard", description: "Visual planning" },
        { step: 3, title: "Animation", description: "Bring it to life" },
        { step: 4, title: "Polish", description: "Sound and delivery" },
      ]}
      pricing={{
        startingFrom: "AED 5,000",
        includes: ["60-second video", "Script writing", "Voice-over", "Sound design"],
      }}
      faqs={[
        { question: "How long should an explainer be?", answer: "60-90 seconds is optimal for maintaining attention." },
        { question: "Do you write scripts?", answer: "Yes, we provide full scriptwriting services." },
      ]}
      relatedCategories={[
        { title: "Product Animation", href: "/services/graphic-design/motion-graphics/product-animation" },
        { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      ]}
    />
  )
}
