import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Camera } from "lucide-react"

export const dynamic = "force-static"

export const revalidate = 0

export const metadata: Metadata = {
  title: "Professional Photography Services Dubai | Corporate, Wedding & Product | Creative Fusion LLC",
  description:
    "Expert photography services in Dubai UAE. Corporate events, weddings, product photography, real estate, and 360-degree virtual tours. Premium Sony equipment for stunning results.",
  keywords: [
    "photography services dubai",
    "wedding photographer uae",
    "product photography dubai",
    "corporate photography sharjah",
    "real estate photography uae",
    "event photographer dubai",
  ],
  openGraph: {
    title: "Professional Photography Services Dubai | Creative Fusion LLC",
    description: "Capture moments that tell your story with our professional photography team in Dubai UAE.",
    images: ["/images/creative-team-brainstorming.jpg"],
  },
}

export default function PhotographyPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="02"
        title="Photography Services"
        subtitle="Precision imaging for every sector"
        description="At Creative Fusion LLC, we know that a picture is worth a thousand words. Our photography team combines artistic vision with state-of-the-art technology to capture moments that tell your story."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Camera}
        brandColor="coral"
        features={[
          {
            title: "Real Estate Photography",
            description:
              "High-resolution, wide-angle shots with minimal distortion. Perfect for property listings, architectural showcases, and interior design portfolios.",
            icon: "🏠",
            href: "/services/photography/real-estate", // Added link
          },
          {
            title: "Corporate & Commercial Photography",
            description:
              "Professional portraits, team photos, and office environment shots that showcase your company culture and professionalism.",
            icon: "💼",
            href: "/services/photography/corporate", // Added link
          },
          {
            title: "Wedding Photography",
            description:
              "Cinematic and emotive captures for timeless memories. We document your special day with artistry and attention to every precious moment.",
            icon: "💒",
            href: "/services/photography/wedding", // Added link
          },
          {
            title: "Product Photography",
            description:
              "High-quality images for e-commerce, catalogs, and marketing materials. Make your products shine with professional lighting and styling.",
            icon: "📦",
            href: "/services/photography/product", // Added link
          },
          {
            title: "Event Photography",
            description:
              "Dynamic coverage of parties, conferences, launches, and corporate events. We capture the energy and key moments of your gatherings.",
            icon: "🎉",
            href: "/services/photography/event", // Added link
          },
          {
            title: "360-Degree Photography",
            description:
              "Immersive visuals for virtual tours and interactive experiences. Perfect for real estate, hospitality, and retail spaces.",
            icon: "🔄",
            href: "/services/photography/360-degree", // Added link
          },
        ]}
        process={[
          {
            number: "01",
            title: "Consultation",
            description: "We discuss your vision, requirements, and desired outcomes for the shoot.",
          },
          {
            number: "02",
            title: "Planning",
            description: "We scout locations, prepare shot lists, and coordinate all logistics.",
          },
          {
            number: "03",
            title: "Production",
            description: "Professional shoot with premium Sony equipment and expert lighting setups.",
          },
          {
            number: "04",
            title: "Post-Production",
            description: "Expert editing, color correction, and retouching delivered in your preferred formats.",
          },
        ]}
        benefits={[
          "Expert photographers with years of experience",
          "Premium Sony Alpha 7R V & G Master lenses",
          "Professional lighting setups for every scenario",
          "Fast & reliable service delivery",
          "High-resolution files for all uses",
          "Post-processing & color correction included",
        ]}
        relatedServices={[
          { title: "Videography", href: "/services/videography" },
          { title: "Creative Branding", href: "/services/creative-branding" },
          { title: "Print & Exhibitions", href: "/services/print-exhibitions" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
