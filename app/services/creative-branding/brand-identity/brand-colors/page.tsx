import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Brand Color Strategy | Brand Identity | Creative Fusion",
  description:
    "Strategic brand color palette development. Colors that evoke the right emotions and strengthen brand recognition.",
}

export default function BrandColorsPage() {
  return (
    <CategoryPageTemplate
      title="Brand Color Strategy"
      subtitle="Colors That Communicate"
      description="Your brand colors are more than aesthetics - they communicate emotions, values, and personality. We develop strategic color palettes that strengthen brand recognition."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Brand Identity", href: "/services/creative-branding/brand-identity" }}
      heroImage="/brand-color-palette-design-swatches.jpg"
      benefits={[
        { title: "Emotional Impact", description: "Colors that evoke right feelings" },
        { title: "Recognition", description: "Instantly identifiable palette" },
        { title: "Versatility", description: "Works across all media" },
        { title: "Cohesion", description: "Unified brand appearance" },
      ]}
      process={[
        { step: 1, title: "Color Psychology", description: "Understanding color meanings" },
        { step: 2, title: "Competitor Analysis", description: "Industry color landscape" },
        { step: 3, title: "Palette Development", description: "Creating primary and secondary colors" },
        { step: 4, title: "Testing", description: "Evaluating across applications" },
        { step: 5, title: "Documentation", description: "Color specifications and usage" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 1,500",
          features: ["Primary Colors", "Color Codes", "Basic Guide"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 3,500",
          features: ["Full Palette", "Gradients", "Usage Examples", "Accessibility"],
          popular: true,
        },
        {
          name: "Complete",
          price: "AED 6,000",
          features: ["Extended Palette", "Tints & Shades", "Digital & Print Specs", "Motion Colors"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How many colors should a brand have?",
          answer: "Most brands use 2-4 primary colors plus neutral tones for flexibility and consistency.",
        },
        {
          question: "Can I change my brand colors?",
          answer: "Yes, but it should be done strategically as colors are strongly tied to brand recognition.",
        },
      ]}
      relatedCategories={[
        { name: "Brand Typography", href: "/services/creative-branding/brand-identity/brand-typography" },
        { name: "Visual Identity", href: "/services/creative-branding/brand-identity/visual-identity" },
        { name: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
      ]}
    />
  )
}
