import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Construction Aerial | Drone Videography | Creative Fusion",
  description: "Construction site drone documentation. Progress monitoring and promotional footage.",
}

export default function ConstructionPage() {
  return (
    <CategoryPageTemplate
      title="Construction Aerial"
      subtitle="Document Progress From Above"
      description="Construction aerial documentation tracks project progress, creates promotional content, and provides stakeholder updates from unique perspectives."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Progress", description: "Track development" },
        { title: "Documentation", description: "Visual records" },
        { title: "Marketing", description: "Pre-sale content" },
        { title: "Stakeholder", description: "Remote updates" },
      ]}
      process={[
        { step: 1, title: "Schedule", description: "Regular flight planning" },
        { step: 2, title: "Permits", description: "Site authorization" },
        { step: 3, title: "Capture", description: "Consistent angles" },
        { step: 4, title: "Processing", description: "Comparison tools" },
        { step: 5, title: "Reporting", description: "Progress reports" },
      ]}
      pricing={[
        {
          name: "Single Visit",
          price: "AED 2,000",
          features: ["1 Flight", "Photos + Video", "Basic Report"],
          popular: false,
        },
        {
          name: "Monthly",
          price: "AED 6,000",
          features: ["4 Visits", "Progress Comparison", "Timelapse Start"],
          popular: true,
        },
        {
          name: "Project",
          price: "AED 25,000",
          features: ["Weekly Visits", "Full Documentation", "Complete Timelapse", "3D Mapping"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you create timelapses?",
          answer: "Yes, we compile footage into compelling construction timelapses.",
        },
        {
          question: "Do you provide measurements?",
          answer: "We offer photogrammetry and 3D mapping for volumetric analysis.",
        },
      ]}
      relatedCategories={[
        { name: "Real Estate Aerial", href: "/services/videography/drone-aerial/real-estate-aerial" },
        { name: "Inspection", href: "/services/videography/drone-aerial/inspection" },
        { name: "3D Mapping", href: "/services/videography/drone-aerial/mapping" },
      ]}
    />
  )
}
