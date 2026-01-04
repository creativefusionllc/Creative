const photographySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://creativefusion.llc/services/photography#localbusiness",
      name: "Professional Photography Services Dubai | Creative Fusion LLC",
      description:
        "Expert photography services in Dubai UAE including product photography, event photography, corporate photography, fashion shoots, and real estate photography.",
      image: "https://creativefusion.llc/images/photography-hero.jpg",
      url: "https://creativefusion.llc/services/photography",
      telephone: "+971-58-117-4911",
      email: "info@creativefusion.llc",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shams Business Center",
        addressLocality: "Sharjah",
        addressRegion: "Sharjah",
        postalCode: "00000",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.3463,
        longitude: 55.4209,
      },
      areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "UAE", "GCC"],
      priceRange: "AED 1500 - AED 15000",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "89",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://creativefusion.llc/services/photography#faqpage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of photography services do you offer in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer professional photography services including product photography, event photography, corporate photography, fashion photography, real estate photography, wedding photography, and 360-degree virtual tours for businesses in Dubai, Sharjah, and throughout the UAE.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a product photography shoot cost in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Product photography rates start from AED 1,500. The final cost depends on the number of items, complexity, and turnaround time. Contact us for a customized quote.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide event photography for fashion shows in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We specialize in event photography for fashion shows, product launches, corporate events, and trade shows. Our team captures high-quality images that tell your story.",
          },
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://creativefusion.llc/services/photography#service",
      name: "Professional Photography Services",
      description:
        "Professional photography services for products, events, corporate, fashion, and real estate in Dubai and UAE",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://creativefusion.llc/services/photography#localbusiness",
      },
      areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "UAE"],
      priceRange: "AED 1500 - AED 15000",
      serviceType: [
        "Product Photography",
        "Event Photography",
        "Fashion Photography",
        "Real Estate Photography",
        "Corporate Photography",
      ],
      image: "https://creativefusion.llc/images/photography-services.jpg",
    },
  ],
}

const PhotographyPage = () => {
  return (
    <div>
      {/* Your page content here */}
      <script type="application/ld+json">{JSON.stringify(photographySchema)}</script>
    </div>
  )
}

export default PhotographyPage
