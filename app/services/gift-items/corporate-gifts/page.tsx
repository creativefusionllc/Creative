import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Corporate Gifts Dubai | Business Gifts UAE | Creative Fusion",
  description:
    "Premium corporate gifts and branded business gifts in Dubai UAE by Creative Fusion. Custom employee gifts, client appreciation, and promotional items.",
}

export default function CorporateGiftsPage() {
  return (
    <ServicePageTemplate
      category="Gift Items"
      categorySlug="gift-items"
      title="Corporate Gifts"
      description="Thoughtful corporate gifts and branded business gifts for employees, clients, and partners. Strengthen business relationships with premium customized gifts across Dubai and UAE."
      subcategories={[
        {
          name: "Executive Gifts",
          slug: "executive-gifts",
          description: "Premium gifts for senior management",
        },
        {
          name: "Employee Recognition",
          slug: "employee-recognition",
          description: "Staff appreciation gifts",
        },
        {
          name: "Client Appreciation",
          slug: "client-appreciation",
          description: "Thank you gifts for clients",
        },
        {
          name: "Holiday Gifts",
          slug: "holiday-gifts",
          description: "Seasonal corporate gifting",
        },
      ]}
      features={[
        "Custom branding options",
        "Premium quality items",
        "Gift packaging included",
        "Bulk order discounts",
        "Corporate gift sets",
        "Personalization available",
        "Gift management service",
        "Delivery coordination",
      ]}
    />
  )
}
