import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Company Profile Video Production Dubai | Creative Fusion LLC",
  description:
    "Professional company profile video production in Dubai. Showcase your business, mission, values and services with cinematic quality videos.",
  keywords: [
    "company profile video dubai",
    "corporate video production",
    "business video uae",
    "company overview video",
  ],
}

export default function CompanyProfilePage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="Company Profile Videos"
      subtitle="Showcase Your Business"
      description="Professional company profile videos that tell your brand story, showcase your services, and build trust with potential clients and partners."
      heroImage="/company-profile-video-production.jpg"
      benefits={[
        "Increase brand credibility and trust",
        "Showcase your unique value proposition",
        "Engage website visitors longer",
        "Perfect for presentations and pitches",
        "Boost SEO with video content",
        "Share across all marketing channels",
      ]}
      process={[
        { step: 1, title: "Discovery", description: "Understanding your brand, goals, and target audience" },
        { step: 2, title: "Scripting", description: "Crafting compelling narrative and key messages" },
        { step: 3, title: "Production", description: "Professional filming at your location" },
        { step: 4, title: "Delivery", description: "Editing, graphics, and final delivery" },
      ]}
      pricing={{
        startingFrom: "AED 5,000",
        includes: [
          "1-2 minute video",
          "Professional filming",
          "Script development",
          "Background music",
          "Basic motion graphics",
          "2 revision rounds",
        ],
      }}
      faqs={[
        {
          question: "How long does production take?",
          answer: "Typically 2-3 weeks from script approval to final delivery.",
        },
        {
          question: "Do you provide scriptwriting?",
          answer: "Yes, we offer full scriptwriting services or can work with your provided script.",
        },
        {
          question: "Can you film at multiple locations?",
          answer: "Multi-location shoots are available at additional cost.",
        },
      ]}
      relatedCategories={[
        { title: "Brand Story Films", href: "/services/videography/corporate-videos/brand-story" },
        { title: "Training Videos", href: "/services/videography/corporate-videos/training-videos" },
        { title: "CEO Messages", href: "/services/videography/corporate-videos/ceo-messages" },
      ]}
    />
  )
}
