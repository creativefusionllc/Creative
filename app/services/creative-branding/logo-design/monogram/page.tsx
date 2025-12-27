import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Monogram Logo Design | Creative Branding | Creative Fusion",
  description: "Elegant monogram logo design services. Sophisticated intertwined letter designs for luxury brands.",
}

export default function MonogramPage() {
  return (
    <CategoryPageTemplate
      title="Monogram Logo Design"
      subtitle="Interlocking Letter Designs"
      description="Monogram logos feature intertwined or artistically combined letters, creating an elegant and sophisticated brand mark. Popular with luxury and fashion brands."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/monogram-interlocking-letters-luxury-logo.jpg"
      benefits={[
        { title: "Elegance", description: "Sophisticated luxury appeal" },
        { title: "Exclusivity", description: "Premium brand positioning" },
        { title: "Compact", description: "Perfect for small applications" },
        { title: "Timeless", description: "Classic design aesthetic" },
      ]}
      process={[
        { step: 1, title: "Letter Selection", description: "Choosing letters to interlock" },
        { step: 2, title: "Style Direction", description: "Defining elegance level" },
        { step: 3, title: "Interlocking Design", description: "Creating artistic combinations" },
        { step: 4, title: "Refinement", description: "Perfecting every detail" },
        { step: 5, title: "Delivery", description: "Final monogram package" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 1,800",
          features: ["3 Concepts", "2 Revisions", "Basic Files"],
          popular: false,
        },
        {
          name: "Luxury",
          price: "AED 3,500",
          features: ["5 Concepts", "Unlimited Revisions", "All Formats", "Foil-Ready"],
          popular: true,
        },
        {
          name: "Prestige",
          price: "AED 6,000",
          features: ["8 Concepts", "Unlimited Revisions", "Full Package", "Embossing Ready"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is a monogram logo?",
          answer:
            "A monogram combines two or more letters in an artistic, interlocking design, like Louis Vuitton's LV or Chanel's CC.",
        },
        {
          question: "Who uses monogram logos?",
          answer: "Fashion houses, luxury brands, law firms, and high-end services often use monogram logos.",
        },
      ]}
      relatedCategories={[
        { name: "Lettermark Logos", href: "/services/creative-branding/logo-design/lettermark" },
        { name: "Luxury Logos", href: "/services/creative-branding/logo-design/luxury" },
        { name: "Fashion Logos", href: "/services/creative-branding/logo-design/fashion" },
      ]}
    />
  )
}
