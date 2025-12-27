import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Software & App Development | Custom ERP & Mobile Apps | Creative Fusion LLC Dubai UAE",
  description:
    "Custom software and mobile app development in Dubai & UAE. ERP systems, mobile applications, database engineering, and backend solutions.",
  keywords: [
    "software development dubai",
    "mobile app development uae",
    "erp solutions sharjah",
    "custom software dubai",
    "app developer uae",
  ],
}

export default function SoftwareAppsPage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Software & App Development"
          subtitle="Custom Solutions"
          description="Power your business operations with custom software solutions. From enterprise ERP systems to mobile applications, we build technology that drives efficiency and growth."
          heroImage="/images/hero-slide-digital-marketing-strategy.jpg"
          icon={Settings}
          features={[
            "Custom Software Development",
            "ERP & CRM Systems",
            "Mobile App Development (iOS & Android)",
            "Database Design & Engineering",
            "API Development & Integration",
            "Cloud Solutions",
            "Legacy System Modernization",
            "Quality Assurance & Testing",
            "Ongoing Support & Maintenance",
          ]}
          packages={[
            {
              name: "MVP",
              price: "AED 15,000",
              description: "Minimum viable product",
              features: [
                "Core Feature Development",
                "Basic UI/UX Design",
                "Single Platform (iOS or Android)",
                "Backend API",
                "Basic Admin Panel",
                "3 Months Support",
              ],
            },
            {
              name: "Business",
              price: "AED 35,000",
              description: "Full-featured application",
              features: [
                "Complete Feature Set",
                "Custom UI/UX Design",
                "iOS & Android Apps",
                "Advanced Backend",
                "Admin Dashboard",
                "Push Notifications",
                "Analytics Integration",
                "6 Months Support",
              ],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "AED 80,000+",
              description: "Large-scale solutions",
              features: [
                "Custom Enterprise Software",
                "ERP/CRM Integration",
                "Multiple Platforms",
                "Scalable Architecture",
                "Third-Party Integrations",
                "Security Compliance",
                "Dedicated Team",
                "12 Months Support",
              ],
            },
          ]}
          processSteps={[
            { title: "Analysis", description: "Understanding your business processes and technical requirements." },
            { title: "Architecture", description: "System design, technology selection, and project planning." },
            { title: "Development", description: "Agile development with regular updates and demos." },
            { title: "Deployment", description: "Testing, deployment, training, and ongoing support." },
          ]}
          portfolioImages={[
            "/images/hero-slide-digital-marketing-strategy.jpg",
            "/images/ecommerce-website-mockup.jpg",
            "/images/digital-marketing-strategy.png",
          ]}
          relatedServices={[
            { title: "Web Development", href: "/services/web-development" },
            { title: "Support & Maintenance", href: "/services/support-maintenance" },
            { title: "Digital Marketing", href: "/services/digital-marketing" },
            { title: "Creative Branding", href: "/services/creative-branding" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
