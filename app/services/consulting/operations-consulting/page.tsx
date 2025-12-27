import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Settings } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Operations Consulting Dubai | Process Optimization UAE | Creative Fusion LLC",
  description:
    "Expert operations consulting in Dubai UAE. Process optimization, efficiency improvement, and operational excellence frameworks for business performance.",
  keywords: [
    "operations consulting dubai",
    "process optimization uae",
    "operational excellence dubai",
    "business efficiency consulting",
  ],
}

export default function OperationsConsultingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.4"
        title="Operations Consulting"
        subtitle="Process Excellence"
        description="Process optimization and operational excellence frameworks that streamline your business operations, reduce costs, and improve overall efficiency."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Settings}
        brandColor="cyan"
        features={[
          {
            title: "Process Optimization",
            description: "Streamline workflows and eliminate inefficiencies.",
            icon: "⚡",
            href: "/services/consulting/operations-consulting/process-optimization",
          },
          {
            title: "Cost Reduction",
            description: "Identify and eliminate unnecessary operational costs.",
            icon: "💰",
            href: "/services/consulting/operations-consulting/cost-reduction",
          },
          {
            title: "Quality Management",
            description: "Implement quality control systems and standards.",
            icon: "✅",
            href: "/services/consulting/operations-consulting/quality-management",
          },
          {
            title: "Supply Chain Optimization",
            description: "Improve supply chain efficiency and reliability.",
            icon: "🔗",
            href: "/services/consulting/operations-consulting/supply-chain",
          },
          {
            title: "Performance Metrics",
            description: "Develop KPIs and performance tracking systems.",
            icon: "📊",
            href: "/services/consulting/operations-consulting/performance-metrics",
          },
          {
            title: "Change Management",
            description: "Guide organizational change and transformation.",
            icon: "🔄",
            href: "/services/consulting/operations-consulting/change-management",
          },
        ]}
        process={[
          { number: "01", title: "Assessment", description: "Evaluate current operational performance." },
          { number: "02", title: "Analysis", description: "Identify bottlenecks and improvement areas." },
          { number: "03", title: "Implementation", description: "Execute optimization initiatives." },
          { number: "04", title: "Monitoring", description: "Track results and continuous improvement." },
        ]}
        benefits={[
          "Increased operational efficiency",
          "Reduced operational costs",
          "Improved quality standards",
          "Better resource utilization",
          "Faster turnaround times",
          "Enhanced customer satisfaction",
        ]}
        relatedServices={[
          { title: "IT Consulting", href: "/services/consulting/it-consulting" },
          { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
          { title: "Software & Apps", href: "/services/software-apps" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
