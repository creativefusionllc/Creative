import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Animated Infographics | Motion Graphics",
  description: "Data-driven animated infographics that make statistics and information engaging.",
}

export default function InfographicAnimationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Animated Infographics"
      subtitle="Motion Data Visualization"
      description="Transform data and statistics into engaging animated stories that inform and persuade."
      heroImage="/animated-infographic.jpg"
      benefits={[
        "Data storytelling",
        "Higher engagement",
        "Better retention",
        "Shareable content",
        "Professional look",
        "Complex made simple",
      ]}
      process={[
        { step: 1, title: "Data", description: "Organize information" },
        { step: 2, title: "Design", description: "Create visual system" },
        { step: 3, title: "Animate", description: "Bring data to life" },
        { step: 4, title: "Deliver", description: "Multiple formats" },
      ]}
      pricing={{
        startingFrom: "AED 2,500",
        includes: ["60-second animation", "Data visualization", "Sound design", "Source files"],
      }}
      faqs={[
        { question: "What data formats do you accept?", answer: "Excel, CSV, PDFs, or any structured data format." },
        {
          question: "Can you simplify complex data?",
          answer: "Yes, we specialize in making complex information accessible.",
        },
      ]}
      relatedCategories={[
        { title: "Explainer Animation", href: "/services/graphic-design/motion-graphics/explainer-animation" },
        { title: "Infographic Design", href: "/services/digital-marketing/content-marketing/infographics" },
      ]}
    />
  )
}
