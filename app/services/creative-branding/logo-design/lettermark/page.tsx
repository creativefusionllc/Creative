import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Lettermark Logo Design | Creative Branding | Creative Fusion",
  description: "Professional lettermark and monogram logo design. Initial-based logos for memorable brand identity.",
}

export default function LettermarkPage() {
  return (
    <CategoryPageTemplate
      title="Lettermark Logo Design"
      subtitle="Initial-Based Brand Identity"
      description="Lettermark logos use initials or abbreviations to create compact, memorable brand marks. Ideal for companies with long names or multiple words."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/lettermark-monogram-logo-design.jpg"
      benefits={[
        { title: "Compact Design", description: "Perfect for brands with long names" },
        { title: "Memorable", description: "Easy to remember initials" },
        { title: "Versatile Scaling", description: "Works great at any size" },
        { title: "Professional", description: "Corporate and sophisticated look" },
      ]}
      process={[
        { step: 1, title: "Initial Selection", description: "Choosing the right letters to represent your brand" },
        { step: 2, title: "Style Exploration", description: "Testing different typography styles" },
        { step: 3, title: "Design Concepts", description: "Creating unique lettermark variations" },
        { step: 4, title: "Refinement", description: "Perfecting the final design" },
        { step: 5, title: "Delivery", description: "Complete file package delivery" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 1,200", features: ["3 Concepts", "2 Revisions", "PNG & JPG"], popular: false },
        {
          name: "Standard",
          price: "AED 2,500",
          features: ["5 Concepts", "5 Revisions", "All Formats", "Style Guide"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 4,500",
          features: ["8 Concepts", "Unlimited Revisions", "Full Package", "Stationery Design"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is a lettermark logo?",
          answer: "A lettermark uses initials or abbreviations of your brand name, like IBM, HBO, or NASA.",
        },
        {
          question: "How many letters work best?",
          answer: "Typically 2-4 letters work best for lettermark logos to maintain readability and impact.",
        },
      ]}
      relatedCategories={[
        { name: "Wordmark Logos", href: "/services/creative-branding/logo-design/wordmark" },
        { name: "Monogram Logos", href: "/services/creative-branding/logo-design/monogram" },
        { name: "Symbol Logos", href: "/services/creative-branding/logo-design/symbol" },
      ]}
    />
  )
}
