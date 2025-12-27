import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Modular Exhibition Stands | Exhibition Stands",
  description: "Flexible modular exhibition systems for cost-effective trade show presence.",
}

export default function ModularStandsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Modular Exhibition Stands"
      subtitle="Flexible Modular Systems"
      description="Cost-effective modular stands that can be reconfigured for different show sizes and layouts."
      heroImage="/modular-exhibition-stand.jpg"
      features={[
        {
          title: "Reconfigurable",
          description: "Multiple layout options",
          href: "/services/exhibition-stands/modular-stands/reconfigurable",
        },
        {
          title: "Portable",
          description: "Easy transport and setup",
          href: "/services/exhibition-stands/modular-stands/portable",
        },
        {
          title: "Scalable",
          description: "Expand as needed",
          href: "/services/exhibition-stands/modular-stands/scalable",
        },
        {
          title: "Reusable",
          description: "Multi-show ROI",
          href: "/services/exhibition-stands/modular-stands/reusable",
        },
        {
          title: "Custom Graphics",
          description: "Fresh look each show",
          href: "/services/exhibition-stands/modular-stands/graphics",
        },
        {
          title: "Accessories",
          description: "Complete your stand",
          href: "/services/exhibition-stands/modular-stands/accessories",
        },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 8,000",
          features: ["6 sqm system", "Basic graphics", "Counter", "Lights"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 18,000",
          features: ["12 sqm system", "Premium graphics", "Meeting area", "AV ready"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 35,000",
          features: ["24 sqm system", "Multiple configs", "Storage", "Full graphics"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can modular stands look custom?",
          answer: "Yes, with quality graphics and accessories they look impressive.",
        },
        { question: "How long do they last?", answer: "With proper care, 5-10 years or more." },
      ]}
    />
  )
}
