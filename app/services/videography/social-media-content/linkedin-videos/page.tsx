import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "LinkedIn Videos | Social Media Content | Creative Fusion",
  description: "LinkedIn video content production. Professional videos for B2B engagement.",
}

export default function LinkedinVideosPage() {
  return (
    <CategoryPageTemplate
      title="LinkedIn Videos"
      subtitle="Professional Network Content"
      description="LinkedIn videos reach decision-makers and professionals. We create business-appropriate video content that builds thought leadership and generates leads."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "B2B", description: "Reach decision-makers" },
        { title: "Thought Leadership", description: "Build authority" },
        { title: "Leads", description: "Generate business" },
        { title: "Engagement", description: "High interaction rates" },
      ]}
      process={[
        { step: 1, title: "Messaging", description: "Professional positioning" },
        { step: 2, title: "Script", description: "Value-focused content" },
        { step: 3, title: "Film", description: "Professional quality" },
        { step: 4, title: "Edit", description: "Business-appropriate style" },
        { step: 5, title: "Post", description: "Optimal timing strategy" },
      ]}
      pricing={[
        { name: "Single", price: "AED 1,500", features: ["1 Video", "2-3 min", "Professional Edit"], popular: false },
        {
          name: "Series",
          price: "AED 5,000",
          features: ["4 Videos", "Thought Leadership", "Personal Brand"],
          popular: true,
        },
        {
          name: "Executive",
          price: "AED 15,000",
          features: ["Monthly Content", "Full Management", "Ghostwriting", "Engagement"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What content works on LinkedIn?",
          answer: "Insights, lessons learned, industry trends, and authentic leadership stories.",
        },
        {
          question: "Should executives be on camera?",
          answer: "Yes, personal brand content significantly outperforms company content on LinkedIn.",
        },
      ]}
      relatedCategories={[
        { name: "Corporate Videos", href: "/services/videography/corporate-videos" },
        { name: "Thought Leadership", href: "/services/digital-marketing/content-marketing" },
        { name: "Personal Branding", href: "/services/creative-branding/personal-brand" },
      ]}
    />
  )
}
