import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Tabletop Pop-Up Displays | Exhibition Stands | Creative Fusion",
  description: "Compact tabletop pop-up displays for events in Dubai & UAE.",
}

export default function TabletopPopUpPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Pop-Up Displays"
      subServiceSlug="pop-up-displays"
      categoryName="Tabletop Pop-Up Displays"
      categorySlug="tabletop"
      description="Compact tabletop pop-up displays perfect for small spaces, conferences, and reception desks."
      features={["Compact size", "Table placement", "Lightweight", "Quick assembly", "Carry bag", "Multiple sizes"]}
      benefits={["Space-efficient", "Budget-friendly", "Highly portable", "Professional look", "Versatile"]}
      processSteps={["Size choice", "Design", "Print", "Quality check", "Pack", "Ship"]}
      brandColor="orange"
    />
  )
}
