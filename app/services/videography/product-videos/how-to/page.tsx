import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "How-To Videos | Product Videos | Creative Fusion",
  description: "Instructional how-to video production. Clear tutorials that help customers succeed.",
}

export default function HowToPage() {
  return (
    <CategoryPageTemplate
      title="How-To Videos"
      subtitle="Clear Instructions, Happy Customers"
      description="How-to videos provide step-by-step instructions for using your product, reducing support queries and improving customer satisfaction."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/how-to-tutorial-video.jpg"
      benefits={[
        { title: "Support", description: "Reduce support tickets" },
        { title: "Satisfaction", description: "Happier customers" },
        { title: "SEO", description: "Rank for how-to searches" },
        { title: "Retention", description: "Improve product adoption" },
      ]}
      process={[
        { step: 1, title: "Process Mapping", description: "Identifying steps" },
        { step: 2, title: "Script", description: "Clear instructions" },
        { step: 3, title: "Filming", description: "Step-by-step capture" },
        { step: 4, title: "Graphics", description: "Visual aids and callouts" },
        { step: 5, title: "Review", description: "Accuracy verification" },
      ]}
      pricing={[
        {
          name: "Quick Guide",
          price: "AED 2,500",
          features: ["2-3 min Video", "5-7 Steps", "Basic Graphics"],
          popular: false,
        },
        {
          name: "Full Tutorial",
          price: "AED 5,000",
          features: ["5-8 min Video", "Comprehensive", "Chapter Markers", "Subtitles"],
          popular: true,
        },
        {
          name: "Tutorial Series",
          price: "AED 12,000",
          features: ["5 Videos", "Complete Coverage", "Playlist Ready", "Support Integration"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How detailed should tutorials be?",
          answer: "We tailor complexity to your audience - from beginner to advanced levels.",
        },
        {
          question: "Can you update existing tutorials?",
          answer: "Yes, we can revise tutorials when products are updated.",
        },
      ]}
      relatedCategories={[
        { name: "Demo Videos", href: "/services/videography/product-videos/demo-videos" },
        { name: "Training Videos", href: "/services/videography/corporate-videos/training-videos" },
        { name: "Explainer Videos", href: "/services/videography/product-videos/explainer" },
      ]}
    />
  )
}
