import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Digital Culture Training Dubai | Digital Skills Development | Creative Fusion LLC",
  description:
    "Expert digital training services in Dubai UAE. Empowering teams with digital skills and mindset for transformation success.",
  keywords: ["digital training dubai", "digital skills development uae", "digital culture consulting"],
}

export default function DigitalTrainingPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Digital Culture Training"
        subtitle="Digital Skills Empowerment"
        description="Empowering your teams with digital skills and mindset needed to thrive in the modern digital workplace."
        heroImage="/digital-training-technology-workshop-team-learning.jpg"
        benefits={[
          "Accelerated digital adoption across teams",
          "Improved team confidence with technology",
          "Reduced resistance to digital change",
          "Enhanced overall productivity",
          "Future-ready workforce capabilities",
          "Sustainable digital culture foundation",
        ]}
        process={[
          { step: 1, title: "Assess", description: "Evaluate current digital skills and gaps." },
          { step: 2, title: "Design", description: "Create customized training curriculum." },
          { step: 3, title: "Deliver", description: "Conduct engaging training sessions." },
          { step: 4, title: "Reinforce", description: "Provide ongoing support and resources." },
        ]}
        pricing={{
          startingFrom: "AED 5,000",
          includes: [
            "Skills gap assessment",
            "Custom training curriculum",
            "Workshop delivery",
            "Training materials",
            "Follow-up support sessions",
          ],
        }}
        faqs={[
          {
            question: "How long are the training programs?",
            answer: "Programs range from 1-day workshops to multi-week comprehensive courses depending on scope.",
          },
          {
            question: "Can training be customized for our industry?",
            answer: "Yes, all programs are tailored to your specific industry, tools, and organizational needs.",
          },
          {
            question: "Do you offer remote training options?",
            answer: "Yes, we offer both in-person and virtual training sessions to accommodate all teams.",
          },
        ]}
        relatedCategories={[
          {
            title: "Technology Roadmapping",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          { title: "Process Digitization", href: "/services/consulting/digital-transformation/process-digitization" },
          { title: "Automation", href: "/services/consulting/digital-transformation/automation" },
          { title: "Cloud Migration", href: "/services/consulting/digital-transformation/cloud-migration" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
