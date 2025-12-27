import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Real Estate Aerial | Drone Videography | Creative Fusion",
  description: "Aerial drone videography for real estate. Stunning property and location footage.",
}

export default function RealEstateAerialPage() {
  return (
    <CategoryPageTemplate
      title="Real Estate Aerial"
      subtitle="Properties From Above"
      description="Aerial drone videography showcases properties, neighborhoods, and amenities from stunning perspectives that ground-level shots cannot capture."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Scale", description: "Show property size" },
        { title: "Location", description: "Neighborhood context" },
        { title: "Premium", description: "High-end presentation" },
        { title: "Engagement", description: "More listing views" },
      ]}
      process={[
        { step: 1, title: "Survey", description: "Property assessment" },
        { step: 2, title: "Permits", description: "Flight authorization" },
        { step: 3, title: "Filming", description: "Aerial capture" },
        { step: 4, title: "Edit", description: "Professional post" },
        { step: 5, title: "Delivery", description: "Multiple formats" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 1,500", features: ["15 min Flight", "60 sec Edit", "4K Video"], popular: false },
        {
          name: "Standard",
          price: "AED 3,000",
          features: ["30 min Flight", "2 min Edit", "Photos Included", "Neighborhood"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 6,000",
          features: ["Full Coverage", "5 min Edit", "Twilight Option", "Community Tour"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What drone do you use?",
          answer: "Professional DJI drones with 4K/6K cameras and obstacle avoidance.",
        },
        { question: "Can you fly at sunset?", answer: "Yes, twilight and golden hour shoots create stunning footage." },
      ]}
      relatedCategories={[
        { name: "Real Estate Photography", href: "/services/photography/real-estate" },
        { name: "Construction Aerial", href: "/services/videography/drone-aerial/construction" },
        { name: "Event Aerial", href: "/services/videography/drone-aerial/event-aerial" },
      ]}
    />
  )
}
