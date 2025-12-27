import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Facebook Graphics Design | Social Media Design",
  description: "Professional Facebook cover photos, posts, and ad designs for maximum engagement.",
}

export default function FacebookGraphicsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="Facebook Graphics"
      subtitle="Facebook Content Design"
      description="Professional Facebook graphics that build brand presence and drive engagement."
      heroImage="/facebook-graphics-design.jpg"
      benefits={[
        "Cover photo design",
        "Post templates",
        "Event graphics",
        "Ad creatives",
        "Group banners",
        "Profile optimization",
      ]}
      process={[
        { step: 1, title: "Audit", description: "Review current presence" },
        { step: 2, title: "Design", description: "Create graphics suite" },
        { step: 3, title: "Optimize", description: "Size for all placements" },
        { step: 4, title: "Deliver", description: "All formats provided" },
      ]}
      pricing={{
        startingFrom: "AED 1,200",
        includes: ["Cover photo", "10 post templates", "Event graphics", "Editable files"],
      }}
      faqs={[
        {
          question: "What sizes do you provide?",
          answer: "All Facebook-optimized sizes including desktop and mobile versions.",
        },
        { question: "Do you design ads?", answer: "Yes, we create Facebook and Instagram ad creatives." },
      ]}
      relatedCategories={[
        { title: "Instagram Graphics", href: "/services/graphic-design/social-media-design/instagram-graphics" },
        { title: "Ad Creatives", href: "/services/graphic-design/social-media-design/ad-creatives" },
      ]}
    />
  )
}
