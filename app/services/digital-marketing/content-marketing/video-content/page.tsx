import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Video Content Marketing Dubai | Video Strategy | Creative Fusion",
  description:
    "Video content marketing services in Dubai. Strategy, scripting, production, and distribution for engaging video content that converts.",
}

export default function VideoContentPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Video Content"
        subtitle="Visual Storytelling"
        description="Engage audiences with compelling video content. We develop video strategies and produce content that tells your brand story effectively."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Content Marketing", href: "/services/digital-marketing/content-marketing" }}
        benefits={[
          "Video strategy",
          "Script writing",
          "Production coordination",
          "Platform optimization",
          "Video SEO",
          "Distribution planning",
        ]}
        process={[
          { step: "01", title: "Strategy", description: "Define video content goals" },
          { step: "02", title: "Planning", description: "Script and storyboard" },
          { step: "03", title: "Production", description: "Create video content" },
          { step: "04", title: "Distribution", description: "Publish and promote" },
        ]}
        pricing={{ startingAt: "AED 3,000", unit: "per video" }}
        relatedCategories={[
          { name: "Videography", href: "/services/videography" },
          { name: "YouTube Marketing", href: "/services/digital-marketing/social-media/youtube-marketing" },
          { name: "Social Media Content", href: "/services/videography/social-media-content" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
