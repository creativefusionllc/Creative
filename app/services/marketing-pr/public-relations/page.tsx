import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Public Relations Services Dubai | PR Agency UAE | Creative Fusion",
  description:
    "Professional public relations services in Dubai UAE. Press releases, media relations, crisis management, and reputation building for your brand.",
}

export default function PublicRelationsPage() {
  return (
    <>
      <Header />
      <SubServicePageTemplate
        parentService={{ name: "Marketing & PR", href: "/services/marketing-pr" }}
        title="Public Relations"
        subtitle="Build trust and credibility with strategic PR"
        description="Our PR experts craft compelling narratives that position your brand favorably in the media, building trust and credibility with your target audience."
        heroImage="/public-relations-media-coverage.jpg"
        brandColor="purple"
        features={[
          {
            title: "Press Releases",
            description: "Professional press release writing and distribution",
            href: "/services/marketing-pr/public-relations/press-releases",
          },
          {
            title: "Media Relations",
            description: "Build relationships with journalists and media outlets",
            href: "/services/marketing-pr/public-relations/media-relations",
          },
          {
            title: "Crisis Management",
            description: "Protect your reputation during challenging times",
            href: "/services/marketing-pr/public-relations/crisis-management",
          },
          {
            title: "Reputation Management",
            description: "Monitor and enhance your brand reputation",
            href: "/services/marketing-pr/public-relations/reputation",
          },
          {
            title: "Events PR",
            description: "Generate buzz for your events and launches",
            href: "/services/marketing-pr/public-relations/events-pr",
          },
          {
            title: "Thought Leadership",
            description: "Position executives as industry experts",
            href: "/services/marketing-pr/public-relations/thought-leadership",
          },
        ]}
        pricingTiers={[
          {
            name: "Starter PR",
            price: "AED 8,000",
            period: "/month",
            features: ["2 Press releases/month", "Media list building", "Monthly reporting", "Email support"],
            popular: false,
          },
          {
            name: "Growth PR",
            price: "AED 15,000",
            period: "/month",
            features: [
              "4 Press releases/month",
              "Media outreach",
              "Crisis monitoring",
              "Quarterly strategy",
              "Dedicated manager",
            ],
            popular: true,
          },
          {
            name: "Enterprise PR",
            price: "AED 30,000",
            period: "/month",
            features: [
              "Unlimited releases",
              "24/7 crisis support",
              "Executive positioning",
              "Event PR",
              "Full team access",
            ],
            popular: false,
          },
        ]}
        relatedServices={[
          { title: "Media Buying", href: "/services/marketing-pr/media-buying" },
          { title: "Influencer Marketing", href: "/services/marketing-pr/influencer-marketing" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
