import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "UI/UX Design Dubai | User Experience Design | Creative Fusion LLC",
  description:
    "Professional UI/UX design in Dubai UAE. User-centered interface design for web and mobile applications.",
  keywords: ["ui ux design dubai", "user experience uae", "interface design dubai", "ux design sharjah"],
}

export default function UIUXDesignPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="UI/UX Design"
      subtitle="Exceptional User Experiences"
      description="User-centered interface design that provides exceptional experiences across all devices and platforms."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "User Research", description: "Understanding your target audience" },
        { title: "Wireframing", description: "Blueprint for optimal user flow" },
        { title: "Visual Design", description: "Beautiful, on-brand interfaces" },
        { title: "Prototyping", description: "Interactive mockups for testing" },
        { title: "Usability Testing", description: "Validate with real users" },
        { title: "Design Systems", description: "Scalable component libraries" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 4,000",
          description: "Simple project",
          features: ["5 screens", "Wireframes", "UI design", "Basic prototype"],
        },
        {
          name: "Professional",
          price: "AED 10,000",
          description: "Medium project",
          features: ["15 screens", "User research", "Wireframes + UI", "Interactive prototype", "2 revision rounds"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 25,000",
          description: "Complex project",
          features: ["Unlimited screens", "Full UX process", "Design system", "User testing", "Developer handoff"],
        },
      ]}
      relatedSubServices={[
        { title: "Web Applications", href: "/services/web-development/web-applications" },
        { title: "E-Commerce Solutions", href: "/services/web-development/ecommerce" },
      ]}
    />
  )
}
