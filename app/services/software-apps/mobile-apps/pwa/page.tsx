import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Globe } from "lucide-react"

export const metadata = {
  title: "Progressive Web App Development | Creative Fusion",
  description: "Build installable web apps that work offline and feel like native apps.",
}

export default function PWAPage() {
  return (
    <CategoryPageTemplate
      title="Progressive Web Apps"
      subtitle="Web apps with native feel"
      description="Build Progressive Web Apps (PWAs) that users can install on their devices, work offline, and provide app-like experiences without app store distribution."
      heroIcon={<Globe className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Installable", description: "Add to home screen" },
        { title: "Offline", description: "Works without internet" },
        { title: "No App Store", description: "Direct distribution" },
        { title: "Cross-Platform", description: "Any device with browser" },
        { title: "Auto Updates", description: "Always latest version" },
        { title: "Lower Cost", description: "Web development costs" },
      ]}
      process={[
        { step: 1, title: "Design", description: "App-like UX design" },
        { step: 2, title: "Development", description: "Build responsive PWA" },
        { step: 3, title: "Service Worker", description: "Offline functionality" },
        { step: 4, title: "Testing", description: "PWA criteria testing" },
        { step: 5, title: "Launch", description: "Deploy and promote" },
      ]}
      pricing={[
        {
          name: "Basic PWA",
          price: "AED 15,000",
          features: ["Responsive app", "Offline mode", "Push notifications", "3-month support"],
        },
        {
          name: "Advanced PWA",
          price: "AED 35,000",
          features: ["Full app features", "Background sync", "Installable", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Complex features", "API backend", "Analytics", "Ongoing support"],
        },
      ]}
      faqs={[
        {
          question: "PWA vs native app?",
          answer:
            "PWAs are cheaper and easier to update but have limited device access. Best for content apps, not games or complex features.",
        },
        {
          question: "Do PWAs work on iOS?",
          answer: "Yes, but with some limitations. We ensure best possible iOS experience.",
        },
      ]}
      relatedCategories={[
        { name: "Cross-Platform", href: "/services/software-apps/mobile-apps/cross-platform" },
        { name: "Web Applications", href: "/services/web-development/web-applications" },
      ]}
    />
  )
}
