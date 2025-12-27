import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Camera } from "lucide-react"

export const metadata: Metadata = {
  title: "Product Photography Services Dubai | E-Commerce Photography | Creative Fusion LLC",
  description:
    "Professional product photography services in Dubai UAE. High-quality product images for e-commerce, catalogs, and marketing materials with professional lighting and styling.",
  keywords: [
    "product photography dubai",
    "ecommerce photography uae",
    "commercial product photography",
    "product photography sharjah",
    "professional product photos",
    "catalog photography dubai",
    "lifestyle product photography",
    "studio photography dubai",
    "product photography services",
    "professional product images",
  ],
  openGraph: {
    title: "Product Photography Services Dubai | Creative Fusion LLC",
    description: "Professional product photography that increases sales and engagement",
  },
}

export default function ProductPhotographyPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Photography",
          href: "/services/photography",
        }}
        title="Product Photography"
        subtitle="Professional Commercial Product Imaging"
        description="Our product photography services deliver stunning, sales-driven images for e-commerce, catalogs, and marketing. Professional lighting, styling, and post-production for products that sell."
        heroImage="/professional-product-photography-studio.jpg"
        icon={Camera}
        features={[
          {
            title: "Studio Product Photography",
            description: "Professional studio setup with controlled lighting and backgrounds.",
            icon: "📸",
          },
          {
            title: "Lifestyle Product Photography",
            description: "Products in real-world contexts showing use and benefits.",
            icon: "🎬",
          },
          {
            title: "360° Product Views",
            description: "Interactive multi-angle product visualization.",
            icon: "🔄",
          },
          {
            title: "Post-Production Editing",
            description: "Professional retouching and color correction for perfect results.",
            icon: "✨",
          },
          {
            title: "Background Options",
            description: "White, colored, or lifestyle backgrounds available.",
            icon: "🎨",
          },
          {
            title: "Fast Turnaround",
            description: "Quick delivery without compromising on quality.",
            icon: "⚡",
          },
        ]}
        pricing={[
          {
            name: "Basic Package",
            price: "AED 500/day",
            features: ["8-10 Products", "White Background", "Basic Editing", "5 Days Delivery"],
          },
          {
            name: "Professional Package",
            price: "AED 1,000/day",
            features: [
              "15-20 Products",
              "Multiple Backgrounds",
              "Advanced Editing",
              "360° Views Available",
              "3 Days Delivery",
            ],
            popular: true,
          },
          {
            name: "Premium Package",
            price: "AED 2,000/day",
            features: [
              "Unlimited Products",
              "Lifestyle + Studio",
              "Complete Editing",
              "360° Photography",
              "Same Day Delivery",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Portrait Photography", href: "/services/photography/portrait-photography" },
          { title: "Commercial Photography", href: "/services/photography/commercial-photography" },
          { title: "Event Photography", href: "/services/photography/event-photography" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
