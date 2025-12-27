import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Wedding Photography Dubai | Cinematic Wedding Photos | Creative Fusion LLC",
  description:
    "Professional wedding photography in Dubai UAE. Cinematic captures, engagement shoots, and complete wedding day coverage for timeless memories.",
  keywords: [
    "wedding photography dubai",
    "wedding photographer uae",
    "engagement photos dubai",
    "bridal photography sharjah",
  ],
}

export default function WeddingPhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="Wedding Photography"
      subtitle="Capture Your Special Day"
      description="Cinematic and emotive captures for timeless memories. We document your special day with artistry and attention to every precious moment."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        { title: "Full Day Coverage", description: "From preparation to reception, every moment captured" },
        { title: "Engagement Sessions", description: "Pre-wedding photo shoots at beautiful locations" },
        { title: "Bridal Portraits", description: "Stunning individual and couple portraits" },
        { title: "Candid Moments", description: "Natural, unposed captures of genuine emotions" },
        { title: "Detail Photography", description: "Rings, décor, dress, and all the special details" },
        { title: "Photo Albums", description: "Premium printed albums and digital galleries" },
      ]}
      pricingTiers={[
        {
          name: "Essential",
          price: "AED 4,000",
          description: "4 hours coverage",
          features: ["4 hours coverage", "200+ edited photos", "Online gallery", "Digital delivery"],
        },
        {
          name: "Premium",
          price: "AED 8,000",
          description: "Full day coverage",
          features: [
            "8 hours coverage",
            "500+ edited photos",
            "Engagement session",
            "Premium album",
            "Second photographer",
          ],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 15,000",
          description: "Complete wedding package",
          features: [
            "Full weekend coverage",
            "1000+ edited photos",
            "Engagement + bridal",
            "2 premium albums",
            "Drone coverage",
            "Same-day preview",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Event Photography", href: "/services/photography/event" },
        { title: "Corporate Photography", href: "/services/photography/corporate" },
      ]}
    />
  )
}
