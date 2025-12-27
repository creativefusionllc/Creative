import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Wedding Reception Photography | Wedding Photography | Creative Fusion",
  description: "Capture the celebration and joy of your wedding reception.",
}

export default function ReceptionPage() {
  return (
    <CategoryPageTemplate
      title="Wedding Reception Photography"
      description="Document the celebration, dancing, and joy of your wedding reception with dynamic photography."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Party Energy", description: "Capture the celebration vibe" },
        { title: "Key Moments", description: "First dance, cake, speeches" },
        { title: "Guest Candids", description: "Natural party moments" },
        { title: "Venue Beauty", description: "Décor and atmosphere" },
      ]}
      process={[
        { step: 1, title: "Venue Assessment", description: "Lighting and layout" },
        { step: 2, title: "Details", description: "Table settings, décor" },
        { step: 3, title: "Entrances", description: "Grand entrance moments" },
        { step: 4, title: "Highlights", description: "Dances, cake, speeches" },
        { step: 5, title: "Party", description: "Dancing and celebrations" },
      ]}
      pricing={[
        { name: "Evening", price: "AED 3,000", features: ["4 hours", "200 photos", "Key moments", "Dance floor"] },
        {
          name: "Full Reception",
          price: "AED 5,000",
          features: ["6 hours", "350 photos", "All highlights", "2 photographers"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 7,500",
          features: ["8+ hours", "500+ photos", "Photo booth", "Same-night preview"],
        },
      ]}
      faqs={[
        {
          question: "How do you handle low light?",
          answer: "We use professional low-light equipment for stunning reception photos.",
        },
        {
          question: "Do you capture all the dances?",
          answer: "Yes, first dance, parent dances, and party dancing are all covered.",
        },
      ]}
      relatedCategories={[
        { name: "Ceremony", href: "/services/photography/wedding/ceremony" },
        { name: "Entertainment", href: "/services/photography/wedding/entertainment" },
        { name: "Party Photography", href: "/services/photography/wedding/party" },
      ]}
    />
  )
}
