import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Award Ceremony Photography | Corporate Photography | Creative Fusion",
  description: "Capture your award ceremonies and recognition events with professional photography.",
}

export default function AwardCeremoniesPage() {
  return (
    <CategoryPageTemplate
      title="Award Ceremony Photography"
      description="Professional photography for award ceremonies, gala dinners, and recognition events."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Corporate Photography", href: "/services/photography/corporate" }}
      heroImage="/award-ceremony-photography-gala.jpg"
      benefits={[
        { title: "Red Carpet Ready", description: "Glamorous arrival shots" },
        { title: "Award Moments", description: "Capture winning reactions" },
        { title: "VIP Coverage", description: "Focus on key personalities" },
        { title: "Event Ambiance", description: "Document décor and atmosphere" },
      ]}
      process={[
        { step: 1, title: "Event Brief", description: "Understand ceremony flow" },
        { step: 2, title: "Red Carpet", description: "Capture arrivals" },
        { step: 3, title: "Ceremony", description: "Document all awards" },
        { step: 4, title: "Celebrations", description: "After-party coverage" },
        { step: 5, title: "Delivery", description: "Same-night highlights" },
      ]}
      pricing={[
        {
          name: "Standard",
          price: "AED 3,000",
          features: ["4 hours coverage", "150 photos", "1 photographer", "Award moments"],
        },
        {
          name: "Premium",
          price: "AED 5,500",
          features: ["6 hours coverage", "300 photos", "2 photographers", "Red carpet + ceremony"],
          popular: true,
        },
        {
          name: "Gala",
          price: "AED 8,000",
          features: ["Full evening", "500+ photos", "3 photographers", "Same-night delivery"],
        },
      ]}
      faqs={[
        { question: "Do you set up a photo booth?", answer: "Yes, we can provide a branded photo booth setup." },
        { question: "Can we get same-night photos?", answer: "Yes, we deliver highlight photos the same evening." },
      ]}
      relatedCategories={[
        { name: "Corporate Events", href: "/services/photography/corporate/corporate-events" },
        { name: "Gala Dinners", href: "/services/photography/corporate/gala-dinners" },
        { name: "VIP Events", href: "/services/photography/corporate/vip-events" },
      ]}
    />
  )
}
