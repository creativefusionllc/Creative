import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Infographic Design Dubai | Visual Data | Creative Fusion",
  description:
    "Infographic design services in Dubai. Transform complex data into visually engaging infographics that are shareable and memorable.",
}

export default function InfographicsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Infographics"
        subtitle="Visual Data Storytelling"
        description="Transform complex data into stunning visuals. Our infographics make information digestible, shareable, and memorable."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Content Marketing", href: "/services/digital-marketing/content-marketing" }}
        benefits={[
          "Data visualization",
          "Brand consistency",
          "Shareable content",
          "Link building asset",
          "Social media ready",
          "Print versions",
        ]}
        process={[
          { step: "01", title: "Data Collection", description: "Gather and verify information" },
          { step: "02", title: "Concept Design", description: "Create visual concept" },
          { step: "03", title: "Design & Layout", description: "Produce infographic" },
          { step: "04", title: "Delivery", description: "Multiple format delivery" },
        ]}
        pricing={{ startingAt: "AED 2,000", unit: "per infographic" }}
        relatedCategories={[
          { name: "Graphic Design", href: "/services/graphic-design" },
          { name: "Blog Writing", href: "/services/digital-marketing/content-marketing/blog-writing" },
          { name: "Social Media Design", href: "/services/graphic-design/social-media-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
