import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Awards & Trophies | Corporate Gifts",
  description: "Custom awards, trophies, and recognition items for corporate events.",
}

export default function AwardsTrophiesPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Awards & Trophies"
      subtitle="Recognition & Achievement"
      description="Custom awards and trophies that celebrate achievements and motivate teams."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Crystal Awards",
          description: "Premium crystal pieces",
          href: "/services/gift-items/awards-trophies/crystal",
        },
        {
          title: "Metal Trophies",
          description: "Traditional trophies",
          href: "/services/gift-items/awards-trophies/metal",
        },
        {
          title: "Acrylic Awards",
          description: "Modern acrylic designs",
          href: "/services/gift-items/awards-trophies/acrylic",
        },
        {
          title: "Wooden Plaques",
          description: "Classic wood awards",
          href: "/services/gift-items/awards-trophies/wooden",
        },
        { title: "Medals", description: "Event medals", href: "/services/gift-items/awards-trophies/medals" },
        {
          title: "Certificates",
          description: "Framed certificates",
          href: "/services/gift-items/awards-trophies/certificates",
        },
      ]}
      pricingTiers={[
        {
          name: "Standard",
          price: "AED 150-300",
          features: ["Acrylic award", "Laser engraving", "Gift box", "Quick delivery"],
          popular: false,
        },
        {
          name: "Premium",
          price: "AED 400-800",
          features: ["Crystal award", "Custom design", "Presentation box", "Personalization"],
          popular: true,
        },
        {
          name: "Custom",
          price: "AED 1000+",
          features: ["Bespoke design", "Premium materials", "Luxury packaging", "Multiple units"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you create custom designs?",
          answer: "Yes, we can design awards from scratch based on your requirements.",
        },
        { question: "What's included in personalization?", answer: "Names, dates, achievements, and custom messages." },
      ]}
    />
  )
}
