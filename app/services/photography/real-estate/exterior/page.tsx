import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Exterior Photography Dubai | Property Exteriors | Creative Fusion LLC",
  description:
    "Professional exterior and architectural photography. Capture buildings, facades, and landscapes with stunning quality for real estate marketing.",
  keywords: [
    "exterior photography dubai",
    "architectural photography",
    "property exterior photos uae",
    "building photography",
  ],
}

export default function ExteriorPhotographyPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Photography", href: "/services/photography" },
        subService: { title: "Real Estate Photography", href: "/services/photography/real-estate" },
      }}
      title="Exterior Photography"
      subtitle="Architectural Excellence"
      description="Stunning exterior and architectural photography that captures the grandeur of properties. Perfect for real estate listings, architectural portfolios, and marketing materials."
      heroImage="/exterior-architecture-photography-building.jpg"
      benefits={[
        "Golden hour & twilight shots",
        "Drone aerial perspectives",
        "Weather-perfect scheduling",
        "Architectural details",
        "Landscape integration",
        "Premium post-processing",
      ]}
      process={[
        { step: 1, title: "Location Scout", description: "Identify best angles and timing" },
        { step: 2, title: "Weather Planning", description: "Schedule for optimal conditions" },
        { step: 3, title: "Multi-Angle Shoot", description: "Ground and aerial coverage" },
        { step: 4, title: "Expert Editing", description: "Sky replacement if needed" },
      ]}
      pricing={{
        startingFrom: "AED 1,200",
        includes: [
          "Up to 15 edited photos",
          "Golden hour session",
          "Multiple angles",
          "Sky enhancement",
          "Drone shots (optional)",
          "48-hour delivery",
        ],
      }}
      faqs={[
        {
          question: "What's the best time for exterior shots?",
          answer: "Golden hour (sunrise/sunset) and twilight provide the most dramatic and appealing lighting.",
        },
        {
          question: "Do you include drone photography?",
          answer: "Drone/aerial shots are available as an add-on for comprehensive property coverage.",
        },
        {
          question: "What if the weather is bad?",
          answer: "We reschedule at no extra cost, or can enhance skies in post-production.",
        },
      ]}
      relatedCategories={[
        { title: "Interior Photography", href: "/services/photography/real-estate/interior" },
        { title: "Aerial Photography", href: "/services/photography/real-estate/aerial" },
        { title: "Twilight Photography", href: "/services/photography/real-estate/twilight" },
      ]}
    />
  )
}
