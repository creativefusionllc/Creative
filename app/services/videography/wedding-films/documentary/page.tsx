import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Documentary Wedding Films | Wedding Films | Creative Fusion",
  description: "Documentary-style wedding films. Authentic, unscripted storytelling of your day.",
}

export default function DocumentaryPage() {
  return (
    <CategoryPageTemplate
      title="Documentary Wedding Films"
      subtitle="Authentic Storytelling"
      description="Documentary wedding films capture your day as it unfolds naturally, with candid moments, real emotions, and authentic interactions."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/documentary-wedding-film.jpg"
      benefits={[
        { title: "Authentic", description: "Real, unscripted moments" },
        { title: "Natural", description: "As it happened" },
        { title: "Emotional", description: "True feelings captured" },
        { title: "Storytelling", description: "Your day, your way" },
      ]}
      process={[
        { step: 1, title: "Understanding", description: "Learning your story" },
        { step: 2, title: "Observation", description: "Capturing naturally" },
        { step: 3, title: "Interviews", description: "Optional guest messages" },
        { step: 4, title: "Editing", description: "Story-driven assembly" },
        { step: 5, title: "Delivery", description: "Complete documentary" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 7,000",
          features: ["Documentary Film", "Full Day", "1 Videographer"],
          popular: false,
        },
        {
          name: "Complete",
          price: "AED 12,000",
          features: ["Extended Documentary", "Guest Interviews", "2 Videographers"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 22,000",
          features: ["Feature Documentary", "Pre-wedding Story", "Multi-day", "3 Videographers"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What's the difference from cinematic?",
          answer: "Documentary focuses on authentic moments while cinematic emphasizes artistic production techniques.",
        },
        {
          question: "Do you direct guests?",
          answer: "Minimal direction - we capture authentic interactions and genuine emotions.",
        },
      ]}
      relatedCategories={[
        { name: "Full Ceremony", href: "/services/videography/wedding-films/full-ceremony" },
        { name: "Cinematic Films", href: "/services/videography/wedding-films/cinematic" },
        { name: "Traditional", href: "/services/videography/wedding-films/traditional" },
      ]}
    />
  )
}
