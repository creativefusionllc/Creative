import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Milestone Celebration Photography | Event Photography | Creative Fusion",
  description: "Photography for anniversaries, graduations, retirements, and life milestones.",
}

export default function MilestoneCelebrationsPage() {
  return (
    <CategoryPageTemplate
      title="Milestone Celebration Photography"
      description="Celebrate life's special moments with professional photography for anniversaries, graduations, retirements, and achievements."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Emotional Moments", description: "Capture genuine reactions" },
        { title: "Family Portraits", description: "Multi-generational photos" },
        { title: "Detail Documentation", description: "Décor, cake, gifts" },
        { title: "Storytelling", description: "Narrative photo coverage" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Understand the milestone" },
        { step: 2, title: "Planning", description: "Shot list and timing" },
        { step: 3, title: "Coverage", description: "Full event photography" },
        { step: 4, title: "Portraits", description: "Family and group photos" },
        { step: 5, title: "Keepsake", description: "Album and prints" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 1,200",
          features: ["2 hours", "60 photos", "Online gallery", "Basic editing"],
        },
        {
          name: "Celebration",
          price: "AED 2,200",
          features: ["4 hours", "120 photos", "Family portraits", "Premium editing"],
          popular: true,
        },
        { name: "Legacy", price: "AED 4,000", features: ["6 hours", "200+ photos", "Video highlights", "Photo album"] },
      ]}
      faqs={[
        {
          question: "What milestones do you cover?",
          answer: "Graduations, anniversaries, retirements, promotions, and any life achievement.",
        },
        {
          question: "Do you create photo albums?",
          answer: "Yes, our Legacy package includes a professionally designed album.",
        },
      ]}
      relatedCategories={[
        { name: "Birthday Parties", href: "/services/photography/event/birthday-parties" },
        { name: "Family Gatherings", href: "/services/photography/event/family-gatherings" },
        { name: "Graduation Photography", href: "/services/photography/event/graduation" },
      ]}
    />
  )
}
