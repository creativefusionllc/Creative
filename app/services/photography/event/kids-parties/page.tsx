import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Kids Party Photography | Event Photography | Creative Fusion",
  description: "Fun and energetic photography for children's parties and events.",
}

export default function KidsPartiesPage() {
  return (
    <CategoryPageTemplate
      title="Kids Party Photography"
      description="Energetic and fun photography capturing the magic of children's parties and celebrations."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/kids-birthday-party-photography-fun.jpg"
      benefits={[
        { title: "Kid-Friendly", description: "Photographers experienced with children" },
        { title: "Action Shots", description: "Capture games and activities" },
        { title: "Expressions", description: "Natural joy and excitement" },
        { title: "Group Photos", description: "Organize fun group shots" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Understand party activities" },
        { step: 2, title: "Setup", description: "Document decorations" },
        { step: 3, title: "Activities", description: "Capture games and fun" },
        { step: 4, title: "Cake Time", description: "Key celebration moments" },
        { step: 5, title: "Gallery", description: "Colorful edited photos" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 700", features: ["2 hours", "40 photos", "Digital gallery", "Basic editing"] },
        {
          name: "Fun Pack",
          price: "AED 1,200",
          features: ["3 hours", "80 photos", "Photo booth setup", "Props included"],
          popular: true,
        },
        { name: "Ultimate", price: "AED 2,000", features: ["4 hours", "120+ photos", "Video clips", "Instant prints"] },
      ]}
      faqs={[
        {
          question: "How do you handle shy kids?",
          answer: "We use games and fun activities to help children feel comfortable.",
        },
        { question: "Do you bring props?", answer: "Yes, our Fun Pack includes fun photography props." },
      ]}
      relatedCategories={[
        { name: "Birthday Parties", href: "/services/photography/event/birthday-parties" },
        { name: "School Events", href: "/services/photography/event/school-events" },
        { name: "Family Gatherings", href: "/services/photography/event/family-gatherings" },
      ]}
    />
  )
}
