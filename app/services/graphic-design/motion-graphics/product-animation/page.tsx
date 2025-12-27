import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Product Animation | Motion Graphics",
  description: "3D product animations and motion graphics that showcase products beautifully.",
}

export default function ProductAnimationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Product Animation"
      subtitle="3D Product Motion"
      description="Showcase your products with stunning 3D animations that highlight features and benefits."
      heroImage="/3d-product-animation.png"
      benefits={[
        "Feature highlights",
        "360° views",
        "Assembly animations",
        "Lifestyle contexts",
        "E-commerce ready",
        "Ad-optimized",
      ]}
      process={[
        { step: 1, title: "Model", description: "3D product creation" },
        { step: 2, title: "Rig", description: "Prepare for animation" },
        { step: 3, title: "Animate", description: "Create motion sequences" },
        { step: 4, title: "Render", description: "High-quality output" },
      ]}
      pricing={{
        startingFrom: "AED 3,500",
        includes: ["30-second animation", "3D modeling", "4K render", "Multiple angles"],
      }}
      faqs={[
        {
          question: "Do you need physical product?",
          answer: "We can work from photos, CAD files, or physical samples.",
        },
        { question: "Can you animate packaging?", answer: "Yes, we create packaging reveal and unboxing animations." },
      ]}
      relatedCategories={[
        { title: "Explainer Animation", href: "/services/graphic-design/motion-graphics/explainer-animation" },
        { title: "Product Videos", href: "/services/videography/product-videos" },
      ]}
    />
  )
}
