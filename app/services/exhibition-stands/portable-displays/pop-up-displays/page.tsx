import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Pop-Up Displays Dubai | Trade Show Pop-Ups UAE | Creative Fusion",
  description:
    "Professional pop-up displays for exhibitions and trade shows in Dubai UAE. Creative Fusion designs custom pop-up booths with stunning graphics and easy setup.",
}

export default function PopUpDisplaysPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      subcategory="Portable Displays"
      subcategorySlug="portable-displays"
      title="Pop-Up Displays"
      description="Create an impressive exhibition presence with our professional pop-up displays. Portable, easy to assemble, and featuring stunning full-color graphics for trade shows across Dubai and UAE."
      features={[
        "Magnetic frame system",
        "Curved or straight options",
        "Full graphic coverage",
        "Tool-free assembly",
        "Wheeled carry case",
        "LED lighting options",
        "Multiple sizes available",
        "Fabric or vinyl graphics",
      ]}
      benefits={[
        "Set up in under 15 minutes",
        "Professional trade show look",
        "Lightweight and portable",
        "Reusable for years",
        "Seamless graphic appearance",
        "Custom branding",
      ]}
      pricing={{
        basic: {
          price: "AED 2,999",
          period: "one-time",
          features: ["3x3 Straight Pop-Up", "Fabric Graphics", "Magnetic Bars", "Wheeled Case", "Basic Setup"],
        },
        standard: {
          price: "AED 4,999",
          period: "one-time",
          features: ["3x3 Curved Pop-Up", "Premium Graphics", "LED Spotlights", "Hard Case", "Professional Setup"],
        },
        premium: {
          price: "AED 8,999",
          period: "one-time",
          features: ["5x3 Curved Pop-Up", "Tension Fabric", "LED Backlit", "Counter & Shelves", "Full Installation"],
        },
      }}
      process={[
        { title: "Design Creation", description: "Custom graphic design" },
        { title: "Graphic Production", description: "High-resolution printing" },
        { title: "Frame Assembly", description: "Quality frame setup" },
        { title: "Delivery & Training", description: "Setup demonstration" },
      ]}
      faqs={[
        {
          question: "How long does setup take?",
          answer: "Pop-up displays can be fully assembled by one person in 10-15 minutes with no tools required.",
        },
        {
          question: "Can graphics be replaced?",
          answer: "Yes, you can order new graphics separately to refresh your display for different events.",
        },
        {
          question: "Do you offer installation services?",
          answer:
            "Yes, we provide professional installation and dismantling services for all exhibitions in Dubai and UAE.",
        },
      ]}
      relatedServices={[
        { name: "Banner Stands", slug: "banner-stands" },
        { name: "Backdrop Walls", slug: "backdrop-walls" },
        { name: "Trade Show Booths", slug: "/services/exhibition-stands/modular-systems" },
      ]}
    />
  )
}
