import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Wedding Highlights | Wedding Films | Creative Fusion",
  description: "Cinematic wedding highlight films. Beautiful short films capturing your best moments.",
}

export default function HighlightsPage() {
  return (
    <CategoryPageTemplate
      title="Wedding Highlights"
      subtitle="Your Best Moments, Beautifully Captured"
      description="Wedding highlight films condense your entire wedding day into a cinematic 3-8 minute film featuring the best moments, emotions, and details."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/wedding-highlight-film.jpg"
      benefits={[
        { title: "Shareable", description: "Perfect length for sharing" },
        { title: "Cinematic", description: "Movie-quality production" },
        { title: "Emotional", description: "Captures the feeling" },
        { title: "Timeless", description: "Watch again and again" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Timeline and shot list" },
        { step: 2, title: "Coverage", description: "Full day filming" },
        { step: 3, title: "Selection", description: "Best moment curation" },
        { step: 4, title: "Editing", description: "Cinematic assembly" },
        { step: 5, title: "Delivery", description: "HD/4K delivery" },
      ]}
      pricing={[
        {
          name: "Essential",
          price: "AED 5,000",
          features: ["3-4 min Film", "8 Hours Coverage", "1 Videographer"],
          popular: false,
        },
        {
          name: "Classic",
          price: "AED 8,000",
          features: ["5-6 min Film", "Full Day", "2 Videographers", "Drone"],
          popular: true,
        },
        {
          name: "Luxury",
          price: "AED 15,000",
          features: ["8-10 min Film", "Multi-day", "3 Videographers", "Drone", "Same-day Edit"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long is a highlight film?",
          answer: "Typically 3-8 minutes, capturing the essence of your day.",
        },
        { question: "When will we receive it?", answer: "Usually 6-8 weeks after the wedding." },
      ]}
      relatedCategories={[
        { name: "Full Ceremony", href: "/services/videography/wedding-films/full-ceremony" },
        { name: "Cinematic Films", href: "/services/videography/wedding-films/cinematic" },
        { name: "Same-Day Edit", href: "/services/videography/wedding-films/same-day-edit" },
      ]}
    />
  )
}
