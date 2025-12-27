import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Pop-Up Displays | Exhibition Stands",
  description: "Portable pop-up displays and banner stands for events and promotions.",
}

export default function PopUpDisplaysPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Pop-Up Displays"
      subtitle="Portable Display Solutions"
      description="Quick-setup portable displays perfect for smaller events, promotions, and roadshows."
      heroImage="/popup-display-banner.jpg"
      features={[
        {
          title: "Roll-Up Banners",
          description: "Classic portable displays",
          href: "/services/exhibition-stands/pop-up-displays/roll-up",
        },
        {
          title: "Pop-Up Walls",
          description: "Curved and straight walls",
          href: "/services/exhibition-stands/pop-up-displays/pop-up-walls",
        },
        {
          title: "Fabric Displays",
          description: "Tension fabric systems",
          href: "/services/exhibition-stands/pop-up-displays/fabric",
        },
        {
          title: "Counters",
          description: "Portable counters",
          href: "/services/exhibition-stands/pop-up-displays/counters",
        },
        {
          title: "Backdrops",
          description: "Event backdrops",
          href: "/services/exhibition-stands/pop-up-displays/backdrops",
        },
        {
          title: "Literature Stands",
          description: "Brochure displays",
          href: "/services/exhibition-stands/pop-up-displays/literature",
        },
      ]}
      pricingTiers={[
        {
          name: "Single Banner",
          price: "AED 350",
          features: ["Roll-up stand", "Printed graphic", "Carry case", "Quick setup"],
          popular: false,
        },
        {
          name: "Event Kit",
          price: "AED 2,500",
          features: ["3 banners", "Counter", "Backdrop", "Carry cases"],
          popular: true,
        },
        {
          name: "Full Setup",
          price: "AED 6,000",
          features: ["Pop-up wall", "Banners", "Counter", "Lights"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "How long does setup take?", answer: "Most pop-ups can be set up in 5-10 minutes." },
        { question: "Can graphics be replaced?", answer: "Yes, you can order new graphics for existing hardware." },
      ]}
    />
  )
}
