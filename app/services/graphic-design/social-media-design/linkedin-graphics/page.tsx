import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "LinkedIn Graphics Design | Social Media Design",
  description: "Professional LinkedIn banners, posts, and article graphics for B2B engagement.",
}

export default function LinkedInGraphicsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="LinkedIn Graphics"
      subtitle="Professional B2B Design"
      description="Elevate your LinkedIn presence with professional graphics that establish thought leadership."
      heroImage="/linkedin-graphics-design.jpg"
      benefits={[
        "Banner design",
        "Article headers",
        "Post templates",
        "Carousel posts",
        "Company page",
        "Personal branding",
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Define professional image" },
        { step: 2, title: "Design", description: "Create LinkedIn suite" },
        { step: 3, title: "Content", description: "Post template system" },
        { step: 4, title: "Deliver", description: "All assets provided" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: ["Banner design", "8 post templates", "Article headers", "Carousel templates"],
      }}
      faqs={[
        {
          question: "Do you design for company pages?",
          answer: "Yes, we design for both personal profiles and company pages.",
        },
        { question: "Can you help with content?", answer: "We offer content strategy as an add-on service." },
      ]}
      relatedCategories={[
        { title: "Facebook Graphics", href: "/services/graphic-design/social-media-design/facebook-graphics" },
        { title: "Presentation Design", href: "/services/graphic-design/marketing-collateral/presentations" },
      ]}
    />
  )
}
