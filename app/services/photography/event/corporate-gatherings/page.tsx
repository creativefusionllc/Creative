import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Corporate Gatherings Photography | Event Photography | Creative Fusion",
  description: "Professional photography for corporate parties, team building, and company events.",
}

export default function CorporateGatheringsPage() {
  return (
    <CategoryPageTemplate
      title="Corporate Gatherings Photography"
      description="Professional photography for company celebrations, team building events, and corporate social gatherings."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/corporate-party-team-building-photography.jpg"
      benefits={[
        { title: "Team Spirit", description: "Capture camaraderie and fun" },
        { title: "Brand Elements", description: "Document branded touchpoints" },
        { title: "Executive Coverage", description: "VIP and leadership photos" },
        { title: "Activity Documentation", description: "Team building moments" },
      ]}
      process={[
        { step: 1, title: "Event Brief", description: "Understand event objectives" },
        { step: 2, title: "Venue Coverage", description: "Document setup and branding" },
        { step: 3, title: "Activities", description: "Capture team interactions" },
        { step: 4, title: "Group Photos", description: "Organized team shots" },
        { step: 5, title: "Delivery", description: "Professional gallery" },
      ]}
      pricing={[
        {
          name: "Team Event",
          price: "AED 2,000",
          features: ["3 hours", "100 photos", "1 photographer", "Quick delivery"],
        },
        {
          name: "Company Party",
          price: "AED 3,500",
          features: ["5 hours", "200 photos", "1 photographer", "Same-day highlights"],
          popular: true,
        },
        {
          name: "Gala Event",
          price: "AED 6,000",
          features: ["Full event", "400+ photos", "2 photographers", "Live sharing"],
        },
      ]}
      faqs={[
        {
          question: "Do you cover team building activities?",
          answer: "Yes, we capture all activities from outdoor adventures to indoor games.",
        },
        { question: "Can you set up a photo corner?", answer: "Yes, we can create a branded photo corner for guests." },
      ]}
      relatedCategories={[
        { name: "Award Ceremonies", href: "/services/photography/event/award-ceremonies" },
        { name: "Product Launches", href: "/services/photography/event/product-launches" },
        { name: "Networking Events", href: "/services/photography/event/networking-events" },
      ]}
    />
  )
}
