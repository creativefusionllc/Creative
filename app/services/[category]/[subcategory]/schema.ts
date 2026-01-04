import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo/service-schema-generator"

export function getServicePageSchemas(category: string, subcategory: string) {
  // Service schema
  const serviceSchema = generateServiceSchema({
    service: category,
    subService: subcategory,
    description: `Professional ${subcategory} services in Dubai, UAE. Expert team with proven track record.`,
    price: "$$",
  })

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://creativefusion.llc" },
    { name: "Services", url: "https://creativefusion.llc/services" },
    { name: category.replace(/-/g, " "), url: `https://creativefusion.llc/services/${category}` },
    { name: subcategory.replace(/-/g, " "), url: `https://creativefusion.llc/services/${category}/${subcategory}` },
  ])

  return {
    serviceSchema,
    breadcrumbSchema,
  }
}
