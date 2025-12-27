import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "X-Stand Banners | Print & Exhibitions | Creative Fusion",
  description: "Affordable X-stand banner printing in Dubai & UAE.",
}

export default function XStandBannersPage() {
  return (
    <CategoryPageTemplate
      serviceName="Print & Exhibitions"
      serviceSlug="print-exhibitions"
      subServiceName="Banners"
      subServiceSlug="banners"
      categoryName="X-Stand Banners"
      categorySlug="x-stand"
      description="Affordable X-stand banners offering lightweight portability for indoor promotional displays."
      features={[
        "X-frame design",
        "Lightweight",
        "Easy assembly",
        "Budget-friendly",
        "Interchangeable prints",
        "Indoor use",
      ]}
      benefits={["Cost-effective", "Lightweight", "Quick setup", "Easy storage", "Versatile placement"]}
      processSteps={["Design submission", "Size confirmation", "Printing", "Frame assembly", "Packaging", "Delivery"]}
      brandColor="rose"
    />
  )
}
