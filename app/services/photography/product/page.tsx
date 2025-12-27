import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Product Photography Dubai | E-commerce & Catalog Photos | Creative Fusion LLC",
  description:
    "Professional product photography in Dubai UAE. E-commerce photos, catalog shoots, lifestyle imagery for marketing and online stores.",
  keywords: [
    "product photography dubai",
    "ecommerce photography uae",
    "catalog photography dubai",
    "amazon photography sharjah",
  ],
}

export default function ProductPhotographyPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Photography Services", href: "/services/photography" }}
      title="Product Photography"
      subtitle="Make Your Products Shine"
      description="High-quality images for e-commerce, catalogs, and marketing materials. Make your products shine with professional lighting and styling."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        { title: "White Background Shots", description: "Clean, professional e-commerce ready images" },
        { title: "Lifestyle Photography", description: "Products in context and real-world settings" },
        { title: "360° Product Spins", description: "Interactive rotating product views" },
        { title: "Detail & Macro Shots", description: "Close-up images highlighting quality and features" },
        { title: "Ghost Mannequin", description: "Invisible mannequin effect for clothing" },
        { title: "Flat Lay Photography", description: "Stylish overhead product arrangements" },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 50/product",
          description: "Basic product photos",
          features: ["3 angles per product", "White background", "Basic retouching", "Web-ready files"],
        },
        {
          name: "Professional",
          price: "AED 100/product",
          description: "E-commerce ready",
          features: ["5 angles per product", "White + lifestyle", "Advanced retouching", "Amazon/Noon ready"],
          popular: true,
        },
        {
          name: "Premium",
          price: "AED 200/product",
          description: "Full product showcase",
          features: ["Unlimited angles", "360° spin", "Lifestyle scenes", "Video clips", "Rush delivery"],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Photography", href: "/services/photography/corporate" },
        { title: "Event Photography", href: "/services/photography/event" },
      ]}
    />
  )
}
