import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Eco-Friendly Gifts | Corporate Gifts",
  description: "Sustainable and environmentally friendly corporate gift options.",
}

export default function EcoFriendlyPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Eco-Friendly Gifts"
      subtitle="Sustainable Gifting"
      description="Make a positive impact with sustainable corporate gifts that reflect your values."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Bamboo Products",
          description: "Sustainable bamboo items",
          href: "/services/gift-items/eco-friendly/bamboo",
        },
        {
          title: "Recycled Items",
          description: "Recycled materials",
          href: "/services/gift-items/eco-friendly/recycled",
        },
        { title: "Plantable", description: "Seed paper products", href: "/services/gift-items/eco-friendly/plantable" },
        { title: "Organic", description: "Organic cotton items", href: "/services/gift-items/eco-friendly/organic" },
        {
          title: "Reusable",
          description: "Zero-waste alternatives",
          href: "/services/gift-items/eco-friendly/reusable",
        },
        { title: "Solar", description: "Solar-powered tech", href: "/services/gift-items/eco-friendly/solar" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 20-50",
          features: ["Bamboo pen set", "Recyclable packaging", "Min 100 units", "Eco certification"],
          popular: false,
        },
        {
          name: "Impact",
          price: "AED 75-150",
          features: ["Reusable set", "Organic materials", "Min 50 units", "Tree planting option"],
          popular: true,
        },
        {
          name: "Premium Eco",
          price: "AED 200+",
          features: ["Curated eco box", "Carbon neutral", "Min 25 units", "Impact report"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Are products certified eco-friendly?",
          answer: "Yes, we verify sustainability certifications for all products.",
        },
        { question: "Do you offer carbon offset?", answer: "Yes, we can include carbon offsetting in your order." },
      ]}
    />
  )
}
