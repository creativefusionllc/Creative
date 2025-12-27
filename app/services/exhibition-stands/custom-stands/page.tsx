import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Custom Exhibition Stands | Exhibition Stands",
  description: "Bespoke exhibition stand design and fabrication for trade shows and events.",
}

export default function CustomStandsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Custom Exhibition Stands"
      subtitle="Bespoke Stand Design & Build"
      description="Create show-stopping custom exhibition stands that capture attention and drive leads at trade shows."
      heroImage="/custom-exhibition-stand.jpg"
      features={[
        {
          title: "3D Design",
          description: "Full 3D visualization before production",
          href: "/services/exhibition-stands/custom-stands/3d-design",
        },
        {
          title: "Fabrication",
          description: "Expert construction and finishing",
          href: "/services/exhibition-stands/custom-stands/fabrication",
        },
        {
          title: "Installation",
          description: "Professional setup and dismantling",
          href: "/services/exhibition-stands/custom-stands/installation",
        },
        {
          title: "Storage",
          description: "Secure stand storage solutions",
          href: "/services/exhibition-stands/custom-stands/storage",
        },
        {
          title: "Graphics",
          description: "High-quality stand graphics",
          href: "/services/exhibition-stands/custom-stands/graphics",
        },
        {
          title: "Furniture",
          description: "Custom and rental furniture",
          href: "/services/exhibition-stands/custom-stands/furniture",
        },
      ]}
      pricingTiers={[
        {
          name: "Shell Scheme",
          price: "AED 15,000",
          features: ["9 sqm", "Basic graphics", "Lighting", "Counter"],
          popular: false,
        },
        {
          name: "Custom Build",
          price: "AED 45,000",
          features: ["18 sqm", "Full custom design", "AV integration", "Storage room"],
          popular: true,
        },
        {
          name: "Island Stand",
          price: "AED 100,000+",
          features: ["36+ sqm", "360° access", "Double deck option", "Full service"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How far in advance should I order?", answer: "We recommend 8-12 weeks for custom stands." },
        { question: "Do you handle permits?", answer: "Yes, we manage all venue approvals and permits." },
      ]}
    />
  )
}
