import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Product Ads | TV Commercials | Creative Fusion",
  description: "Product-focused TV commercial production. Ads that showcase features and drive sales.",
}

export default function ProductAdsPage() {
  return (
    <CategoryPageTemplate
      title="Product Ads"
      subtitle="Showcase Your Products"
      description="Product ads focus on demonstrating features, benefits, and unique selling points. We create compelling product commercials that drive purchase intent."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "TV Commercials", href: "/services/videography/tv-commercials" }}
      heroImage="/product-commercial-filming.jpg"
      benefits={[
        { title: "Features", description: "Highlight key benefits" },
        { title: "Demonstration", description: "Show product in action" },
        { title: "Conversion", description: "Drive purchase decisions" },
        { title: "Quality", description: "Premium product presentation" },
      ]}
      process={[
        { step: 1, title: "Product Analysis", description: "Understanding key features" },
        { step: 2, title: "Concept", description: "Creative approach development" },
        { step: 3, title: "Storyboard", description: "Visual planning" },
        { step: 4, title: "Filming", description: "Professional production" },
        { step: 5, title: "Post", description: "Editing and effects" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 15,000",
          features: ["15-sec Ad", "Studio Shoot", "Basic Graphics"],
          popular: false,
        },
        {
          name: "Standard",
          price: "AED 30,000",
          features: ["30-sec Ad", "Location Shoot", "Motion Graphics", "Voice Over"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 60,000",
          features: ["60-sec Ad", "Multiple Products", "3D Animation", "Celebrity VO"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Can you film multiple products?",
          answer: "Yes, we can create ads featuring product ranges or variations.",
        },
        {
          question: "Do you provide different versions?",
          answer: "We deliver multiple lengths (15s, 30s, 60s) from one production.",
        },
      ]}
      relatedCategories={[
        { name: "Brand Commercials", href: "/services/videography/tv-commercials/brand-commercials" },
        { name: "Product Videos", href: "/services/videography/product-videos" },
        { name: "Service Ads", href: "/services/videography/tv-commercials/service-ads" },
      ]}
    />
  )
}
