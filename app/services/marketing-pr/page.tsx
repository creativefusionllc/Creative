import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Megaphone } from "lucide-react"

export const metadata: Metadata = {
  title: "Marketing & PR Services | Public Relations & Media Buying | Creative Fusion LLC Dubai UAE",
  description:
    "Professional marketing and PR services in Dubai & UAE. Public relations, media buying, press releases, influencer partnerships, and brand reputation management.",
  keywords: [
    "PR agency dubai",
    "public relations uae",
    "media buying sharjah",
    "press release services dubai",
    "influencer marketing uae",
    "brand reputation management",
    "corporate communications dubai",
  ],
  openGraph: {
    title: "Marketing & PR Services | Creative Fusion LLC",
    description: "Strategic PR and media services to build your brand reputation across UAE.",
    type: "website",
    locale: "en_AE",
  },
}

export default function MarketingPRPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          serviceNumber="05"
          title="Marketing & PR"
          subtitle="Brand Reputation"
          description="Build and protect your brand reputation with our strategic marketing and public relations services. From press releases to media buying, we amplify your brand message across all channels."
          heroImage="/images/creative-team-brainstorming.jpg"
          icon={Megaphone}
          brandColor="coral"
          features={[
            {
              title: "Public Relations Strategy",
              description: "Comprehensive PR plans tailored to your brand goals and target audience.",
              icon: "📢",
            },
            {
              title: "Press Release Distribution",
              description: "Professional writing and distribution to major media outlets.",
              icon: "📰",
            },
            {
              title: "Media Buying & Planning",
              description: "Strategic ad placements across TV, radio, print, and digital channels.",
              icon: "📺",
            },
            {
              title: "Crisis Management",
              description: "Rapid response strategies to protect your brand reputation.",
              icon: "🛡️",
            },
            {
              title: "Influencer Partnerships",
              description: "Connect with relevant influencers to amplify your message.",
              icon: "⭐",
            },
            {
              title: "Corporate Communications",
              description: "Internal and external communications strategy and execution.",
              icon: "💼",
            },
          ]}
          packages={[
            {
              name: "PR Starter",
              price: "AED 3,500",
              description: "Essential PR services for startups",
              features: [
                "PR Strategy Development",
                "2 Press Releases/Month",
                "Media List Building",
                "Social Media Integration",
                "Monthly PR Report",
                "Email Support",
              ],
            },
            {
              name: "PR Professional",
              price: "AED 8,000",
              description: "Comprehensive PR management",
              features: [
                "Full PR Strategy & Execution",
                "4 Press Releases/Month",
                "Media Buying (AED 5K Budget)",
                "Influencer Outreach (5 Influencers)",
                "Event PR Support",
                "Crisis Management Plan",
                "Weekly Progress Calls",
                "Dedicated PR Manager",
              ],
              popular: true,
            },
            {
              name: "PR Enterprise",
              price: "AED 18,000+",
              description: "Full-scale PR campaigns",
              features: [
                "360° PR Campaign Management",
                "Unlimited Press Releases",
                "Media Buying (AED 15K+ Budget)",
                "Influencer Campaign Management",
                "TV & Radio Placements",
                "Executive Profiling",
                "Award Submissions",
                "24/7 Crisis Support",
                "Quarterly Strategy Reviews",
              ],
            },
          ]}
          process={[
            { number: "01", title: "Audit", description: "Analyze your current brand perception and media presence." },
            { number: "02", title: "Strategy", description: "Develop customized PR strategy aligned with your goals." },
            { number: "03", title: "Execute", description: "Implement campaigns across media channels." },
            {
              number: "04",
              title: "Measure",
              description: "Track coverage, sentiment, and ROI with detailed reports.",
            },
          ]}
          benefits={[
            "15+ years of PR and media experience",
            "Strong relationships with UAE media outlets",
            "Multilingual team (English, Arabic, Urdu)",
            "Real-time campaign tracking and analytics",
            "Dedicated account manager for your brand",
            "Crisis management available 24/7",
          ]}
          portfolioImages={[
            "/images/creative-team-brainstorming.jpg",
            "/images/hero-slide-digital-marketing-strategy.jpg",
            "/images/digital-marketing-strategy.png",
          ]}
          relatedServices={[
            { title: "Digital Marketing", href: "/services/digital-marketing" },
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
