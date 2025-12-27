import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Drone Videography Dubai | Aerial Footage | Creative Fusion LLC",
  description:
    "Professional drone videography in Dubai UAE. Stunning aerial footage for real estate, events, commercials, and cinematic productions.",
  keywords: ["drone videography dubai", "aerial footage uae", "drone filming dubai", "aerial video sharjah"],
}

export default function DroneFootagePage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="Drone & Aerial Footage"
      subtitle="Stunning Aerial Perspectives"
      description="Stunning aerial perspectives with DJI Inspire 3 drones. Perfect for real estate, events, and cinematic sequences."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Real Estate Aerials", description: "Property and neighborhood overviews" },
        { title: "Event Coverage", description: "Unique aerial angles of gatherings" },
        { title: "Construction Progress", description: "Site documentation and time-lapses" },
        { title: "Cinematic B-Roll", description: "Dramatic establishing shots" },
        { title: "Survey & Mapping", description: "Technical aerial documentation" },
        { title: "4K/6K Quality", description: "Ultra-high resolution footage" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 1,500",
          description: "2 hours flight",
          features: ["2 hours flight time", "Raw footage", "Basic editing", "1 location"],
        },
        {
          name: "Professional",
          price: "AED 3,500",
          description: "Half day",
          features: [
            "4 hours flight time",
            "Multiple locations",
            "Full editing",
            "Cinematic color grading",
            "Licensed music",
          ],
          popular: true,
        },
        {
          name: "Production",
          price: "AED 6,000",
          description: "Full day",
          features: [
            "Full day coverage",
            "Unlimited locations",
            "4K/6K delivery",
            "Time-lapse option",
            "Priority editing",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Wedding Films", href: "/services/videography/wedding-films" },
        { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      ]}
    />
  )
}
