import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Food Photography | Product Photography | Creative Fusion",
  description: "Appetizing food photography for restaurants, menus, and food brands.",
}

export default function FoodPage() {
  return (
    <CategoryPageTemplate
      title="Food Photography"
      description="Mouth-watering food photography that makes your dishes irresistible for menus, marketing, and social media."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Product Photography", href: "/services/photography/product" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Appetite Appeal", description: "Images that make viewers hungry" },
        { title: "Food Styling", description: "Professional food stylists" },
        { title: "Brand Consistency", description: "Match your restaurant vibe" },
        { title: "Multi-Use", description: "Menu, social, marketing" },
      ]}
      process={[
        { step: 1, title: "Menu Selection", description: "Choose hero dishes" },
        { step: 2, title: "Food Prep", description: "Fresh preparation" },
        { step: 3, title: "Styling", description: "Garnish and props" },
        { step: 4, title: "Photography", description: "Multiple angles" },
        { step: 5, title: "Editing", description: "Color enhancement" },
      ]}
      pricing={[
        {
          name: "Social Pack",
          price: "AED 1,500",
          features: ["5 dishes", "2 angles each", "Styled shots", "Social ready"],
        },
        {
          name: "Menu Package",
          price: "AED 3,500",
          features: ["15 dishes", "Stylist included", "Multiple angles", "Print ready"],
          popular: true,
        },
        {
          name: "Full Brand",
          price: "AED 7,000",
          features: ["30+ dishes", "Full styling", "Lifestyle shots", "Video clips"],
        },
      ]}
      faqs={[
        { question: "Do you provide food styling?", answer: "Yes, our packages include professional food styling." },
        {
          question: "How long does food stay fresh for shooting?",
          answer: "We work quickly with fresh preparations to capture food at its best.",
        },
      ]}
      relatedCategories={[
        { name: "Restaurant Photography", href: "/services/photography/product/restaurant" },
        { name: "Menu Photography", href: "/services/photography/product/menu" },
        { name: "Beverage Photography", href: "/services/photography/product/beverage" },
      ]}
    />
  )
}
