import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Smartphone } from "lucide-react"

export const metadata = {
  title: "Mobile App Development | Creative Fusion",
  description: "Native and cross-platform mobile app development for iOS and Android.",
}

export default function MobileAppsPage() {
  return (
    <SubServicePageTemplate
      title="Mobile App Development"
      subtitle="iOS & Android applications"
      description="Build powerful mobile applications for iOS and Android platforms. From native apps to cross-platform solutions, we deliver mobile experiences that users love."
      heroIcon={<Smartphone className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      features={[
        {
          title: "iOS Apps",
          description: "Native iPhone & iPad apps",
          href: "/services/software-apps/mobile-apps/ios-apps",
        },
        {
          title: "Android Apps",
          description: "Native Android apps",
          href: "/services/software-apps/mobile-apps/android-apps",
        },
        {
          title: "Cross-Platform",
          description: "React Native & Flutter",
          href: "/services/software-apps/mobile-apps/cross-platform",
        },
        { title: "PWA", description: "Progressive web apps", href: "/services/software-apps/mobile-apps/pwa" },
        {
          title: "App Maintenance",
          description: "Updates and support",
          href: "/services/software-apps/mobile-apps/app-maintenance",
        },
        {
          title: "App Store Optimization",
          description: "ASO services",
          href: "/services/software-apps/mobile-apps/aso",
        },
      ]}
      pricingTiers={[
        {
          name: "MVP",
          price: "From AED 30,000",
          features: ["Single platform", "Core features", "3-month timeline", "3-month support"],
        },
        {
          name: "Full App",
          price: "From AED 75,000",
          features: ["iOS + Android", "Full features", "6-month timeline", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Complex app", "Backend included", "Ongoing updates", "Dedicated team"],
        },
      ]}
      faqs={[
        {
          question: "Native vs cross-platform?",
          answer:
            "Native offers best performance. Cross-platform (React Native/Flutter) saves cost with single codebase.",
        },
        {
          question: "Do you publish to app stores?",
          answer: "Yes, we handle complete App Store and Play Store submission process.",
        },
      ]}
    />
  )
}
