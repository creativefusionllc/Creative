import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Wedding Ceremony Photography | Wedding Photography | Creative Fusion",
  description: "Professional wedding ceremony photography capturing your special moments.",
}

export default function CeremonyPage() {
  return (
    <CategoryPageTemplate
      title="Wedding Ceremony Photography"
      description="Capture every sacred moment of your wedding ceremony with professional photography that preserves your vows forever."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Sacred Moments", description: "Vows, rings, first kiss" },
        { title: "Emotional Captures", description: "Tears, joy, love" },
        { title: "Detail Documentation", description: "Décor, flowers, setup" },
        { title: "Family Reactions", description: "Candid guest emotions" },
      ]}
      process={[
        { step: 1, title: "Venue Visit", description: "Scout ceremony location" },
        { step: 2, title: "Timeline", description: "Plan key moments" },
        { step: 3, title: "Pre-Ceremony", description: "Preparations and details" },
        { step: 4, title: "Ceremony", description: "Full coverage" },
        { step: 5, title: "Portraits", description: "Post-ceremony couples" },
      ]}
      pricing={[
        {
          name: "Ceremony Only",
          price: "AED 3,500",
          features: ["3 hours", "150 photos", "1 photographer", "Online gallery"],
        },
        {
          name: "Ceremony Plus",
          price: "AED 5,500",
          features: ["5 hours", "300 photos", "Prep coverage", "Family portraits"],
          popular: true,
        },
        {
          name: "Full Coverage",
          price: "AED 8,000",
          features: ["8 hours", "500+ photos", "2 photographers", "Same-day preview"],
        },
      ]}
      faqs={[
        {
          question: "Do you work with videographers?",
          answer: "Yes, we coordinate seamlessly with your videography team.",
        },
        {
          question: "Can you handle multiple ceremonies?",
          answer: "Yes, we cover multi-cultural ceremonies with different traditions.",
        },
      ]}
      relatedCategories={[
        { name: "Reception", href: "/services/photography/wedding/reception" },
        { name: "Bridal Portraits", href: "/services/photography/wedding/bridal-portraits" },
        { name: "Traditional Ceremonies", href: "/services/photography/wedding/traditional" },
      ]}
    />
  )
}
