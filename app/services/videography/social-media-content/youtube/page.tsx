import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "YouTube Videos | Social Media Content | Creative Fusion",
  description: "YouTube video production. Long-form content that builds authority and subscribers.",
}

export default function YoutubePage() {
  return (
    <CategoryPageTemplate
      title="YouTube Videos"
      subtitle="Build Your Channel"
      description="YouTube long-form content builds authority, drives search traffic, and creates lasting value. We produce professional videos that grow your channel."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Social Media Content", href: "/services/videography/social-media-content" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "SEO", description: "Search traffic forever" },
        { title: "Authority", description: "Build expertise" },
        { title: "Revenue", description: "Monetization potential" },
        { title: "Evergreen", description: "Long-term value" },
      ]}
      process={[
        { step: 1, title: "Strategy", description: "Content planning" },
        { step: 2, title: "Script", description: "SEO-optimized scripts" },
        { step: 3, title: "Production", description: "Professional filming" },
        { step: 4, title: "Edit", description: "Retention-focused editing" },
        { step: 5, title: "Optimize", description: "Thumbnails, titles, tags" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 3,000", features: ["5-8 min Video", "Basic Edit", "Thumbnail"], popular: false },
        {
          name: "Professional",
          price: "AED 6,000",
          features: ["10-15 min Video", "Full Production", "SEO Optimization"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 12,000",
          features: ["20+ min Video", "Multi-camera", "Graphics", "Channel Strategy"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long should videos be?",
          answer: "8-15 minutes is optimal for most educational/business content on YouTube.",
        },
        {
          question: "Do you help with thumbnails?",
          answer: "Yes, we design click-worthy thumbnails proven to increase CTR.",
        },
      ]}
      relatedCategories={[
        { name: "YouTube Shorts", href: "/services/videography/social-media-content/shorts" },
        { name: "Corporate Videos", href: "/services/videography/corporate-videos" },
        { name: "Tutorial Videos", href: "/services/videography/product-videos/how-to" },
      ]}
    />
  )
}
