import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Twitter/X Graphics Design | Social Media Design",
  description: "Engaging Twitter graphics including headers, post images, and thread visuals.",
}

export default function TwitterGraphicsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="Twitter/X Graphics"
      subtitle="Twitter Content Design"
      description="Create engaging Twitter graphics that stand out in feeds and drive engagement."
      heroImage="/twitter-graphics-design.jpg"
      benefits={[
        "Header design",
        "Post images",
        "Thread visuals",
        "Quote graphics",
        "Profile optimization",
        "Brand consistency",
      ]}
      process={[
        { step: 1, title: "Audit", description: "Review current profile" },
        { step: 2, title: "Design", description: "Create graphics suite" },
        { step: 3, title: "Template", description: "Build post system" },
        { step: 4, title: "Deliver", description: "All assets provided" },
      ]}
      pricing={{
        startingFrom: "AED 1,000",
        includes: ["Header design", "8 post templates", "Thread graphics", "Editable files"],
      }}
      faqs={[
        {
          question: "Do you design for Twitter threads?",
          answer: "Yes, we create cohesive thread graphics that tell stories.",
        },
        { question: "What about animated posts?", answer: "We can create GIFs and short animations for Twitter." },
      ]}
      relatedCategories={[
        { title: "Instagram Graphics", href: "/services/graphic-design/social-media-design/instagram-graphics" },
        { title: "LinkedIn Graphics", href: "/services/graphic-design/social-media-design/linkedin-graphics" },
      ]}
    />
  )
}
