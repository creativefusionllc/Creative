import { ServicePageTemplate } from "@/components/services/service-page-template"

export const metadata = {
  title: "Portable Exhibition Displays Dubai | Trade Show Displays UAE | Creative Fusion",
  description:
    "Professional portable exhibition displays in Dubai UAE by Creative Fusion. Banner stands, pop-ups, backdrops, and table covers for trade shows and events.",
}

export default function PortableDisplaysPage() {
  return (
    <ServicePageTemplate
      category="Exhibition Stands"
      categorySlug="exhibition-stands"
      title="Portable Displays"
      description="Lightweight, easy-to-transport exhibition displays perfect for trade shows, conferences, and events. Quick setup, professional appearance, and maximum portability for businesses across Dubai and UAE."
      subcategories={[
        {
          name: "Banner Stands",
          slug: "banner-stands",
          description: "Roll-up and retractable banner stands",
        },
        {
          name: "Pop-Up Displays",
          slug: "pop-up-displays",
          description: "Curved and straight pop-up booth systems",
        },
        {
          name: "Backdrop Walls",
          slug: "backdrop-walls",
          description: "Step-and-repeat backdrops for events",
        },
        {
          name: "Table Covers",
          slug: "table-covers",
          description: "Custom branded tablecloths and runners",
        },
      ]}
      features={[
        "Lightweight construction",
        "Easy tool-free setup",
        "Professional graphics",
        "Carry cases included",
        "Reusable for multiple events",
        "Custom branding options",
        "Various sizes available",
        "Quick turnaround times",
      ]}
    />
  )
}
