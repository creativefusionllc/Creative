import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Case Study Writing Dubai | Success Stories | Creative Fusion",
  description:
    "Case study writing services in Dubai. Compelling success stories that showcase your results and build trust with potential clients.",
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Case Studies"
        subtitle="Success Stories"
        description="Showcase your success with compelling case studies. We create detailed success stories that demonstrate your value and build trust."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Content Marketing", href: "/services/digital-marketing/content-marketing" }}
        benefits={[
          "Client interviews",
          "Data visualization",
          "Professional design",
          "Multiple formats",
          "Video versions",
          "Sales enablement",
        ]}
        process={[
          { step: "01", title: "Client Selection", description: "Choose best success stories" },
          { step: "02", title: "Interview & Research", description: "Gather detailed information" },
          { step: "03", title: "Writing & Design", description: "Create compelling narrative" },
          { step: "04", title: "Distribution", description: "Publish and promote" },
        ]}
        pricing={{ startingAt: "AED 3,000", unit: "per case study" }}
        relatedCategories={[
          { name: "Blog Writing", href: "/services/digital-marketing/content-marketing/blog-writing" },
          { name: "Video Content", href: "/services/digital-marketing/content-marketing/video-content" },
          { name: "Company Profile", href: "/services/creative-branding/company-profile" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
