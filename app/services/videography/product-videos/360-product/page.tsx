import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "360 Product Videos | Product Videos | Creative Fusion",
  description: "360-degree spinning product videos. Interactive product views from every angle.",
}

export default function Product360Page() {
  return (
    <CategoryPageTemplate
      title="360 Product Videos"
      subtitle="Every Angle Covered"
      description="360-degree product videos show your product from every angle, allowing customers to virtually examine products as if holding them."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Complete View", description: "See every angle" },
        { title: "Interactive", description: "User-controlled spin" },
        { title: "Confidence", description: "Reduce returns" },
        { title: "Engagement", description: "Longer page time" },
      ]}
      process={[
        { step: 1, title: "Setup", description: "Turntable configuration" },
        { step: 2, title: "Lighting", description: "Even illumination" },
        { step: 3, title: "Capture", description: "Multi-frame photography" },
        { step: 4, title: "Assembly", description: "360 viewer creation" },
        { step: 5, title: "Integration", description: "Website embedding" },
      ]}
      pricing={[
        { name: "Single", price: "AED 800", features: ["1 Product", "36 Frames", "Web Embed"], popular: false },
        {
          name: "Package",
          price: "AED 3,000",
          features: ["5 Products", "72 Frames", "Multiple Angles", "Zoom Option"],
          popular: true,
        },
        {
          name: "Catalog",
          price: "AED 8,000",
          features: ["15 Products", "Full Rotation", "Hotspots", "API Integration"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How does the 360 viewer work?",
          answer: "We provide an embeddable viewer that customers can drag to rotate the product.",
        },
        { question: "Can customers zoom?", answer: "Yes, we can add zoom functionality for detailed examination." },
      ]}
      relatedCategories={[
        { name: "Product Photography", href: "/services/photography/product" },
        { name: "Interactive Views", href: "/services/photography/360-degree/interactive-views" },
        { name: "E-commerce Videos", href: "/services/videography/product-videos/ecommerce" },
      ]}
    />
  )
}
