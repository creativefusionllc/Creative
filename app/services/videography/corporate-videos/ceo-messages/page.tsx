import type { Metadata } from "next"
import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata: Metadata = {
  title: "CEO Message Video Production Dubai | Executive Communications | Creative Fusion LLC",
  description:
    "Professional CEO and executive message video production. Leadership communications, announcements, and investor updates with polished delivery.",
  keywords: [
    "ceo message video dubai",
    "executive video production",
    "leadership communications uae",
    "investor video",
  ],
}

export default function CeoMessagesPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Videography", href: "/services/videography" },
        subService: { title: "Corporate Videos", href: "/services/videography/corporate-videos" },
      }}
      title="CEO & Executive Messages"
      subtitle="Leadership Communications"
      description="Professional executive message videos for internal communications, investor updates, and company announcements. Polished delivery that builds confidence."
      heroImage="/ceo-executive-message-video-production.jpg"
      benefits={[
        "Direct leadership connection",
        "Build employee trust",
        "Consistent messaging",
        "Professional presentation",
        "Quick turnaround available",
        "Multi-platform ready",
      ]}
      process={[
        { step: 1, title: "Message Planning", description: "Outline key points and tone" },
        { step: 2, title: "Teleprompter Setup", description: "Professional script and prompting" },
        { step: 3, title: "Studio Filming", description: "Controlled lighting and sound" },
        { step: 4, title: "Quick Edit", description: "Fast turnaround when needed" },
      ]}
      pricing={{
        startingFrom: "AED 2,000",
        includes: [
          "Up to 5 minutes",
          "Teleprompter service",
          "Professional lighting",
          "Multiple takes",
          "Same-day edit available",
          "Branded intro/outro",
        ],
      }}
      faqs={[
        {
          question: "Can you film at our office?",
          answer: "Yes, we bring portable studio equipment for professional results at any location.",
        },
        {
          question: "Do you offer same-day delivery?",
          answer: "Yes, rush delivery is available for time-sensitive announcements.",
        },
        {
          question: "Can you help with the script?",
          answer: "We offer speechwriting and key message development services.",
        },
      ]}
      relatedCategories={[
        { title: "Company Profile", href: "/services/videography/corporate-videos/company-profile" },
        { title: "Training Videos", href: "/services/videography/corporate-videos/training-videos" },
        { title: "Investor Updates", href: "/services/videography/corporate-videos/investor-updates" },
      ]}
    />
  )
}
