import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "Recruitment Video Production Dubai | Employer Branding | Creative Fusion LLC",
  description:
    "Professional recruitment and employer branding videos. Attract top talent by showcasing your company culture, team, and workplace.",
  keywords: ["recruitment video dubai", "employer branding video", "hiring video uae", "company culture video"],
}

export default function RecruitmentPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="Recruitment Videos"
      subtitle="Attract Top Talent"
      description="Showcase your company culture, team environment, and career opportunities. Recruitment videos that attract the best candidates to your organization."
      heroImage="/recruitment-video-company-culture-workplace.jpg"
      benefits={[
        "Attract quality candidates",
        "Showcase company culture",
        "Reduce hiring time",
        "Stand out from competitors",
        "Employee testimonials",
        "Social media ready",
      ]}
      process={[
        { step: 1, title: "Culture Discovery", description: "Understand your employer brand" },
        { step: 2, title: "Story Planning", description: "Identify team members to feature" },
        { step: 3, title: "Workplace Filming", description: "Capture authentic moments" },
        { step: 4, title: "Engaging Edit", description: "Create compelling narrative" },
      ]}
      pricing={{
        startingFrom: "AED 6,000",
        includes: [
          "2-3 minute video",
          "Employee interviews",
          "Workplace b-roll",
          "Energetic music",
          "Text overlays",
          "Job platform formats",
        ],
      }}
      faqs={[
        {
          question: "How many employees should we feature?",
          answer: "We recommend 3-5 employees from different departments for a well-rounded perspective.",
        },
        {
          question: "Can you create role-specific videos?",
          answer: "Yes, we can create tailored videos for specific positions or departments.",
        },
        {
          question: "Do you optimize for job platforms?",
          answer: "Yes, we deliver in formats optimized for LinkedIn, Indeed, and other platforms.",
        },
      ]}
      relatedCategories={[
        { title: "Company Profile", href: "/services/videography/corporate-videos/company-profile" },
        { title: "Brand Story Films", href: "/services/videography/corporate-videos/brand-story" },
        { title: "Training Videos", href: "/services/videography/corporate-videos/training-videos" },
      ]}
    />
  )
}
