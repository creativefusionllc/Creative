import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Cloud Hosting Dubai | Website Maintenance | Creative Fusion LLC",
  description:
    "Professional cloud hosting and maintenance in Dubai UAE. Reliable hosting, SSL certificates, backups, and ongoing website support.",
  keywords: ["cloud hosting dubai", "website maintenance uae", "web hosting dubai", "website support sharjah"],
}

export default function CloudHostingPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="Cloud Hosting & Maintenance"
      subtitle="Reliable & Secure"
      description="Reliable cloud hosting with SSL certificates, backups, security updates, and ongoing maintenance."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "Cloud Hosting", description: "Fast, reliable server infrastructure" },
        { title: "SSL Certificates", description: "Secure HTTPS connections" },
        { title: "Daily Backups", description: "Automatic data protection" },
        { title: "Security Updates", description: "Regular patches and monitoring" },
        { title: "Performance Optimization", description: "Speed and uptime improvements" },
        { title: "24/7 Support", description: "Technical assistance when needed" },
      ]}
      pricingTiers={[
        {
          name: "Basic",
          price: "AED 300/mo",
          description: "Small websites",
          features: ["Shared hosting", "SSL certificate", "Weekly backups", "Email support"],
        },
        {
          name: "Professional",
          price: "AED 800/mo",
          description: "Business websites",
          features: ["VPS hosting", "Daily backups", "Security monitoring", "Priority support", "Monthly reports"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 2,000/mo",
          description: "Mission critical",
          features: ["Dedicated server", "Real-time backups", "DDoS protection", "24/7 support", "99.99% uptime SLA"],
        },
      ]}
      relatedSubServices={[
        { title: "Corporate Websites", href: "/services/web-development/corporate-websites" },
        { title: "Web Applications", href: "/services/web-development/web-applications" },
      ]}
    />
  )
}
