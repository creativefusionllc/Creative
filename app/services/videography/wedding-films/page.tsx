import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Wedding Videography Dubai | Cinematic Wedding Films | Creative Fusion LLC",
  description:
    "Professional wedding videography in Dubai UAE. Cinematic wedding films, highlight reels, and full ceremony coverage.",
  keywords: ["wedding videography dubai", "wedding film uae", "wedding video dubai", "cinematic wedding sharjah"],
}

export default function WeddingFilmsPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="Wedding Videography"
      subtitle="Your Love Story in Motion"
      description="Cinematic storytelling with elegance and authenticity for your special day. Capture every precious moment."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Full Day Coverage", description: "From preparation to first dance and beyond" },
        { title: "Cinematic Highlight Film", description: "3-5 minute emotional highlight reel" },
        { title: "Ceremony Edit", description: "Complete ceremony documentation" },
        { title: "Reception Coverage", description: "Speeches, toasts, and celebrations" },
        { title: "Drone Footage", description: "Stunning aerial perspectives" },
        { title: "Same-Day Edit", description: "Preview video for reception screening" },
      ]}
      pricingTiers={[
        {
          name: "Essential",
          price: "AED 6,000",
          description: "6 hours coverage",
          features: ["6 hours coverage", "3-min highlight", "Ceremony edit", "Digital delivery"],
        },
        {
          name: "Premium",
          price: "AED 12,000",
          description: "Full day coverage",
          features: [
            "10 hours coverage",
            "5-min highlight",
            "Full ceremony",
            "Reception coverage",
            "Drone footage",
            "Same-day edit",
          ],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 20,000",
          description: "Complete package",
          features: [
            "Full weekend",
            "10-min feature film",
            "Documentary edit",
            "Multiple cameras",
            "Live streaming",
            "Premium USB delivery",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
        { title: "Drone Footage", href: "/services/videography/drone-footage" },
      ]}
    />
  )
}
