export const metadata = {
  title: "Mobile App UI Design | Creative Fusion Dubai",
  description:
    "Professional mobile app user interface design for iOS and Android. Creative Fusion creates stunning, user-friendly app UI designs in Dubai, UAE.",
}

import { ServicePageTemplate } from "@/components/services/service-page-template"

export default function MobileAppUIPage() {
  return (
    <ServicePageTemplate
      title="Mobile App UI Design"
      description="Create beautiful, intuitive mobile app interfaces that users love with native iOS and Android design patterns and modern aesthetics."
      category="Graphic Design"
      subcategory="UI/UX Design"
      icon="smartphone"
      features={[
        "iOS app interface design",
        "Android app UI design",
        "Onboarding screens",
        "Navigation patterns",
        "Gesture-based interactions",
        "Dark mode design",
        "App icon design",
        "Splash screens",
        "Empty states",
        "Loading animations",
      ]}
      benefits={[
        "Platform-native designs",
        "Intuitive navigation",
        "Gesture optimization",
        "App Store ready",
        "User engagement focus",
      ]}
      process={[
        "App requirements analysis",
        "User flow mapping",
        "Wireframe creation",
        "High-fidelity UI design",
        "Interactive prototype",
        "Developer handoff",
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 4,000",
          features: ["10 app screens", "iOS or Android", "Basic prototype", "2 revisions"],
        },
        {
          name: "Professional",
          price: "AED 10,000",
          features: ["25 screens", "iOS + Android", "Interactive prototype", "Icon design", "Unlimited revisions"],
        },
        {
          name: "Enterprise",
          price: "AED 25,000",
          features: ["Unlimited screens", "Complete design system", "User testing", "Animations", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "Do you design for both iOS and Android?",
          answer:
            "Yes, we design native interfaces for both platforms following Apple's Human Interface Guidelines and Google's Material Design principles to ensure platform-appropriate experiences.",
        },
        {
          question: "What's included in mobile app UI design?",
          answer:
            "We deliver all app screens, navigation flows, interactive prototypes, app icons, design system, and developer handoff documentation with assets and specifications.",
        },
      ]}
      relatedServices={[
        { name: "Mobile App Development", href: "/services/custom-software/mobile-apps" },
        { name: "UX Design", href: "/services/graphic-design/ui-ux-design/ux-research" },
        { name: "Website UI", href: "/services/graphic-design/ui-ux-design/website-ui" },
      ]}
    />
  )
}
