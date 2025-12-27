import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Infographics Design Dubai | Data Visualization | Creative Fusion LLC",
  description:
    "Professional infographics design services. Visual data representation that makes complex information easy to understand.",
  keywords: ["infographics design dubai", "data visualization uae", "information graphics", "visual data"],
}

export default function InfographicsDesignPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Infographics Design"
        description="Visual data representation that makes complex information easy to understand"
        heroImage="/professional-business-infographics-data-visualizat.jpg"
        features={[
          { title: "Data Visualization", description: "Transform numbers into compelling visuals", icon: "📊" },
          { title: "Process Diagrams", description: "Illustrate workflows and procedures", icon: "🔄" },
          { title: "Timelines", description: "Showcase company history and milestones", icon: "📅" },
          { title: "Comparison Charts", description: "Show features, benefits, comparisons", icon: "⚖️" },
          { title: "Icon Design", description: "Custom icons for your infographics", icon: "🎯" },
          { title: "Brand Aligned", description: "Infographics in your brand colors and style", icon: "🎨" },
        ]}
        process={[
          { step: "Data Collection", description: "Gather information and statistics" },
          { step: "Concept Creation", description: "Design visual representation strategy" },
          { step: "Design Development", description: "Create infographic designs" },
          { step: "Refinement", description: "Polish and perfect the visuals" },
        ]}
        benefits={[
          "Complex data becomes easy to understand",
          "More engaging than text-heavy pages",
          "Memorable visual communication",
          "Share-worthy content for social media",
        ]}
        pricing={{
          starting: "AED 800",
          description: "Per infographic design",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
