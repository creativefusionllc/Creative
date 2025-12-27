import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Cloud Migration Services Dubai | Infrastructure Consulting | Creative Fusion LLC",
  description:
    "Expert cloud migration services in Dubai UAE. Seamlessly transition your business infrastructure to the cloud with minimal downtime.",
  keywords: ["cloud migration dubai", "cloud infrastructure uae", "AWS Azure migration"],
}

export default function CloudMigrationPage() {
  return (
    <>
      <Header />
      <CategoryPageTemplate
        breadcrumb={{
          service: { title: "Business Consulting", href: "/services/consulting" },
          subService: { title: "Digital Transformation", href: "/services/consulting/digital-transformation" },
        }}
        title="Cloud Migration"
        subtitle="Cloud Infrastructure Transformation"
        description="Seamlessly transition your business infrastructure to the cloud with our expert migration services that minimize downtime and maximize efficiency."
        heroImage="/cloud-migration-infrastructure-server-data-center.jpg"
        benefits={[
          "Reduced IT infrastructure costs",
          "Improved scalability and flexibility",
          "Enhanced security and compliance",
          "24/7 availability and reliability",
          "Faster deployment of new services",
          "Better disaster recovery capabilities",
        ]}
        process={[
          { step: 1, title: "Assess", description: "Evaluate current infrastructure and cloud readiness." },
          { step: 2, title: "Plan", description: "Design migration strategy and timeline." },
          { step: 3, title: "Migrate", description: "Execute migration with minimal disruption." },
          { step: 4, title: "Optimize", description: "Fine-tune cloud environment for performance." },
        ]}
        pricing={{
          startingFrom: "AED 20,000",
          includes: [
            "Infrastructure assessment",
            "Migration strategy planning",
            "Data migration execution",
            "Testing and validation",
            "Post-migration optimization",
          ],
        }}
        faqs={[
          {
            question: "How long does cloud migration take?",
            answer: "Timeline varies based on complexity, typically 2-6 months for full migration.",
          },
          {
            question: "Will there be downtime during migration?",
            answer:
              "We plan migrations to minimize downtime, often during off-peak hours with zero critical disruption.",
          },
          {
            question: "Which cloud platforms do you support?",
            answer: "We work with AWS, Microsoft Azure, Google Cloud, and hybrid cloud solutions.",
          },
        ]}
        relatedCategories={[
          {
            title: "Technology Roadmapping",
            href: "/services/consulting/digital-transformation/technology-roadmapping",
          },
          { title: "Data Analytics", href: "/services/consulting/digital-transformation/data-analytics" },
          { title: "Automation", href: "/services/consulting/digital-transformation/automation" },
          { title: "Digital Training", href: "/services/consulting/digital-transformation/digital-training" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
