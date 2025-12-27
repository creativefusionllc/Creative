import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Smartphone } from "lucide-react"

export const metadata = {
  title: "Android App Development | Creative Fusion",
  description: "Native Android app development using Kotlin and Jetpack Compose.",
}

export default function AndroidAppsPage() {
  return (
    <CategoryPageTemplate
      title="Android App Development"
      subtitle="Native Android applications"
      description="Build powerful native Android applications using Kotlin and Jetpack Compose. We create apps optimized for the diverse Android ecosystem."
      heroIcon={<Smartphone className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Native Performance", description: "Optimized for Android" },
        { title: "Material Design", description: "Google design system" },
        { title: "Android Features", description: "Fingerprint, NFC, Widgets" },
        { title: "Kotlin", description: "Modern Android development" },
        { title: "Play Store Ready", description: "Meets Google policies" },
        { title: "Device Coverage", description: "Phones, tablets, TV" },
      ]}
      process={[
        { step: 1, title: "Planning", description: "Features and device targets" },
        { step: 2, title: "Design", description: "Material Design UI" },
        { step: 3, title: "Development", description: "Build with Kotlin" },
        { step: 4, title: "Testing", description: "Multi-device testing" },
        { step: 5, title: "Submission", description: "Play Store launch" },
      ]}
      pricing={[
        {
          name: "Simple App",
          price: "AED 20,000",
          features: ["Phone app", "Basic features", "3 months", "3-month support"],
        },
        {
          name: "Full Android",
          price: "AED 45,000",
          features: ["Phone + tablet", "Advanced features", "5 months", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["All form factors", "Complex features", "Backend", "Ongoing updates"],
        },
      ]}
      faqs={[
        {
          question: "Do I need a Google Play account?",
          answer: "Yes, one-time AED 95 registration fee. We can set it up for you.",
        },
        {
          question: "How do you handle device fragmentation?",
          answer: "We test on multiple devices and Android versions to ensure compatibility.",
        },
      ]}
      relatedCategories={[
        { name: "iOS Apps", href: "/services/software-apps/mobile-apps/ios-apps" },
        { name: "Cross-Platform", href: "/services/software-apps/mobile-apps/cross-platform" },
      ]}
    />
  )
}
