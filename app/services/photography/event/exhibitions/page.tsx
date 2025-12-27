import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Exhibition Photography | Event Photography | Creative Fusion",
  description: "Professional photography for exhibitions, trade shows, and expo events.",
}

export default function ExhibitionsPage() {
  return (
    <CategoryPageTemplate
      title="Exhibition Photography"
      description="Comprehensive photography coverage for exhibitions, expos, and trade shows capturing booths, visitors, and interactions."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/exhibition-trade-show-photography.jpg"
      benefits={[
        { title: "Booth Coverage", description: "Showcase your exhibition stand" },
        { title: "Visitor Engagement", description: "Capture interactions" },
        { title: "Product Display", description: "Detail shots of exhibits" },
        { title: "Floor Coverage", description: "Overall event atmosphere" },
      ]}
      process={[
        { step: 1, title: "Setup Documentation", description: "Booth before opening" },
        { step: 2, title: "Opening Coverage", description: "First visitors and VIPs" },
        { step: 3, title: "Throughout Event", description: "Continuous coverage" },
        { step: 4, title: "Highlights", description: "Key moments and demos" },
        { step: 5, title: "Delivery", description: "Daily photo updates" },
      ]}
      pricing={[
        {
          name: "Single Day",
          price: "AED 3,000",
          features: ["8 hours", "200 photos", "Booth focus", "24-hour delivery"],
        },
        {
          name: "Multi-Day",
          price: "AED 5,000",
          features: ["2 days", "400 photos", "Full floor coverage", "Daily delivery"],
          popular: true,
        },
        {
          name: "Full Exhibition",
          price: "AED 8,000",
          features: ["3+ days", "600+ photos", "Multiple photographers", "Video clips"],
        },
      ]}
      faqs={[
        {
          question: "Do you cover competitor booths?",
          answer: "We focus on your booth but can document the overall exhibition.",
        },
        { question: "Can you provide daily photos?", answer: "Yes, we deliver edited photos at the end of each day." },
      ]}
      relatedCategories={[
        { name: "Trade Shows", href: "/services/photography/event/trade-shows" },
        { name: "Product Launches", href: "/services/photography/event/product-launches" },
        { name: "Corporate Events", href: "/services/photography/event/corporate-gatherings" },
      ]}
    />
  )
}
