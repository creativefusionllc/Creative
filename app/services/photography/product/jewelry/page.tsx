import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Jewelry Photography | Product Photography | Creative Fusion",
  description: "Exquisite jewelry photography showcasing fine details and craftsmanship.",
}

export default function JewelryPage() {
  return (
    <CategoryPageTemplate
      title="Jewelry Photography"
      description="Stunning jewelry photography that captures sparkle, detail, and craftsmanship of your precious pieces."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Macro Detail", description: "Capture every facet and detail" },
        { title: "Sparkle & Shine", description: "Professional lighting for gems" },
        { title: "True Colors", description: "Accurate gemstone representation" },
        { title: "Luxury Feel", description: "High-end aesthetic" },
      ]}
      process={[
        { step: 1, title: "Cleaning", description: "Prepare and polish pieces" },
        { step: 2, title: "Lighting Setup", description: "Specialized jewelry lighting" },
        { step: 3, title: "Macro Shots", description: "Detail photography" },
        { step: 4, title: "Lifestyle", description: "On-model or props" },
        { step: 5, title: "Retouching", description: "Enhance brilliance" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 150/piece",
          features: ["3 angles", "White background", "Basic retouching", "Web ready"],
        },
        {
          name: "Luxury",
          price: "AED 280/piece",
          features: ["6 angles", "Macro details", "Advanced retouching", "Lifestyle shot"],
          popular: true,
        },
        {
          name: "Collection",
          price: "AED 200/piece",
          features: ["Min 10 pieces", "Full styling", "Campaign shots", "Video option"],
        },
      ]}
      faqs={[
        {
          question: "How do you capture diamond sparkle?",
          answer: "We use specialized lighting techniques designed for gems and precious metals.",
        },
        {
          question: "Do you insure pieces during the shoot?",
          answer: "Yes, all items are insured while in our studio.",
        },
      ]}
      relatedCategories={[
        { name: "Watch Photography", href: "/services/photography/product/watches" },
        { name: "Accessories", href: "/services/photography/product/accessories" },
        { name: "Luxury Products", href: "/services/photography/product/luxury" },
      ]}
    />
  )
}
