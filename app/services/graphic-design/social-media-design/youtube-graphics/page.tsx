import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "YouTube Graphics Design | Social Media Design",
  description: "Eye-catching YouTube thumbnails, banners, and end screens for channel growth.",
}

export default function YouTubeGraphicsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Social Media Design", href: "/services/graphic-design/social-media-design" },
      }}
      title="YouTube Graphics"
      subtitle="YouTube Channel Design"
      description="Create compelling YouTube graphics that increase click-through rates and subscriber growth."
      heroImage="/youtube-thumbnail-design.jpg"
      benefits={[
        "Channel art",
        "Thumbnail templates",
        "End screens",
        "Intro graphics",
        "Playlist covers",
        "Brand consistency",
      ]}
      process={[
        { step: 1, title: "Analyze", description: "Review channel goals" },
        { step: 2, title: "Design", description: "Create graphic system" },
        { step: 3, title: "Template", description: "Build reusable assets" },
        { step: 4, title: "Deliver", description: "All files provided" },
      ]}
      pricing={{
        startingFrom: "AED 2,000",
        includes: ["Channel banner", "10 thumbnails", "End screen", "Template files"],
      }}
      faqs={[
        {
          question: "Do thumbnails increase views?",
          answer: "Yes, compelling thumbnails can significantly improve click-through rates.",
        },
        { question: "Can I edit thumbnails myself?", answer: "Yes, we provide editable templates you can customize." },
      ]}
      relatedCategories={[
        { title: "Video Editing", href: "/services/videography/social-media-content/youtube" },
        { title: "Instagram Graphics", href: "/services/graphic-design/social-media-design/instagram-graphics" },
      ]}
    />
  )
}
