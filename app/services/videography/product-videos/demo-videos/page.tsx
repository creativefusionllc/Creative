import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Product Demo Videos | Product Videos | Creative Fusion",
  description: "Professional product demonstration videos. Show your product features in action.",
}

export default function DemoVideosPage() {
  return (
    <CategoryPageTemplate
      title="Product Demo Videos"
      subtitle="Features in Action"
      description="Product demo videos showcase how your product works, highlighting key features and benefits through clear, engaging demonstrations."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/product-demo-video.jpg"
      benefits={[
        { title: "Clarity", description: "Show how it works" },
        { title: "Features", description: "Highlight key benefits" },
        { title: "Support", description: "Reduce support queries" },
        { title: "Conversion", description: "Increase sales" },
      ]}
      process={[
        { step: 1, title: "Feature List", description: "Identifying key demos" },
        { step: 2, title: "Script", description: "Clear explanation writing" },
        { step: 3, title: "Filming", description: "Professional demonstration" },
        { step: 4, title: "Graphics", description: "Callouts and annotations" },
        { step: 5, title: "Delivery", description: "Multi-format output" },
      ]}
      pricing={[
        {
          name: "Quick Demo",
          price: "AED 3,000",
          features: ["60-90 sec", "1 Product", "Basic Graphics"],
          popular: false,
        },
        {
          name: "Full Demo",
          price: "AED 6,000",
          features: ["3-5 min", "Complete Features", "Motion Graphics", "Voice Over"],
          popular: true,
        },
        {
          name: "Demo Series",
          price: "AED 15,000",
          features: ["Multiple Videos", "Feature Breakdown", "Tutorial Style", "Subtitles"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How long should demos be?",
          answer: "60-90 seconds for social, 3-5 minutes for website, longer for detailed tutorials.",
        },
        {
          question: "Can you demo software?",
          answer: "Yes, we create screen recordings with professional narration and graphics.",
        },
      ]}
      relatedCategories={[
        { name: "How-To Videos", href: "/services/videography/product-videos/how-to" },
        { name: "Unboxing", href: "/services/videography/product-videos/unboxing" },
        { name: "Explainer Videos", href: "/services/videography/product-videos/explainer" },
      ]}
    />
  )
}
