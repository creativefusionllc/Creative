import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Billboard Advertising | Print & Exhibitions",
  description: "Large format billboard design and production for outdoor advertising.",
}

export default function BillboardsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Billboard Advertising"
      subtitle="Outdoor Advertising Solutions"
      description="High-impact billboard designs that capture attention and drive brand awareness."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Highway Billboards",
          description: "Large format roadside ads",
          href: "/services/print-exhibitions/billboards/highway",
        },
        {
          title: "City Billboards",
          description: "Urban advertising",
          href: "/services/print-exhibitions/billboards/city",
        },
        {
          title: "Digital Billboards",
          description: "LED screen advertising",
          href: "/services/print-exhibitions/billboards/digital",
        },
        {
          title: "Building Wraps",
          description: "Large scale building ads",
          href: "/services/print-exhibitions/billboards/building-wraps",
        },
        {
          title: "Unipoles",
          description: "Single pole displays",
          href: "/services/print-exhibitions/billboards/unipoles",
        },
        {
          title: "Bridge Banners",
          description: "Overhead advertising",
          href: "/services/print-exhibitions/billboards/bridge",
        },
      ]}
      pricingTiers={[
        {
          name: "Design Only",
          price: "AED 2,500",
          features: ["Billboard design", "Multiple sizes", "Print-ready files", "Revisions"],
          popular: false,
        },
        {
          name: "Design + Print",
          price: "AED 8,000",
          features: ["Design service", "Large format print", "Installation coord", "Premium materials"],
          popular: true,
        },
        {
          name: "Full Campaign",
          price: "AED 25,000+",
          features: ["Multiple designs", "Media buying", "Installation", "Campaign management"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Do you handle media buying?", answer: "Yes, we can manage billboard space purchasing." },
        { question: "What file sizes do you need?", answer: "We provide files optimized for each billboard size." },
      ]}
    />
  )
}
