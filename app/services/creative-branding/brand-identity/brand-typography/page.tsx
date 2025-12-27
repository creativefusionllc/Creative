import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Typography | Brand Identity | Creative Fusion",
  description: "Strategic typography selection for your brand. Fonts that express your brand personality consistently.",
}

export default function BrandTypographyPage() {
  return (
    <CategoryPageTemplate
      title="Brand Typography"
      subtitle="Fonts That Speak Your Brand"
      description="Typography is the voice of your visual identity. We select and customize fonts that perfectly express your brand personality across all communications."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Brand Identity", href: "/services/creative-branding/brand-identity" }}
      heroImage="/brand-typography-fonts-lettering-design.jpg"
      benefits={[
        { title: "Personality", description: "Fonts that match brand character" },
        { title: "Readability", description: "Clear communication always" },
        { title: "Hierarchy", description: "Organized information display" },
        { title: "Consistency", description: "Same feel across all text" },
      ]}
      process={[
        { step: 1, title: "Brand Analysis", description: "Understanding typography needs" },
        { step: 2, title: "Font Research", description: "Exploring suitable typefaces" },
        { step: 3, title: "Pairing", description: "Creating harmonious combinations" },
        { step: 4, title: "Hierarchy", description: "Defining usage rules" },
        { step: 5, title: "Guidelines", description: "Complete type documentation" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 1,200",
          features: ["Font Selection", "2 Typefaces", "Basic Guide"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 2,800",
          features: ["Font System", "4 Typefaces", "Hierarchy Rules", "Web Fonts"],
          popular: true,
        },
        {
          name: "Custom",
          price: "AED 8,000",
          features: ["Custom Typeface", "Full System", "Variable Fonts", "Licensing"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How many fonts should a brand use?",
          answer: "Typically 2-3 fonts: one for headlines, one for body text, and optionally one for accents.",
        },
        {
          question: "Should I use custom or existing fonts?",
          answer:
            "Existing fonts work for most brands; custom fonts are best for large enterprises wanting unique identity.",
        },
      ]}
      relatedCategories={[
        { name: "Brand Colors", href: "/services/creative-branding/brand-identity/brand-colors" },
        { name: "Visual Identity", href: "/services/creative-branding/brand-identity/visual-identity" },
        { name: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
      ]}
    />
  )
}
