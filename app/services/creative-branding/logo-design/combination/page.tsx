import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Combination Logo Design | Creative Branding | Creative Fusion",
  description:
    "Professional combination mark logo design. Logos that combine text and symbols for maximum brand impact.",
}

export default function CombinationPage() {
  return (
    <CategoryPageTemplate
      title="Combination Logo Design"
      subtitle="Text + Symbol Brand Marks"
      description="Combination logos merge text and symbols into one cohesive design. The most versatile logo type that works great for new brands building recognition."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/combination-logo-text-symbol-design.jpg"
      benefits={[
        { title: "Versatility", description: "Use together or separately" },
        { title: "Brand Building", description: "Build recognition with both elements" },
        { title: "Flexibility", description: "Adapts to any application" },
        { title: "Complete Identity", description: "Full brand representation" },
      ]}
      process={[
        { step: 1, title: "Brand Workshop", description: "Deep dive into brand personality" },
        { step: 2, title: "Dual Concepts", description: "Designing text and symbol options" },
        { step: 3, title: "Integration", description: "Combining elements harmoniously" },
        { step: 4, title: "Testing", description: "Evaluating across applications" },
        { step: 5, title: "Delivery", description: "Complete logo system delivery" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 2,500",
          features: ["4 Concepts", "3 Revisions", "Standard Files"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 4,500",
          features: ["6 Concepts", "Unlimited Revisions", "All Formats", "Brand Guide"],
          popular: true,
        },
        {
          name: "Complete",
          price: "AED 8,000",
          features: ["10 Concepts", "Unlimited Revisions", "Full Identity", "Stationery Suite"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is a combination logo?",
          answer:
            "A combination logo merges text and a symbol that can be used together or separately, like Burger King or Lacoste.",
        },
        {
          question: "Why choose a combination logo?",
          answer:
            "It offers the most flexibility - use the full logo, just the symbol, or just the text depending on context.",
        },
      ]}
      relatedCategories={[
        { name: "Wordmark Logos", href: "/services/creative-branding/logo-design/wordmark" },
        { name: "Symbol Logos", href: "/services/creative-branding/logo-design/symbol" },
        { name: "Emblem Logos", href: "/services/creative-branding/logo-design/emblem" },
      ]}
    />
  )
}
