import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Retail Kiosks | Exhibition Stands | Creative Fusion",
  description: "Self-service retail kiosks in Dubai & UAE.",
}

export default function RetailKiosksPage() {
  return (
    <CategoryPageTemplate
      serviceName="Exhibition Stands"
      serviceSlug="exhibition-stands"
      subServiceName="Kiosks"
      subServiceSlug="kiosks"
      categoryName="Retail Kiosks"
      categorySlug="retail"
      description="Self-service retail kiosks enabling product browsing, ordering, and payment processing."
      features={[
        "Product catalog",
        "Ordering system",
        "Payment processing",
        "Inventory sync",
        "Receipt printing",
        "Loyalty integration",
      ]}
      benefits={["Extended reach", "Reduced staff", "24/7 sales", "Queue reduction", "Customer convenience"]}
      processSteps={["Business analysis", "System design", "Payment integration", "Testing", "Deployment", "Training"]}
      brandColor="orange"
    />
  )
}
