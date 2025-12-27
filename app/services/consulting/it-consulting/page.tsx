import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Monitor } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "IT Consulting Dubai | Technology Advisory UAE | Creative Fusion LLC",
  description:
    "Expert IT consulting services in Dubai UAE. Technology stack evaluation, system integration, and IT roadmap development for business growth.",
  keywords: ["IT consulting dubai", "technology consulting uae", "system integration dubai", "IT roadmap development"],
}

export default function ITConsultingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.5"
        title="IT/Technology Consulting"
        subtitle="Technology Advisory"
        description="Technology stack evaluation, system integration planning, and IT roadmap development to align your technology investments with business objectives."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Monitor}
        brandColor="blue"
        features={[
          {
            title: "Technology Assessment",
            description: "Evaluate current IT infrastructure and capabilities.",
            icon: "🔍",
            href: "/services/consulting/it-consulting/technology-assessment",
          },
          {
            title: "System Integration",
            description: "Plan and implement seamless system integrations.",
            icon: "🔗",
            href: "/services/consulting/it-consulting/system-integration",
          },
          {
            title: "IT Roadmap",
            description: "Develop strategic IT plans aligned with business goals.",
            icon: "🗺️",
            href: "/services/consulting/it-consulting/it-roadmap",
          },
          {
            title: "Cybersecurity Strategy",
            description: "Protect your business with robust security frameworks.",
            icon: "🔒",
            href: "/services/consulting/it-consulting/cybersecurity",
          },
          {
            title: "Vendor Selection",
            description: "Evaluate and select the right technology partners.",
            icon: "🤝",
            href: "/services/consulting/it-consulting/vendor-selection",
          },
          {
            title: "IT Governance",
            description: "Establish IT policies and governance frameworks.",
            icon: "📋",
            href: "/services/consulting/it-consulting/it-governance",
          },
        ]}
        process={[
          { number: "01", title: "Discovery", description: "Understand business needs and IT landscape." },
          { number: "02", title: "Evaluation", description: "Assess current systems and identify gaps." },
          { number: "03", title: "Planning", description: "Develop comprehensive IT strategy and roadmap." },
          { number: "04", title: "Execution", description: "Implement solutions and monitor performance." },
        ]}
        benefits={[
          "Aligned technology investments",
          "Reduced IT complexity",
          "Enhanced security posture",
          "Improved system efficiency",
          "Better vendor management",
          "Future-ready infrastructure",
        ]}
        relatedServices={[
          { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
          { title: "Web Development", href: "/services/web-development" },
          { title: "Software & Apps", href: "/services/software-apps" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
