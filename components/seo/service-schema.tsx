interface ServiceSchemaProps {
  name: string
  description: string
  provider?: string
  areaServed?: string[]
  price?: string
  image?: string
}

export function ServiceSchema({
  name,
  description,
  provider = "Creative Fusion LLC",
  areaServed = ["Dubai", "Sharjah", "Abu Dhabi", "UAE"],
  price,
  image,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://creativefusion.llc",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    ...(price && { offers: { "@type": "Offer", price, priceCurrency: "AED" } }),
    ...(image && { image }),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
