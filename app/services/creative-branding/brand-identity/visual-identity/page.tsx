import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Visual Identity Design | Brand Identity | Creative Fusion",
  description: "Complete visual identity design services. Create a cohesive look across all brand touchpoints.",
}

export default function VisualIdentityPage() {
  return (
    <CategoryPageTemplate
      title="Visual Identity Design"
      subtitle="Complete Brand Look & Feel"
      description="Visual identity encompasses all visual elements of your brand - logo, colors, typography, imagery style, and graphic elements that create a consistent brand experience."
      parentService={{ name: "Creative Branding", href: "/services/creative-branding" }}
      subService={{ name: "Brand Identity", href: "/services/creative-branding/brand-identity" }}
      heroImage="/visual-identity-brand-design-system.jpg"
      benefits={[
        { title: "Consistency", description: "Unified look across all touchpoints" },
        { title: "Recognition", description: "Build strong brand recall" },
        { title: "Professionalism", description: "Polished brand presentation" },
        { title: "Differentiation", description: "Stand out from competitors" },
      ]}
      process={[
        { step: 1, title: "Brand Audit", description: "Analyzing current visual assets" },
        { step: 2, title: "Strategy", description: "Defining visual direction" },
        { step: 3, title: "Design System", description: "Creating visual elements" },
        { step: 4, title: "Application", description: "Applying across touchpoints" },
        { step: 5, title: "Guidelines", description: "Documenting usage rules" },
      ]}
      pricing={[
        {
          name: "Starter",
          price: "AED 5,000",
          features: ["Logo System", "Color Palette", "Typography", "Basic Guide"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 12,000",
          features: ["Full Identity", "Patterns", "Icons", "Comprehensive Guide"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 25,000",
          features: ["Complete System", "Motion Guidelines", "Digital Assets", "Training"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What is visual identity?",
          answer: "Visual identity is the collection of visual elements that represent and differentiate your brand.",
        },
        {
          question: "How long does it take?",
          answer: "A complete visual identity typically takes 4-8 weeks depending on scope.",
        },
      ]}
      relatedCategories={[
        { name: "Brand Colors", href: "/services/creative-branding/brand-identity/brand-colors" },
        { name: "Brand Typography", href: "/services/creative-branding/brand-identity/brand-typography" },
        { name: "Brand Imagery", href: "/services/creative-branding/brand-identity/brand-imagery" },
      ]}
    />
  )
}
