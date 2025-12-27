import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Brand Story Video Production Dubai | Creative Fusion LLC",
  description:
    "Emotional brand story videos that connect with your audience. Cinematic storytelling that showcases your brand journey and values.",
  keywords: ["brand story video dubai", "brand film production", "storytelling video uae", "emotional brand video"],
}

export default function BrandStoryPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="Brand Story Films"
      subtitle="Emotional Connection"
      description="Cinematic brand story films that create emotional connections with your audience. Tell your journey, values, and vision in a compelling narrative."
      heroImage="/brand-story-film-production-cinematic.jpg"
      benefits={[
        "Create deep emotional connections",
        "Differentiate from competitors",
        "Build brand loyalty",
        "Humanize your company",
        "Shareable across platforms",
        "Award-winning storytelling",
      ]}
      process={[
        { step: 1, title: "Story Discovery", description: "Uncovering your unique brand narrative" },
        { step: 2, title: "Creative Development", description: "Storyboarding and visual planning" },
        { step: 3, title: "Cinematic Production", description: "High-end filming with professional crew" },
        { step: 4, title: "Post-Production", description: "Color grading, music, and final polish" },
      ]}
      pricing={{
        startingFrom: "AED 15,000",
        includes: [
          "3-5 minute film",
          "Cinematic quality",
          "Professional voiceover",
          "Custom music score",
          "Color grading",
          "Multiple format delivery",
        ],
      }}
      faqs={[
        {
          question: "What makes a good brand story?",
          answer: "Authenticity, emotion, and a clear narrative arc that resonates with your target audience.",
        },
        {
          question: "Can you interview our team?",
          answer: "Yes, interviews are a powerful way to add authenticity to your brand story.",
        },
        {
          question: "Do you handle music licensing?",
          answer: "Yes, we provide fully licensed music or can create custom compositions.",
        },
      ]}
      relatedCategories={[
        { title: "Company Profile", href: "/services/videography/corporate-videos/company-profile" },
        { title: "Testimonial Videos", href: "/services/videography/corporate-videos/testimonials" },
        { title: "Recruitment Videos", href: "/services/videography/corporate-videos/recruitment" },
      ]}
    />
  )
}
