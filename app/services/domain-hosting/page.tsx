import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicePageTemplate } from "@/components/services/service-page-template"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Domain & Hosting Services Dubai | Web Hosting, SSL, Email | Creative Fusion LLC",
  description:
    "Professional domain registration and web hosting services in Dubai UAE. Secure hosting, SSL certificates, email hosting, and 24/7 support for your business.",
  keywords: [
    "domain registration dubai",
    "web hosting uae",
    "ssl certificates dubai",
    "email hosting sharjah",
    "vps hosting dubai",
    "dedicated server uae",
  ],
  openGraph: {
    title: "Domain & Hosting Services Dubai | Creative Fusion LLC",
    description: "Reliable domain registration and web hosting solutions for businesses in Dubai UAE.",
    images: ["/images/creative-team-brainstorming.jpg"],
  },
}

export default function DomainHostingPage() {
  return (
    <>
      <Header />
      <ServicePageTemplate
        serviceNumber="12"
        title="Domain & Hosting Services"
        subtitle="Reliable infrastructure for your online presence"
        description="At Creative Fusion LLC, we provide enterprise-grade domain registration and hosting services. From domain names to dedicated servers, we ensure your business stays online 24/7 with lightning-fast performance."
        heroImage="/images/creative-team-brainstorming.jpg"
        icon={Globe}
        brandColor="blue"
        features={[
          {
            title: "Domain Registration",
            description:
              "Register your perfect domain name with over 500+ extensions available. .com, .ae, .co, .io and more with free WHOIS privacy protection.",
            icon: "🌐",
            href: "/services/domain-hosting/domain-registration",
          },
          {
            title: "Web Hosting",
            description:
              "Lightning-fast shared, VPS, and dedicated hosting solutions. SSD storage, 99.9% uptime guarantee, and automatic backups included.",
            icon: "🖥️",
            href: "/services/domain-hosting/web-hosting",
          },
          {
            title: "Email Hosting",
            description:
              "Professional business email with your domain. Secure, reliable email hosting with spam protection and 50GB storage per mailbox.",
            icon: "📧",
            href: "/services/domain-hosting/email-hosting",
          },
          {
            title: "SSL Certificates",
            description:
              "Secure your website with industry-standard SSL certificates. Free basic SSL included, premium options for e-commerce and enterprise.",
            icon: "🔒",
            href: "/services/domain-hosting/ssl-certificates",
          },
          {
            title: "DNS Management",
            description:
              "Advanced DNS management with global CDN. Fast propagation, DDoS protection, and easy-to-use control panel.",
            icon: "🔧",
            href: "/services/domain-hosting/dns-management",
          },
          {
            title: "Domain Transfer",
            description:
              "Seamlessly transfer your existing domains to us. Free transfer assistance, no downtime, and extended registration included.",
            icon: "🔄",
            href: "/services/domain-hosting/domain-transfer",
          },
        ]}
        process={[
          {
            number: "01",
            title: "Consultation",
            description: "We analyze your hosting needs and recommend the best solution for your business.",
          },
          {
            number: "02",
            title: "Setup",
            description: "We configure your domain, hosting, and email with optimal settings.",
          },
          {
            number: "03",
            title: "Migration",
            description: "Seamless migration of your existing website and emails with zero downtime.",
          },
          {
            number: "04",
            title: "Support",
            description: "24/7 technical support and monitoring to keep your services running smoothly.",
          },
        ]}
        benefits={[
          "99.9% uptime guarantee",
          "24/7 technical support",
          "Free SSL certificates",
          "Daily automated backups",
          "One-click WordPress install",
          "cPanel/Plesk control panel",
        ]}
        relatedServices={[
          { title: "Web Development", href: "/services/web-development" },
          { title: "Digital Marketing", href: "/services/digital-marketing" },
          { title: "Custom Software", href: "/services/custom-software" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
