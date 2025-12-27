import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Promotional Kiosks | Exhibition Stands",
  description: "Custom promotional kiosks and sampling stations for malls and events.",
}

export default function KiosksPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Promotional Kiosks"
      subtitle="Mall & Event Kiosks"
      description="Custom-designed promotional kiosks and sampling stations that drive customer engagement."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Mall Kiosks",
          description: "Shopping center units",
          href: "/services/exhibition-stands/kiosks/mall-kiosks",
        },
        {
          title: "Sampling Stations",
          description: "Product sampling units",
          href: "/services/exhibition-stands/kiosks/sampling",
        },
        {
          title: "Information Desks",
          description: "Service counters",
          href: "/services/exhibition-stands/kiosks/info-desks",
        },
        {
          title: "Interactive Kiosks",
          description: "Digital touchpoints",
          href: "/services/exhibition-stands/kiosks/interactive",
        },
        { title: "Mobile Kiosks", description: "Portable units", href: "/services/exhibition-stands/kiosks/mobile" },
        {
          title: "Outdoor Kiosks",
          description: "Weather-resistant units",
          href: "/services/exhibition-stands/kiosks/outdoor",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 8,000",
          features: ["Counter unit", "Brand graphics", "Storage", "2 week rental"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 20,000",
          features: ["Custom design", "Digital screen", "Lighting", "Installation"],
          popular: true,
        },
        {
          name: "Interactive",
          price: "AED 45,000+",
          features: ["Touchscreen tech", "Custom software", "Full service", "Staffing option"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Do you handle mall approvals?", answer: "Yes, we manage all venue permits and approvals." },
        { question: "Can we rent kiosks?", answer: "Yes, we offer rental and purchase options." },
      ]}
    />
  )
}
