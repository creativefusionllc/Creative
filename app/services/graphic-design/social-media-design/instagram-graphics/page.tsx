import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Instagram Graphics Design | Social Media Design",
  description: "Eye-catching Instagram posts, stories, and highlights designed for engagement.",
}

export default function InstagramGraphicsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="Instagram Graphics"
      subtitle="Instagram Content Design"
      description="Create stunning Instagram content that stops scrollers and drives engagement."
      heroImage="/instagram-graphics-design.jpg"
      benefits={[
        "Feed aesthetics",
        "Story templates",
        "Highlight covers",
        "Reel thumbnails",
        "Carousel posts",
        "Brand consistency",
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Define visual direction" },
        { step: 2, title: "Templates", description: "Create design system" },
        { step: 3, title: "Content", description: "Design posts & stories" },
        { step: 4, title: "Deliver", description: "Editable files provided" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: ["10 post templates", "5 story templates", "Highlight covers", "Editable files"],
      }}
      faqs={[
        {
          question: "Do you provide templates?",
          answer: "Yes, all designs come as editable Canva or Figma templates.",
        },
        { question: "Can you manage posting?", answer: "We offer social media management as an add-on service." },
      ]}
      relatedCategories={[
        { title: "Facebook Graphics", href: "/services/graphic-design/social-media-design/facebook-graphics" },
        { title: "LinkedIn Graphics", href: "/services/graphic-design/social-media-design/linkedin-graphics" },
      ]}
    />
  )
}
