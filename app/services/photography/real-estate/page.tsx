import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Real Estate Photography Dubai | Property & Interior Shots | Creative Fusion LLC",
  description:
    "Professional real estate photography in Dubai UAE. High-resolution property photos, interior shots, and architectural photography for listings and portfolios.",
  keywords: [
    "real estate photography dubai",
    "property photography uae",
    "interior photography dubai",
    "architectural photography sharjah",
  ],
}

export default function RealEstatePhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="Real Estate Photography"
      subtitle="Showcase Properties Beautifully"
      description="High-resolution, wide-angle shots with minimal distortion. Perfect for property listings, architectural showcases, and interior design portfolios."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Wide-Angle Interior Shots",
          description: "Capture spacious interiors with professional wide-angle lenses",
        },
        {
          title: "Exterior & Facade Photography",
          description: "Stunning building exteriors and architectural details",
        },
        { title: "Twilight & Dusk Photography", description: "Dramatic lighting for premium property listings" },
        { title: "Aerial Drone Shots", description: "Bird's eye views of properties and surroundings" },
        { title: "Virtual Staging", description: "Digital furniture placement for vacant properties" },
        { title: "Floor Plan Photography", description: "Clear overhead shots for layout documentation" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 800",
          description: "Up to 15 photos, basic editing",
          features: ["15 edited photos", "Interior shots", "Basic retouching", "24-48hr delivery"],
        },
        {
          name: "Standard",
          price: "AED 1,500",
          description: "Up to 30 photos + twilight",
          features: [
            "30 edited photos",
            "Interior & exterior",
            "Twilight shots",
            "Advanced editing",
            "Same-day delivery",
          ],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 3,000",
          description: "Full property coverage",
          features: [
            "Unlimited photos",
            "Drone aerial shots",
            "Virtual staging",
            "Video walkthrough",
            "Priority delivery",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "360-Degree Photography", href: "/services/photography/360-degree" },
        { title: "Corporate Photography", href: "/services/photography/corporate" },
      ]}
    />
  )
}
