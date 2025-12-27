import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Bamboo Products | Gift Items | Creative Fusion",
  description: "Sustainable bamboo promotional products in Dubai & UAE.",
}

export default function BambooPage() {
  return (
    <CategoryPageTemplate
      serviceName="Gift Items"
      serviceSlug="gift-items"
      subServiceName="Eco-Friendly Gifts"
      subServiceSlug="eco-friendly"
      categoryName="Bamboo Products"
      categorySlug="bamboo"
      description="Sustainable bamboo promotional products showcasing environmental responsibility and style."
      features={["100% bamboo", "Laser engraving", "Various products", "Natural finish", "Durable", "Eco packaging"]}
      benefits={["Eco-friendly image", "Sustainable choice", "Natural beauty", "Modern appeal", "CSR alignment"]}
      processSteps={[
        "Product selection",
        "Engraving design",
        "Sample approval",
        "Production",
        "Eco packaging",
        "Delivery",
      ]}
      brandColor="amber"
    />
  )
}
