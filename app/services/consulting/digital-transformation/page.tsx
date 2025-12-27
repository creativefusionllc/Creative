import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Rocket } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Digital Transformation Consulting Dubai | Business Technology Strategy | Creative Fusion LLC",
  description:
    "Expert digital transformation consulting in Dubai UAE. Technology adoption, process digitization, and business modernization strategies for competitive advantage.",
  keywords: [
    "digital transformation dubai",
    "business technology consulting uae",
    "process digitization dubai",
    "technology adoption consulting",
  ],
}

export default function DigitalTransformationPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11.1"
        title="Digital Transformation"
        subtitle="Strategic Technology Planning"
        description="Strategic planning for digital initiatives that modernize your business operations, enhance customer experiences, and drive sustainable competitive advantage."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Rocket}
        brandColor="lime"
        features={[
          {
            title: "Technology Roadmapping",
            description: "Strategic planning for technology adoption and digital initiatives.",
            icon: "🗺️",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          {
            title: "Process Digitization",
            description: "Converting manual processes to efficient digital workflows.",
            icon: "⚡",
            href: "/services/consulting/digital-transformation/process-digitization",
          },
          {
            title: "Cloud Migration",
            description: "Seamless transition to cloud infrastructure and services.",
            icon: "☁️",
            href: "/services/consulting/digital-transformation/cloud-migration",
          },
          {
            title: "Data Analytics Setup",
            description: "Implementing data-driven decision making systems.",
            icon: "📊",
            href: "/services/consulting/digital-transformation/data-analytics",
          },
          {
            title: "Automation Solutions",
            description: "Implementing RPA and workflow automation for efficiency.",
            icon: "🤖",
            href: "/services/consulting/digital-transformation/automation",
          },
          {
            title: "Digital Culture Training",
            description: "Empowering teams with digital skills and mindset.",
            icon: "🎓",
            href: "/services/consulting/digital-transformation/digital-training",
          },
        ]}
        process={[
          { number: "01", title: "Assessment", description: "Evaluate current digital maturity and identify gaps." },
          { number: "02", title: "Strategy", description: "Develop comprehensive digital transformation roadmap." },
          { number: "03", title: "Implementation", description: "Execute transformation initiatives systematically." },
          { number: "04", title: "Optimization", description: "Measure results and continuously improve." },
        ]}
        benefits={[
          "Increased operational efficiency",
          "Enhanced customer experiences",
          "Data-driven decision making",
          "Competitive market advantage",
          "Scalable technology infrastructure",
          "Future-proof business operations",
        ]}
        relatedServices={[
          { title: "IT Consulting", href: "/services/consulting/it-consulting" },
          { title: "Operations Consulting", href: "/services/consulting/operations-consulting" },
          { title: "Web Development", href: "/services/web-development" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
