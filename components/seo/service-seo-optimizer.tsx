"use client"

import { usePathname } from "next/navigation"
import { generateServiceTitle, generateServiceDescription, generateServiceKeywords } from "@/lib/seo/service-keywords"

export function ServiceSEOOptimizer() {
  const pathname = usePathname()

  // Extract service from pathname
  const service = pathname.split("/services/")[1]?.split("/")[0] || "creative-branding"

  const title = generateServiceTitle(service)
  const description = generateServiceDescription(service)
  const keywords = generateServiceKeywords(service)

  return (
    <>
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.creativefusion.llc${pathname}`} />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* Schema Markup for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description: description,
            provider: {
              "@type": "LocalBusiness",
              name: "Creative Fusion LLC",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Business Bay",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                postalCode: "00000",
                addressCountry: "AE",
              },
              telephone: "+971-4-XXX-XXXX",
              url: "https://www.creativefusion.llc",
            },
            areaServed: ["Dubai", "UAE", "Sharjah", "Abu Dhabi", "GCC"],
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: `https://www.creativefusion.llc${pathname}`,
            },
          }),
        }}
      />
    </>
  )
}
