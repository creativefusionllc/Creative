import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Retail Displays | Exhibition Stands",
  description: "Point of sale displays and retail merchandising solutions.",
}

export default function RetailDisplaysPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Retail Displays"
      subtitle="Point of Sale Solutions"
      description="Custom retail displays and merchandising units that drive sales and brand visibility."
      heroImage="/retail-display-unit.jpg"
      features={[
        {
          title: "POS Displays",
          description: "Point of sale units",
          href: "/services/exhibition-stands/retail-displays/pos",
        },
        {
          title: "Gondolas",
          description: "Retail shelving",
          href: "/services/exhibition-stands/retail-displays/gondolas",
        },
        {
          title: "Window Displays",
          description: "Visual merchandising",
          href: "/services/exhibition-stands/retail-displays/window",
        },
        {
          title: "Countertop",
          description: "Counter displays",
          href: "/services/exhibition-stands/retail-displays/countertop",
        },
        {
          title: "Floor Stands",
          description: "Free-standing units",
          href: "/services/exhibition-stands/retail-displays/floor-stands",
        },
        {
          title: "Digital Displays",
          description: "Interactive retail tech",
          href: "/services/exhibition-stands/retail-displays/digital",
        },
      ]}
      pricingTiers={[
        {
          name: "Countertop",
          price: "AED 500",
          features: ["Acrylic display", "Brand graphics", "Assembly guide", "Quick delivery"],
          popular: false,
        },
        {
          name: "Floor Stand",
          price: "AED 2,000",
          features: ["Custom design", "Durable materials", "Brand graphics", "Installation"],
          popular: true,
        },
        {
          name: "Full Retail",
          price: "AED 15,000+",
          features: ["Complete system", "Multiple units", "Digital option", "Rollout support"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Do you handle retail rollouts?", answer: "Yes, we can manage multi-location installations." },
        { question: "What materials do you use?", answer: "Acrylic, wood, metal, and eco-friendly options available." },
      ]}
    />
  )
}
