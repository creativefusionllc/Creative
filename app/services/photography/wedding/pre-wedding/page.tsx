import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Pre-Wedding Photography | Wedding Photography | Creative Fusion",
  description: "Romantic pre-wedding and engagement photography sessions.",
}

export default function PreWeddingPage() {
  return (
    <CategoryPageTemplate
      title="Pre-Wedding Photography"
      description="Romantic pre-wedding photoshoots capturing your love story before the big day in stunning locations."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Couple Chemistry", description: "Build comfort before wedding day" },
        { title: "Location Variety", description: "Multiple stunning locations" },
        { title: "Storytelling", description: "Tell your unique love story" },
        { title: "Save the Date", description: "Perfect for announcements" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Discuss your vision" },
        { step: 2, title: "Location Scouting", description: "Select perfect spots" },
        { step: 3, title: "Styling", description: "Outfit coordination" },
        { step: 4, title: "Photo Session", description: "Relaxed, romantic shoot" },
        { step: 5, title: "Delivery", description: "Edited photo gallery" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 2,500",
          features: ["2 hours", "1 location", "50 edited photos", "Online gallery"],
        },
        {
          name: "Romance",
          price: "AED 4,500",
          features: ["4 hours", "2 locations", "100 edited photos", "Outfit changes"],
          popular: true,
        },
        {
          name: "Destination",
          price: "AED 8,000",
          features: ["Full day", "Multiple locations", "200+ photos", "Video highlights"],
        },
      ]}
      faqs={[
        {
          question: "When should we do pre-wedding photos?",
          answer: "2-3 months before the wedding is ideal for save-the-dates and displays.",
        },
        {
          question: "Can we do destination pre-wedding?",
          answer: "Yes, we travel for destination pre-wedding shoots.",
        },
      ]}
      relatedCategories={[
        { name: "Engagement", href: "/services/photography/wedding/engagement" },
        { name: "Couple Portraits", href: "/services/photography/wedding/couple-portraits" },
        { name: "Destination", href: "/services/photography/wedding/destination" },
      ]}
    />
  )
}
