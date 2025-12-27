import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Briefcase } from "lucide-react"

export const dynamic = "force-static"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Business & Marketing Consulting Services Dubai | Strategy & Consultancy | Creative Fusion LLC",
  description:
    "Expert business consulting services in Dubai UAE. Digital transformation, marketing strategy, brand positioning, IT consulting, and operations optimization for business growth.",
  keywords: [
    "business consulting dubai",
    "marketing strategy uae",
    "digital transformation consulting",
    "brand strategy dubai",
    "IT consulting sharjah",
    "operations consulting uae",
  ],
  openGraph: {
    title: "Business & Marketing Consulting Services Dubai | Creative Fusion LLC",
    description: "Strategic advisory services to optimize operations and drive business growth in Dubai UAE.",
    images: ["/images/creative-team-brainstorming.jpg"],
  },
}

export default function ConsultingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="11"
        title="Business & Marketing Consulting"
        subtitle="Strategy & Consultancy"
        description="Strategic advisory services to optimize operations, eliminate friction points, and ensure future-proof technological alignment with your business goals. We help businesses transform and grow."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Briefcase}
        brandColor="lime"
        features={[
          {
            title: "Digital Transformation",
            description:
              "Strategic planning for digital initiatives, technology adoption, and business process modernization.",
            icon: "🚀",
            href: "/services/consulting/digital-transformation",
          },
          {
            title: "Marketing Strategy",
            description:
              "Comprehensive marketing blueprints, campaign planning, and go-to-market strategies for growth.",
            icon: "📈",
            href: "/services/consulting/marketing-strategy",
          },
          {
            title: "Brand Strategy",
            description: "Clear brand differentiation, identity positioning, and competitive market analysis.",
            icon: "🎯",
            href: "/services/consulting/brand-strategy",
          },
          {
            title: "Operations Consulting",
            description: "Process optimization, efficiency improvement, and operational excellence frameworks.",
            icon: "⚙️",
            href: "/services/consulting/operations-consulting",
          },
          {
            title: "IT/Technology Consulting",
            description: "Technology stack evaluation, system integration planning, and IT roadmap development.",
            icon: "💻",
            href: "/services/consulting/it-consulting",
          },
          {
            title: "Communications Consultancy",
            description: "Unified messaging across channels, PR strategy, and corporate communications planning.",
            icon: "📢",
            href: "/services/consulting/communications-consultancy",
          },
        ]}
        process={[
          {
            number: "01",
            title: "Discovery",
            description: "We analyze your business, market position, and identify opportunities for growth.",
          },
          {
            number: "02",
            title: "Strategy",
            description: "We develop a comprehensive strategic roadmap tailored to your goals.",
          },
          {
            number: "03",
            title: "Implementation",
            description: "We guide you through execution with hands-on support and expertise.",
          },
          {
            number: "04",
            title: "Optimization",
            description: "We measure results and continuously refine strategies for maximum impact.",
          },
        ]}
        benefits={[
          "Expert advisors with 15+ years experience",
          "Strategic insights backed by data",
          "Growth planning and execution support",
          "Process optimization methodologies",
          "Change management expertise",
          "Ongoing strategic partnership",
        ]}
        relatedServices={[
          { title: "Digital Marketing", href: "/services/digital-marketing" },
          { title: "Creative Branding", href: "/services/creative-branding" },
          { title: "Web Development", href: "/services/web-development" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
