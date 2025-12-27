import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Interactive Kiosks | Exhibition Stands | Creative Fusion",
  description: "Engaging interactive kiosks for events in Dubai & UAE.",
}

export default function InteractiveKiosksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Kiosks"
      subServiceSlug="kiosks"
      categoryName="Interactive Kiosks"
      categorySlug="interactive"
      description="Engaging interactive kiosks with games, quizzes, and experiences that captivate audiences."
      features={[
        "Gamification",
        "Lead capture",
        "Product configurators",
        "Virtual experiences",
        "Social integration",
        "Analytics",
      ]}
      benefits={["Engagement", "Data collection", "Memorable experience", "Lead generation", "Brand interaction"]}
      processSteps={[
        "Experience design",
        "Development",
        "Hardware selection",
        "Integration",
        "Testing",
        "Event support",
      ]}
      brandColor="orange"
    />
  )
}
