import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Affiliate Marketing Dubai | Influencer Affiliate Programs UAE | Creative Fusion",
  description:
    "Affiliate marketing programs in Dubai UAE. Performance-based influencer partnerships with trackable ROI.",
}

export default function AffiliatePage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        parentCategory={{ name: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" }}
        title="Affiliate Programs"
        subtitle="Performance-based partnerships"
        description="Create performance-based partnerships where influencers earn commission on sales, aligning incentives for measurable ROI."
        heroImage="/placeholder.svg?height=600&width=800"
        brandColor="purple"
        benefits={[
          "Pay for performance",
          "Trackable ROI",
          "Scalable model",
          "Incentive alignment",
          "Low risk",
          "Ongoing revenue",
        ]}
        processSteps={[
          { title: "Setup", description: "Create affiliate program" },
          { title: "Recruit", description: "Onboard affiliates" },
          { title: "Track", description: "Monitor performance" },
          { title: "Optimize", description: "Scale top performers" },
        ]}
        pricingTiers={[
          {
            name: "Program Setup",
            price: "AED 10,000",
            description: "One-time",
            features: ["Platform setup", "10 affiliates", "Tracking links", "Dashboard access"],
          },
          {
            name: "Managed Program",
            price: "AED 8,000",
            description: "Monthly + commission",
            features: [
              "Unlimited affiliates",
              "Recruitment",
              "Relationship management",
              "Fraud prevention",
              "Reporting",
            ],
          },
        ]}
        relatedCategories={[
          { title: "Brand Ambassadors", href: "/services/marketing-pr/influencer-marketing/brand-ambassadors" },
          { title: "Email Marketing", href: "/services/digital-marketing/email-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
