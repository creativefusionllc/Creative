import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "WhatsApp Booking Bot Dubai | Appointment Chatbot UAE | Creative Fusion LLC",
  description:
    "WhatsApp booking and appointment chatbots in Dubai & UAE. Automated scheduling, reminders, and reservation management for businesses in GCC.",
  keywords: ["whatsapp booking bot dubai", "appointment chatbot uae", "scheduling bot gcc"],
}

export default function BookingBotPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          title="Booking Bots"
          description="Automated appointment scheduling and reservation management via WhatsApp. Sync with calendars, send reminders, and handle rescheduling effortlessly."
          heroImage="/whatsapp-booking-bot-appointment.jpg"
          breadcrumb={{
            service: { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
            subService: { name: "Chatbot Development", href: "/services/whatsapp-marketing/chatbot" },
          }}
          benefits={[
            "24/7 booking capability",
            "Calendar sync",
            "Automated reminders",
            "Easy rescheduling",
            "No-show reduction",
            "Staff assignments",
          ]}
          process={[
            { step: 1, title: "Setup", description: "Configure booking rules" },
            { step: 2, title: "Sync", description: "Connect calendars" },
            { step: 3, title: "Flows", description: "Design booking flows" },
            { step: 4, title: "Launch", description: "Go live with reminders" },
          ]}
          pricing={{
            startingFrom: "AED 3,500",
            includes: ["Booking flows", "Calendar sync", "SMS reminders", "Rescheduling"],
          }}
          faqs={[
            {
              question: "Which calendars are supported?",
              answer: "Google Calendar, Outlook, Calendly, and custom booking systems.",
            },
            {
              question: "Can it handle multiple staff?",
              answer: "Yes, supports staff availability, skills, and automatic assignment.",
            },
            {
              question: "Are reminders included?",
              answer: "Yes, automated WhatsApp and SMS reminders before appointments.",
            },
          ]}
          relatedCategories={[
            { name: "Sales Bots", href: "/services/whatsapp-marketing/chatbot/sales-bot" },
            { name: "Support Bots", href: "/services/whatsapp-marketing/chatbot/support-bot" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
