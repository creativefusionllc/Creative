import type { Metadata } from "next"

interface ServiceMetadataOptions {
  serviceName: string
  serviceCategory: string
  description: string
  location?: string
  keywords?: string[]
  price?: string
  imageUrl?: string
}

export function generateServiceMetadata(options: ServiceMetadataOptions): Metadata {
  const {
    serviceName,
    serviceCategory,
    description,
    location = "Dubai, UAE",
    keywords = [],
    price,
    imageUrl = "/images/creative-fusion-og.jpg",
  } = options

  const title = `${serviceName} Services ${location} | Creative Fusion LLC`
  const shortTitle = `${serviceName} ${location} | Creative Fusion`

  const metaDescription = `${description} Professional ${serviceName.toLowerCase()} services by Creative Fusion in ${location}. Get a free quote today!`

  const allKeywords = [
    `${serviceName.toLowerCase()} ${location.toLowerCase()}`,
    `${serviceName.toLowerCase()} uae`,
    `${serviceName.toLowerCase()} dubai`,
    `${serviceName.toLowerCase()} sharjah`,
    `${serviceName.toLowerCase()} abu dhabi`,
    `creative fusion ${serviceName.toLowerCase()}`,
    `best ${serviceName.toLowerCase()} dubai`,
    `professional ${serviceName.toLowerCase()}`,
    `${serviceCategory.toLowerCase()} services dubai`,
    `${serviceCategory.toLowerCase()} agency dubai`,
    ...keywords,
  ]

  return {
    title,
    description: metaDescription,
    keywords: allKeywords,
    alternates: {
      canonical: `https://www.creativefusion.llc/services/${serviceCategory.toLowerCase().replace(/\s+/g, "-")}/${serviceName.toLowerCase().replace(/\s+/g, "-")}`,
    },
    openGraph: {
      title: shortTitle,
      description: metaDescription,
      url: `https://www.creativefusion.llc/services/${serviceCategory.toLowerCase().replace(/\s+/g, "-")}/${serviceName.toLowerCase().replace(/\s+/g, "-")}`,
      siteName: "Creative Fusion LLC",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${serviceName} by Creative Fusion Dubai`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shortTitle,
      description: metaDescription,
      images: [imageUrl],
      creator: "@creativefusionllc",
      site: "@creativefusionllc",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "price:amount": price || "Custom",
      "price:currency": "AED",
      "geo.region": "AE-DU",
      "geo.placename": "Dubai",
      "geo.position": "25.2048;55.2708",
      ICBM: "25.2048, 55.2708",
    },
  }
}

export const serviceCategories = {
  "logo-design": {
    name: "Logo Design",
    category: "Creative Branding",
    description:
      "Create a unique, memorable logo that defines your brand identity. Professional custom logo design with unlimited revisions.",
    keywords: ["custom logo design", "brand logo", "logo creator", "graphic design logo"],
    price: "1,500",
  },
  "brand-identity": {
    name: "Brand Identity",
    category: "Creative Branding",
    description:
      "Complete brand identity design including logo, colors, typography, and visual guidelines for consistent brand presence.",
    keywords: ["brand identity design", "corporate identity", "visual identity", "branding package"],
    price: "5,000",
  },
  "web-design": {
    name: "Web Design",
    category: "Web Development",
    description:
      "Modern, responsive website design that converts visitors into customers. User-friendly interfaces with stunning visuals.",
    keywords: ["website design", "web designer", "responsive design", "ui ux design"],
    price: "3,500",
  },
  "custom-websites": {
    name: "Custom Website Development",
    category: "Web Development",
    description:
      "Fully custom website development tailored to your business needs. Built with latest technologies for performance and scalability.",
    keywords: ["custom website", "web development", "website builder", "web developer"],
    price: "8,000",
  },
  seo: {
    name: "SEO Services",
    category: "Digital Marketing",
    description:
      "Rank #1 on Google with proven SEO strategies. On-page, off-page, technical and local SEO optimization for maximum visibility.",
    keywords: ["search engine optimization", "google ranking", "seo agency", "organic traffic"],
    price: "2,500",
  },
  "social-media": {
    name: "Social Media Marketing",
    category: "Digital Marketing",
    description:
      "Grow your social media presence with engaging content, targeted ads, and community management across all platforms.",
    keywords: ["social media marketing", "instagram marketing", "facebook ads", "social media management"],
    price: "3,000",
  },
  "google-ads": {
    name: "Google Ads Management",
    category: "Digital Marketing",
    description:
      "Expert Google Ads management to drive qualified traffic and maximize ROI. PPC campaigns optimized for conversions.",
    keywords: ["google ads", "ppc management", "pay per click", "search ads", "adwords"],
    price: "2,000",
  },
  photography: {
    name: "Professional Photography",
    category: "Photography",
    description:
      "High-quality professional photography for products, events, corporate, and real estate. Stunning images that tell your story.",
    keywords: ["product photography", "event photography", "commercial photography", "photographer dubai"],
    price: "1,500",
  },
  videography: {
    name: "Video Production",
    category: "Videography",
    description:
      "Professional video production services including corporate videos, commercials, events, and promotional content.",
    keywords: ["video production", "corporate video", "commercial videography", "video editing"],
    price: "3,500",
  },
  "graphic-design": {
    name: "Graphic Design",
    category: "Graphic Design",
    description:
      "Creative graphic design services for brochures, flyers, posters, banners, and all marketing materials.",
    keywords: ["graphic design", "brochure design", "flyer design", "print design"],
    price: "800",
  },
  "mobile-app": {
    name: "Mobile App Development",
    category: "Software & Apps",
    description:
      "Native and cross-platform mobile app development for iOS and Android. User-friendly apps with powerful features.",
    keywords: ["mobile app development", "ios app", "android app", "app developer"],
    price: "15,000",
  },
  "e-commerce": {
    name: "E-commerce Development",
    category: "Web Development",
    description:
      "Complete e-commerce solutions with shopping cart, payment gateway, inventory management, and order tracking.",
    keywords: ["e-commerce website", "online store", "shopify development", "woocommerce"],
    price: "10,000",
  },
  "whatsapp-marketing": {
    name: "WhatsApp Marketing",
    category: "WhatsApp Marketing",
    description:
      "Reach customers directly with WhatsApp Business API. Automated messages, bulk campaigns, and customer support.",
    keywords: ["whatsapp marketing", "whatsapp business", "bulk whatsapp", "whatsapp automation"],
    price: "1,500",
  },
  "exhibition-stands": {
    name: "Exhibition Stand Design",
    category: "Exhibition Stands",
    description:
      "Custom exhibition stand design and fabrication for trade shows and events. Eye-catching displays that attract visitors.",
    keywords: ["exhibition stand", "trade show booth", "display stand", "exhibition design"],
    price: "8,000",
  },
  consulting: {
    name: "Business Consulting",
    category: "Consulting",
    description:
      "Strategic business consulting to grow your company. Market analysis, strategy development, and implementation support.",
    keywords: ["business consulting", "business strategy", "management consulting", "business advisor"],
    price: "5,000",
  },
}

export function getServiceMetadata(serviceSlug: string, customOptions?: Partial<ServiceMetadataOptions>): Metadata {
  const serviceConfig = serviceCategories[serviceSlug as keyof typeof serviceCategories]

  if (!serviceConfig) {
    // Return default metadata for services not in the list
    return generateServiceMetadata({
      serviceName: customOptions?.serviceName || "Professional Services",
      serviceCategory: customOptions?.serviceCategory || "Business Services",
      description:
        customOptions?.description ||
        "Professional business services in Dubai, UAE by Creative Fusion. Quality solutions for your business needs.",
      ...customOptions,
    })
  }

  return generateServiceMetadata({
    serviceName: serviceConfig.name,
    serviceCategory: serviceConfig.category,
    description: serviceConfig.description,
    keywords: serviceConfig.keywords,
    price: serviceConfig.price,
    ...customOptions,
  })
}
