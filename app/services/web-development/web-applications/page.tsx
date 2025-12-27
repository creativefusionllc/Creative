import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Web Application Development Dubai | Custom Web Apps | Creative Fusion LLC",
  description:
    "Professional web application development in Dubai UAE. Custom web apps with backend development, API integration, and admin dashboards.",
  keywords: ["web application dubai", "custom web app uae", "web development dubai", "saas development sharjah"],
}

export default function WebApplicationsPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Web Development", href: "/services/web-development" }}
      title="Web Applications"
      subtitle="Custom Digital Solutions"
      description="Custom web applications with backend development, API integration, and admin dashboards."
      heroImage="/images/ecommerce-website-mockup.jpg"
      features={[
        { title: "Custom Development", description: "Tailored to your exact requirements" },
        { title: "Database Design", description: "Scalable data architecture" },
        { title: "API Development", description: "RESTful APIs and integrations" },
        { title: "Admin Dashboards", description: "Powerful management interfaces" },
        { title: "User Authentication", description: "Secure login and permissions" },
        { title: "Cloud Deployment", description: "Scalable hosting solutions" },
      ]}
      pricingTiers={[
        {
          name: "MVP",
          price: "AED 15,000",
          description: "Basic application",
          features: ["Core features", "User authentication", "Basic database", "Cloud hosting", "2 months development"],
        },
        {
          name: "Professional",
          price: "AED 40,000",
          description: "Full application",
          features: [
            "Advanced features",
            "Admin dashboard",
            "API integrations",
            "Payment system",
            "4 months development",
          ],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 80,000+",
          description: "Complex solution",
          features: [
            "Custom features",
            "Multi-tenant",
            "Advanced security",
            "Performance optimization",
            "Ongoing development",
          ],
        },
      ]}
      relatedSubServices={[
        { title: "UI/UX Design", href: "/services/web-development/ui-ux-design" },
        { title: "Cloud Hosting", href: "/services/web-development/cloud-hosting" },
      ]}
    />
  )
}
