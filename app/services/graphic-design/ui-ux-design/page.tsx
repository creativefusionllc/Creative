import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Layout } from "lucide-react"

export const metadata: Metadata = {
  title: "UI/UX Design Dubai | User Experience Design | Creative Fusion LLC",
  description:
    "Professional UI/UX design services. User-centered interface design, wireframing, prototyping, and usability testing for web and mobile applications.",
  keywords: ["ui ux design dubai", "user experience design uae", "interface design", "app design dubai"],
}

export default function UIUXDesignPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ title: "Graphic Design", href: "/services/graphic-design" }}
        title="UI/UX Design"
        subtitle="User-Centered Digital Experiences"
        description="Create intuitive, beautiful digital experiences that delight users and drive conversions with our expert UI/UX design services."
        heroImage="/images/ui-ux-design.jpg"
        icon={Layout}
        features={[
          "User research & personas",
          "Wireframing & prototyping",
          "Visual interface design",
          "Usability testing",
          "Design systems",
          "Responsive design",
        ]}
        pricingTiers={[
          {
            name: "Landing Page",
            price: "AED 4,000",
            features: ["Single page design", "Mobile responsive", "Prototype"],
          },
          {
            name: "Website",
            price: "AED 12,000",
            features: ["Up to 10 pages", "Full UX audit", "Design system"],
            highlighted: true,
          },
          {
            name: "App Design",
            price: "AED 20,000+",
            features: ["Full app design", "User testing", "Developer handoff"],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/graphic-design/brand-identity" },
          { title: "Visual Design Systems", href: "/services/graphic-design/visual-design-systems" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
