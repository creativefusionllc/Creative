import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Sales Leadership Training Dubai | Sales Management UAE GCC",
  description:
    "Professional sales leadership training in Dubai, UAE & GCC. Sales management skills, team coaching, and leadership development for sales managers.",
  keywords: ["sales leadership dubai", "sales management training uae", "team coaching gcc", "sales manager dubai"],
}

export default function LeadershipPage() {
  return (
    <>
      <Header />
      <main>
        <CategoryPageTemplate
          breadcrumb={{
            service: { title: "Sales & Retail", href: "/services/sales-retail" },
            subService: { title: "Sales Training", href: "/services/sales-retail/sales-training" },
          }}
          title="Sales Leadership"
          subtitle="Leading High-Performance Teams"
          description="Develop exceptional sales leaders with professional leadership training in Dubai, UAE & GCC. Our programs build skills to coach, motivate, and drive team performance."
          heroImage="/sales-leadership-training-dubai.jpg"
          benefits={[
            "Team leadership skills",
            "Coaching and mentoring",
            "Performance management",
            "Pipeline management",
            "Motivation and engagement",
            "Sales forecasting",
          ]}
          process={[
            { step: 1, title: "Leadership Assessment", description: "360-degree feedback and assessment" },
            { step: 2, title: "Skills Development", description: "Leadership workshop and coaching" },
            { step: 3, title: "Application", description: "On-the-job leadership practice" },
            { step: 4, title: "Review", description: "Progress review and next steps" },
          ]}
          pricing={{
            startingFrom: "AED 3,500/person",
            includes: ["3-day program", "Assessment", "Coaching session", "Resources"],
          }}
          faqs={[
            {
              question: "Who should attend leadership training?",
              answer:
                "New sales managers, team leads, and high-potential salespeople being groomed for leadership roles.",
            },
            {
              question: "Do you offer executive coaching?",
              answer:
                "Yes, we provide one-on-one executive coaching for senior sales leaders alongside group programs.",
            },
          ]}
          relatedCategories={[
            { title: "Advanced Selling", href: "/services/sales-retail/sales-training/advanced" },
            { title: "Negotiation Skills", href: "/services/sales-retail/sales-training/negotiation" },
            { title: "Sales Fundamentals", href: "/services/sales-retail/sales-training/fundamentals" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
