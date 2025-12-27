export const metadata = {
  title: "Website UI Design | Creative Fusion Dubai",
  description:
    "Professional website user interface design services. Creative Fusion delivers beautiful, conversion-focused website UI designs in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function WebsiteUIPage() {
  return (
    <ServicePageTemplate
      title="Website UI Design"
      description="Design beautiful, intuitive website interfaces that delight users and drive conversions with pixel-perfect attention to detail."
      category="Graphic Design"
      subcategory="UI/UX Design"
      icon="monitor"
      features={[
        "Homepage design",
        "Landing page UI",
        "Product page layouts",
        "Navigation systems",
        "Form design",
        "Button and CTA design",
        "Typography systems",
        "Color schemes",
        "Icon design",
        "Responsive layouts",
      ]}
      benefits={[
        "Conversion-optimized designs",
        "Mobile-first approach",
        "Brand consistency",
        "User-friendly interfaces",
        "Modern aesthetics",
      ]}
      process={["Requirements gathering", "Wireframing", "Visual design", "Prototype creation", "Developer handoff"]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 2,500",
          features: ["5-page website UI", "Mobile responsive", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 6,000",
          features: ["15-page website UI", "Interactive prototype", "Design system", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 15,000",
          features: ["Unlimited pages", "Complete design system", "User testing", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "What's included in website UI design?",
          answer:
            "Website UI design includes all visual elements: layouts, typography, color schemes, buttons, forms, navigation, icons, and imagery. We deliver high-fidelity mockups and interactive prototypes.",
        },
        {
          question: "Do you provide designs for developers?",
          answer:
            "Yes, we provide developer-ready design files in Figma with detailed specs, assets, style guides, and component libraries for seamless implementation.",
        },
      ]}
      relatedServices={[
        { name: "Web Development", href: "/services/web-development/custom-websites" },
        { name: "UX Research", href: "/services/graphic-design/ui-ux-design/ux-research" },
        { name: "Mobile App UI", href: "/services/graphic-design/ui-ux-design/mobile-app-ui" },
      ]}
    />
  )
}
