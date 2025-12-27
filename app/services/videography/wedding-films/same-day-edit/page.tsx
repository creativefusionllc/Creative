import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Same-Day Edit | Wedding Films | Creative Fusion",
  description: "Same-day wedding film editing. Watch your highlight film at your reception.",
}

export default function SameDayEditPage() {
  return (
    <CategoryPageTemplate
      title="Same-Day Edit"
      subtitle="Watch Your Film Tonight"
      description="Same-day edits are highlight films edited in real-time and premiered at your reception. Surprise your guests with a cinematic recap of the day."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/same-day-wedding-edit.jpg"
      benefits={[
        { title: "Instant", description: "Watch it same day" },
        { title: "Surprise", description: "Wow your guests" },
        { title: "Memorable", description: "Reception highlight" },
        { title: "Shareable", description: "Immediate sharing" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Timeline coordination" },
        { step: 2, title: "Early Filming", description: "Morning coverage" },
        { step: 3, title: "Live Editing", description: "On-site post-production" },
        { step: 4, title: "Premiere", description: "Reception screening" },
        { step: 5, title: "Final Version", description: "Polished delivery later" },
      ]}
      pricing={[
        {
          name: "Same-Day Add-on",
          price: "AED 3,500",
          features: ["3-4 min Edit", "Reception Premiere", "Basic Polish"],
          popular: false,
        },
        {
          name: "Same-Day Package",
          price: "AED 10,000",
          features: ["5-6 min Edit", "Full Coverage", "On-site Editor", "Final Version"],
          popular: true,
        },
        {
          name: "Same-Day Premium",
          price: "AED 18,000",
          features: ["8+ min Edit", "Multiple Editors", "Live Streaming Option", "Extended Final"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How is it possible to edit same-day?",
          answer: "We have a dedicated editor on-site working in real-time while filming continues.",
        },
        {
          question: "Is the same-day version the final?",
          answer: "No, you'll receive a polished final version later with additional refinements.",
        },
      ]}
      relatedCategories={[
        { name: "Wedding Highlights", href: "/services/videography/wedding-films/highlights" },
        { name: "Cinematic Films", href: "/services/videography/wedding-films/cinematic" },
        { name: "Live Streaming", href: "/services/videography/wedding-films/live-streaming" },
      ]}
    />
  )
}
