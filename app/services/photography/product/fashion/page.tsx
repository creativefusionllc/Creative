import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Fashion Product Photography | Product Photography | Creative Fusion",
  description: "Professional fashion and apparel photography for brands and retailers.",
}

export default function FashionPage() {
  return (
    <CategoryPageTemplate
      title="Fashion Product Photography"
      description="Stunning fashion photography for clothing, accessories, and apparel brands that showcases style and quality."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Style Expertise", description: "Fashion-forward presentation" },
        { title: "Multiple Formats", description: "Flat lay, ghost, model" },
        { title: "Color Accuracy", description: "True-to-life colors" },
        { title: "Texture Detail", description: "Fabric quality visible" },
      ]}
      process={[
        { step: 1, title: "Styling", description: "Steam and prepare garments" },
        { step: 2, title: "Setup", description: "Lighting for fabric" },
        { step: 3, title: "Photography", description: "Multiple formats" },
        { step: 4, title: "Retouching", description: "Color and detail" },
        { step: 5, title: "Delivery", description: "Web and print files" },
      ]}
      pricing={[
        {
          name: "Flat Lay",
          price: "AED 80/item",
          features: ["Flat lay style", "3 angles", "Basic editing", "White background"],
        },
        {
          name: "Ghost Mannequin",
          price: "AED 120/item",
          features: ["3D effect", "Front/back", "Advanced editing", "Shadow"],
          popular: true,
        },
        {
          name: "On Model",
          price: "AED 250/item",
          features: ["Model included", "5 shots", "Full styling", "Lifestyle"],
        },
      ]}
      faqs={[
        { question: "Do you provide models?", answer: "Yes, we can arrange professional models for your shoot." },
        {
          question: "What is ghost mannequin?",
          answer: "It creates a 3D hollow effect as if the garment is being worn without showing a mannequin.",
        },
      ]}
      relatedCategories={[
        { name: "Accessories", href: "/services/photography/product/accessories" },
        { name: "Jewelry", href: "/services/photography/product/jewelry" },
        { name: "Lookbook", href: "/services/photography/product/lookbook" },
      ]}
    />
  )
}
