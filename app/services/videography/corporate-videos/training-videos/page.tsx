import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Training Video Production Dubai | Corporate Training | Creative Fusion LLC",
  description:
    "Professional training and onboarding video production. Effective educational content for employee training, safety, and compliance.",
  keywords: ["training video dubai", "corporate training production", "onboarding video uae", "educational video"],
}

export default function TrainingVideosPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="Training & Onboarding Videos"
      subtitle="Educate & Empower"
      description="Professional training videos that effectively communicate procedures, policies, and skills. Perfect for employee onboarding, safety training, and compliance."
      heroImage="/corporate-training-video-production.jpg"
      benefits={[
        "Consistent training delivery",
        "Reduce training costs",
        "On-demand accessibility",
        "Track completion rates",
        "Multi-language options",
        "Update content easily",
      ]}
      process={[
        { step: 1, title: "Content Analysis", description: "Review training materials and objectives" },
        { step: 2, title: "Script & Design", description: "Create engaging educational content" },
        { step: 3, title: "Production", description: "Film demonstrations and presentations" },
        { step: 4, title: "Integration", description: "Format for your LMS or platform" },
      ]}
      pricing={{
        startingFrom: "AED 3,500",
        includes: [
          "5-10 minute module",
          "Screen recording",
          "Professional narration",
          "On-screen text/graphics",
          "Quiz integration ready",
          "SCORM compatible",
        ],
      }}
      faqs={[
        {
          question: "Can you create interactive training?",
          answer: "Yes, we can create interactive elements and quizzes for engaging learning experiences.",
        },
        {
          question: "Do you offer multi-language versions?",
          answer: "Yes, we provide subtitles and voiceover in multiple languages including Arabic.",
        },
        {
          question: "Can you integrate with our LMS?",
          answer: "We deliver in formats compatible with all major learning management systems.",
        },
      ]}
      relatedCategories={[
        { title: "Company Profile", href: "/services/videography/corporate-videos/company-profile" },
        { title: "CEO Messages", href: "/services/videography/corporate-videos/ceo-messages" },
        { title: "Recruitment Videos", href: "/services/videography/corporate-videos/recruitment" },
      ]}
    />
  )
}
