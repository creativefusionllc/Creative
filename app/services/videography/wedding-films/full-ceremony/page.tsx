import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Full Ceremony Films | Wedding Films | Creative Fusion",
  description: "Complete wedding ceremony documentation. Full-length films preserving every moment.",
}

export default function FullCeremonyPage() {
  return (
    <CategoryPageTemplate
      title="Full Ceremony Films"
      subtitle="Every Moment Preserved"
      description="Full ceremony films capture your entire wedding ceremony uncut, preserving vows, speeches, and traditions. Complete documentation for generations."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/full-wedding-ceremony-film.jpg"
      benefits={[
        { title: "Complete", description: "Every moment captured" },
        { title: "Authentic", description: "Real-time documentation" },
        { title: "Heritage", description: "For future generations" },
        { title: "Vows", description: "Hear every word" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Understanding ceremony details" },
        { step: 2, title: "Setup", description: "Discreet camera positioning" },
        { step: 3, title: "Recording", description: "Multi-angle capture" },
        { step: 4, title: "Editing", description: "Professional assembly" },
        { step: 5, title: "Delivery", description: "Full-length film delivery" },
      ]}
      pricing={[
        {
          name: "Ceremony Only",
          price: "AED 3,000",
          features: ["Ceremony Film", "2 Cameras", "Basic Edit"],
          popular: false,
        },
        {
          name: "Ceremony + Reception",
          price: "AED 6,000",
          features: ["Full Coverage", "3 Cameras", "Speeches Included"],
          popular: true,
        },
        {
          name: "Complete Documentary",
          price: "AED 12,000",
          features: ["Everything Filmed", "4 Cameras", "Multi-day", "Extended Interviews"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long are full ceremony films?",
          answer: "They reflect actual duration - typically 30-90 minutes for ceremony plus reception highlights.",
        },
        {
          question: "Can you combine with highlights?",
          answer: "Yes, most couples order both full ceremony and highlight films.",
        },
      ]}
      relatedCategories={[
        { name: "Wedding Highlights", href: "/services/videography/wedding-films/highlights" },
        { name: "Documentary Style", href: "/services/videography/wedding-films/documentary" },
        { name: "Traditional", href: "/services/videography/wedding-films/traditional" },
      ]}
    />
  )
}
