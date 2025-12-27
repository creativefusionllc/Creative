import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Event Invitations Dubai | RSVP Campaigns UAE | Creative Fusion LLC",
  description:
    "WhatsApp event invitation campaigns in Dubai & UAE. Event announcements, RSVP collection, and reminder sequences for businesses in GCC.",
  keywords: ["whatsapp event invitations dubai", "rsvp campaigns uae", "event announcements gcc"],
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Event Invitations"
          description="Maximize event attendance with WhatsApp invitations. Save-the-date, formal invites, RSVP collection, and automated reminders for events in Dubai, UAE & GCC."
          heroImage="/whatsapp-event-invitation-rsvp.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Broadcast Campaigns", href: "/services/whatsapp-marketing/broadcast" },
          }}
          benefits={[
            "High RSVP rates",
            "Easy RSVP collection",
            "Automated reminders",
            "Location sharing",
            "Calendar integration",
            "Post-event follow-up",
          ]}
          process={[
            { step: 1, title: "Design", description: "Create invitation content" },
            { step: 2, title: "Send", description: "Broadcast invitations" },
            { step: 3, title: "Track", description: "Collect RSVPs" },
            { step: 4, title: "Remind", description: "Send event reminders" },
          ]}
          pricing={{
            startingFrom: "AED 1,500",
            includes: ["Invitation design", "RSVP tracking", "2 reminder sequences", "Attendee list export"],
          }}
          faqs={[
            { question: "Can guests RSVP directly?", answer: "Yes, one-click RSVP buttons with automatic tracking." },
            {
              question: "How many reminders to send?",
              answer: "We recommend 3: one week, one day, and event morning.",
            },
            {
              question: "Can I share location?",
              answer: "Yes, WhatsApp location sharing with Google Maps integration.",
            },
          ]}
          relatedCategories={[
            { name: "Product Launches", href: "/services/whatsapp-marketing/broadcast/product-launch" },
            { name: "Newsletter Campaigns", href: "/services/whatsapp-marketing/broadcast/newsletter" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
