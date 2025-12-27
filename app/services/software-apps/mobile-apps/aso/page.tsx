import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { TrendingUp } from "lucide-react"

export const metadata = {
  title: "App Store Optimization | Creative Fusion",
  description: "Improve your app visibility and downloads with ASO services.",
}

export default function ASOPage() {
  return (
    <CategoryPageTemplate
      title="App Store Optimization"
      subtitle="Increase app visibility & downloads"
      description="Optimize your app listing to rank higher in App Store and Play Store searches. We improve keywords, screenshots, descriptions, and conversion rates."
      heroIcon={<TrendingUp className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Higher Rankings", description: "Rank for target keywords" },
        { title: "More Downloads", description: "Improved conversion rate" },
        { title: "Lower CAC", description: "Organic user acquisition" },
        { title: "Better Reviews", description: "Review management" },
        { title: "Competitive Edge", description: "Outrank competitors" },
        { title: "Data-Driven", description: "Analytics-based optimization" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Analyze current listing" },
        { step: 2, title: "Research", description: "Keyword and competitor research" },
        { step: 3, title: "Optimize", description: "Update listing elements" },
        { step: 4, title: "A/B Test", description: "Test variations" },
        { step: 5, title: "Monitor", description: "Track and iterate" },
      ]}
      pricing={[
        {
          name: "One-Time",
          price: "AED 3,000",
          features: ["Full optimization", "Keyword research", "Screenshot design", "Description writing"],
        },
        {
          name: "Monthly",
          price: "AED 2,000/mo",
          features: ["Ongoing optimization", "A/B testing", "Review responses", "Monthly reports"],
          isPopular: true,
        },
        {
          name: "Premium",
          price: "AED 5,000/mo",
          features: ["Full ASO management", "Localization", "Competitor tracking", "Dedicated manager"],
        },
      ]}
      faqs={[
        {
          question: "How long to see results?",
          answer: "Initial improvements in 2-4 weeks. Full impact typically 2-3 months of optimization.",
        },
        {
          question: "Do you handle both stores?",
          answer: "Yes, we optimize for both Apple App Store and Google Play Store.",
        },
      ]}
      relatedCategories={[
        { name: "App Maintenance", href: "/services/software-apps/mobile-apps/app-maintenance" },
        { name: "SEO", href: "/services/digital-marketing/seo" },
      ]}
    />
  )
}
