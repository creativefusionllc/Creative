export const metadata = {
  title: "Design Tokens & Style Guide | Creative Fusion Dubai",
  description:
    "Professional design tokens and style guide creation services. Creative Fusion delivers scalable design systems with tokens in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function DesignTokensPage() {
  return (
    <ServicePageTemplate
      title="Design Tokens & Style Guide"
      description="Create consistent, scalable design systems with comprehensive design tokens that ensure brand consistency across all platforms and products."
      category="Graphic Design"
      subcategory="Visual Design Systems"
      icon="code"
      features={[
        "Color token system",
        "Typography tokens",
        "Spacing scale",
        "Border radius tokens",
        "Shadow system",
        "Animation tokens",
        "Icon naming conventions",
        "Breakpoint definitions",
        "Z-index scale",
        "JSON/CSS token exports",
      ]}
      benefits={[
        "Cross-platform consistency",
        "Developer efficiency",
        "Easy theme updates",
        "Scalable systems",
        "Brand compliance",
      ]}
      process={[
        "Audit existing designs",
        "Define token structure",
        "Create token library",
        "Documentation",
        "Developer handoff",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 3,500",
          features: ["Core tokens (color, typography, spacing)", "Basic documentation", "CSS export"],
        },
        {
          name: "Professional",
          price: "AED 8,000",
          features: ["Complete token system", "Detailed documentation", "Multiple format exports", "Component tokens"],
        },
        {
          name: "Enterprise",
          price: "AED 18,000",
          features: [
            "Advanced token architecture",
            "Multi-brand support",
            "Dark mode tokens",
            "Automation tools",
            "Training",
          ],
        },
      ]}
      faqs={[
        {
          question: "What are design tokens?",
          answer:
            "Design tokens are reusable design decisions (colors, typography, spacing) stored as data. They ensure consistency across platforms and make it easy to update designs systematically.",
        },
        {
          question: "In what formats do you deliver tokens?",
          answer:
            "We deliver design tokens in JSON, CSS variables, SCSS variables, and platform-specific formats (Swift, Kotlin, etc.) based on your technology stack.",
        },
      ]}
      relatedServices={[
        { name: "Component Library", href: "/services/graphic-design/visual-design-systems/component-library" },
        { name: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
        { name: "UI Design", href: "/services/graphic-design/ui-ux-design/website-ui" },
      ]}
    />
  )
}
