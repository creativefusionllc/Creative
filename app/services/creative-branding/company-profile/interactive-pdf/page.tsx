import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Interactive PDF Company Profiles Dubai | Digital Profiles | Creative Fusion LLC",
  description:
    "Interactive PDF company profiles with clickable links, navigation, and multimedia. Enhanced digital experience.",
  keywords: ["interactive pdf dubai", "digital company profile uae", "clickable pdf", "multimedia profile"],
}

export default function InteractivePDFPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Interactive PDF"
        description="Clickable links, navigation, and multimedia for digital distribution"
        heroImage="/interactive-digital-pdf-company-profile.jpg"
        features={[
          { title: "Clickable Links", description: "Link to website, email, social media", icon: "🔗" },
          { title: "Table of Contents", description: "Interactive navigation bookmarks", icon: "📑" },
          { title: "Video Embedding", description: "Embed company videos directly", icon: "🎥" },
          { title: "Form Fields", description: "Interactive forms and buttons", icon: "📝" },
          { title: "Page Transitions", description: "Smooth page-turning animations", icon: "📖" },
          { title: "Analytics Tracking", description: "Track views and engagement", icon: "📊" },
        ]}
        process={[
          { step: "Link Mapping", description: "Plan all interactive elements" },
          { step: "PDF Creation", description: "Build interactive PDF document" },
          { step: "Media Embedding", description: "Add videos and interactive content" },
          { step: "Testing", description: "Test on various PDF readers" },
        ]}
        benefits={[
          "Enhanced digital reading experience",
          "Direct links to your online presence",
          "More engaging than static PDFs",
          "Easy to share and distribute",
        ]}
        pricing={{
          starting: "AED 2,000",
          description: "Interactive PDF creation",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
