import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Event Photography Dubai | Corporate Events & Parties | Creative Fusion LLC",
  description:
    "Professional event photography in Dubai UAE. Corporate events, conferences, parties, product launches, and special occasions coverage.",
  keywords: [
    "event photography dubai",
    "corporate event photographer uae",
    "party photography dubai",
    "conference photography sharjah",
  ],
}

export default function EventPhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="Event Photography"
      subtitle="Capture Every Moment"
      description="Dynamic coverage of parties, conferences, launches, and corporate events. We capture the energy and key moments of your gatherings."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        { title: "Corporate Events", description: "Conferences, seminars, and business gatherings" },
        { title: "Product Launches", description: "New product and brand unveiling events" },
        { title: "Gala & Award Ceremonies", description: "Formal events and celebrations" },
        { title: "Private Parties", description: "Birthdays, anniversaries, and celebrations" },
        { title: "Trade Shows", description: "Exhibition and booth coverage" },
        { title: "Same-Day Editing", description: "Quick turnaround for social media and PR" },
      ]}
      pricingTiers={[
        {
          name: "Half Day",
          price: "AED 2,000",
          description: "4 hours coverage",
          features: ["4 hours coverage", "150+ edited photos", "Online gallery", "48hr delivery"],
        },
        {
          name: "Full Day",
          price: "AED 3,500",
          description: "8 hours coverage",
          features: ["8 hours coverage", "300+ edited photos", "Same-day preview", "24hr delivery"],
          popular: true,
        },
        {
          name: "Multi-Day",
          price: "AED 6,000",
          description: "Conference package",
          features: [
            "2 full days",
            "500+ edited photos",
            "Multiple photographers",
            "Live gallery updates",
            "Priority editing",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Photography", href: "/services/photography/corporate" },
        { title: "Wedding Photography", href: "/services/photography/wedding" },
      ]}
    />
  )
}
