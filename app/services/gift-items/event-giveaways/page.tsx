import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Event Giveaways | Corporate Gifts",
  description: "Promotional giveaways for trade shows, events, and marketing campaigns.",
}

export default function EventGiveawaysPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Corporate Gifts", serviceHref: "/services/gift-items" }}
      title="Event Giveaways"
      subtitle="Promotional Items"
      description="Budget-friendly promotional items that spread brand awareness at events."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Tote Bags",
          description: "Reusable shopping bags",
          href: "/services/gift-items/event-giveaways/tote-bags",
        },
        { title: "Keychains", description: "Custom keyrings", href: "/services/gift-items/event-giveaways/keychains" },
        { title: "Mugs", description: "Branded drinkware", href: "/services/gift-items/event-giveaways/mugs" },
        { title: "Notebooks", description: "Custom notepads", href: "/services/gift-items/event-giveaways/notebooks" },
        {
          title: "Lanyards",
          description: "Branded neck straps",
          href: "/services/gift-items/event-giveaways/lanyards",
        },
        { title: "Pens", description: "Promotional pens", href: "/services/gift-items/event-giveaways/pens" },
      ]}
      pricingTiers={[
        {
          name: "Economy",
          price: "AED 3-10/unit",
          features: ["Pens/keychains", "1-color print", "Min 500 units", "Bulk pricing"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 15-30/unit",
          features: ["Bags/mugs", "Full color", "Min 200 units", "Custom design"],
          popular: true,
        },
        {
          name: "Event Kit",
          price: "AED 50/kit",
          features: ["Multiple items", "Branded packaging", "Min 100 kits", "Custom selection"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "What's the lead time?", answer: "Standard items: 2-3 weeks; custom items: 4-6 weeks." },
        {
          question: "Do you offer eco-friendly options?",
          answer: "Yes, we have sustainable and eco-friendly products.",
        },
      ]}
    />
  )
}
