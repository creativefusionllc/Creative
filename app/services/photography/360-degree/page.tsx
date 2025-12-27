import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "360-Degree Photography Dubai | Virtual Tours | Creative Fusion LLC",
  description:
    "Professional 360-degree photography in Dubai UAE. Virtual tours, interactive experiences for real estate, hospitality, and retail spaces.",
  keywords: [
    "360 photography dubai",
    "virtual tour uae",
    "interactive photography dubai",
    "google street view photographer sharjah",
  ],
}

export default function ThreeSixtyPhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="360-Degree Photography"
      subtitle="Immersive Virtual Experiences"
      description="Immersive visuals for virtual tours and interactive experiences. Perfect for real estate, hospitality, and retail spaces."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        { title: "Virtual Property Tours", description: "Walk-through experiences for real estate" },
        { title: "Google Street View", description: "Business interior tours on Google Maps" },
        { title: "Interactive Floor Plans", description: "Clickable room-by-room navigation" },
        { title: "Hotspot Integration", description: "Add info points, videos, and links" },
        { title: "VR Ready Output", description: "Compatible with VR headsets" },
        { title: "Embedding & Sharing", description: "Easy website integration and social sharing" },
      ]}
      pricingTiers={[
        {
          name: "Basic Tour",
          price: "AED 1,500",
          description: "Up to 10 scenes",
          features: ["10 panoramic scenes", "Basic navigation", "Web hosting", "Embed code"],
        },
        {
          name: "Professional",
          price: "AED 3,500",
          description: "Up to 25 scenes",
          features: [
            "25 panoramic scenes",
            "Floor plan integration",
            "Info hotspots",
            "Google Street View",
            "Custom branding",
          ],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 7,000",
          description: "Unlimited scenes",
          features: [
            "Unlimited scenes",
            "Multiple locations",
            "VR compatibility",
            "Analytics dashboard",
            "Priority support",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Real Estate Photography", href: "/services/photography/real-estate" },
        { title: "Product Photography", href: "/services/photography/product" },
      ]}
    />
  )
}
