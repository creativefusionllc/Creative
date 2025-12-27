import { ServicePageTemplate } from "@/components/services/service-page-template"

const serviceData = {
  title: "Media Relations",
  subtitle: "Communications Consultancy",
  description: "Build and maintain positive relationships with media to increase brand visibility and credibility.",
  heroImage: "/placeholder.svg?height=600&width=800",
  features: [
    { title: "Media Strategy", description: "Plan media engagement", icon: "target" },
    { title: "Press Releases", description: "Compelling announcements", icon: "file-text" },
    { title: "Media Training", description: "Interview preparation", icon: "mic" },
    { title: "Journalist Outreach", description: "Build relationships", icon: "users" },
    { title: "Press Events", description: "Media opportunities", icon: "calendar" },
    { title: "Coverage Tracking", description: "Monitor results", icon: "bar-chart" },
  ],
  process: [
    { step: 1, title: "Strategy", description: "Define media objectives" },
    { step: 2, title: "Prepare", description: "Create materials and train spokespeople" },
    { step: 3, title: "Engage", description: "Reach out to media" },
    { step: 4, title: "Measure", description: "Track coverage and impact" },
  ],
  benefits: [
    "Increased media coverage",
    "Enhanced credibility",
    "Broader reach",
    "Thought leadership",
    "Brand awareness",
    "Crisis preparation",
  ],
  faqs: [
    {
      question: "Can you guarantee media coverage?",
      answer: "We cannot guarantee coverage but maximize opportunities through strategic outreach.",
    },
    {
      question: "What types of media do you work with?",
      answer: "Traditional media, digital outlets, podcasts, and industry publications.",
    },
    {
      question: "Do you write press releases?",
      answer: "Yes, we provide full press release writing and distribution services.",
    },
  ],
}

export const metadata = {
  title: "Media Relations Services | Communications Consultancy | Creative Fusion",
  description: serviceData.description,
}

export default function MediaRelationsPage() {
  return <ServicePageTemplate {...serviceData} />
}
