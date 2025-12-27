import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Web Development Services Dubai | Custom Websites & E-Commerce | Creative Fusion LLC",
  description:
    "Professional web development services in Dubai UAE. Custom websites, e-commerce platforms, landing pages, UI/UX design, and cloud hosting. Build your digital presence today.",
  keywords: [
    "web development dubai",
    "website design uae",
    "ecommerce development dubai",
    "ui ux design sharjah",
    "web development company uae",
    "custom website dubai",
  ],
  openGraph: {
    title: "Web Development Services Dubai | Creative Fusion LLC",
    description: "Custom websites, e-commerce platforms, and web applications built with modern technology.",
    type: "website",
  },
}

export default function WebDevelopmentPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="06"
        title="Web Development"
        subtitle="Building scalable digital infrastructure"
        description="From corporate websites to complex web applications, we create powerful, scalable digital experiences that drive business growth and engage users."
        heroImage="/images/ecommerce-website-mockup.jpg"
        icon={Code}
        brandColor="coral"
        features={[
          {
            title: "Corporate Website Development",
            description:
              "Professional business websites with modern design, powerful functionality, and SEO optimization built-in.",
            icon: "🌐",
            href: "/services/web-development/corporate-websites", // Added link
          },
          {
            title: "E-Commerce Solutions",
            description:
              "Complete online store development with payment integration, inventory management, and customer accounts.",
            icon: "🛒",
            href: "/services/web-development/ecommerce", // Added link
          },
          {
            title: "Landing Pages",
            description:
              "High-converting landing pages optimized for lead generation, product launches, and marketing campaigns.",
            icon: "📄",
            href: "/services/web-development/landing-pages", // Added link
          },
          {
            title: "UI/UX Design",
            description:
              "User-centered interface design that provides exceptional experiences across all devices and platforms.",
            icon: "🎨",
            href: "/services/web-development/ui-ux-design", // Added link
          },
          {
            title: "Web Applications",
            description: "Custom web applications with backend development, API integration, and admin dashboards.",
            icon: "⚙️",
            href: "/services/web-development/web-applications", // Added link
          },
          {
            title: "Cloud Hosting & Maintenance",
            description:
              "Reliable cloud hosting with SSL certificates, backups, security updates, and ongoing maintenance.",
            icon: "☁️",
            href: "/services/web-development/cloud-hosting", // Added link
          },
        ]}
        process={[
          {
            number: "01",
            title: "Discovery & Planning",
            description: "We understand your requirements, goals, and create a detailed project roadmap.",
          },
          {
            number: "02",
            title: "Design",
            description: "UI/UX design with wireframes, mockups, and prototypes for your approval.",
          },
          {
            number: "03",
            title: "Development",
            description: "Clean, scalable code built with modern frameworks and best practices.",
          },
          {
            number: "04",
            title: "Launch & Support",
            description: "Thorough testing, deployment, training, and ongoing support.",
          },
        ]}
        benefits={[
          "Modern tech stack (Next.js, React, TypeScript)",
          "Mobile-first responsive design",
          "SEO-optimized from the ground up",
          "Performance optimized for fast loading",
          "Secure and scalable architecture",
          "Ongoing maintenance and support included",
        ]}
        relatedServices={[
          { title: "Software & Apps", href: "/services/software-apps" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
          { title: "Creative Branding", href: "/services/creative-branding" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
