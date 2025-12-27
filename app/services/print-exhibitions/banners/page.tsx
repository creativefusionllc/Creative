import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Banner Printing | Print & Exhibitions",
  description: "Indoor and outdoor banner printing including vinyl, fabric, and mesh banners.",
}

export default function BannersPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Banner Printing"
      subtitle="Event & Promotional Banners"
      description="High-quality banner printing for events, promotions, and permanent displays."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Vinyl Banners",
          description: "Durable outdoor banners",
          href: "/services/print-exhibitions/banners/vinyl",
        },
        {
          title: "Fabric Banners",
          description: "Premium textile prints",
          href: "/services/print-exhibitions/banners/fabric",
        },
        {
          title: "Mesh Banners",
          description: "Wind-resistant outdoor",
          href: "/services/print-exhibitions/banners/mesh",
        },
        {
          title: "Retractable",
          description: "Pull-up banner stands",
          href: "/services/print-exhibitions/banners/retractable",
        },
        {
          title: "Hanging Banners",
          description: "Ceiling and suspended",
          href: "/services/print-exhibitions/banners/hanging",
        },
        {
          title: "Step & Repeat",
          description: "Event backdrops",
          href: "/services/print-exhibitions/banners/step-repeat",
        },
      ]}
      pricingTiers={[
        {
          name: "Standard",
          price: "AED 150/sqm",
          features: ["Vinyl banner", "Outdoor quality", "Hemmed edges", "Grommets"],
          popular: false,
        },
        {
          name: "Premium",
          price: "AED 250/sqm",
          features: ["Fabric banner", "Vibrant colors", "Pole pockets", "Fire rated"],
          popular: true,
        },
        {
          name: "Retractable",
          price: "AED 350",
          features: ["Roll-up stand", "Printed graphic", "Carry case", "Quick setup"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Indoor vs outdoor materials?", answer: "We recommend vinyl for outdoor and fabric for indoor." },
        { question: "How long do banners last?", answer: "Outdoor vinyl: 2-3 years; indoor fabric: 5+ years." },
      ]}
    />
  )
}
