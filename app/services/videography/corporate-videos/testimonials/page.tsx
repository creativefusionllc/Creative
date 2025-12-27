import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Testimonial Video Production Dubai | Client Stories | Creative Fusion LLC",
  description:
    "Professional testimonial and case study video production. Capture authentic client success stories that build trust and credibility.",
  keywords: ["testimonial video dubai", "client story video", "case study video uae", "customer review video"],
}

export default function TestimonialsPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="Testimonial Videos"
      subtitle="Authentic Stories"
      description="Capture authentic client success stories that build trust and credibility. Professional testimonial videos that showcase real results and experiences."
      heroImage="/testimonial-video-production-interview.jpg"
      benefits={[
        "Build instant credibility",
        "Showcase real results",
        "Increase conversion rates",
        "Social proof that sells",
        "Versatile marketing asset",
        "Authentic customer voice",
      ]}
      process={[
        { step: 1, title: "Client Selection", description: "Identify ideal customers for testimonials" },
        { step: 2, title: "Interview Prep", description: "Develop questions that elicit great stories" },
        { step: 3, title: "Professional Filming", description: "Comfortable interview environment" },
        { step: 4, title: "Story Editing", description: "Craft compelling narrative from footage" },
      ]}
      pricing={{
        startingFrom: "AED 2,500",
        includes: [
          "1-2 minute testimonial",
          "Professional interview",
          "B-roll footage",
          "Text overlays",
          "Background music",
          "Social media cuts",
        ],
      }}
      faqs={[
        {
          question: "How do you make clients comfortable on camera?",
          answer:
            "We use conversational interview techniques and create a relaxed environment to capture authentic responses.",
        },
        {
          question: "Can you film at the client's location?",
          answer: "Yes, we can film at their office, project site, or our studio - wherever tells the best story.",
        },
        {
          question: "Do you provide multiple video lengths?",
          answer: "Yes, we deliver full testimonials plus short cuts for social media.",
        },
      ]}
      relatedCategories={[
        { title: "Brand Story Films", href: "/services/videography/corporate-videos/brand-story" },
        { title: "Company Profile", href: "/services/videography/corporate-videos/company-profile" },
        { title: "Case Studies", href: "/services/videography/corporate-videos/case-studies" },
      ]}
    />
  )
}
