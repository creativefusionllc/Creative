import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Banner Stands Dubai | Roll Up Banners UAE | Creative Fusion",
  description:
    "Professional banner stands and roll-up banners in Dubai UAE by Creative Fusion. Portable, easy-to-setup display solutions for exhibitions, events, and retail.",
}

export default function BannerStandsPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      subcategory="Portable Displays"
      subcategorySlug="portable-displays"
      title="Banner Stands"
      description="High-quality banner stands and roll-up banners perfect for exhibitions, trade shows, conferences, and retail displays. Portable, durable, and easy to set up anywhere in Dubai and UAE."
      features={[
        "Multiple sizes available",
        "Easy setup in seconds",
        "Retractable mechanism",
        "Lightweight & portable",
        "Premium graphic printing",
        "Durable aluminum frame",
        "Carrying case included",
        "Replaceable graphics",
      ]}
      benefits={[
        "Quick and easy setup",
        "Highly portable solution",
        "Professional appearance",
        "Reusable for multiple events",
        "Cost-effective display",
        "Eye-catching graphics",
      ]}
      pricing={{
        basic: {
          price: "AED 299",
          period: "one-time",
          features: ["Standard Roll-Up", "85cm x 200cm", "Full Color Print", "Aluminum Base", "Carry Bag"],
        },
        standard: {
          price: "AED 499",
          period: "one-time",
          features: ["Premium Roll-Up", "100cm x 200cm", "High-Res Print", "Deluxe Frame", "2 Year Warranty"],
        },
        premium: {
          price: "AED 899",
          period: "one-time",
          features: ["Double-Sided Banner", "120cm x 200cm", "Premium Materials", "Extra Graphics", "Lifetime Support"],
        },
      }}
      process={[
        { title: "Design Approval", description: "Finalize banner artwork" },
        { title: "Printing", description: "High-quality production" },
        { title: "Assembly", description: "Frame and hardware setup" },
        { title: "Delivery", description: "Ready-to-use delivery" },
      ]}
      faqs={[
        {
          question: "How long does production take?",
          answer: "Standard banner stands are ready within 2-3 business days, rush orders available.",
        },
        {
          question: "Can I change the graphics later?",
          answer: "Yes, replacement graphics can be ordered separately for any banner stand model.",
        },
        {
          question: "Are they suitable for outdoor use?",
          answer: "Our banner stands are designed for indoor use. We offer outdoor banner solutions separately.",
        },
      ]}
      relatedServices={[
        { name: "Pop-Up Displays", slug: "pop-up-displays" },
        { name: "Exhibition Booths", slug: "/services/exhibition-stands/custom-booths" },
        { name: "Backdrop Walls", slug: "backdrop-walls" },
      ]}
    />
  )
}
