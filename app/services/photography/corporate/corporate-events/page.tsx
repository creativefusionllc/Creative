import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Corporate Events Photography | Corporate Photography | Creative Fusion",
  description: "Professional photography for conferences, seminars, and corporate gatherings.",
}

export default function CorporateEventsPage() {
  return (
    <CategoryPageTemplate
      title="Corporate Events Photography"
      description="Comprehensive event photography capturing keynotes, networking, and all memorable moments of your corporate events."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/corporate-conference-event-photography.jpg"
      benefits={[
        { title: "Complete Coverage", description: "Every important moment documented" },
        { title: "Fast Delivery", description: "Same-day highlight photos available" },
        { title: "Multi-Photographer", description: "Multiple angles for large events" },
        { title: "Brand Integration", description: "Capture branded elements and sponsors" },
      ]}
      process={[
        { step: 1, title: "Event Brief", description: "Understand agenda and key moments" },
        { step: 2, title: "Shot List", description: "Plan must-have photos" },
        { step: 3, title: "Coverage", description: "Full event documentation" },
        { step: 4, title: "Quick Edit", description: "Same-day highlights" },
        { step: 5, title: "Full Delivery", description: "Complete edited gallery" },
      ]}
      pricing={[
        {
          name: "Half Day",
          price: "AED 2,500",
          features: ["4 hours coverage", "150+ photos", "1 photographer", "48-hour delivery"],
        },
        {
          name: "Full Day",
          price: "AED 4,500",
          features: ["8 hours coverage", "300+ photos", "1 photographer", "Same-day highlights"],
          popular: true,
        },
        {
          name: "Multi-Day",
          price: "AED 8,000",
          features: ["2-day coverage", "500+ photos", "2 photographers", "Live gallery"],
        },
      ]}
      faqs={[
        {
          question: "Can you provide same-day photos?",
          answer: "Yes, we can deliver highlight photos within hours for social media.",
        },
        { question: "Do you cover international events?", answer: "Yes, we travel for corporate events worldwide." },
      ]}
      relatedCategories={[
        { name: "Conference Photography", href: "/services/photography/corporate/conferences" },
        { name: "Award Ceremonies", href: "/services/photography/corporate/award-ceremonies" },
        { name: "Trade Shows", href: "/services/photography/corporate/trade-shows" },
      ]}
    />
  )
}
