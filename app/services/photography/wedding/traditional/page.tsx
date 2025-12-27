import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Traditional Wedding Photography | Wedding Photography | Creative Fusion",
  description: "Professional photography for traditional and cultural wedding ceremonies.",
}

export default function TraditionalPage() {
  return (
    <CategoryPageTemplate
      title="Traditional Wedding Photography"
      description="Expert photography for traditional weddings honoring cultural ceremonies, rituals, and customs from around the world."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Cultural Expertise", description: "Understand traditions" },
        { title: "Ritual Coverage", description: "Every ceremony moment" },
        { title: "Family Focus", description: "Multi-generational portraits" },
        { title: "Color Celebration", description: "Vibrant cultural attire" },
      ]}
      process={[
        { step: 1, title: "Cultural Brief", description: "Understand traditions" },
        { step: 2, title: "Timeline", description: "Plan for all rituals" },
        { step: 3, title: "Pre-Events", description: "Henna, Mehndi, etc." },
        { step: 4, title: "Ceremony", description: "All rituals covered" },
        { step: 5, title: "Reception", description: "Celebration coverage" },
      ]}
      pricing={[
        {
          name: "Single Day",
          price: "AED 5,000",
          features: ["Full day", "300 photos", "All ceremonies", "Family portraits"],
        },
        {
          name: "Multi-Event",
          price: "AED 10,000",
          features: ["2-3 days", "600+ photos", "All events", "2 photographers"],
          popular: true,
        },
        {
          name: "Grand Wedding",
          price: "AED 18,000",
          features: ["4-5 days", "1000+ photos", "Full team", "Video included"],
        },
      ]}
      faqs={[
        {
          question: "What traditions do you cover?",
          answer: "We photograph Arab, Indian, Pakistani, Filipino, and all cultural weddings.",
        },
        {
          question: "Do you cover pre-wedding ceremonies?",
          answer: "Yes, we cover Henna nights, Sangeet, Mehndi, and all pre-wedding events.",
        },
      ]}
      relatedCategories={[
        { name: "Arab Weddings", href: "/services/photography/wedding/arab" },
        { name: "Indian Weddings", href: "/services/photography/wedding/indian" },
        { name: "Multi-Day Events", href: "/services/photography/wedding/multi-day" },
      ]}
    />
  )
}
