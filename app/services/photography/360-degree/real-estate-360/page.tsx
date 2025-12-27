import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Real Estate 360 Photography | 360-Degree | Creative Fusion",
  description: "360-degree photography for real estate. Virtual property tours that sell homes faster.",
}

export default function RealEstate360Page() {
  return (
    <CategoryPageTemplate
      title="Real Estate 360 Photography"
      subtitle="Sell Properties Faster"
      description="360-degree real estate photography allows potential buyers to virtually walk through properties, increasing engagement and pre-qualifying serious buyers."
      parentService={{ name: "Photography", href: "/services/photography" }}
      subService={{ name: "360-Degree Photography", href: "/services/photography/360-degree" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "More Views", description: "Increase listing engagement" },
        { title: "Qualified Leads", description: "Pre-screen buyers remotely" },
        { title: "Faster Sales", description: "Reduce time on market" },
        { title: "Stand Out", description: "Differentiate listings" },
      ]}
      process={[
        { step: 1, title: "Staging", description: "Property preparation" },
        { step: 2, title: "Capture", description: "Room-by-room photography" },
        { step: 3, title: "Processing", description: "Image enhancement" },
        { step: 4, title: "Tour Creation", description: "Building virtual tour" },
        { step: 5, title: "Integration", description: "MLS and website embed" },
      ]}
      pricing={[
        {
          name: "Apartment",
          price: "AED 1,200",
          features: ["Up to 8 Rooms", "Basic Tour", "MLS Ready"],
          popular: false,
        },
        {
          name: "Villa",
          price: "AED 2,500",
          features: ["Up to 15 Rooms", "Floor Plan", "Exterior 360", "Featured Listing"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 5,000",
          features: ["Unlimited Rooms", "Drone Exterior", "Dollhouse View", "Premium Hosting"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long does a property tour take?",
          answer: "Photography takes 1-3 hours depending on size; delivery within 48-72 hours.",
        },
        {
          question: "Do you integrate with MLS?",
          answer: "Yes, we provide embed codes compatible with all major MLS platforms.",
        },
      ]}
      relatedCategories={[
        { name: "Virtual Tours", href: "/services/photography/360-degree/virtual-tours" },
        { name: "Real Estate Photography", href: "/services/photography/real-estate" },
        { name: "Hospitality 360", href: "/services/photography/360-degree/hospitality-360" },
      ]}
    />
  )
}
