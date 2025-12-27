import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Infographic Design Dubai | Data Visualization UAE | Creative Fusion LLC",
  description:
    "Professional infographic design services. Transform complex data into engaging visual stories. Statistical infographics, timeline infographics, process diagrams.",
  keywords: ["infographic design dubai", "data visualization uae", "infographic designer", "visual data sharjah"],
}

export default function InfographicsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Marketing Collateral",
          href: "/services/graphic-design/marketing-collateral",
        }}
        title="Infographic Design"
        subtitle="Visual Data Storytelling"
        description="Transform complex information and data into compelling visual narratives that are easy to understand, share, and remember."
        heroImage="/modern-infographic-design-data-visualization.jpg"
        icon={BarChart3}
        features={[
          "Statistical infographics",
          "Timeline infographics",
          "Process diagrams",
          "Comparison infographics",
          "Geographic infographics",
          "Interactive infographics",
        ]}
        pricingTiers={[
          {
            name: "Simple",
            price: "AED 1,000",
            features: ["One infographic", "Basic data viz", "2 revisions"],
          },
          {
            name: "Professional",
            price: "AED 2,500",
            features: ["Complex infographic", "Custom illustrations", "Unlimited revisions"],
            highlighted: true,
          },
          {
            name: "Series",
            price: "AED 6,000+",
            features: ["Multiple infographics", "Animated version", "Full content strategy"],
          },
        ]}
        relatedSubServices={[
          { title: "Presentations", href: "/services/graphic-design/marketing-collateral/presentations" },
          { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
