import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Virtual Tour Photography Dubai | 360 Property Tours | Creative Fusion LLC",
  description:
    "Immersive 360-degree virtual tours for real estate. Interactive walkthroughs that let buyers explore properties from anywhere.",
  keywords: ["virtual tour dubai", "360 photography real estate", "property virtual tour uae", "matterport dubai"],
}

export default function VirtualToursPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Photography", href: "/services/photography" },
        subService: { title: "Real Estate Photography", href: "/services/photography/real-estate" },
      }}
      title="360° Virtual Tours"
      subtitle="Immersive Experience"
      description="Interactive virtual tours that let potential buyers explore properties from anywhere in the world. Increase engagement and qualified leads."
      heroImage="/360-virtual-tour-real-estate.jpg"
      benefits={[
        "24/7 property access",
        "Reduce unqualified viewings",
        "Global buyer reach",
        "Embed on any website",
        "Mobile & VR compatible",
        "Analytics & insights",
      ]}
      process={[
        { step: 1, title: "Space Scan", description: "Capture property with 360 cameras" },
        { step: 2, title: "Tour Creation", description: "Stitch and optimize images" },
        { step: 3, title: "Hotspots", description: "Add interactive elements" },
        { step: 4, title: "Delivery", description: "Host and embed code provided" },
      ]}
      pricing={{
        startingFrom: "AED 2,000",
        includes: [
          "Up to 10 rooms/spaces",
          "Interactive floor plan",
          "Hotspot information",
          "Website embed code",
          "1-year hosting",
          "Analytics dashboard",
        ],
      }}
      faqs={[
        {
          question: "How long does it take to create?",
          answer: "Shooting takes 1-2 hours, processing and delivery within 48-72 hours.",
        },
        { question: "Can we update the tour later?", answer: "Yes, we can re-scan and update tours as spaces change." },
        { question: "Is hosting included?", answer: "Yes, we include 1 year of hosting with options to extend." },
      ]}
      relatedCategories={[
        { title: "Interior Photography", href: "/services/photography/real-estate/interior" },
        { title: "Aerial Photography", href: "/services/photography/real-estate/aerial" },
        { title: "Floor Plans", href: "/services/photography/real-estate/floor-plans" },
      ]}
    />
  )
}
