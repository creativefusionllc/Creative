import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Networking Event Photography | Event Photography | Creative Fusion",
  description: "Professional photography for networking events, meetups, and business mixers.",
}

export default function NetworkingEventsPage() {
  return (
    <CategoryPageTemplate
      title="Networking Event Photography"
      description="Capture professional connections and business interactions at networking events and industry meetups."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/networking-event-business-photography.jpg"
      benefits={[
        { title: "Candid Networking", description: "Natural conversation moments" },
        { title: "Professional Quality", description: "LinkedIn-ready photos" },
        { title: "Speaker Coverage", description: "Presentation highlights" },
        { title: "Attendee Photos", description: "Individual and group shots" },
      ]}
      process={[
        { step: 1, title: "Event Overview", description: "Understand format and flow" },
        { step: 2, title: "Venue Shots", description: "Document setup" },
        { step: 3, title: "Candids", description: "Capture interactions" },
        { step: 4, title: "Speakers", description: "Presentation coverage" },
        { step: 5, title: "Gallery", description: "Shareable photos" },
      ]}
      pricing={[
        {
          name: "Meetup",
          price: "AED 1,500",
          features: ["2 hours", "60 photos", "Online gallery", "Social media ready"],
        },
        {
          name: "Business Mixer",
          price: "AED 2,500",
          features: ["3 hours", "120 photos", "Speaker coverage", "Same-day preview"],
          popular: true,
        },
        {
          name: "Conference",
          price: "AED 4,000",
          features: ["5 hours", "200+ photos", "Multiple sessions", "Fast delivery"],
        },
      ]}
      faqs={[
        { question: "Do you photograph speakers?", answer: "Yes, we capture all presentations and speakers." },
        { question: "Can attendees download their photos?", answer: "Yes, we provide a searchable online gallery." },
      ]}
      relatedCategories={[
        { name: "Corporate Gatherings", href: "/services/photography/event/corporate-gatherings" },
        { name: "Conferences", href: "/services/photography/event/conferences" },
        { name: "Industry Events", href: "/services/photography/event/industry-events" },
      ]}
    />
  )
}
