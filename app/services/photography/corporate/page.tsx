import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Corporate Photography Dubai | Business Portraits & Events | Creative Fusion LLC",
  description:
    "Professional corporate photography in Dubai UAE. Executive portraits, team photos, office environments, and business event coverage.",
  keywords: [
    "corporate photography dubai",
    "business portraits uae",
    "executive headshots dubai",
    "team photography sharjah",
  ],
}

export default function CorporatePhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="Corporate & Commercial Photography"
      subtitle="Professional Business Imagery"
      description="Professional portraits, team photos, and office environment shots that showcase your company culture and professionalism."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        { title: "Executive Headshots", description: "Professional portraits for leadership and LinkedIn profiles" },
        { title: "Team Photography", description: "Group photos and individual team member portraits" },
        { title: "Office Environment", description: "Workspace and culture documentation" },
        { title: "Corporate Events", description: "Conferences, meetings, and company celebrations" },
        { title: "Annual Report Photos", description: "High-quality imagery for corporate publications" },
        { title: "On-Location Shoots", description: "Photography at your office or preferred location" },
      ]}
      pricingTiers={[
        {
          name: "Headshots",
          price: "AED 500",
          description: "Individual executive portraits",
          features: ["5 edited photos", "Studio or on-site", "Basic retouching", "Digital delivery"],
        },
        {
          name: "Team Package",
          price: "AED 2,500",
          description: "Up to 15 team members",
          features: ["Individual headshots", "Group photo", "Office environment shots", "All files delivered"],
          popular: true,
        },
        {
          name: "Corporate Full",
          price: "AED 5,000",
          description: "Complete business coverage",
          features: [
            "Unlimited headshots",
            "Multiple group photos",
            "Office documentation",
            "Event coverage",
            "Priority editing",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Event Photography", href: "/services/photography/event" },
        { title: "Product Photography", href: "/services/photography/product" },
      ]}
    />
  )
}
