import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Email List Building Dubai | Lead Generation | Creative Fusion",
  description:
    "Email list building services in Dubai. Grow your subscriber base with lead magnets, opt-in forms, and strategic list growth tactics.",
}

export default function ListBuildingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="List Building"
        subtitle="Grow Your Audience"
        description="Build a valuable email list of engaged subscribers. We create lead magnets and opt-in strategies that grow your audience effectively."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        benefits={["Lead magnets", "Opt-in forms", "Landing pages", "Pop-ups", "Content upgrades", "List segmentation"]}
        process={[
          { step: "01", title: "Strategy", description: "Define list growth goals" },
          { step: "02", title: "Lead Magnet", description: "Create valuable offer" },
          { step: "03", title: "Capture Setup", description: "Implement opt-in forms" },
          { step: "04", title: "Growth Tactics", description: "Drive targeted traffic" },
        ]}
        pricing={{ startingAt: "AED 2,500", unit: "per month" }}
        relatedCategories={[
          { name: "Landing Pages", href: "/services/web-development/landing-pages" },
          { name: "E-books", href: "/services/digital-marketing/content-marketing/ebooks" },
          { name: "PPC Advertising", href: "/services/digital-marketing/ppc" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
