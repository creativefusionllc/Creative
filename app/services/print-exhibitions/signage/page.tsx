import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Signage Solutions | Print & Exhibitions",
  description: "Indoor and outdoor signage design, production, and installation services.",
}

export default function SignagePage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Signage Solutions"
      subtitle="Indoor & Outdoor Signs"
      description="Professional signage solutions from design to installation for businesses of all sizes."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        { title: "LED Signs", description: "Illuminated signage", href: "/services/print-exhibitions/signage/led" },
        {
          title: "3D Letters",
          description: "Dimensional signage",
          href: "/services/print-exhibitions/signage/3d-letters",
        },
        { title: "Neon Signs", description: "Classic and LED neon", href: "/services/print-exhibitions/signage/neon" },
        { title: "Acrylic Signs", description: "Premium acrylic", href: "/services/print-exhibitions/signage/acrylic" },
        {
          title: "Metal Signs",
          description: "Durable metal options",
          href: "/services/print-exhibitions/signage/metal",
        },
        {
          title: "Wayfinding",
          description: "Directional systems",
          href: "/services/print-exhibitions/signage/wayfinding",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 1,500",
          features: ["Acrylic sign", "Standard size", "Installation", "1-year warranty"],
          popular: false,
        },
        {
          name: "Illuminated",
          price: "AED 5,000",
          features: ["LED backlit", "Custom design", "Installation", "3-year warranty"],
          popular: true,
        },
        {
          name: "Premium 3D",
          price: "AED 12,000+",
          features: ["3D fabrication", "Multiple materials", "Electrical work", "5-year warranty"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Do you handle permits?", answer: "Yes, we manage all municipality approvals." },
        { question: "How long is production?", answer: "Typically 2-4 weeks depending on complexity." },
      ]}
    />
  )
}
