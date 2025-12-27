import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Monitor } from "lucide-react"

export const metadata = {
  title: "Desktop Application Development | Creative Fusion",
  description: "Native and cross-platform desktop applications for Windows, Mac, and Linux.",
}

export default function DesktopAppsPage() {
  return (
    <CategoryPageTemplate
      title="Desktop Applications"
      subtitle="Native apps for Windows, Mac & Linux"
      description="Build powerful desktop applications with rich functionality, offline capabilities, and native performance for Windows, macOS, and Linux platforms."
      heroIcon={<Monitor className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Native Performance", description: "Fast, responsive applications" },
        { title: "Offline Capability", description: "Work without internet" },
        { title: "System Integration", description: "Access hardware and OS features" },
        { title: "Cross-Platform", description: "One codebase, all platforms" },
        { title: "Auto Updates", description: "Seamless application updates" },
        { title: "Secure", description: "Local data storage option" },
      ]}
      process={[
        { step: 1, title: "Requirements", description: "Define features and platforms" },
        { step: 2, title: "Design", description: "UI/UX design and prototyping" },
        { step: 3, title: "Development", description: "Build application" },
        { step: 4, title: "Testing", description: "QA across all platforms" },
        { step: 5, title: "Deployment", description: "Package and distribute" },
      ]}
      pricing={[
        {
          name: "Simple App",
          price: "AED 15,000",
          features: ["Single platform", "Basic features", "Standard UI", "3 months support"],
        },
        {
          name: "Cross-Platform",
          price: "AED 35,000",
          features: ["Win + Mac + Linux", "Advanced features", "Custom UI", "1 year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["All platforms", "Complex features", "Integration", "Ongoing support"],
        },
      ]}
      faqs={[
        {
          question: "What frameworks do you use?",
          answer: "Electron, .NET MAUI, Qt, or native development based on requirements.",
        },
        {
          question: "Can it connect to our servers?",
          answer: "Yes, we build with API connectivity, sync, and cloud integration.",
        },
      ]}
      relatedCategories={[
        { name: "Enterprise Software", href: "/services/software-apps/custom-software/enterprise-software" },
        { name: "System Integration", href: "/services/software-apps/custom-software/integrations" },
      ]}
    />
  )
}
