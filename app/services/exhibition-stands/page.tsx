import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Boxes } from "lucide-react"

export const metadata: Metadata = {
  title: "Exhibition Stand Design & Build | Trade Show Displays | Creative Fusion LLC Dubai UAE",
  description:
    "Custom exhibition stand design and build services in Dubai & UAE. Trade show booths, modular displays, retail kiosks, and event installations for GITEX, Gulfood, and more.",
  keywords: [
    "exhibition stand dubai",
    "trade show booth design uae",
    "exhibition contractor sharjah",
    "GITEX booth design",
    "Gulfood stand builder",
    "modular exhibition stands",
    "retail kiosk design dubai",
    "event installation uae",
  ],
  openGraph: {
    title: "Exhibition Stand Design & Build | Creative Fusion LLC",
    description: "Custom exhibition stands for trade shows and events across UAE.",
    type: "website",
    locale: "en_AE",
  },
}

export default function ExhibitionStandsPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Exhibition Stands"
          subtitle="Trade Show Excellence"
          description="Make a lasting impression at trade shows and exhibitions with our custom-designed stands. From concept to installation, we create immersive brand experiences that attract visitors and generate leads."
          heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
          icon={Boxes}
          features={[
            "Custom Stand Design & 3D Visualization",
            "Modular Exhibition Systems",
            "Double-Decker Stands",
            "Interactive Display Solutions",
            "Retail Kiosks & Pop-Up Stores",
            "LED Walls & Digital Signage",
            "Furniture & Accessories Rental",
            "Carpet & Flooring",
            "Lighting Design",
            "On-Site Installation & Dismantling",
            "Storage & Logistics",
            "Project Management",
          ]}
          packages={[
            {
              name: "Shell Scheme",
              price: "AED 8,000",
              description: "Basic booth enhancement",
              features: [
                "Shell Scheme Upgrade",
                "Custom Graphics & Branding",
                "Counter Display",
                "Product Shelving",
                "Basic Lighting",
                "Setup & Dismantling",
                "3x3m Space",
              ],
            },
            {
              name: "Custom Stand",
              price: "AED 25,000",
              description: "Full custom exhibition stand",
              features: [
                "Custom Stand Design",
                "3D Visualization",
                "Premium Construction",
                "Multimedia Integration",
                "Meeting Area",
                "Storage Room",
                "Professional Lighting",
                "Carpet & Flooring",
                "Up to 6x6m Space",
                "Full Project Management",
              ],
              popular: true,
            },
            {
              name: "Premium Experience",
              price: "AED 60,000+",
              description: "Large-scale exhibition presence",
              features: [
                "Double-Decker Stand",
                "VR/AR Integration",
                "LED Video Walls",
                "Private Meeting Rooms",
                "Hospitality Services",
                "Interactive Displays",
                "Custom Furniture",
                "Complete AV Setup",
                "Dedicated Project Team",
                "Post-Event Storage",
                "12x12m+ Space",
              ],
            },
          ]}
          processSteps={[
            { title: "Brief", description: "Understand your objectives, budget, and brand guidelines." },
            { title: "Design", description: "Create 3D visualizations and technical drawings for approval." },
            { title: "Build", description: "Fabricate stand with premium materials and quality control." },
            { title: "Install", description: "Professional setup, event support, and dismantling." },
          ]}
          portfolioImages={[
            "/images/graphic-design-creative-workspace-mockups.jpg",
            "/images/hero-slide-brand-identity-design.jpg",
            "/images/creative-team-brainstorming.jpg",
          ]}
          relatedServices={[
            { title: "Print & Exhibitions", href: "/services/print-exhibitions" },
            { title: "Creative Branding", href: "/services/creative-branding" },
            { title: "Videography", href: "/services/videography" },
            { title: "Photography", href: "/services/photography" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
