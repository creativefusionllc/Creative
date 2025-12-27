import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Vehicle Branding | Print & Exhibitions",
  description: "Professional vehicle wraps and fleet branding for cars, vans, and trucks.",
}

export default function VehicleBrandingPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Vehicle Branding"
      subtitle="Fleet & Vehicle Wraps"
      description="Transform your vehicles into mobile billboards with professional vehicle branding."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Full Wraps",
          description: "Complete vehicle coverage",
          href: "/services/print-exhibitions/vehicle-branding/full-wraps",
        },
        {
          title: "Partial Wraps",
          description: "Strategic branding",
          href: "/services/print-exhibitions/vehicle-branding/partial",
        },
        {
          title: "Fleet Branding",
          description: "Multi-vehicle programs",
          href: "/services/print-exhibitions/vehicle-branding/fleet",
        },
        {
          title: "Bus Advertising",
          description: "Public transport ads",
          href: "/services/print-exhibitions/vehicle-branding/bus",
        },
        {
          title: "Truck Graphics",
          description: "Commercial vehicles",
          href: "/services/print-exhibitions/vehicle-branding/trucks",
        },
        {
          title: "Window Graphics",
          description: "Perforated window vinyl",
          href: "/services/print-exhibitions/vehicle-branding/windows",
        },
      ]}
      pricingTiers={[
        {
          name: "Partial Wrap",
          price: "AED 3,000",
          features: ["Design", "Side graphics", "Quality vinyl", "Installation"],
          popular: false,
        },
        {
          name: "Full Wrap",
          price: "AED 8,000",
          features: ["Complete design", "Full coverage", "Premium vinyl", "5-year warranty"],
          popular: true,
        },
        {
          name: "Fleet (5+)",
          price: "AED 6,000/vehicle",
          features: ["Consistent branding", "Volume discount", "Fleet management", "Maintenance plan"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How long do wraps last?", answer: "Premium wraps last 5-7 years with proper care." },
        { question: "Can wraps be removed?", answer: "Yes, wraps can be professionally removed without damage." },
      ]}
    />
  )
}
