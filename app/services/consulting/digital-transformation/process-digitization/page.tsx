import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Process Digitization Dubai | Digital Workflow Consulting | Creative Fusion LLC",
  description:
    "Expert process digitization services in Dubai UAE. Converting manual processes to efficient digital workflows for business optimization.",
  keywords: ["process digitization dubai", "digital workflow consulting uae", "business process automation"],
}

export default function ProcessDigitizationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Process Digitization"
        subtitle="Digital Workflow Transformation"
        description="Converting manual processes to efficient digital workflows that streamline operations, reduce errors, and boost productivity."
        heroImage="/process-digitization-digital-workflow-automation.jpg"
        benefits={[
          "Eliminated manual errors and inconsistencies",
          "Faster process completion times",
          "Reduced operational costs",
          "Improved data accuracy and accessibility",
          "Enhanced team collaboration",
          "Real-time process visibility and tracking",
        ]}
        process={[
          { step: 1, title: "Mapping", description: "Document and analyze current manual processes." },
          { step: 2, title: "Design", description: "Create optimized digital workflow solutions." },
          { step: 3, title: "Implement", description: "Deploy digital tools and train teams." },
          { step: 4, title: "Optimize", description: "Monitor performance and continuously improve." },
        ]}
        pricing={{
          startingFrom: "AED 12,000",
          includes: [
            "Process mapping documentation",
            "Digital workflow design",
            "Tool implementation",
            "Team training sessions",
            "30-day post-launch support",
          ],
        }}
        faqs={[
          {
            question: "How long does process digitization take?",
            answer: "Typically 4-12 weeks depending on the complexity and number of processes being digitized.",
          },
          {
            question: "Will we need to change our existing tools?",
            answer: "Not necessarily. We often integrate with existing systems while adding digital workflows on top.",
          },
          {
            question: "How do you handle employee resistance to change?",
            answer: "We include change management and comprehensive training to ensure smooth adoption.",
          },
        ]}
        relatedCategories={[
          { title: "Automation", href: "/services/consulting/digital-transformation/automation" },
          {
            title: "Technology Roadmapping",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          { title: "Cloud Migration", href: "/services/consulting/digital-transformation/cloud-migration" },
          { title: "Digital Training", href: "/services/consulting/digital-transformation/digital-training" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
