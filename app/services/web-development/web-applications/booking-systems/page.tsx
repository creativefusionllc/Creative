import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Booking System Development Dubai | Appointment Software | Creative Fusion LLC",
  description:
    "Custom booking system development in Dubai. Online appointment scheduling, reservations, and booking management.",
}

export default function BookingSystemsPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        parentService={{ title: "Web Development", href: "/services/web-development" }}
        parentSubService={{ title: "Web Applications", href: "/services/web-development/web-applications" }}
        title="Booking Systems"
        subtitle="Automate appointments"
        description="Build custom booking systems for appointments, reservations, and scheduling with payment integration and automated reminders."
        heroImage="/placeholder.svg?height=600&width=800"
        benefits={[
          "Online booking",
          "Calendar sync",
          "Payment integration",
          "Reminders",
          "Staff management",
          "Multi-location",
          "Waiting list",
          "Reports",
        ]}
        process={[
          { title: "Analyze", description: "Booking workflow" },
          { title: "Design", description: "Booking experience" },
          { title: "Build", description: "System development" },
          { title: "Integrate", description: "Payments & calendar" },
        ]}
        pricing={[
          {
            name: "Basic",
            price: "8,000",
            description: "Simple booking",
            features: ["Online scheduling", "Email confirmations", "Calendar view", "Basic reporting"],
          },
          {
            name: "Pro",
            price: "18,000",
            description: "Full system",
            features: ["Everything in Basic", "Payment integration", "Staff management", "SMS reminders"],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "35,000+",
            description: "Complex system",
            features: ["Everything in Pro", "Multi-location", "Resource booking", "API integration"],
          },
        ]}
        relatedCategories={[
          { title: "Portals", href: "/services/web-development/web-applications/portals" },
          { title: "E-commerce", href: "/services/web-development/ecommerce" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
