import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Box } from "lucide-react"

export const metadata: Metadata = {
  title: "Print & Exhibition Services | Billboards, Banners & Trade Shows | Creative Fusion LLC Dubai UAE",
  description:
    "Professional print and exhibition services in Dubai & UAE. Exhibition stands, billboards, vehicle branding, brochures, and retail fit-outs.",
  keywords: [
    "print services dubai",
    "exhibition stands uae",
    "billboard advertising sharjah",
    "vehicle branding dubai",
    "trade show design uae",
  ],
}

export default function PrintExhibitionsPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Print & Exhibitions"
          subtitle="Physical Branding"
          description="Dominate the physical world with impactful print materials and exhibition solutions. From billboards to trade show stands, we create memorable brand experiences."
          heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
          icon={Box}
          features={[
            "Exhibition Stand Design & Build",
            "Retail Fit-Outs",
            "Billboard & Outdoor Advertising",
            "Vehicle Branding & Wraps",
            "Brochure & Flyer Design",
            "Packaging Design",
            "Signage & Wayfinding",
            "Roll-Up Banners",
            "Business Cards & Stationery",
          ]}
          packages={[
            {
              name: "Print Starter",
              price: "AED 1,000",
              description: "Essential print materials",
              features: [
                "Business Cards (500 pcs)",
                "Letterhead Design",
                "Envelope Design",
                "A4 Flyer (500 pcs)",
                "Design + Printing",
                "Standard Delivery",
              ],
            },
            {
              name: "Exhibition",
              price: "AED 12,000",
              description: "Trade show presence",
              features: [
                "3x3m Exhibition Stand",
                "Custom Stand Design",
                "Backdrop Graphics",
                "Counter Display",
                "Brochure Design (500 pcs)",
                "Roll-Up Banners (2)",
                "Setup & Dismantling",
              ],
              popular: true,
            },
            {
              name: "Large Format",
              price: "AED 25,000+",
              description: "Major outdoor campaigns",
              features: [
                "Billboard Design",
                "Vehicle Fleet Branding",
                "Building Wraps",
                "Hoarding Design",
                "Installation Included",
                "Premium Materials",
                "Multi-Location Setup",
                "Project Management",
              ],
            },
          ]}
          processSteps={[
            { title: "Brief", description: "Understanding your objectives, space, and brand guidelines." },
            { title: "Design", description: "Creative concepts and 3D visualizations for approval." },
            { title: "Production", description: "High-quality printing and fabrication." },
            { title: "Installation", description: "Professional setup and project completion." },
          ]}
          portfolioImages={[
            "/images/graphic-design-creative-workspace-mockups.jpg",
            "/images/hero-slide-brand-identity-design.jpg",
            "/images/creative-team-brainstorming.jpg",
          ]}
          relatedServices={[
            { title: "Creative Branding", href: "/services/creative-branding" },
            { title: "Photography", href: "/services/photography" },
            { title: "Graphic Design", href: "/services/graphic-design" },
            { title: "Sales & Retail", href: "/services/sales-retail" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
