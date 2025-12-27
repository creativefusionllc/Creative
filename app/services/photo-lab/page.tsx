import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Archive } from "lucide-react"

export const metadata: Metadata = {
  title: "Photo Lab Services | Document Scanning & Photo Restoration | Creative Fusion LLC Dubai UAE",
  description:
    "Professional photo lab services in Dubai & UAE. Document scanning, microfilming, photo retouching, restoration, film developing, and archival services.",
  keywords: [
    "photo lab dubai",
    "document scanning uae",
    "photo restoration sharjah",
    "film developing dubai",
    "microfilming services uae",
  ],
}

export default function PhotoLabPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Photo Lab Services"
          subtitle="Preservation & Processing"
          description="Preserve your memories and documents with our professional photo lab services. From digital restoration to archival processing, we handle your precious materials with care."
          heroImage="/images/hero-slide-brand-identity-design.jpg"
          icon={Archive}
          features={[
            "Document Scanning",
            "Microfilming Services",
            "Photo Retouching",
            "Image Restoration",
            "Film Developing",
            "Photo Printing",
            "Large Format Printing",
            "Canvas & Fine Art Prints",
            "Digital Archiving",
          ]}
          packages={[
            {
              name: "Basic Scanning",
              price: "AED 200",
              description: "Document digitization",
              features: [
                "Up to 100 Documents",
                "300 DPI Scanning",
                "PDF/JPEG Output",
                "Basic Organization",
                "USB Delivery",
                "5-Day Turnaround",
              ],
            },
            {
              name: "Photo Restoration",
              price: "AED 150/photo",
              description: "Bring old photos back to life",
              features: [
                "Damage Repair",
                "Color Correction",
                "Scratch Removal",
                "Digital Enhancement",
                "High-Res Output",
                "Print Options Available",
                "Before/After Preview",
              ],
              popular: true,
            },
            {
              name: "Archival",
              price: "AED 2,500+",
              description: "Complete archiving solution",
              features: [
                "Large Volume Scanning",
                "Microfilm Conversion",
                "OCR Processing",
                "Metadata Tagging",
                "Cloud Storage Setup",
                "Multiple Format Output",
                "Quality Assurance",
                "Secure Handling",
              ],
            },
          ]}
          processSteps={[
            { title: "Receive", description: "Secure receipt and cataloging of your materials." },
            { title: "Process", description: "Careful handling and professional processing." },
            { title: "Review", description: "Quality check and client approval." },
            { title: "Deliver", description: "Safe return of originals and digital delivery." },
          ]}
          portfolioImages={[
            "/images/hero-slide-brand-identity-design.jpg",
            "/images/creative-team-brainstorming.jpg",
            "/images/graphic-design-creative-workspace-mockups.jpg",
          ]}
          relatedServices={[
            { title: "Photography", href: "/services/photography" },
            { title: "Creative Branding", href: "/services/creative-branding" },
            { title: "Print & Exhibitions", href: "/services/print-exhibitions" },
            { title: "Support & Maintenance", href: "/services/support-maintenance" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
