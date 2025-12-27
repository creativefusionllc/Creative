import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Instagram } from "lucide-react"

export const metadata: Metadata = {
  title: "Social Media Design Dubai | Social Media Graphics | Creative Fusion LLC",
  description:
    "Professional social media design services in Dubai UAE. Custom templates, posts, stories, covers, and complete social media branding kits.",
  keywords: [
    "social media design dubai",
    "instagram design uae",
    "social media graphics",
    "social media templates",
    "social media branding dubai",
  ],
  openGraph: {
    title: "Social Media Design Dubai | Creative Fusion LLC",
    description: "Eye-catching social media designs that stop the scroll and engage your audience.",
    images: ["/images/social-media-design-service.jpg"],
  },
}

export default function SocialMediaDesignPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{
          title: "Creative Branding",
          href: "/services/creative-branding",
        }}
        title="Social Media Design"
        subtitle="Stand out in the feed"
        description="In a crowded social media landscape, great design is essential. We create scroll-stopping graphics, templates, and complete social media branding kits that elevate your online presence."
        heroImage="/images/social-media-design-service.jpg"
        icon={Instagram}
        features={[
          {
            title: "Profile Branding",
            description: "Profile pictures, cover photos, and highlights covers for all platforms.",
            icon: "👤",
          },
          {
            title: "Post Templates",
            description: "Editable templates for quotes, promotions, announcements, and more.",
            icon: "📱",
          },
          {
            title: "Story Templates",
            description: "Engaging Instagram and Facebook story templates for daily content.",
            icon: "📸",
          },
          {
            title: "Carousel Designs",
            description: "Multi-slide carousel posts for educational and promotional content.",
            icon: "🎠",
          },
          {
            title: "Ad Creatives",
            description: "High-converting ad designs optimized for each platform's specifications.",
            icon: "📢",
          },
          {
            title: "Content Calendar",
            description: "Visual content calendar with designed posts ready to schedule.",
            icon: "📅",
          },
        ]}
        pricing={[
          {
            name: "Starter Kit",
            price: "AED 2,500",
            features: ["Profile Branding (3 platforms)", "10 Post Templates", "5 Story Templates", "Canva Editable"],
          },
          {
            name: "Growth Kit",
            price: "AED 5,000",
            features: [
              "Profile Branding (5 platforms)",
              "25 Post Templates",
              "15 Story Templates",
              "5 Carousel Templates",
              "Ad Templates",
              "Canva + Figma Files",
            ],
            popular: true,
          },
          {
            name: "Complete Kit",
            price: "AED 10,000",
            features: [
              "All Platforms",
              "50+ Templates",
              "Monthly Content (30 posts)",
              "Animated Templates",
              "Reel Covers",
              "Ongoing Support",
            ],
          },
        ]}
        relatedSubServices={[
          { title: "Brand Identity", href: "/services/creative-branding/brand-identity" },
          { title: "Brand Guidelines", href: "/services/creative-branding/brand-guidelines" },
          { title: "Logo Design", href: "/services/creative-branding/logo-design" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
