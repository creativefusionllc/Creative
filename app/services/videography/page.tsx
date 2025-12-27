import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Video } from "lucide-react"

export const metadata: Metadata = {
  title: "Professional Videography Services Dubai | Corporate Videos & Commercials | Creative Fusion LLC",
  description:
    "Expert videography services in Dubai UAE. Corporate videos, TV commercials, wedding films, product videos, drone footage, and post-production. Cinematic quality with AI-powered editing.",
  keywords: [
    "videography services dubai",
    "corporate video production uae",
    "wedding videography sharjah",
    "tv commercial production dubai",
    "drone videography uae",
    "video production company dubai",
  ],
  openGraph: {
    title: "Professional Videography Services Dubai | Creative Fusion LLC",
    description: "Cinematic video production for corporate, commercial, and personal projects in Dubai UAE.",
    images: ["/images/graphic-design-creative-workspace-mockups.jpg"],
  },
}

export default function VideographyPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="03"
        title="Premium Videography"
        subtitle="Visual storytelling powered by cinema"
        description="Our talented team combines creative vision with cutting-edge equipment and AI-powered editing to deliver stunning, high-impact videos that captivate audiences."
        heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
        icon={Video}
        brandColor="lime"
        features={[
          {
            title: "Corporate Videos",
            description:
              "Polished videos highlighting company culture, services, and brand story. Perfect for websites, presentations, and internal communications.",
            icon: "🏢",
            href: "/services/videography/corporate-videos", // Added link
          },
          {
            title: "TV Commercials & Ads",
            description:
              "High-impact commercials designed to capture attention and drive action. From concept to final delivery.",
            icon: "📺",
            href: "/services/videography/tv-commercials", // Added link
          },
          {
            title: "Wedding Videography",
            description:
              "Cinematic storytelling with elegance and authenticity for your special day. Capture every precious moment.",
            icon: "💍",
            href: "/services/videography/wedding-films", // Added link
          },
          {
            title: "Product & Promotional Videos",
            description:
              "Engaging promotional videos that showcase your products and services. Perfect for e-commerce and marketing.",
            icon: "📦",
            href: "/services/videography/product-videos", // Added link
          },
          {
            title: "Drone & Aerial Footage",
            description:
              "Stunning aerial perspectives with DJI Inspire 3 drones. Perfect for real estate, events, and cinematic sequences.",
            icon: "🚁",
            href: "/services/videography/drone-aerial", // Added link
          },
          {
            title: "Social Media Content",
            description:
              "Short-form videos optimized for Instagram Reels, TikTok, YouTube Shorts, and other social platforms.",
            icon: "📱",
            href: "/services/videography/social-media-content", // Added link
          },
        ]}
        process={[
          {
            number: "01",
            title: "Pre-Production",
            description: "Concept development, scriptwriting, storyboarding, and location scouting.",
          },
          {
            number: "02",
            title: "Production",
            description: "Professional filming with cinema-grade equipment and experienced crew.",
          },
          {
            number: "03",
            title: "Post-Production",
            description: "AI-enhanced editing, color grading, sound design, and motion graphics.",
          },
          {
            number: "04",
            title: "Delivery",
            description: "Multiple formats optimized for your intended platforms and purposes.",
          },
        ]}
        benefits={[
          "Sony Alpha 7R V with G Master lenses",
          "DJI Inspire 3 drone for aerial footage",
          "AI-powered editing for faster turnaround",
          "Professional color grading and sound design",
          "4K/6K delivery with multiple format options",
          "Licensed music and stock footage included",
        ]}
        relatedServices={[
          { title: "Photography Services", href: "/services/photography" },
          { title: "Creative Branding", href: "/services/creative-branding" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
