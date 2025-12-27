import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Stories Content | Social Media Content | Creative Fusion",
  description: "Instagram and Facebook Stories production. Ephemeral content that engages.",
}

export default function StoriesPage() {
  return (
    <CategoryPageTemplate
      title="Stories Content"
      subtitle="Ephemeral Engagement"
      description="Stories on Instagram and Facebook provide daily touchpoints with your audience. We create engaging, on-brand story content for consistent engagement."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Daily", description: "Consistent presence" },
        { title: "Authentic", description: "Behind-the-scenes feel" },
        { title: "Interactive", description: "Polls, questions, links" },
        { title: "Urgency", description: "24-hour availability" },
      ]}
      process={[
        { step: 1, title: "Calendar", description: "Content planning" },
        { step: 2, title: "Capture", description: "Daily content filming" },
        { step: 3, title: "Design", description: "Brand templates" },
        { step: 4, title: "Interactive", description: "Add stickers and CTAs" },
        { step: 5, title: "Schedule", description: "Timely posting" },
      ]}
      pricing={[
        {
          name: "Template Pack",
          price: "AED 1,500",
          features: ["10 Templates", "Canva Editable", "Brand Colors"],
          popular: false,
        },
        {
          name: "Content Pack",
          price: "AED 4,000",
          features: ["30 Stories", "Ready to Post", "Engagement Elements"],
          popular: true,
        },
        {
          name: "Monthly",
          price: "AED 10,000",
          features: ["Daily Stories", "Management", "Analytics", "Strategy"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How often should we post stories?",
          answer: "3-5 stories daily for optimal engagement and algorithm performance.",
        },
        {
          question: "Do you manage posting?",
          answer: "We can provide ready-to-post content or fully manage your stories.",
        },
      ]}
      relatedCategories={[
        { name: "Instagram Reels", href: "/services/videography/social-media-content/reels" },
        { name: "Highlights", href: "/services/videography/social-media-content/highlights" },
        { name: "Social Management", href: "/services/digital-marketing/social-media" },
      ]}
    />
  )
}
