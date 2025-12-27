import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Technology Roadmapping Dubai | Digital Strategy Planning | Creative Fusion LLC",
  description:
    "Expert technology roadmapping services in Dubai UAE. Strategic planning for technology adoption and digital initiatives for business growth.",
  keywords: ["technology roadmapping dubai", "digital strategy planning uae", "IT roadmap consulting"],
}

export default function TechnologyRoadmappingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Technology Roadmapping"
        subtitle="Strategic Technology Planning"
        description="Strategic planning for technology adoption and digital initiatives that align with your business goals and drive sustainable growth."
        heroImage="/technology-roadmapping-digital-strategy-planning.jpg"
        benefits={[
          "Clear technology direction aligned with business goals",
          "Optimized technology investments and ROI",
          "Reduced implementation risks and failures",
          "Scalable infrastructure planning for growth",
          "Competitive advantage through technology",
          "Better resource allocation and budgeting",
        ]}
        process={[
          { step: 1, title: "Discovery", description: "Assess current technology landscape and business needs." },
          { step: 2, title: "Analysis", description: "Identify gaps and opportunities for improvement." },
          { step: 3, title: "Planning", description: "Develop comprehensive technology roadmap." },
          { step: 4, title: "Execution", description: "Guide implementation and measure success." },
        ]}
        pricing={{
          startingFrom: "AED 8,000",
          includes: [
            "Technology assessment report",
            "Strategic roadmap document",
            "Implementation timeline",
            "Budget recommendations",
            "Vendor evaluation matrix",
          ],
        }}
        faqs={[
          {
            question: "What is a technology roadmap?",
            answer:
              "A technology roadmap is a strategic planning document that outlines your organization's technology goals, initiatives, and timeline for implementation over a defined period.",
          },
          {
            question: "How long does technology roadmapping take?",
            answer:
              "Typically 4-8 weeks depending on organization size and complexity. This includes assessment, analysis, planning, and presentation of the final roadmap.",
          },
          {
            question: "Who should be involved in roadmapping?",
            answer:
              "Key stakeholders including IT leadership, business unit heads, finance, and executive management should participate to ensure alignment.",
          },
        ]}
        relatedCategories={[
          { title: "Cloud Migration", href: "/services/consulting/digital-transformation/cloud-migration" },
          { title: "Process Digitization", href: "/services/consulting/digital-transformation/process-digitization" },
          { title: "Automation", href: "/services/consulting/digital-transformation/automation" },
          { title: "Digital Training", href: "/services/consulting/digital-transformation/digital-training" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
