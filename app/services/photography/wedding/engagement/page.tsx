import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Engagement Photography | Wedding Photography | Creative Fusion",
  description: "Beautiful engagement photography to celebrate your commitment.",
}

export default function EngagementPage() {
  return (
    <CategoryPageTemplate
      title="Engagement Photography"
      description="Celebrate your engagement with beautiful photography capturing the excitement and love of this special milestone."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Wedding Photography", href: "/services/photography/wedding" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Ring Showcase", description: "Beautiful ring shots" },
        { title: "Couple Connection", description: "Natural chemistry" },
        { title: "Announcement Ready", description: "Perfect for sharing" },
        { title: "Wedding Prep", description: "Get comfortable on camera" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Discuss your vision" },
        { step: 2, title: "Location", description: "Meaningful spot" },
        { step: 3, title: "Session", description: "Relaxed photo shoot" },
        { step: 4, title: "Ring Detail", description: "Macro ring shots" },
        { step: 5, title: "Delivery", description: "Shareable gallery" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 1,500", features: ["1 hour", "30 photos", "1 location", "Online gallery"] },
        {
          name: "Standard",
          price: "AED 2,500",
          features: ["2 hours", "60 photos", "2 locations", "Outfit change"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 4,000",
          features: ["3 hours", "100 photos", "Multiple locations", "Video montage"],
        },
      ]}
      faqs={[
        {
          question: "How soon after engagement?",
          answer: "Within a few weeks while the excitement is fresh is ideal.",
        },
        {
          question: "Can we recreate the proposal?",
          answer: "Yes, we can stage a recreation at your proposal location.",
        },
      ]}
      relatedCategories={[
        { name: "Pre-Wedding", href: "/services/photography/wedding/pre-wedding" },
        { name: "Couple Portraits", href: "/services/photography/wedding/couple-portraits" },
        { name: "Proposal Photography", href: "/services/photography/wedding/proposal" },
      ]}
    />
  )
}
