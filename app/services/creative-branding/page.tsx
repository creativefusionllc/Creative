import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Palette } from "lucide-react"

export const metadata: Metadata = {
  title: "Creative Branding Services Dubai | Logo Design & Brand Identity | Creative Fusion LLC",
  description:
    "Professional creative branding services in Dubai UAE. Expert logo design, brand identity, company profiles, and social media creative design. Transform your business personality today.",
  keywords: [
    "creative branding dubai",
    "logo design uae",
    "brand identity dubai",
    "company profile design",
    "social media design dubai",
    "branding agency sharjah",
  ],
  openGraph: {
    title: "Creative Branding Services Dubai | Creative Fusion LLC",
    description:
      "Transform your business with expert branding, logo design, and visual identity services in Dubai UAE.",
    images: ["/images/hero-slide-brand-identity-design.jpg"],
  },
}

export default function CreativeBrandingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="01"
        title="Creative Branding"
        subtitle="Defining your business personality"
        description="We craft compelling brand identities that resonate with your audience, tell your story, and set you apart in the marketplace. From concept to execution, we bring your vision to life."
        heroImage="/images/hero-slide-brand-identity-design.jpg"
        icon={Palette}
        brandColor="lime"
        features={[
          {
            title: "Logo Design & Brand Identity",
            description:
              "Custom logo creation and complete visual identity systems that define your business personality. We design logos that are memorable, versatile, and timeless.",
            icon: "🎨",
            href: "/services/creative-branding/logo-design",
          },
          {
            title: "Company Profiles & Copywriting",
            description:
              "Professional company profiles with compelling copy that tells your brand story effectively. We craft narratives that engage and convert.",
            icon: "📄",
            href: "/services/creative-branding/company-profile",
          },
          {
            title: "Social Media Creative Design",
            description:
              "Eye-catching social media graphics and templates for consistent brand presence online. Stand out in crowded feeds with scroll-stopping designs.",
            icon: "📱",
            href: "/services/creative-branding/social-media-design",
          },
          {
            title: "Business Stationery",
            description:
              "Complete stationery design including business cards, letterheads, envelopes, and more. Every touchpoint reinforces your brand.",
            icon: "✉️",
            href: "/services/creative-branding/business-stationery",
          },
          {
            title: "Brand Guidelines",
            description:
              "Comprehensive brand style guides to maintain consistency across all touchpoints. Your team will have clear direction for all communications.",
            icon: "📋",
            href: "/services/creative-branding/brand-guidelines",
          },
          {
            title: "Brand Identity Systems",
            description:
              "Complete brand identity development including colors, typography, imagery style, and visual language.",
            icon: "🔄",
            href: "/services/creative-branding/brand-identity",
          },
        ]}
        process={[
          {
            number: "01",
            title: "Discovery",
            description: "We dive deep into your business, audience, and goals to understand your brand's essence.",
          },
          {
            number: "02",
            title: "Strategy",
            description: "We develop a comprehensive brand strategy that positions you for success in your market.",
          },
          {
            number: "03",
            title: "Design",
            description:
              "Our creative team brings your brand to life with stunning visuals and cohesive design elements.",
          },
          {
            number: "04",
            title: "Deliver",
            description: "You receive all brand assets, guidelines, and support for a successful brand launch.",
          },
        ]}
        benefits={[
          "Award-winning creative team with 15+ years experience",
          "100% original, trademark-ready designs",
          "Fast 3-5 day turnaround on most projects",
          "Unlimited revisions until you're satisfied",
          "All file formats included (AI, PSD, PNG, SVG, PDF)",
          "Dedicated brand strategist for your project",
        ]}
        relatedServices={[
          { title: "Photography Services", href: "/services/photography" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
          { title: "Web Development", href: "/services/web-development" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
