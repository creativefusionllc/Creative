import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Emblem Logo Design | Creative Branding | Creative Fusion",
  description: "Professional emblem and badge logo design. Classic, authoritative logos for established brands.",
}

export default function EmblemPage() {
  return (
    <CategoryPageTemplate
      title="Emblem Logo Design"
      subtitle="Badge & Crest Logos"
      description="Emblem logos combine text and imagery within a unified shape, creating a badge-like appearance. Perfect for brands wanting to convey tradition and authority."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Logo Design", href: "/services/creative-branding/logo-design" }}
      heroImage="/emblem-badge-crest-logo-design.jpg"
      benefits={[
        { title: "Authority", description: "Conveys trust and tradition" },
        { title: "Premium Feel", description: "Sophisticated appearance" },
        { title: "Unity", description: "All elements work as one" },
        { title: "Timeless", description: "Classic design that lasts" },
      ]}
      process={[
        { step: 1, title: "Heritage Research", description: "Understanding brand history and values" },
        { step: 2, title: "Shape Exploration", description: "Testing various emblem shapes" },
        { step: 3, title: "Element Design", description: "Creating internal components" },
        { step: 4, title: "Integration", description: "Unifying all elements" },
        { step: 5, title: "Finalization", description: "Complete emblem delivery" },
      ]}
      pricing={[
        {
          name: "Classic",
          price: "AED 2,000",
          features: ["3 Concepts", "3 Revisions", "Vector Files"],
          popular: false,
        },
        {
          name: "Heritage",
          price: "AED 4,000",
          features: ["5 Concepts", "Unlimited Revisions", "All Formats", "Usage Guide"],
          popular: true,
        },
        {
          name: "Legacy",
          price: "AED 7,500",
          features: ["8 Concepts", "Unlimited Revisions", "Full Identity", "Merchandise Ready"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is an emblem logo?",
          answer:
            "An emblem logo contains text inside a symbol or icon, like Starbucks, Harley-Davidson, or university crests.",
        },
        {
          question: "What industries use emblem logos?",
          answer:
            "Schools, government agencies, automotive brands, sports teams, and coffee shops often use emblem logos.",
        },
      ]}
      relatedCategories={[
        { name: "Crest Logos", href: "/services/creative-branding/logo-design/crest" },
        { name: "Badge Logos", href: "/services/creative-branding/logo-design/badge" },
        { name: "Seal Logos", href: "/services/creative-branding/logo-design/seal" },
      ]}
    />
  )
}
