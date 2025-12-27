import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Sales Landing Pages Dubai | High Converting Pages | Creative Fusion LLC",
  description:
    "Professional sales landing pages in Dubai. Persuasive design and copy that converts visitors into customers.",
}

export default function SalesPagesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Landing Pages", href: "/services/web-development/landing-pages" }}
        title="Sales Pages"
        subtitle="Persuade and convert"
        description="Create powerful sales landing pages with persuasive copy, social proof, and compelling CTAs that drive purchases."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Persuasive copy",
          "Social proof",
          "Testimonials",
          "Video sales",
          "Urgency elements",
          "Payment integration",
          "Upsells",
          "Mobile optimized",
        ]}
        process={[
          { title: "Strategy", description: "Sales psychology" },
          { title: "Copy", description: "Persuasive writing" },
          { title: "Design", description: "Visual hierarchy" },
          { title: "Convert", description: "Payment setup" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "2,000",
            description: "Single page",
            features: ["Sales copy", "Custom design", "Payment button", "Mobile responsive"],
          },
          {
            name: "Pro",
            price: "5,000",
            description: "Full funnel",
            features: ["Everything in Basic", "Video integration", "Upsell pages", "Thank you page"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "12,000",
            description: "Complete system",
            features: ["Everything in Pro", "Email sequence", "A/B testing", "Analytics"],
          },
        ]}
        relatedCategories={[
          { title: "Lead Generation", href: "/services/web-development/landing-pages/lead-generation" },
          { title: "Product Launch", href: "/services/web-development/landing-pages/product-launch" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
