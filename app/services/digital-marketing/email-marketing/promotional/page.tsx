import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Promotional Email Services Dubai | Sales Campaigns | Creative Fusion",
  description:
    "Promotional email services in Dubai. Sales campaigns, product launches, and special offers that drive immediate conversions.",
}

export default function PromotionalPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Promotional Emails"
        subtitle="Sales Campaigns"
        description="Drive immediate sales with compelling promotional emails. We create high-converting campaigns for product launches, sales, and special offers."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        benefits={[
          "Sales campaigns",
          "Product launches",
          "Flash sales",
          "Seasonal offers",
          "Urgency tactics",
          "Conversion optimization",
        ]}
        process={[
          { step: "01", title: "Campaign Planning", description: "Define goals and offers" },
          { step: "02", title: "Design & Copy", description: "Create compelling content" },
          { step: "03", title: "Segmentation", description: "Target right audience" },
          { step: "04", title: "Launch & Track", description: "Send and measure results" },
        ]}
        pricing={{ startingAt: "AED 800", unit: "per campaign" }}
        relatedCategories={[
          { name: "Newsletters", href: "/services/digital-marketing/email-marketing/newsletters" },
          { name: "E-commerce SEO", href: "/services/digital-marketing/seo/ecommerce-seo" },
          { name: "Remarketing", href: "/services/digital-marketing/ppc/remarketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
