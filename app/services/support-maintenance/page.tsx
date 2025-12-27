import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "IT Support & Maintenance Services | Website & Software Support | Creative Fusion LLC Dubai UAE",
  description:
    "Professional IT support and maintenance services in Dubai & UAE. Website maintenance, software support, security updates, and technical assistance.",
  keywords: [
    "it support dubai",
    "website maintenance uae",
    "software support sharjah",
    "technical support dubai",
    "managed it services uae",
  ],
}

export default function SupportMaintenancePage() {
  return (
    <>
      <Header />
      <main>
        <ServicePageTemplate
          title="Support & Maintenance"
          subtitle="Technical Assistance"
          description="Keep your digital assets running smoothly with our comprehensive support and maintenance services. We provide ongoing technical assistance to ensure optimal performance."
          heroImage="/images/creative-team-brainstorming.jpg"
          icon={Wrench}
          features={[
            "Website Maintenance",
            "Software Updates & Patches",
            "Security Monitoring",
            "Performance Optimization",
            "Backup & Recovery",
            "Technical Support",
            "Bug Fixes",
            "Content Updates",
            "Server Management",
          ]}
          packages={[
            {
              name: "Basic",
              price: "AED 500/mo",
              description: "Essential maintenance",
              features: [
                "Monthly Updates",
                "Security Patches",
                "Daily Backups",
                "Email Support",
                "Uptime Monitoring",
                "Basic Bug Fixes",
              ],
            },
            {
              name: "Professional",
              price: "AED 1,500/mo",
              description: "Comprehensive support",
              features: [
                "Weekly Updates",
                "Priority Security",
                "Real-Time Backups",
                "Phone & Email Support",
                "Performance Optimization",
                "Content Updates (5/mo)",
                "Monthly Reports",
                "4-Hour Response Time",
              ],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "AED 3,500/mo",
              description: "24/7 dedicated support",
              features: [
                "Continuous Monitoring",
                "Advanced Security",
                "Unlimited Updates",
                "24/7 Support",
                "Dedicated Account Manager",
                "Custom Development",
                "SLA Guarantee",
                "1-Hour Response Time",
              ],
            },
          ]}
          processSteps={[
            { title: "Assessment", description: "Evaluating your current systems and support needs." },
            { title: "Setup", description: "Implementing monitoring tools and backup systems." },
            { title: "Monitor", description: "Continuous monitoring and proactive maintenance." },
            { title: "Support", description: "Responsive support whenever you need assistance." },
          ]}
          portfolioImages={[
            "/images/creative-team-brainstorming.jpg",
            "/images/hero-slide-digital-marketing-strategy.jpg",
            "/images/ecommerce-website-mockup.jpg",
          ]}
          relatedServices={[
            { title: "Web Development", href: "/services/web-development" },
            { title: "Software & Apps", href: "/services/software-apps" },
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
