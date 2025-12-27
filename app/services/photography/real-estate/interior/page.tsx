import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Interior Photography Dubai | Real Estate Interiors | Creative Fusion LLC",
  description:
    "Professional interior photography for real estate, hospitality, and design portfolios. Showcase spaces with expert lighting and composition.",
  keywords: [
    "interior photography dubai",
    "real estate interior photos",
    "property photography uae",
    "interior design photography",
  ],
}

export default function InteriorPhotographyPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Photography", href: "/services/photography" },
        subService: { title: "Real Estate Photography", href: "/services/photography/real-estate" },
      }}
      title="Interior Photography"
      subtitle="Showcase Spaces"
      description="Professional interior photography that highlights architectural details, design elements, and spatial flow. Perfect for listings, portfolios, and marketing."
      heroImage="/interior-photography-real-estate-luxury.jpg"
      benefits={[
        "Professional wide-angle shots",
        "Expert lighting techniques",
        "Color-accurate representation",
        "HDR photography included",
        "Virtual staging available",
        "Same-day delivery option",
      ]}
      process={[
        { step: 1, title: "Site Assessment", description: "Evaluate space and lighting conditions" },
        { step: 2, title: "Staging Review", description: "Optimize furniture and decor placement" },
        { step: 3, title: "Professional Shoot", description: "Capture all angles with pro equipment" },
        { step: 4, title: "Post-Processing", description: "Color correction and enhancements" },
      ]}
      pricing={{
        startingFrom: "AED 800",
        includes: [
          "Up to 10 edited photos",
          "Wide-angle coverage",
          "HDR processing",
          "Color correction",
          "Web & print resolution",
          "24-hour delivery",
        ],
      }}
      faqs={[
        {
          question: "How should we prepare the space?",
          answer: "Declutter, clean surfaces, and ensure all lights are working. We provide a detailed prep checklist.",
        },
        {
          question: "Do you offer virtual staging?",
          answer: "Yes, we can digitally furnish empty spaces to help buyers visualize the potential.",
        },
        {
          question: "What equipment do you use?",
          answer: "Professional full-frame cameras with tilt-shift lenses and professional lighting equipment.",
        },
      ]}
      relatedCategories={[
        { title: "Exterior Photography", href: "/services/photography/real-estate/exterior" },
        { title: "Aerial Photography", href: "/services/photography/real-estate/aerial" },
        { title: "Virtual Tours", href: "/services/photography/real-estate/virtual-tours" },
      ]}
    />
  )
}
