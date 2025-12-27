import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Video } from "lucide-react"

export const metadata: Metadata = {
  title: "Commercial Video Production Dubai | Corporate Videos | Creative Fusion LLC",
  description:
    "Professional commercial video production in Dubai UAE. Corporate videos, product videos, commercials, and promotional content that drive engagement and sales.",
  keywords: [
    "commercial video production dubai",
    "corporate video dubai",
    "commercial video uae",
    "product video production",
    "advertising video dubai",
    "promotional video sharjah",
    "corporate video production",
    "broadcast video dubai",
    "tv commercial production",
    "video marketing uae",
  ],
  openGraph: {
    title: "Commercial Video Production Dubai | Creative Fusion LLC",
    description: "Professional videos that engage audiences and drive results",
  },
}

export default function CommercialVideoPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Videography",
          href: "/services/videography",
        }}
        title="Commercial Video Production"
        subtitle="Professional Corporate & Advertising Videos"
        description="We produce high-impact commercial videos that tell your brand story, showcase products, and engage audiences. From concept to final delivery with professional cinematography and editing."
        heroImage="/professional-commercial-video-production-broadcast.jpg"
        icon={Video}
        features={[
          {
            title: "Commercial Scriptwriting",
            description: "Compelling scripts that deliver your message effectively.",
            icon: "📝",
          },
          {
            title: "Professional Cinematography",
            description: "4K/8K filming with professional equipment and techniques.",
            icon: "🎬",
          },
          {
            title: "Post-Production & Editing",
            description: "Professional color grading, sound design, and effects.",
            icon: "✂️",
          },
          {
            title: "Animation & Graphics",
            description: "Motion graphics and animation to enhance your message.",
            icon: "🎨",
          },
          {
            title: "Sound Design",
            description: "Professional audio recording, mixing, and music selection.",
            icon: "🔊",
          },
          {
            title: "Distribution & Optimization",
            description: "Optimized versions for all platforms and formats.",
            icon: "📺",
          },
        ]}
        pricing={[
          {
            name: "Basic Commercial",
            price: "AED 5,000",
            features: ["15-30 sec video", "Single location", "Basic editing", "1 Revision"],
          },
          {
            name: "Professional Commercial",
            price: "AED 12,000",
            features: [
              "30-60 sec video",
              "Multi-location",
              "Professional editing",
              "Animation included",
              "3 Revisions",
            ],
            popular: true,
          },
          {
            name: "Premium Commercial",
            price: "AED 25,000+",
            features: [
              "60+ sec video",
              "Unlimited locations",
              "Complete post-production",
              "4K/8K delivery",
              "Unlimited revisions",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Event Videography", href: "/services/videography/event-videography" },
          { title: "Product Video", href: "/services/videography/product-video" },
          { title: "Corporate Training Video", href: "/services/videography/training-video" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
