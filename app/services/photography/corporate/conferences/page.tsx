import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Conference Photography | Corporate Photography | Creative Fusion",
  description: "Professional conference and seminar photography services.",
}

export default function ConferencesPage() {
  return (
    <CategoryPageTemplate
      title="Conference Photography"
      description="Document your conferences with professional photography capturing speakers, attendees, and key moments."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/conference-photography-speaker-stage.jpg"
      benefits={[
        { title: "Speaker Coverage", description: "Dynamic shots of presenters" },
        { title: "Attendee Engagement", description: "Capture networking moments" },
        { title: "Venue Documentation", description: "Showcase event setup" },
        { title: "Sponsor Visibility", description: "Document brand presence" },
      ]}
      process={[
        { step: 1, title: "Pre-Event", description: "Review agenda and shot list" },
        { step: 2, title: "Setup Shots", description: "Document venue preparation" },
        { step: 3, title: "Live Coverage", description: "Capture all sessions" },
        { step: 4, title: "Networking", description: "Candid attendee photos" },
        { step: 5, title: "Delivery", description: "Organized by session" },
      ]}
      pricing={[
        {
          name: "Single Day",
          price: "AED 3,500",
          features: ["Full day coverage", "200+ photos", "Speaker focus", "24-hour highlights"],
        },
        {
          name: "Multi-Day",
          price: "AED 6,000",
          features: ["2-day coverage", "400+ photos", "2 photographers", "Daily highlights"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 10,000",
          features: ["3-day coverage", "600+ photos", "3 photographers", "Live gallery"],
        },
      ]}
      faqs={[
        { question: "Can you work with event AV teams?", answer: "Yes, we coordinate with AV to avoid interference." },
        { question: "Do you provide photos for speakers?", answer: "Yes, we can provide individual speaker photos." },
      ]}
      relatedCategories={[
        { name: "Corporate Events", href: "/services/photography/corporate/corporate-events" },
        { name: "Trade Shows", href: "/services/photography/corporate/trade-shows" },
        { name: "Award Ceremonies", href: "/services/photography/corporate/award-ceremonies" },
      ]}
    />
  )
}
