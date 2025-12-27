import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Destination Wedding Photography | Wedding Photography | Creative Fusion",
  description: "Professional photography for destination weddings worldwide.",
}

export default function DestinationPage() {
  return (
    <CategoryPageTemplate
      title="Destination Wedding Photography"
      description="Capture your destination wedding in stunning locations worldwide with professional travel-ready photographers."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Global Coverage", description: "We travel worldwide" },
        { title: "Location Expertise", description: "Scout best spots" },
        { title: "Extended Coverage", description: "Multi-day packages" },
        { title: "Adventure Ready", description: "Any terrain, any weather" },
      ]}
      process={[
        { step: 1, title: "Destination Chat", description: "Understand location" },
        { step: 2, title: "Travel Planning", description: "Logistics and timeline" },
        { step: 3, title: "Pre-Wedding", description: "Location shoots" },
        { step: 4, title: "Wedding Day", description: "Full coverage" },
        { step: 5, title: "Post-Wedding", description: "Additional sessions" },
      ]}
      pricing={[
        {
          name: "Nearby",
          price: "AED 12,000",
          features: ["UAE/GCC", "Full day", "2 photographers", "Travel included"],
        },
        {
          name: "International",
          price: "AED 18,000",
          features: ["Worldwide", "2-day coverage", "Pre-wedding shoot", "Video option"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 30,000",
          features: ["3+ days", "Full team", "Drone coverage", "Cinematic video"],
        },
      ]}
      faqs={[
        {
          question: "What's included in travel costs?",
          answer: "Flights, accommodation, and local transport are included in our packages.",
        },
        {
          question: "Do you scout locations beforehand?",
          answer: "Yes, we arrive early to scout the best spots for your photos.",
        },
      ]}
      relatedCategories={[
        { name: "Beach Weddings", href: "/services/photography/wedding/beach" },
        { name: "Mountain Weddings", href: "/services/photography/wedding/mountain" },
        { name: "Resort Weddings", href: "/services/photography/wedding/resort" },
      ]}
    />
  )
}
