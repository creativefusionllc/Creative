import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Digital Marketing Services Dubai | SEO, Social Media, PPC | Creative Fusion LLC",
  description:
    "Expert digital marketing services in Dubai & UAE. SEO optimization, social media marketing, Google Ads, content marketing. Grow your business online with data-driven strategies.",
  keywords: [
    "digital marketing dubai",
    "SEO services UAE",
    "social media marketing dubai",
    "google ads agency uae",
    "PPC advertising dubai",
    "content marketing sharjah",
  ],
  openGraph: {
    title: "Digital Marketing Services | Grow Your Business Online",
    description:
      "Results-driven digital marketing services. SEO, social media, PPC, and content marketing to boost your online presence.",
    type: "website",
  },
}

export default function DigitalMarketingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="04"
        title="Digital Marketing"
        subtitle="Data-driven growth strategies"
        description="We help businesses dominate online with strategic digital marketing that delivers measurable results. From SEO to paid advertising, we drive traffic, leads, and conversions."
        heroImage="/images/digital-marketing-strategy.png"
        icon={TrendingUp}
        brandColor="coral"
        features={[
          {
            title: "Search Engine Optimization",
            description:
              "Rank higher on Google with our proven SEO strategies. On-page, off-page, technical SEO, and local SEO optimization.",
            icon: "🔍",
            href: "/services/digital-marketing/seo", // Added link
          },
          {
            title: "Social Media Marketing",
            description:
              "Engage your audience on Instagram, Facebook, LinkedIn, TikTok, and more with strategic content and community management.",
            icon: "📱",
            href: "/services/digital-marketing/social-media", // Added link
          },
          {
            title: "Pay-Per-Click Advertising",
            description:
              "Google Ads, Meta Ads, and LinkedIn Ads campaigns designed to maximize ROI and drive qualified traffic.",
            icon: "💰",
            href: "/services/digital-marketing/ppc", // Added link
          },
          {
            title: "Content Marketing",
            description:
              "Compelling blog posts, articles, infographics, and content that drives organic traffic and establishes authority.",
            icon: "✍️",
            href: "/services/digital-marketing/content-marketing", // Added link
          },
          {
            title: "Email Marketing",
            description: "Automated email campaigns that nurture leads, boost retention, and drive repeat business.",
            icon: "📧",
            href: "/services/digital-marketing/email-marketing", // Added link
          },
          {
            title: "Analytics & Reporting",
            description:
              "Data-driven insights with comprehensive reporting to measure, analyze, and improve marketing performance.",
            icon: "📊",
            href: "/services/digital-marketing/analytics", // Added link
          },
        ]}
        process={[
          {
            number: "01",
            title: "Audit & Analysis",
            description: "We analyze your current digital presence, competitors, and market opportunities.",
          },
          {
            number: "02",
            title: "Strategy Development",
            description: "Custom marketing strategy aligned with your business goals and target audience.",
          },
          {
            number: "03",
            title: "Implementation",
            description: "Execute campaigns across channels with continuous optimization and A/B testing.",
          },
          {
            number: "04",
            title: "Report & Optimize",
            description: "Regular reporting with actionable insights to continuously improve performance.",
          },
        ]}
        benefits={[
          "Data-driven strategies backed by analytics",
          "Dedicated account manager for your business",
          "Transparent reporting and real-time dashboards",
          "Multi-channel integrated marketing approach",
          "ROI-focused campaigns with clear KPIs",
          "Continuous optimization and A/B testing",
        ]}
        relatedServices={[
          { title: "Creative Branding", href: "/services/creative-branding" },
          { title: "Web Development", href: "/services/web-development" },
          { title: "Marketing & PR", href: "/services/marketing-pr" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
