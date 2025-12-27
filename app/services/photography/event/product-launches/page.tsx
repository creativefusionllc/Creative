import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Product Launch Photography | Event Photography | Creative Fusion",
  description: "Professional photography for product launches and brand reveal events.",
}

export default function ProductLaunchesPage() {
  return (
    <CategoryPageTemplate
      title="Product Launch Photography"
      description="Dynamic photography for product launches, brand reveals, and promotional events that showcase your products."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/product-launch-event-photography.jpg"
      benefits={[
        { title: "Product Focus", description: "Hero shots of your product" },
        { title: "Event Atmosphere", description: "Capture excitement and energy" },
        { title: "Press Ready", description: "Images for media distribution" },
        { title: "Fast Turnaround", description: "Same-day press photos" },
      ]}
      process={[
        { step: 1, title: "Pre-Event", description: "Product and venue briefing" },
        { step: 2, title: "Setup", description: "Document staging and branding" },
        { step: 3, title: "Reveal", description: "Capture launch moment" },
        { step: 4, title: "Reactions", description: "Guest and VIP responses" },
        { step: 5, title: "Press Kit", description: "Immediate photo delivery" },
      ]}
      pricing={[
        {
          name: "Standard",
          price: "AED 3,000",
          features: ["3 hours", "100 photos", "Product shots", "24-hour delivery"],
        },
        {
          name: "Press Ready",
          price: "AED 5,000",
          features: ["5 hours", "200 photos", "Same-day press kit", "2 photographers"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 8,000",
          features: ["Full event", "300+ photos", "Video coverage", "Live social media"],
        },
      ]}
      faqs={[
        {
          question: "Can you provide photos immediately?",
          answer: "Yes, we deliver press-ready photos within hours of the event.",
        },
        {
          question: "Do you shoot product details?",
          answer: "Yes, we capture both event coverage and detailed product photography.",
        },
      ]}
      relatedCategories={[
        { name: "Trade Shows", href: "/services/photography/event/trade-shows" },
        { name: "Corporate Events", href: "/services/photography/event/corporate-gatherings" },
        { name: "Press Events", href: "/services/photography/event/press-events" },
      ]}
    />
  )
}
