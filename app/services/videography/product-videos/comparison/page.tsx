import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Product Comparison Videos | Product Videos | Creative Fusion",
  description: "Side-by-side product comparison videos. Help customers make informed decisions.",
}

export default function ComparisonPage() {
  return (
    <CategoryPageTemplate
      title="Product Comparison Videos"
      subtitle="Side-by-Side Analysis"
      description="Comparison videos help customers choose between products or understand why your product is superior to competitors."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Decision", description: "Help customers choose" },
        { title: "Differentiation", description: "Highlight advantages" },
        { title: "Trust", description: "Honest comparisons" },
        { title: "SEO", description: "Rank for comparison searches" },
      ]}
      process={[
        { step: 1, title: "Analysis", description: "Feature comparison" },
        { step: 2, title: "Script", description: "Fair comparison writing" },
        { step: 3, title: "Visuals", description: "Side-by-side filming" },
        { step: 4, title: "Graphics", description: "Comparison charts" },
        { step: 5, title: "Edit", description: "Clear presentation" },
      ]}
      pricing={[
        {
          name: "Quick Compare",
          price: "AED 3,500",
          features: ["2 Products", "3-4 min", "Basic Graphics"],
          popular: false,
        },
        {
          name: "Detailed Compare",
          price: "AED 6,000",
          features: ["3-4 Products", "5-7 min", "Feature Charts", "Tests"],
          popular: true,
        },
        {
          name: "Comprehensive",
          price: "AED 12,000",
          features: ["Full Category", "In-depth Tests", "Expert Commentary", "Series"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you compare to competitors?",
          answer: "Yes, we create fair, factual comparisons that highlight your strengths.",
        },
        {
          question: "How do you ensure fairness?",
          answer: "We use objective criteria and let products speak for themselves.",
        },
      ]}
      relatedCategories={[
        { name: "Demo Videos", href: "/services/videography/product-videos/demo-videos" },
        { name: "Review Videos", href: "/services/videography/product-videos/reviews" },
        { name: "How-To Videos", href: "/services/videography/product-videos/how-to" },
      ]}
    />
  )
}
