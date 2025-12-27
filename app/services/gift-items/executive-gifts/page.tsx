import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Executive Gifts | Corporate Gifts",
  description: "Premium executive gifts and luxury corporate presents for VIPs and clients.",
}

export default function ExecutiveGiftsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Executive Gifts"
      subtitle="Premium Corporate Gifting"
      description="Impress VIP clients and executives with luxury branded gifts that make lasting impressions."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Leather Goods",
          description: "Premium leather items",
          href: "/services/gift-items/executive-gifts/leather",
        },
        {
          title: "Pen Sets",
          description: "Luxury writing instruments",
          href: "/services/gift-items/executive-gifts/pens",
        },
        {
          title: "Desk Accessories",
          description: "Premium desk items",
          href: "/services/gift-items/executive-gifts/desk",
        },
        {
          title: "Gift Hampers",
          description: "Curated gift boxes",
          href: "/services/gift-items/executive-gifts/hampers",
        },
        {
          title: "Crystal Awards",
          description: "Recognition pieces",
          href: "/services/gift-items/executive-gifts/crystal",
        },
        {
          title: "Luxury Tech",
          description: "High-end electronics",
          href: "/services/gift-items/executive-gifts/tech",
        },
      ]}
      pricingTiers={[
        {
          name: "Classic",
          price: "AED 150-300",
          features: ["Pen & card holder", "Gift box", "Logo engraving", "Single item"],
          popular: false,
        },
        {
          name: "Premium",
          price: "AED 500-1000",
          features: ["Leather portfolio", "Premium packaging", "Personalization", "Gift message"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 1500+",
          features: ["Curated hamper", "Multiple items", "Custom packaging", "White glove delivery"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Can gifts be personalized?", answer: "Yes, we offer engraving, embossing, and custom packaging." },
        { question: "Do you handle bulk orders?", answer: "Yes, with volume discounts for large orders." },
      ]}
    />
  )
}
