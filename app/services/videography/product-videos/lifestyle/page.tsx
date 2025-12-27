import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Lifestyle Product Videos | Product Videos | Creative Fusion",
  description: "Lifestyle product video production. Show your products in real-world contexts.",
}

export default function LifestylePage() {
  return (
    <CategoryPageTemplate
      title="Lifestyle Product Videos"
      subtitle="Products in Real Life"
      description="Lifestyle videos showcase your products being used in real-world settings, helping customers envision the product in their own lives."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Product Videos", href: "/services/videography/product-videos" }}
      heroImage="/placeholder.svg?height=600&width=800"
      benefits={[
        { title: "Relatable", description: "Customers see themselves" },
        { title: "Context", description: "Real usage scenarios" },
        { title: "Aspiration", description: "Lifestyle association" },
        { title: "Emotional", description: "Connect beyond features" },
      ]}
      process={[
        { step: 1, title: "Concept", description: "Lifestyle scenarios" },
        { step: 2, title: "Casting", description: "Relatable talent" },
        { step: 3, title: "Location", description: "Authentic settings" },
        { step: 4, title: "Filming", description: "Natural interactions" },
        { step: 5, title: "Edit", description: "Emotional storytelling" },
      ]}
      pricing={[
        { name: "Basic", price: "AED 5,000", features: ["1 Scenario", "30-60 sec", "1 Location"], popular: false },
        {
          name: "Standard",
          price: "AED 10,000",
          features: ["3 Scenarios", "60-90 sec", "Professional Talent"],
          popular: true,
        },
        {
          name: "Campaign",
          price: "AED 25,000",
          features: ["Full Campaign", "Multiple Locations", "Multiple Talent", "Social Cuts"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "Do you provide locations?",
          answer: "Yes, we source and manage location bookings or use studio sets.",
        },
        {
          question: "What about talent/models?",
          answer: "We cast appropriate talent that matches your target demographic.",
        },
      ]}
      relatedCategories={[
        { name: "Product Photography", href: "/services/photography/product" },
        { name: "Social Media Content", href: "/services/videography/social-media-content" },
        { name: "Brand Videos", href: "/services/videography/corporate-videos/brand-story" },
      ]}
    />
  )
}
