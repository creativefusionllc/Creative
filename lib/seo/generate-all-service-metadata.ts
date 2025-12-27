import { serviceCategories } from "./service-metadata-generator"

export const allServicesMetadata = {
  // Creative Branding Services
  "creative-branding": {
    "logo-design": serviceCategories["logo-design"],
    "brand-identity": serviceCategories["brand-identity"],
    "business-cards": {
      name: "Business Card Design",
      category: "Creative Branding",
      description: "Professional business card design that makes a lasting impression. Premium printing available.",
      keywords: ["business card design", "corporate cards", "visiting card", "business card printing"],
      price: "500",
    },
    "brand-guidelines": {
      name: "Brand Guidelines",
      category: "Creative Branding",
      description: "Comprehensive brand guidelines to ensure consistent use of your brand across all touchpoints.",
      keywords: ["brand guidelines", "brand standards", "brand book", "style guide"],
      price: "3,000",
    },
    packaging: {
      name: "Packaging Design",
      category: "Creative Branding",
      description: "Eye-catching packaging design that protects products and enhances brand appeal on shelves.",
      keywords: ["packaging design", "product packaging", "box design", "label design"],
      price: "2,500",
    },
  },

  // Web Development Services
  "web-development": {
    "custom-websites": serviceCategories["custom-websites"],
    "web-design": serviceCategories["web-design"],
    "e-commerce": serviceCategories["e-commerce"],
    wordpress: {
      name: "WordPress Development",
      category: "Web Development",
      description: "Custom WordPress websites with themes, plugins, and full CMS functionality for easy management.",
      keywords: ["wordpress development", "wordpress website", "cms website", "wordpress theme"],
      price: "4,000",
    },
    "landing-pages": {
      name: "Landing Page Design",
      category: "Web Development",
      description: "High-converting landing pages optimized for lead generation and sales conversions.",
      keywords: ["landing page design", "conversion optimization", "sales page", "squeeze page"],
      price: "1,500",
    },
  },

  // Digital Marketing Services
  "digital-marketing": {
    seo: serviceCategories["seo"],
    "social-media": serviceCategories["social-media"],
    "google-ads": serviceCategories["google-ads"],
    "email-marketing": {
      name: "Email Marketing",
      category: "Digital Marketing",
      description: "Targeted email campaigns that engage subscribers and drive conversions with automation.",
      keywords: ["email marketing", "email campaigns", "newsletter", "email automation"],
      price: "1,500",
    },
    "content-marketing": {
      name: "Content Marketing",
      category: "Digital Marketing",
      description: "Strategic content creation and distribution to attract, engage, and convert your target audience.",
      keywords: ["content marketing", "content strategy", "blog writing", "content creation"],
      price: "2,500",
    },
  },

  // Photography Services
  photography: {
    "product-photography": {
      name: "Product Photography",
      category: "Photography",
      description:
        "Professional product photography with white background or lifestyle shots for e-commerce and catalogs.",
      keywords: ["product photography", "ecommerce photography", "catalog photography", "amazon photography"],
      price: "1,000",
    },
    "event-photography": {
      name: "Event Photography",
      category: "Photography",
      description:
        "Capture your special events with professional photography. Weddings, corporate events, and conferences.",
      keywords: ["event photography", "wedding photography", "conference photography", "corporate events"],
      price: "2,000",
    },
    "real-estate-photography": {
      name: "Real Estate Photography",
      category: "Photography",
      description: "Stunning real estate photography to showcase properties and attract potential buyers.",
      keywords: [
        "real estate photography",
        "property photography",
        "architectural photography",
        "interior photography",
      ],
      price: "1,500",
    },
  },

  // Add all other service categories...
  videography: serviceCategories["videography"],
  "graphic-design": serviceCategories["graphic-design"],
  "whatsapp-marketing": serviceCategories["whatsapp-marketing"],
  "exhibition-stands": serviceCategories["exhibition-stands"],
  consulting: serviceCategories["consulting"],
}
