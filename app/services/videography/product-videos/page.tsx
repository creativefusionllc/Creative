import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Product Video Production Dubai | Promotional Videos | Creative Fusion LLC",
  description:
    "Professional product video production in Dubai UAE. E-commerce videos, product demos, unboxing, and promotional content.",
  keywords: ["product video dubai", "promotional video uae", "ecommerce video dubai", "product demo sharjah"],
}

export default function ProductVideosPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Videography Services", href: "/services/videography" }}
      title="Product & Promotional Videos"
      subtitle="Showcase Your Products"
      description="Engaging promotional videos that showcase your products and services. Perfect for e-commerce and marketing."
      heroImage="/images/graphic-design-creative-workspace-mockups.jpg"
      features={[
        { title: "Product Demos", description: "Show features and benefits in action" },
        { title: "Unboxing Videos", description: "Exciting reveal experiences" },
        { title: "How-To Videos", description: "Tutorial and usage guides" },
        { title: "360° Product Spins", description: "Interactive rotating product views" },
        { title: "Lifestyle Videos", description: "Products in real-world contexts" },
        { title: "Amazon/E-commerce", description: "Platform-optimized product videos" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 1,500",
          description: "Simple product video",
          features: ["30-60 sec video", "Studio filming", "Basic editing", "Background music"],
        },
        {
          name: "Professional",
          price: "AED 4,000",
          description: "Full product showcase",
          features: ["1-2 min video", "Lifestyle shots", "Motion graphics", "Voice-over option", "Multiple angles"],
          popular: true,
        },
        {
          name: "E-commerce Pack",
          price: "AED 8,000",
          description: "5 product videos",
          features: ["5 products", "60 sec each", "Amazon optimized", "Thumbnail images", "Rush delivery"],
        },
      ]}
      relatedSubServices={[
        { title: "TV Commercials", href: "/services/videography/tv-commercials" },
        { title: "Social Media Content", href: "/services/videography/social-media-content" },
      ]}
    />
  )
}
