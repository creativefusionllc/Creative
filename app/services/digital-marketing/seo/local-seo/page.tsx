import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Local SEO Dubai | Google Maps Ranking | Business Profile Optimization | Creative Fusion LLC",
  description:
    "Local SEO services in Dubai UAE. Google Business Profile optimization, Google Maps ranking, local search visibility. Serve your local customers better. Available in Dubai, Sharjah, Abu Dhabi.",
  keywords: [
    "local seo dubai",
    "google maps ranking dubai",
    "google business profile optimization",
    "local search optimization uae",
    "local seo sharjah",
    "google my business optimization",
    "local seo abu dhabi",
    "map pack optimization",
    "local business seo",
    "google local services",
    "location seo dubai",
    "local search marketing",
    "business profile setup",
    "local business listings",
    "google maps optimization",
    "citation building services",
    "local search ranking",
    "geo-targeted seo",
    "local market optimization",
    "location-based marketing",
  ],
  openGraph: {
    title: "Local SEO Dubai | Google Maps Ranking | Creative Fusion LLC",
    description: "Dominate Local Search - Get your business found on Google Maps and local search results",
  },
}

export default function LocalSeoPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Digital Marketing", href: "/services/digital-marketing" },
          subService: { title: "SEO Services", href: "/services/digital-marketing/seo" },
        }}
        title="Local SEO"
        subtitle="Dominate Local Search Results"
        description="Local SEO helps your business appear prominently in local search results and Google Maps. We optimize your Google Business Profile, build local citations, and manage your online reputation to attract customers in Dubai, Sharjah, Abu Dhabi, and across the UAE."
        heroImage="/local-seo-google-maps.jpg"
        benefits={[
          "Prominent Google Maps visibility for local customers",
          "Top 3 positions in local search results (Map Pack)",
          "Positive reviews and reputation management",
          "Increased foot traffic and local customers",
          "Higher click-through rates from local searchers",
          "Complete Google Business Profile optimization",
        ]}
        process={[
          { step: 1, title: "Local Audit", description: "Complete local presence and SEO analysis" },
          { step: 2, title: "GBP Setup", description: "Google Business Profile creation and optimization" },
          { step: 3, title: "Citations", description: "Building and managing local directory listings" },
          { step: 4, title: "Reviews", description: "Review generation and reputation management strategy" },
          { step: 5, title: "Monitoring", description: "Ongoing rank tracking and performance optimization" },
        ]}
        pricing={{
          startingFrom: "AED 1,500/month",
          includes: [
            "Google Business Profile Setup & Optimization",
            "Local Citation Building (10+)",
            "Monthly Local SEO Report",
            "Basic Review Management",
            "Local Keyword Targeting",
          ],
        }}
        faqs={[
          {
            question: "What is Google Business Profile and why is it important?",
            answer:
              "GBP is your free business listing on Google that appears in Maps and local search results. It's crucial for local SEO because it's often the first thing potential customers see when searching for your business or services locally.",
          },
          {
            question: "How important are customer reviews for local SEO?",
            answer:
              "Very important - reviews significantly impact local rankings and customer decisions. Businesses with more positive reviews rank higher in local search results and get more customer inquiries.",
          },
          {
            question: "What are local citations and why do I need them?",
            answer:
              "Local citations are mentions of your business name, address, and phone number (NAP) on directories like Google, Yelp, Yellow Pages, etc. They help Google verify your business location and improve local rankings.",
          },
          {
            question: "How long does it take to rank on Google Maps?",
            answer:
              "With proper optimization, you can see improvements in 4-8 weeks. Complete local SEO results typically take 3-6 months to fully establish, depending on competition.",
          },
          {
            question: "Do I need local SEO if I have a website?",
            answer:
              "Yes! Local SEO is essential for attracting nearby customers. Even with a great website, local SEO ensures people find you on Google Maps and local search results.",
          },
        ]}
        relatedCategories={[
          { title: "On-Page SEO", href: "/services/digital-marketing/seo/on-page-seo" },
          { title: "Google Ads", href: "/services/digital-marketing/ppc/google-ads" },
          { title: "SEO Packages", href: "/services/digital-marketing/seo" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
