import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Custom Layout Design Dubai | Company Profile Design | Creative Fusion LLC",
  description:
    "Custom company profile layout design that reflects your brand personality and stands out from competitors.",
  keywords: ["custom layout design dubai", "company profile design uae", "corporate brochure layout", "profile design"],
}

export default function CustomLayoutDesignPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Custom Layout Design"
        description="Unique layouts that reflect your brand personality and stand out from competitors"
        heroImage="/custom-company-profile-layout-design-pages.jpg"
        features={[
          { title: "Brand-Aligned Design", description: "Layouts that match your brand identity", icon: "🎨" },
          { title: "Visual Hierarchy", description: "Guide readers through your story", icon: "📊" },
          { title: "White Space", description: "Clean, professional, easy-to-read layouts", icon: "⬜" },
          { title: "Image Integration", description: "Strategic use of photography and graphics", icon: "📷" },
          { title: "Grid Systems", description: "Structured, professional page layouts", icon: "📐" },
          { title: "Unique Templates", description: "Custom page templates for different sections", icon: "📄" },
        ]}
        process={[
          { step: "Brand Review", description: "Understand your brand identity" },
          { step: "Concept Development", description: "Create initial layout concepts" },
          { step: "Design Refinement", description: "Refine chosen direction" },
          { step: "Template Creation", description: "Develop page templates" },
        ]}
        benefits={[
          "Stand out from generic company profiles",
          "Professional, memorable presentation",
          "Brand consistency throughout",
          "Easy to read and navigate",
        ]}
        pricing={{
          starting: "AED 3,500",
          description: "Custom layout design services",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
