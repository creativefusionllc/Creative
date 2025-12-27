export const metadata = {
  title: "Component Library Design | Creative Fusion Dubai",
  description:
    "Professional UI component library design services. Creative Fusion creates reusable, scalable component systems in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function ComponentLibraryPage() {
  return (
    <ServicePageTemplate
      title="Component Library Design"
      description="Build consistent, efficient products with a comprehensive UI component library that accelerates design and development workflows."
      category="Graphic Design"
      subcategory="Visual Design Systems"
      icon="box"
      features={[
        "Button variants",
        "Form components",
        "Navigation elements",
        "Card designs",
        "Modal dialogs",
        "Alert systems",
        "Data tables",
        "Icon library",
        "Loading states",
        "Empty states",
      ]}
      benefits={[
        "Faster design process",
        "Development efficiency",
        "Visual consistency",
        "Easy maintenance",
        "Scalable system",
      ]}
      process={[
        "Component audit",
        "Design system planning",
        "Component creation",
        "Documentation",
        "Figma library setup",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 5,000",
          features: ["20 core components", "Basic variants", "Figma library", "Usage guide"],
        },
        {
          name: "Professional",
          price: "AED 12,000",
          features: [
            "50+ components",
            "Multiple variants",
            "Responsive patterns",
            "Detailed documentation",
            "Developer handoff",
          ],
        },
        {
          name: "Enterprise",
          price: "AED 30,000",
          features: [
            "Complete component system",
            "Complex components",
            "Accessibility compliance",
            "Code snippets",
            "Training",
            "Ongoing support",
          ],
        },
      ]}
      faqs={[
        {
          question: "What's the difference between a component library and design system?",
          answer:
            "A component library is the collection of reusable UI components. A design system includes the component library plus design tokens, patterns, guidelines, and documentation.",
        },
        {
          question: "How do you organize components?",
          answer:
            "We use atomic design methodology: atoms (buttons, inputs), molecules (search bars, cards), organisms (headers, forms), and templates. This ensures logical organization and reusability.",
        },
      ]}
      relatedServices={[
        { name: "Design Tokens", href: "/services/graphic-design/visual-design-systems/design-tokens" },
        { name: "UI Design", href: "/services/graphic-design/ui-ux-design/website-ui" },
        { name: "Web Development", href: "/services/web-development/custom-websites" },
      ]}
    />
  )
}
