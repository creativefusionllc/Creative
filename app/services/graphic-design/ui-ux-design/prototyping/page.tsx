export const metadata = {
  title: "Interactive Prototyping | Creative Fusion Dubai",
  description:
    "Professional interactive prototype design services using Figma, Adobe XD, and Principle. Creative Fusion creates clickable prototypes in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function PrototypingPage() {
  return (
    <ServicePageTemplate
      title="Interactive Prototyping"
      description="Bring your designs to life with interactive, clickable prototypes that demonstrate user flows and validate concepts before development."
      category="Graphic Design"
      subcategory="UI/UX Design"
      icon="layers"
      features={[
        "High-fidelity prototypes",
        "Interactive flows",
        "Micro-interactions",
        "Transition animations",
        "User testing prototypes",
        "Mobile app prototypes",
        "Web app prototypes",
        "Click-through demos",
        "Conditional logic",
        "Figma prototypes",
      ]}
      benefits={[
        "Validate concepts early",
        "Stakeholder buy-in",
        "User testing ready",
        "Development clarity",
        "Cost-effective iteration",
      ]}
      process={[
        "Requirements gathering",
        "User flow mapping",
        "Wireframe prototyping",
        "High-fidelity prototype",
        "Testing and refinement",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 2,000",
          features: ["Basic clickable prototype", "5 screens", "Simple interactions", "1 user flow"],
        },
        {
          name: "Professional",
          price: "AED 5,000",
          features: ["Advanced prototype", "20 screens", "Micro-interactions", "Multiple flows", "Animations"],
        },
        {
          name: "Enterprise",
          price: "AED 12,000",
          features: [
            "Full app prototype",
            "Unlimited screens",
            "Complex interactions",
            "Conditional logic",
            "User testing",
          ],
        },
      ]}
      faqs={[
        {
          question: "What tools do you use for prototyping?",
          answer:
            "We primarily use Figma for interactive prototyping due to its collaboration features and powerful interaction capabilities. We also work with Adobe XD, Principle, and Framer based on project needs.",
        },
        {
          question: "Can I use the prototype for user testing?",
          answer:
            "Our interactive prototypes are specifically designed for user testing and can be shared via link for remote testing or used in moderated sessions.",
        },
      ]}
      relatedServices={[
        { name: "UX Research", href: "/services/graphic-design/ui-ux-design/ux-research" },
        { name: "Website UI", href: "/services/graphic-design/ui-ux-design/website-ui" },
        { name: "Mobile App UI", href: "/services/graphic-design/ui-ux-design/mobile-app-ui" },
      ]}
    />
  )
}
