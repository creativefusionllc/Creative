import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Event Branding | Exhibition Stands",
  description: "Complete event branding solutions including signage, graphics, and environmental design.",
}

export default function EventBrandingPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Exhibition Stands", serviceHref: "/services/exhibition-stands" }}
      title="Event Branding"
      subtitle="Complete Event Identity"
      description="Transform venues with comprehensive event branding that creates immersive brand experiences."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Stage Design",
          description: "Backdrop and stage graphics",
          href: "/services/exhibition-stands/event-branding/stage",
        },
        {
          title: "Signage",
          description: "Directional and branded signs",
          href: "/services/exhibition-stands/event-branding/signage",
        },
        {
          title: "Registration",
          description: "Welcome areas",
          href: "/services/exhibition-stands/event-branding/registration",
        },
        {
          title: "Photo Walls",
          description: "Branded photo opportunities",
          href: "/services/exhibition-stands/event-branding/photo-walls",
        },
        {
          title: "Wayfinding",
          description: "Navigation systems",
          href: "/services/exhibition-stands/event-branding/wayfinding",
        },
        {
          title: "Digital",
          description: "LED and projection",
          href: "/services/exhibition-stands/event-branding/digital",
        },
      ]}
      pricingTiers={[
        {
          name: "Essential",
          price: "AED 10,000",
          features: ["Stage backdrop", "Registration desk", "2 banners", "Basic signage"],
          popular: false,
        },
        {
          name: "Professional",
          price: "AED 35,000",
          features: ["Full stage design", "Photo wall", "Wayfinding", "Premium materials"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 100,000+",
          features: ["Complete venue", "Digital integration", "Custom fabrication", "Full service"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "How early should we start planning?",
          answer: "We recommend 6-8 weeks for comprehensive event branding.",
        },
        { question: "Do you work with event planners?", answer: "Yes, we collaborate with event teams and venues." },
      ]}
    />
  )
}
