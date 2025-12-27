import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Electronics Photography | Product Photography | Creative Fusion",
  description: "Professional photography for electronics, gadgets, and tech products.",
}

export default function ElectronicsPage() {
  return (
    <CategoryPageTemplate
      title="Electronics Photography"
      description="Sleek and modern photography for electronics, gadgets, and technology products that highlights innovation."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Clean Aesthetic", description: "Modern tech-focused style" },
        { title: "Screen Mockups", description: "Add UI to screens" },
        { title: "Detail Shots", description: "Ports, buttons, features" },
        { title: "Reflection Control", description: "No unwanted reflections" },
      ]}
      process={[
        { step: 1, title: "Product Prep", description: "Clean and polish" },
        { step: 2, title: "Lighting", description: "Control reflections" },
        { step: 3, title: "Hero Shots", description: "Main product angles" },
        { step: 4, title: "Details", description: "Features and ports" },
        { step: 5, title: "Compositing", description: "Screen mockups" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 120/product",
          features: ["4 angles", "White background", "Basic editing", "Web ready"],
        },
        {
          name: "Professional",
          price: "AED 220/product",
          features: ["6 angles", "Detail shots", "Screen mockups", "Lifestyle"],
          popular: true,
        },
        {
          name: "Tech Campaign",
          price: "AED 400/product",
          features: ["10 angles", "Video", "360° spin", "Full styling"],
        },
      ]}
      faqs={[
        {
          question: "Can you add screens to devices?",
          answer: "Yes, we can composite any UI or content onto device screens.",
        },
        {
          question: "How do you handle reflective surfaces?",
          answer: "We use specialized lighting and techniques to control reflections.",
        },
      ]}
      relatedCategories={[
        { name: "Gadget Photography", href: "/services/photography/product/gadgets" },
        { name: "Tech Lifestyle", href: "/services/photography/product/tech-lifestyle" },
        { name: "Packaging", href: "/services/photography/product/packaging" },
      ]}
    />
  )
}
