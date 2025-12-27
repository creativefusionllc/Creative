import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Sports Aerial | Drone Videography | Creative Fusion",
  description: "Sports event drone coverage. Dynamic aerial footage of athletic events.",
}

export default function SportsPage() {
  return (
    <CategoryPageTemplate
      title="Sports Aerial"
      subtitle="Athletics From Above"
      description="Sports aerial coverage captures athletic events, golf courses, stadiums, and racing from dynamic perspectives impossible with traditional cameras."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Drone & Aerial", href: "/services/videography/drone-aerial" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Dynamic", description: "Follow the action" },
        { title: "Scale", description: "Show venue size" },
        { title: "Angles", description: "Unique perspectives" },
        { title: "Broadcast", description: "TV-ready quality" },
      ]}
      process={[
        { step: 1, title: "Coordination", description: "Event organizer liaison" },
        { step: 2, title: "Safety Plan", description: "Flight zone mapping" },
        { step: 3, title: "Live Ops", description: "Real-time piloting" },
        { step: 4, title: "Capture", description: "Action tracking" },
        { step: 5, title: "Post", description: "Highlights assembly" },
      ]}
      pricing={[
        { name: "Event", price: "AED 4,000", features: ["3 Hours", "1 Pilot", "Highlights Edit"], popular: false },
        {
          name: "Tournament",
          price: "AED 10,000",
          features: ["Full Day", "2 Pilots", "Live Feed Ready"],
          popular: true,
        },
        {
          name: "Broadcast",
          price: "AED 25,000",
          features: ["Multi-day", "Production Team", "Live Integration", "Full Coverage"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you follow fast action?",
          answer: "Yes, our pilots are experienced in tracking high-speed subjects.",
        },
        { question: "Is live broadcast possible?", answer: "Yes, we can integrate with broadcast production systems." },
      ]}
      relatedCategories={[
        { name: "Event Aerial", href: "/services/videography/drone-aerial/event-aerial" },
        { name: "Golf Course Aerial", href: "/services/videography/drone-aerial/golf" },
        { name: "Racing Coverage", href: "/services/videography/drone-aerial/racing" },
      ]}
    />
  )
}
