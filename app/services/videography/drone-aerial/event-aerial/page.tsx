import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Event Aerial | Drone Videography | Creative Fusion",
  description: "Aerial drone coverage for events. Capture the scale and energy from above.",
}

export default function EventAerialPage() {
  return (
    <CategoryPageTemplate
      title="Event Aerial"
      subtitle="Events From Above"
      description="Aerial event coverage captures the scale, energy, and atmosphere of large gatherings - concerts, festivals, corporate events, and celebrations."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Scale", description: "Show crowd size" },
        { title: "Energy", description: "Capture atmosphere" },
        { title: "Unique", description: "Perspectives unavailable otherwise" },
        { title: "Impact", description: "Impressive footage" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Event coordination" },
        { step: 2, title: "Safety", description: "Flight path planning" },
        { step: 3, title: "Live Ops", description: "Real-time operation" },
        { step: 4, title: "Capture", description: "Key moment filming" },
        { step: 5, title: "Integration", description: "Edit with ground footage" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 2,500", features: ["2 Hours", "1 Pilot", "Raw + Edit"], popular: false },
        {
          name: "Event",
          price: "AED 5,000",
          features: ["Full Day", "2 Pilots", "Multiple Flights", "Highlights"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 10,000",
          features: ["Multi-day", "Team Coverage", "Live Stream Ready", "Full Edit"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Is it safe to fly over crowds?",
          answer: "We follow strict safety protocols and regulations for crowd overflights.",
        },
        { question: "Can you live stream?", answer: "Yes, we can integrate aerial footage into live event streams." },
      ]}
      relatedCategories={[
        { name: "Event Videography", href: "/services/videography/corporate-videos/corporate-events" },
        { name: "Wedding Drone", href: "/services/videography/wedding-films/drone-wedding" },
        { name: "Sports Aerial", href: "/services/videography/drone-aerial/sports" },
      ]}
    />
  )
}
