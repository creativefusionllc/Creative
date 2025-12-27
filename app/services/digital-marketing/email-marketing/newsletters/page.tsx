import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Newsletter Services Dubai | Email Newsletters | Creative Fusion",
  description:
    "Newsletter creation services in Dubai. Design, write, and send engaging email newsletters that keep your audience informed and engaged.",
}

export default function NewslettersPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Newsletters"
        subtitle="Regular Email Updates"
        description="Keep your audience engaged with professional newsletters. We design, write, and manage email newsletters that drive engagement and loyalty."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        benefits={[
          "Custom templates",
          "Content curation",
          "Scheduling",
          "Segmentation",
          "A/B testing",
          "Performance tracking",
        ]}
        process={[
          { step: "01", title: "Template Design", description: "Create branded template" },
          { step: "02", title: "Content Planning", description: "Develop content calendar" },
          { step: "03", title: "Creation & Send", description: "Produce and distribute" },
          { step: "04", title: "Analysis", description: "Track and optimize" },
        ]}
        pricing={{ startingAt: "AED 1,500", unit: "per month" }}
        relatedCategories={[
          { name: "Email Automation", href: "/services/digital-marketing/email-marketing/automation" },
          { name: "Blog Writing", href: "/services/digital-marketing/content-marketing/blog-writing" },
          { name: "List Building", href: "/services/digital-marketing/email-marketing/list-building" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
