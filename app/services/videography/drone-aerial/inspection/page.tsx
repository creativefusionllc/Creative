import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Drone Inspection | Drone Videography | Creative Fusion",
  description: "Industrial and infrastructure drone inspection. Safe, efficient aerial surveys.",
}

export default function InspectionPage() {
  return (
    <CategoryPageTemplate
      title="Drone Inspection"
      subtitle="Safe, Efficient Surveys"
      description="Drone inspections provide safe, efficient ways to survey buildings, infrastructure, and equipment without scaffolding or dangerous access."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Safety", description: "No human risk" },
        { title: "Efficiency", description: "Faster than traditional" },
        { title: "Detail", description: "High-res capture" },
        { title: "Cost", description: "Reduced inspection costs" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Inspection scope" },
        { step: 2, title: "Risk Assessment", description: "Safety protocols" },
        { step: 3, title: "Flight", description: "Systematic coverage" },
        { step: 4, title: "Analysis", description: "Issue identification" },
        { step: 5, title: "Report", description: "Detailed documentation" },
      ]}
      pricing={[
        {
          name: "Building",
          price: "AED 3,000",
          features: ["Single Structure", "Visual Report", "Photo Documentation"],
          popular: false,
        },
        {
          name: "Facility",
          price: "AED 8,000",
          features: ["Multiple Structures", "Thermal Imaging", "Detailed Report"],
          popular: true,
        },
        {
          name: "Industrial",
          price: "AED 20,000",
          features: ["Full Site Survey", "3D Mapping", "Engineering Report", "Regular Schedule"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What can drones inspect?",
          answer: "Roofs, facades, towers, power lines, solar panels, wind turbines, and more.",
        },
        {
          question: "Do you offer thermal imaging?",
          answer: "Yes, thermal cameras detect issues invisible to regular cameras.",
        },
      ]}
      relatedCategories={[
        { name: "Construction Aerial", href: "/services/videography/drone-aerial/construction" },
        { name: "3D Mapping", href: "/services/videography/drone-aerial/mapping" },
        { name: "Solar Inspection", href: "/services/videography/drone-aerial/solar" },
      ]}
    />
  )
}
