import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Event Landing Pages Dubai | Conference & Webinar Pages | Creative Fusion LLC",
  description:
    "Professional event landing pages in Dubai. Registration pages for conferences, webinars, and corporate events.",
}

export default function EventPagesPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Landing Pages", href: "/services/web-development/landing-pages" }}
        title="Event Pages"
        subtitle="Drive registrations"
        description="Create compelling event landing pages for conferences, webinars, and corporate events that drive registrations."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Registration forms",
          "Speaker profiles",
          "Agenda display",
          "Countdown timer",
          "Ticket sales",
          "Map integration",
          "Social sharing",
          "Mobile friendly",
        ]}
        process={[
          { title: "Plan", description: "Event details" },
          { title: "Design", description: "Event branding" },
          { title: "Build", description: "Registration system" },
          { title: "Promote", description: "Launch & share" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "1,500",
            description: "Simple event",
            features: ["Registration form", "Event details", "Speaker section", "Mobile responsive"],
          },
          {
            name: "Pro",
            price: "4,000",
            description: "Full event",
            features: ["Everything in Basic", "Ticket tiers", "Payment integration", "Email automation"],
            popular: true,
          },
          {
            name: "Conference",
            price: "10,000",
            description: "Large scale",
            features: ["Everything in Pro", "Multi-track agenda", "Sponsor showcase", "Mobile app"],
          },
        ]}
        relatedCategories={[
          { title: "Coming Soon", href: "/services/web-development/landing-pages/coming-soon" },
          { title: "Event Marketing", href: "/services/marketing-pr/event-marketing" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
