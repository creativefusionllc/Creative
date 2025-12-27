import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata = {
  title: "Custom Flags | Print & Exhibitions",
  description: "Custom flag printing including feather flags, teardrop flags, and corporate flags.",
}

export default function FlagsPage() {
  return (
    <SubServicePageTemplate
      breadcrumb={{ service: "Print & Exhibitions", serviceHref: "/services/print-exhibitions" }}
      title="Custom Flags"
      subtitle="Promotional Flags"
      description="Eye-catching custom flags that draw attention to your business or event."
      heroImage="/placeholder.svg?height=800&width=1200"
      features={[
        {
          title: "Feather Flags",
          description: "Swooping blade flags",
          href: "/services/print-exhibitions/flags/feather",
        },
        {
          title: "Teardrop Flags",
          description: "Curved teardrop shape",
          href: "/services/print-exhibitions/flags/teardrop",
        },
        {
          title: "Rectangle Flags",
          description: "Traditional flag shape",
          href: "/services/print-exhibitions/flags/rectangle",
        },
        {
          title: "Corporate Flags",
          description: "Building and pole flags",
          href: "/services/print-exhibitions/flags/corporate",
        },
        { title: "Table Flags", description: "Desktop displays", href: "/services/print-exhibitions/flags/table" },
        { title: "Beach Flags", description: "Sand and grass bases", href: "/services/print-exhibitions/flags/beach" },
      ]}
      pricingTiers={[
        {
          name: "Small",
          price: "AED 250",
          features: ["2m feather flag", "Single-sided", "Ground spike", "Carry bag"],
          popular: false,
        },
        {
          name: "Large",
          price: "AED 450",
          features: ["4m feather flag", "Double-sided", "Multiple bases", "Premium fabric"],
          popular: true,
        },
        {
          name: "Set of 5",
          price: "AED 1,800",
          features: ["5 matching flags", "Various bases", "Storage bags", "Volume discount"],
          popular: false,
        },
      ]}
      faqs={[
        { question: "Single or double-sided?", answer: "Double-sided is best for visibility from both directions." },
        { question: "What bases are available?", answer: "Ground spike, cross base, water base, and wall mount." },
      ]}
    />
  )
}
