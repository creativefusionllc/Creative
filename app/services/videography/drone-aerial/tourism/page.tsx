import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Tourism Aerial | Drone Videography | Creative Fusion",
  description: "Tourism and destination drone videography. Stunning footage that inspires travel.",
}

export default function TourismPage() {
  return (
    <CategoryPageTemplate
      title="Tourism Aerial"
      subtitle="Destinations That Inspire"
      description="Tourism aerial videography showcases destinations, resorts, and attractions from breathtaking perspectives that inspire travel and bookings."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Inspire", description: "Create wanderlust" },
        { title: "Showcase", description: "Full destination view" },
        { title: "Bookings", description: "Drive reservations" },
        { title: "Quality", description: "Broadcast-ready footage" },
      ]}
      process={[
        { step: 1, title: "Location Scout", description: "Best viewpoints" },
        { step: 2, title: "Permits", description: "Destination clearance" },
        { step: 3, title: "Filming", description: "Golden hour priority" },
        { step: 4, title: "Grading", description: "Cinematic color" },
        { step: 5, title: "Delivery", description: "Marketing-ready" },
      ]}
      pricing={[
        { name: "Location", price: "AED 3,500", features: ["1 Location", "2 min Edit", "Social Cuts"], popular: false },
        {
          name: "Destination",
          price: "AED 8,000",
          features: ["3-5 Locations", "5 min Edit", "Promo Package"],
          popular: true,
        },
        {
          name: "Campaign",
          price: "AED 20,000",
          features: ["Full Destination", "10 min Film", "Seasonal Coverage", "Multi-format"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you film in remote areas?",
          answer: "Yes, we have experience in diverse terrains and challenging locations.",
        },
        {
          question: "What about drone restrictions?",
          answer: "We handle all permits and work within local aviation regulations.",
        },
      ]}
      relatedCategories={[
        { name: "Hotel Aerial", href: "/services/videography/drone-aerial/hospitality" },
        { name: "Resort Tours", href: "/services/photography/360-degree/hospitality-360" },
        { name: "Promotional Videos", href: "/services/videography/corporate-videos/brand-story" },
      ]}
    />
  )
}
