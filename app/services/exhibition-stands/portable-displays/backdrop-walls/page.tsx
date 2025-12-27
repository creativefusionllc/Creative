import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Backdrop Walls Dubai | Step and Repeat Banners UAE | Creative Fusion",
  description:
    "Custom backdrop walls and step-and-repeat banners in Dubai UAE by Creative Fusion. Perfect for events, photo booths, exhibitions, and corporate branding.",
}

export default function BackdropWallsPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      subcategory="Portable Displays"
      subcategorySlug="portable-displays"
      title="Backdrop Walls"
      description="Professional backdrop walls and step-and-repeat banners for events, exhibitions, product launches, and photo opportunities. Create a stunning branded background in Dubai and UAE."
      features={[
        "Adjustable width & height",
        "Telescopic frame system",
        "Wrinkle-free graphics",
        "Easy tool-free setup",
        "Lightweight aluminum",
        "Custom printed graphics",
        "Portable carry bag",
        "Multiple size options",
      ]}
      benefits={[
        "Perfect for photo backdrops",
        "Professional brand presentation",
        "Reusable for multiple events",
        "Quick setup and takedown",
        "Compact storage",
        "High-impact branding",
      ]}
      pricing={{
        basic: {
          price: "AED 899",
          period: "one-time",
          features: ["8ft x 8ft Backdrop", "Fabric Print", "Telescopic Frame", "Carry Bag", "Standard Setup"],
        },
        standard: {
          price: "AED 1,499",
          period: "one-time",
          features: ["10ft x 8ft Backdrop", "Premium Fabric", "Adjustable Frame", "Hard Case", "Professional Print"],
        },
        premium: {
          price: "AED 2,499",
          period: "one-time",
          features: ["20ft x 8ft Backdrop", "Tension Fabric", "Modular System", "Rolling Case", "Installation Service"],
        },
      }}
      process={[
        { title: "Size Selection", description: "Choose backdrop dimensions" },
        { title: "Design & Print", description: "Custom graphic production" },
        { title: "Frame Setup", description: "Assemble frame system" },
        { title: "Ready to Use", description: "Delivery with instructions" },
      ]}
      faqs={[
        {
          question: "What is a step-and-repeat banner?",
          answer:
            "A step-and-repeat banner features your logo or branding repeated across the entire backdrop, commonly used for red carpet events and media walls.",
        },
        {
          question: "Can I adjust the size?",
          answer: "Yes, our telescopic frames are adjustable to multiple widths and heights to fit different spaces.",
        },
        {
          question: "Is it suitable for outdoor events?",
          answer:
            "Our standard backdrops are for indoor use. We offer weather-resistant options for outdoor events upon request.",
        },
      ]}
      relatedServices={[
        { name: "Banner Stands", slug: "banner-stands" },
        { name: "Pop-Up Displays", slug: "pop-up-displays" },
        { name: "Event Branding", slug: "/services/exhibition-stands/event-graphics" },
      ]}
    />
  )
}
