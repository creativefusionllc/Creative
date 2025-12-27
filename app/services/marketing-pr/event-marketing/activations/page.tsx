import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Brand Activations Dubai | Experiential Marketing UAE | Creative Fusion",
  description:
    "Brand activation and experiential marketing in Dubai UAE. Interactive experiences that engage and convert.",
}

export default function ActivationsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Event Marketing", href: "/services/marketing-pr/event-marketing" }}
        title="Brand Activations"
        subtitle="Interactive brand experiences"
        description="We create immersive brand activations that engage audiences through interactive experiences, sampling, and memorable moments."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Creative concepts",
          "Interactive elements",
          "Sampling programs",
          "Data capture",
          "Social integration",
          "Brand ambassadors",
        ]}
        processSteps={[
          { title: "Concept", description: "Develop creative idea" },
          { title: "Design", description: "Create activation elements" },
          { title: "Execute", description: "Bring experience to life" },
          { title: "Measure", description: "Track engagement and ROI" },
        ]}
        pricingTiers={[
          {
            name: "Pop-Up Activation",
            price: "AED 20,000",
            description: "Single location",
            features: ["Concept design", "Basic setup", "Staffing", "Social content"],
          },
          {
            name: "Experiential Campaign",
            price: "AED 60,000",
            description: "Multi-location",
            features: [
              "Full creative",
              "Technology integration",
              "Multiple touchpoints",
              "Data capture",
              "Content production",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Product Launches", href: "/services/marketing-pr/event-marketing/product-launches" },
          { title: "Exhibition Stands", href: "/services/print-exhibitions/exhibition-stands" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
