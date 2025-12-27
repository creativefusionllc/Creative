import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Layers } from "lucide-react"

export const metadata = {
  title: "Cross-Platform App Development | Creative Fusion",
  description: "React Native and Flutter development for iOS and Android from single codebase.",
}

export default function CrossPlatformPage() {
  return (
    <CategoryPageTemplate
      title="Cross-Platform Apps"
      subtitle="One codebase, all platforms"
      description="Build mobile apps for iOS and Android using a single codebase with React Native or Flutter. Get native performance with reduced development time and cost."
      heroIcon={<Layers className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Mobile Apps", href: "/services/software-apps/mobile-apps" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "Single Codebase", description: "One code, both platforms" },
        { title: "Cost Effective", description: "40-50% less than native" },
        { title: "Faster Development", description: "Quicker time to market" },
        { title: "Native Feel", description: "Platform-specific UI" },
        { title: "Easy Updates", description: "Update once, deploy everywhere" },
        { title: "Hot Reload", description: "Fast development cycles" },
      ]}
      process={[
        { step: 1, title: "Framework Selection", description: "React Native or Flutter" },
        { step: 2, title: "Design", description: "Adaptive UI design" },
        { step: 3, title: "Development", description: "Build shared codebase" },
        { step: 4, title: "Platform Testing", description: "iOS and Android QA" },
        { step: 5, title: "Deployment", description: "Both app stores" },
      ]}
      pricing={[
        {
          name: "MVP",
          price: "AED 25,000",
          features: ["Both platforms", "Core features", "3 months", "3-month support"],
        },
        {
          name: "Full App",
          price: "AED 55,000",
          features: ["Both platforms", "Full features", "5 months", "1-year support"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Complex app", "Native modules", "Backend", "Ongoing support"],
        },
      ]}
      faqs={[
        {
          question: "React Native vs Flutter?",
          answer:
            "React Native uses JavaScript (easier if you have web devs). Flutter uses Dart (better performance). We help you choose.",
        },
        {
          question: "Any limitations vs native?",
          answer:
            "Most apps work great cross-platform. Complex animations or device features might need native modules.",
        },
      ]}
      relatedCategories={[
        { name: "iOS Apps", href: "/services/software-apps/mobile-apps/ios-apps" },
        { name: "Android Apps", href: "/services/software-apps/mobile-apps/android-apps" },
      ]}
    />
  )
}
