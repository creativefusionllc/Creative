import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Professional Copywriting Dubai | Company Profile Writing | Creative Fusion LLC",
  description:
    "Professional copywriting services for company profiles. Compelling stories that engage your audience and showcase your brand value.",
  keywords: [
    "professional copywriting dubai",
    "company profile writing uae",
    "business copywriting",
    "corporate content",
  ],
}

export default function ProfessionalCopywritingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Professional Copywriting"
        description="Compelling copy that tells your brand story and engages your target audience"
        heroImage="/professional-business-copywriting-content-creation.jpg"
        features={[
          { title: "Brand Storytelling", description: "Craft compelling narratives about your company", icon: "📖" },
          { title: "Audience Targeting", description: "Write for your specific target market", icon: "🎯" },
          { title: "SEO Optimization", description: "Keyword-rich content for search visibility", icon: "🔍" },
          { title: "Arabic & English", description: "Bilingual copywriting services", icon: "🌐" },
          { title: "Tone & Voice", description: "Consistent brand voice throughout", icon: "🗣️" },
          { title: "Multiple Revisions", description: "Refine until it's perfect", icon: "✏️" },
        ]}
        process={[
          { step: "Discovery", description: "Understand your brand, audience, and goals" },
          { step: "Research", description: "Industry research and competitor analysis" },
          { step: "Draft Creation", description: "Write compelling first draft" },
          { step: "Refinement", description: "Revise based on your feedback" },
        ]}
        benefits={[
          "Professional, polished content that reflects your brand",
          "Engaging stories that connect with your audience",
          "SEO-optimized copy for better online visibility",
          "Saves you time and ensures quality",
        ]}
        pricing={{
          starting: "AED 2,000",
          description: "Professional copywriting services",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
