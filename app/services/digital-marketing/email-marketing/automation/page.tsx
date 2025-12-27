import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Email Automation Dubai | Marketing Automation | Creative Fusion",
  description:
    "Email automation services in Dubai. Set up automated workflows, triggers, and sequences that save time and increase conversions.",
}

export default function AutomationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        title="Email Automation"
        subtitle="Marketing Automation"
        description="Save time and increase conversions with email automation. We set up intelligent workflows that engage customers at the right moment."
        heroImage="/placeholder.svg?height=600&width=800"
        parentService={{ name: "Email Marketing", href: "/services/digital-marketing/email-marketing" }}
        benefits={[
          "Automated workflows",
          "Behavior triggers",
          "Welcome sequences",
          "Cart abandonment",
          "Birthday emails",
          "Win-back campaigns",
        ]}
        process={[
          { step: "01", title: "Audit & Planning", description: "Identify automation opportunities" },
          { step: "02", title: "Workflow Design", description: "Map automation flows" },
          { step: "03", title: "Implementation", description: "Build and configure" },
          { step: "04", title: "Optimization", description: "Test and improve" },
        ]}
        pricing={{ startingAt: "AED 4,000", unit: "setup + monthly" }}
        relatedCategories={[
          { name: "Drip Campaigns", href: "/services/digital-marketing/email-marketing/drip-campaigns" },
          { name: "CRM Solutions", href: "/services/software-apps/crm-solutions" },
          { name: "Remarketing", href: "/services/digital-marketing/ppc/remarketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
