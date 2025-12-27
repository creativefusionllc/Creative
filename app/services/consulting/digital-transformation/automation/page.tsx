import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Business Automation Solutions Dubai | RPA Consulting | Creative Fusion LLC",
  description:
    "Expert automation solutions in Dubai UAE. Implementing RPA and workflow automation for maximum business efficiency.",
  keywords: ["business automation dubai", "RPA consulting uae", "workflow automation solutions"],
}

export default function AutomationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Automation Solutions"
        subtitle="Intelligent Process Automation"
        description="Implementing RPA and workflow automation solutions that eliminate repetitive tasks, reduce costs, and maximize operational efficiency."
        heroImage="/business-automation-robotic-process-automation.jpg"
        benefits={[
          "80% reduction in manual repetitive tasks",
          "24/7 automated operations capability",
          "Near-zero human error rate",
          "Significant cost savings on labor",
          "Improved employee productivity and satisfaction",
          "Scalable automation framework for growth",
        ]}
        process={[
          { step: 1, title: "Identify", description: "Discover automation opportunities and ROI potential." },
          { step: 2, title: "Design", description: "Architect automation workflows and integrations." },
          { step: 3, title: "Build", description: "Develop and test automation solutions." },
          { step: 4, title: "Scale", description: "Deploy, monitor, and expand automation coverage." },
        ]}
        pricing={{
          startingFrom: "AED 15,000",
          includes: [
            "Automation opportunity assessment",
            "RPA bot development",
            "Integration setup",
            "Testing and deployment",
            "Training and documentation",
          ],
        }}
        faqs={[
          {
            question: "What processes can be automated?",
            answer:
              "Repetitive, rule-based tasks like data entry, report generation, email processing, and invoice handling are ideal candidates.",
          },
          {
            question: "What is the ROI on automation?",
            answer: "Most businesses see 200-400% ROI within the first year through time savings and error reduction.",
          },
          {
            question: "Will automation replace our employees?",
            answer: "Automation handles repetitive tasks, freeing employees to focus on higher-value strategic work.",
          },
        ]}
        relatedCategories={[
          { title: "Process Digitization", href: "/services/consulting/digital-transformation/process-digitization" },
          { title: "Data Analytics", href: "/services/consulting/digital-transformation/data-analytics" },
          {
            title: "Technology Roadmapping",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          { title: "Cloud Migration", href: "/services/consulting/digital-transformation/cloud-migration" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
