import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Birthday Party Photography | Event Photography | Creative Fusion",
  description: "Professional birthday party photography for all ages.",
}

export default function BirthdayPartiesPage() {
  return (
    <CategoryPageTemplate
      title="Birthday Party Photography"
      description="Capture the joy and celebration of birthday parties with professional photography for all ages."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/birthday-party-photography-celebration.jpg"
      benefits={[
        { title: "Candid Moments", description: "Natural, joyful captures" },
        { title: "Group Photos", description: "Family and friends together" },
        { title: "Cake Cutting", description: "Key celebration moments" },
        { title: "Fast Delivery", description: "Quick turnaround for sharing" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Discuss party details" },
        { step: 2, title: "Arrival", description: "Document venue and setup" },
        { step: 3, title: "Candids", description: "Capture natural moments" },
        { step: 4, title: "Key Moments", description: "Cake, gifts, games" },
        { step: 5, title: "Delivery", description: "Online gallery" },
      ]}
      pricing={[
        {
          name: "Mini",
          price: "AED 800",
          features: ["2 hours coverage", "50 photos", "Online gallery", "Basic editing"],
        },
        {
          name: "Standard",
          price: "AED 1,500",
          features: ["3 hours coverage", "100 photos", "Printed album option", "Full editing"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 2,500",
          features: ["4 hours coverage", "150+ photos", "Video highlights", "Same-day preview"],
        },
      ]}
      faqs={[
        {
          question: "Do you photograph kids' parties?",
          answer: "Yes, we specialize in photographing children's birthday parties.",
        },
        { question: "Can you do themed photography?", answer: "We adapt to any party theme." },
      ]}
      relatedCategories={[
        { name: "Kids Parties", href: "/services/photography/event/kids-parties" },
        { name: "Milestone Celebrations", href: "/services/photography/event/milestone-celebrations" },
        { name: "Family Gatherings", href: "/services/photography/event/family-gatherings" },
      ]}
    />
  )
}
