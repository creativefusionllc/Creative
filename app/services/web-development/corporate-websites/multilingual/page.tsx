import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Multilingual Website Design Dubai | Arabic English Websites | Creative Fusion LLC",
  description:
    "Professional multilingual website development in Dubai. Arabic, English, and multi-language websites with RTL support.",
}

export default function MultilingualPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Corporate Websites", href: "/services/web-development/corporate-websites" }}
        title="Multilingual Websites"
        subtitle="Reach global audiences"
        description="Build professional multilingual websites with Arabic, English, and other languages. Full RTL support and seamless language switching."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Arabic RTL support",
          "Language switcher",
          "SEO per language",
          "Cultural adaptation",
          "Translation ready",
          "Geo-targeting",
          "Local domains",
          "Global reach",
        ]}
        process={[
          { title: "Plan", description: "Language strategy" },
          { title: "Design", description: "RTL/LTR layouts" },
          { title: "Build", description: "Multi-language CMS" },
          { title: "Launch", description: "Global deployment" },
        ]}
        pricing={[
          {
            name: "Bilingual",
            price: "6,000",
            description: "2 languages",
            features: ["Arabic & English", "RTL support", "Language switcher", "SEO setup"],
          },
          {
            name: "Multi",
            price: "12,000",
            description: "4 languages",
            features: ["Everything in Bilingual", "Additional languages", "Geo-detection", "Analytics"],
            popular: true,
          },
          {
            name: "Global",
            price: "25,000",
            description: "Unlimited",
            features: ["Everything in Multi", "Custom languages", "Regional domains", "Support"],
          },
        ]}
        relatedCategories={[
          { title: "Company Websites", href: "/services/web-development/corporate-websites/company-websites" },
          { title: "Multi-page", href: "/services/web-development/corporate-websites/multi-page" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
