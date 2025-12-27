import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Custom Table Covers Dubai | Branded Tablecloths UAE | Creative Fusion",
  description:
    "Custom printed table covers and branded tablecloths in Dubai UAE by Creative Fusion. Professional exhibition table covers for trade shows and events.",
}

export default function TableCoversPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      subcategory="Portable Displays"
      subcategorySlug="portable-displays"
      title="Table Covers"
      description="Professional custom-branded table covers and tablecloths for exhibitions, trade shows, conferences, and corporate events. Complete your booth setup with branded table displays in Dubai and UAE."
      features={[
        "Full-color custom printing",
        "Multiple size options",
        "Fitted or draped styles",
        "Wrinkle-resistant fabric",
        "Machine washable",
        "Flame retardant materials",
        "Table runner options",
        "Logo and branding",
      ]}
      benefits={[
        "Professional booth appearance",
        "Hide storage under tables",
        "Reinforce brand identity",
        "Easy to transport",
        "Reusable for all events",
        "Cost-effective solution",
      ]}
      pricing={{
        basic: {
          price: "AED 299",
          period: "one-time",
          features: ["6ft Table Cover", "Full Color Print", "Standard Fabric", "Open Back", "Basic Design"],
        },
        standard: {
          price: "AED 449",
          period: "one-time",
          features: ["6ft Fitted Cover", "Premium Fabric", "Closed Back", "Table Runner", "Professional Design"],
        },
        premium: {
          price: "AED 699",
          period: "one-time",
          features: ["8ft Stretch Cover", "Luxury Fabric", "4-Sided Print", "Matching Runner", "Custom Branding"],
        },
      }}
      process={[
        { title: "Measure Table", description: "Determine table size" },
        { title: "Design Artwork", description: "Create custom branding" },
        { title: "Print & Finish", description: "Professional production" },
        { title: "Delivery", description: "Ready for your event" },
      ]}
      faqs={[
        {
          question: "What table sizes do you offer?",
          answer: "We offer covers for 4ft, 6ft, and 8ft tables in both fitted and draped styles.",
        },
        {
          question: "Can I wash the table covers?",
          answer: "Yes, all our table covers are machine washable on gentle cycle for easy maintenance.",
        },
        {
          question: "Do you print on the back?",
          answer: "We offer both open-back (3-sided) and closed-back (4-sided) printing options.",
        },
      ]}
      relatedServices={[
        { name: "Banner Stands", slug: "banner-stands" },
        { name: "Pop-Up Displays", slug: "pop-up-displays" },
        { name: "Exhibition Furniture", slug: "/services/exhibition-stands/furniture" },
      ]}
    />
  )
}
