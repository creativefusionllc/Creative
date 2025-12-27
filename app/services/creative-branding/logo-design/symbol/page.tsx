import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Symbol Logo Design | Creative Branding | Creative Fusion",
  description: "Custom symbol and icon logo design. Create a distinctive visual mark for your brand identity.",
}

export default function SymbolPage() {
  return (
    <CategoryPageTemplate
      title="Symbol Logo Design"
      subtitle="Iconic Brand Marks"
      description="Symbol logos use abstract or pictorial icons to represent your brand without text. Perfect for established brands seeking global recognition."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/symbol-icon-logo-design-abstract.jpg"
      benefits={[
        { title: "Universal Appeal", description: "Transcends language barriers" },
        { title: "Instant Recognition", description: "Memorable visual identity" },
        { title: "Flexibility", description: "Works as standalone or with text" },
        { title: "Modern Look", description: "Contemporary and trendy appearance" },
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Understanding your brand essence" },
        { step: 2, title: "Ideation", description: "Brainstorming symbolic representations" },
        { step: 3, title: "Sketching", description: "Hand-drawn concept exploration" },
        { step: 4, title: "Digital Design", description: "Vector creation and refinement" },
        { step: 5, title: "Finalization", description: "Complete brand mark delivery" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 2,000",
          features: ["3 Concepts", "3 Revisions", "Vector Files"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 4,000",
          features: ["6 Concepts", "Unlimited Revisions", "All Formats", "Usage Guide"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 7,000",
          features: ["10 Concepts", "Unlimited Revisions", "Full Branding", "Animation Ready"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is a symbol logo?",
          answer:
            "A symbol logo is a graphic icon or mark that represents your brand without using text, like Apple or Nike.",
        },
        {
          question: "When should I use a symbol logo?",
          answer: "Symbol logos work best for established brands with strong recognition or global companies.",
        },
      ]}
      relatedCategories={[
        { name: "Abstract Logos", href: "/services/creative-branding/logo-design/abstract" },
        { name: "Mascot Logos", href: "/services/creative-branding/logo-design/mascot" },
        { name: "Combination Logos", href: "/services/creative-branding/logo-design/combination" },
      ]}
    />
  )
}
