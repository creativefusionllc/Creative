import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Apple } from "lucide-react"

export const metadata = {
  title: "iOS App Development | Creative Fusion",
  description: "Native iPhone and iPad app development using Swift and SwiftUI.",
}

export default function IOSAppsPage() {
  return (
    <CategoryPageTemplate
      title="iOS App Development"
      subtitle="Native iPhone & iPad apps"
      description="Build beautiful, high-performance native iOS applications using Swift and SwiftUI. We create apps that leverage the full power of Apple's ecosystem."
      heroIcon={<Apple className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Native Performance", description: "Optimized for iOS" },
        { title: "Apple Design", description: "Human Interface Guidelines" },
        { title: "iOS Features", description: "Face ID, Apple Pay, Siri" },
        { title: "Swift/SwiftUI", description: "Modern Apple technologies" },
        { title: "App Store Ready", description: "Meets Apple guidelines" },
        { title: "Universal", description: "iPhone, iPad, Apple Watch" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Define features and UX" },
        { step: 2, title: "Design", description: "iOS-native UI design" },
        { step: 3, title: "Development", description: "Build with Swift" },
        { step: 4, title: "Testing", description: "Device and TestFlight" },
        { step: 5, title: "Submission", description: "App Store review" },
      ]}
      pricing={[
        {
          name: "Simple App",
          price: "AED 25,000",
          features: ["iPhone app", "Basic features", "3 months", "3-month support"],
        },
        {
          name: "Full iOS App",
          price: "AED 50,000",
          features: ["iPhone + iPad", "Advanced features", "5 months", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["All devices", "Complex features", "Backend", "Ongoing updates"],
        },
      ]}
      faqs={[
        {
          question: "Do I need an Apple Developer account?",
          answer: "Yes, required for App Store. We can set it up for you (AED 399/year).",
        },
        {
          question: "How long for App Store approval?",
          answer: "Typically 1-7 days. We ensure your app meets all guidelines before submission.",
        },
      ]}
      relatedCategories={[
        { name: "Android Apps", href: "/services/software-apps/mobile-apps/android-apps" },
        { name: "Cross-Platform", href: "/services/software-apps/mobile-apps/cross-platform" },
      ]}
    />
  )
}
