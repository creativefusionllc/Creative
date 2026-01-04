import { generateServiceTitle, serviceKeywords } from "./service-keywords"

export interface ServiceSchemaData {
  service: string
  subService?: string
  description?: string
  price?: string
  image?: string
}

// Generate LocalBusiness schema for Creative Fusion
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://creativefusion.llc/#organization",
    name: "Creative Fusion LLC",
    url: "https://creativefusion.llc",
    logo: "https://creativefusion.llc/logo.png",
    description:
      "Professional creative and digital marketing agency in Dubai, UAE offering 12 core services across branding, design, web development, SEO, and more.",
    image: "https://creativefusion.llc/hero-image.jpg",
    telephone: "+971-XX-XXXXXXX",
    email: "info@creativefusion.llc",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dubai, UAE",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      postalCode: "",
      addressCountry: "AE",
    },
    areaServed: ["AE", "SA", "KW", "QA", "OM", "BH"],
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/creativefusion",
      "https://www.instagram.com/creativefusion",
      "https://www.linkedin.com/company/creativefusion",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+971-XX-XXXXXXX",
      email: "sales@creativefusion.llc",
    },
  }
}

// Generate Service schema for individual services
export function generateServiceSchema(data: ServiceSchemaData) {
  const keywords = serviceKeywords[data.service] || serviceKeywords["creative-branding"]
  const fullServiceName = data.subService
    ? `${data.subService} - ${data.service.replace(/-/g, " ")}`
    : data.service.replace(/-/g, " ")

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: generateServiceTitle(data.service, data.subService),
    description:
      data.description ||
      `Professional ${keywords.primary} services. Expert team delivering outstanding results in Dubai, UAE.`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://creativefusion.llc/#organization",
      name: "Creative Fusion LLC",
      url: "https://creativefusion.llc",
    },
    serviceType: fullServiceName,
    areaServed: {
      "@type": "GeoShape",
      addressCountry: "AE",
    },
    availableLanguage: "en",
    image: data.image || "https://creativefusion.llc/default-service.jpg",
    priceRange: data.price || "$$",
    url: typeof window !== "undefined" ? window.location.href : "https://creativefusion.llc/services",
  }
}

// Generate BreadcrumbList schema for navigation
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Generate FAQPage schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Generate Organization schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Creative Fusion LLC",
    url: "https://creativefusion.llc",
    logo: "https://creativefusion.llc/logo.png",
    description: "Leading creative and digital marketing agency in Dubai, UAE",
    sameAs: [
      "https://www.facebook.com/creativefusion",
      "https://www.instagram.com/creativefusion",
      "https://www.linkedin.com/company/creativefusion",
      "https://www.youtube.com/creativefusion",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+971-XX-XXXXXXX",
      email: "sales@creativefusion.llc",
      availableLanguage: "en",
    },
    foundingDate: "2015",
    areaServed: ["AE", "SA", "KW", "QA", "OM", "BH"],
  }
}

// Generate AggregateOffer schema for service pricing
export function generateAggregateOfferSchema(services: Array<{ name: string; price: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    name: "Creative Fusion Services",
    priceCurrency: "AED",
    offers: services.map((service) => ({
      "@type": "Offer",
      name: service.name,
      price: service.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
    })),
  }
}
