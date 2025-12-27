import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Aerial Drone Photography Dubai | Property Aerials | Creative Fusion LLC",
  description:
    "Professional drone and aerial photography for real estate. Stunning bird's eye views of properties, developments, and surrounding areas.",
  keywords: [
    "aerial photography dubai",
    "drone photography real estate",
    "property aerial shots uae",
    "drone photography",
  ],
}

export default function AerialPhotographyPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Photography", href: "/services/photography" },
        subService: { title: "Real Estate Photography", href: "/services/photography/real-estate" },
      }}
      title="Aerial & Drone Photography"
      subtitle="Bird's Eye View"
      description="Stunning aerial perspectives that showcase properties from above. Professional drone photography for real estate, developments, and large estates."
      heroImage="/drone-aerial-photography-property.jpg"
      benefits={[
        "Licensed drone operators",
        "4K resolution photos",
        "Show property context",
        "Highlight land size",
        "Neighborhood overview",
        "DCAA compliant",
      ]}
      process={[
        { step: 1, title: "Flight Planning", description: "Map flight path and shot list" },
        { step: 2, title: "Permits & Safety", description: "Ensure all regulations met" },
        { step: 3, title: "Aerial Session", description: "Multiple altitudes and angles" },
        { step: 4, title: "Processing", description: "Color grading and selection" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: [
          "Up to 20 aerial photos",
          "Multiple flight heights",
          "4K resolution",
          "Professional editing",
          "Location mapping",
          "Same-day preview",
        ],
      }}
      faqs={[
        {
          question: "Do you have proper permits?",
          answer: "Yes, we are fully licensed and insured for commercial drone operations in the UAE.",
        },
        {
          question: "Can you fly in restricted areas?",
          answer: "We handle all permit applications for restricted zones and can advise on feasibility.",
        },
        {
          question: "What's the maximum altitude?",
          answer: "We operate within legal limits (typically 120m) which provides excellent coverage.",
        },
      ]}
      relatedCategories={[
        { title: "Interior Photography", href: "/services/photography/real-estate/interior" },
        { title: "Exterior Photography", href: "/services/photography/real-estate/exterior" },
        { title: "Virtual Tours", href: "/services/photography/real-estate/virtual-tours" },
      ]}
    />
  )
}
