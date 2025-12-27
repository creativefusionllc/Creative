import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Branded Apparel | Corporate Gifts",
  description: "Custom branded clothing including t-shirts, polo shirts, caps, and uniforms.",
}

export default function BrandedApparelPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Branded Apparel"
      subtitle="Custom Clothing & Uniforms"
      description="Quality branded apparel that promotes your brand and unifies your team."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        { title: "T-Shirts", description: "Custom printed tees", href: "/services/gift-items/branded-apparel/tshirts" },
        { title: "Polo Shirts", description: "Embroidered polos", href: "/services/gift-items/branded-apparel/polos" },
        { title: "Caps & Hats", description: "Branded headwear", href: "/services/gift-items/branded-apparel/caps" },
        { title: "Uniforms", description: "Staff uniforms", href: "/services/gift-items/branded-apparel/uniforms" },
        { title: "Jackets", description: "Corporate outerwear", href: "/services/gift-items/branded-apparel/jackets" },
        {
          title: "Sports Wear",
          description: "Athletic apparel",
          href: "/services/gift-items/branded-apparel/sportswear",
        },
      ]}
      pricingTiers={[
        {
          name: "T-Shirts",
          price: "AED 25/unit",
          features: ["Cotton tee", "Screen print", "Min 50 units", "Multiple colors"],
          popular: false,
        },
        {
          name: "Polo Shirts",
          price: "AED 45/unit",
          features: ["Premium polo", "Embroidered logo", "Min 25 units", "Size range"],
          popular: true,
        },
        {
          name: "Full Uniform",
          price: "AED 150/set",
          features: ["Shirt + pants", "Custom design", "Name badges", "Min 20 sets"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "What's the minimum order?", answer: "Varies by item: 25-50 units for most products." },
        { question: "Print or embroidery?", answer: "We offer both; embroidery is more durable for logos." },
      ]}
    />
  )
}
