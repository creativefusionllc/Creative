import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Cosmetics Photography | Product Photography | Creative Fusion",
  description: "Beautiful cosmetics and beauty product photography for brands.",
}

export default function CosmeticsPage() {
  return (
    <CategoryPageTemplate
      title="Cosmetics Photography"
      description="Beautiful and aspirational cosmetics photography that showcases beauty products with elegance and style."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Luxury Aesthetic", description: "High-end beauty imagery" },
        { title: "Color Accuracy", description: "True shade representation" },
        { title: "Texture Showcase", description: "Creamy, matte, shimmer" },
        { title: "Brand Alignment", description: "Match your brand style" },
      ]}
      process={[
        { step: 1, title: "Brand Review", description: "Understand aesthetic" },
        { step: 2, title: "Styling", description: "Props and backgrounds" },
        { step: 3, title: "Photography", description: "Product and texture" },
        { step: 4, title: "Retouching", description: "Perfect finishes" },
        { step: 5, title: "Delivery", description: "Campaign ready" },
      ]}
      pricing={[
        {
          name: "Product Shot",
          price: "AED 100/item",
          features: ["3 angles", "Simple styling", "Basic editing", "White or color"],
        },
        {
          name: "Beauty Campaign",
          price: "AED 200/item",
          features: ["5 angles", "Creative styling", "Texture shots", "Props included"],
          popular: true,
        },
        {
          name: "Luxury Brand",
          price: "AED 350/item",
          features: ["8 angles", "Full styling", "Lifestyle shots", "Video option"],
        },
      ]}
      faqs={[
        {
          question: "How do you show product texture?",
          answer: "We use macro photography and specialized lighting to showcase textures.",
        },
        {
          question: "Can you match our brand aesthetic?",
          answer: "Yes, we study your brand guidelines to match your visual identity.",
        },
      ]}
      relatedCategories={[
        { name: "Skincare", href: "/services/photography/product/skincare" },
        { name: "Perfume Photography", href: "/services/photography/product/perfume" },
        { name: "Beauty Lifestyle", href: "/services/photography/product/beauty-lifestyle" },
      ]}
    />
  )
}
