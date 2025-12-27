import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Wrench } from "lucide-react"

export const metadata = {
  title: "Mobile App Maintenance | Creative Fusion",
  description: "Ongoing maintenance, updates, and support for your mobile applications.",
}

export default function AppMaintenancePage() {
  return (
    <CategoryPageTemplate
      title="App Maintenance"
      subtitle="Keep your app running perfectly"
      description="Ongoing maintenance and support to keep your mobile app updated, secure, and performing well. We handle OS updates, bug fixes, and feature enhancements."
      heroIcon={<Wrench className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "OS Compatibility", description: "Stay current with iOS/Android" },
        { title: "Bug Fixes", description: "Quick issue resolution" },
        { title: "Security Updates", description: "Patch vulnerabilities" },
        { title: "Performance", description: "Optimize speed and efficiency" },
        { title: "New Features", description: "Continuous improvement" },
        { title: "Monitoring", description: "Crash and performance tracking" },
      ]}
      process={[
        { step: 1, title: "Audit", description: "Review current app state" },
        { step: 2, title: "Plan", description: "Maintenance schedule" },
        { step: 3, title: "Monitor", description: "Track issues and crashes" },
        { step: 4, title: "Update", description: "Regular updates" },
        { step: 5, title: "Report", description: "Monthly status reports" },
      ]}
      pricing={[
        {
          name: "Basic",
          price: "AED 1,500/mo",
          features: ["Bug fixes", "OS updates", "Email support", "Monthly report"],
        },
        {
          name: "Standard",
          price: "AED 3,500/mo",
          features: ["Priority fixes", "Performance optimization", "8hr support", "Weekly report"],
          isPopular: true,
        },
        {
          name: "Premium",
          price: "AED 7,500/mo",
          features: ["24/7 support", "Feature updates", "Dedicated team", "Daily monitoring"],
        },
      ]}
      faqs={[
        {
          question: "What if we didn't build the app?",
          answer: "We maintain apps built by others. We'll do a code audit first to understand the codebase.",
        },
        {
          question: "How quickly are bugs fixed?",
          answer: "Critical bugs within 24-48 hours. Regular bugs based on priority in next update cycle.",
        },
      ]}
      relatedCategories={[
        { name: "ASO", href: "/services/software-apps/mobile-apps/aso" },
        { name: "Software Support", href: "/services/support-maintenance/software-support" },
      ]}
    />
  )
}
