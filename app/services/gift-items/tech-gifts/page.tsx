import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Tech Gifts | Corporate Gifts",
  description: "Branded technology gifts including power banks, USB drives, and wireless accessories.",
}

export default function TechGiftsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Tech Gifts"
      subtitle="Branded Technology Items"
      description="Modern tech gifts that keep your brand in customers' hands every day."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        { title: "Power Banks", description: "Portable chargers", href: "/services/gift-items/tech-gifts/power-banks" },
        { title: "USB Drives", description: "Custom flash drives", href: "/services/gift-items/tech-gifts/usb-drives" },
        {
          title: "Wireless Chargers",
          description: "Qi charging pads",
          href: "/services/gift-items/tech-gifts/wireless-chargers",
        },
        { title: "Earbuds", description: "Bluetooth earphones", href: "/services/gift-items/tech-gifts/earbuds" },
        { title: "Speakers", description: "Bluetooth speakers", href: "/services/gift-items/tech-gifts/speakers" },
        {
          title: "Accessories",
          description: "Phone stands & holders",
          href: "/services/gift-items/tech-gifts/accessories",
        },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 30-50",
          features: ["USB drive", "Logo print", "Min 100 units", "Gift box option"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 75-150",
          features: ["Power bank", "Full color print", "Min 50 units", "Premium packaging"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 200+",
          features: ["Wireless set", "Custom packaging", "Min 25 units", "Gift presentation"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Are products certified?", answer: "Yes, all electronics meet safety certifications." },
        { question: "Can you source custom items?", answer: "Yes, we can source specific products on request." },
      ]}
    />
  )
}
