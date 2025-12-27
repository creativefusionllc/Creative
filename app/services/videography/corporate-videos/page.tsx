import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Corporate Video Production Dubai | Company Videos | Creative Fusion LLC",
  description:
    "Professional corporate video production in Dubai UAE. Company profiles, brand stories, training videos, and internal communications.",
  keywords: ["corporate video dubai", "company video production uae", "brand video dubai", "training video sharjah"],
}

export default function CorporateVideosPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="Corporate Videos"
      subtitle="Tell Your Brand Story"
      description="Polished videos highlighting company culture, services, and brand story. Perfect for websites, presentations, and internal communications."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Company Profile Videos", description: "Showcase your business, mission, and values" },
        { title: "Brand Story Films", description: "Emotional narratives that connect with audiences" },
        { title: "Training & Onboarding", description: "Educational content for employees" },
        { title: "Testimonial Videos", description: "Customer and client success stories" },
        { title: "CEO Messages", description: "Leadership communications and announcements" },
        { title: "Recruitment Videos", description: "Attract top talent with culture showcases" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 5,000",
          description: "1-2 minute video",
          features: ["1-2 min duration", "1 day filming", "Basic editing", "Background music", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 12,000",
          description: "3-5 minute video",
          features: [
            "3-5 min duration",
            "2 days filming",
            "Motion graphics",
            "Voice-over",
            "Drone footage",
            "Unlimited revisions",
          ],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 25,000",
          description: "Full brand film",
          features: [
            "5-10 min duration",
            "Multi-day filming",
            "Cinematic quality",
            "Professional actors",
            "Multiple versions",
            "Full production crew",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "TV Commercials", href: "/services/videography/tv-commercials" },
        { title: "Product Videos", href: "/services/videography/product-videos" },
      ]}
    />
  )
}
