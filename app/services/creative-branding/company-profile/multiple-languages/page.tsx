import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata: Metadata = {
  title: "Multilingual Company Profiles Dubai | Arabic English Profiles | Creative Fusion LLC",
  description:
    "Multilingual company profiles with Arabic and English versions. Proper RTL layout and cultural adaptation for UAE market.",
  keywords: [
    "multilingual company profile dubai",
    "arabic english profile uae",
    "bilingual corporate profile",
    "rtl design",
  ],
}

export default function MultipleLanguagesPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        category="Creative Branding"
        categoryHref="/services/creative-branding"
        subcategory="Company Profile"
        subcategoryHref="/services/creative-branding/company-profile"
        title="Multiple Languages"
        description="Arabic and English versions with proper RTL layout for Arabic content"
        heroImage="/bilingual-arabic-english-company-profile.jpg"
        features={[
          { title: "Arabic Translation", description: "Professional Arabic copywriting", icon: "🇦🇪" },
          { title: "English Translation", description: "Native English copywriting", icon: "🇬🇧" },
          { title: "RTL Layout", description: "Right-to-left design for Arabic version", icon: "↩️" },
          { title: "Cultural Adaptation", description: "Content adapted for local audience", icon: "🌍" },
          { title: "Dual Versions", description: "Separate English and Arabic profiles", icon: "📚" },
          { title: "Bilingual Version", description: "Combined Arabic-English profile option", icon: "🔄" },
        ]}
        process={[
          { step: "Content Translation", description: "Professional translation services" },
          { step: "Arabic Layout", description: "Design RTL layout for Arabic" },
          { step: "Cultural Review", description: "Ensure cultural appropriateness" },
          { step: "Proofreading", description: "Native speakers review both versions" },
        ]}
        benefits={[
          "Reach both local and international audiences",
          "Professional Arabic layout and typography",
          "Culturally appropriate content",
          "Essential for UAE business environment",
        ]}
        pricing={{
          starting: "AED 3,000",
          description: "Per additional language",
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
