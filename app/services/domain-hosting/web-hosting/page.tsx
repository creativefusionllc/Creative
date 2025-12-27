import type { Metadata } from "next"
import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"

export const metadata: Metadata = {
  title: "Web Hosting Dubai | Shared, VPS, Dedicated Servers | Creative Fusion LLC",
  description:
    "Fast, reliable web hosting in Dubai UAE. Shared hosting, VPS, and dedicated servers with 99.9% uptime guarantee and 24/7 support.",
  keywords: ["web hosting dubai", "vps hosting uae", "dedicated server dubai", "shared hosting"],
}

export default function WebHostingPage() {
  return (
    <SubServicePageTemplate
      parentService={{ title: "Domain & Hosting Services", href: "/services/domain-hosting" }}
      title="Web Hosting"
      subtitle="Lightning-Fast & Reliable"
      description="Enterprise-grade hosting solutions with SSD storage, 99.9% uptime guarantee, and automatic backups. From shared hosting to dedicated servers, we have the perfect solution for your business."
      heroImage="/images/creative-team-brainstorming.jpg"
      features={[
        {
          title: "Shared Hosting",
          description: "Affordable hosting for small websites and blogs",
          href: "/services/domain-hosting/web-hosting/shared-hosting",
        },
        {
          title: "VPS Hosting",
          description: "Virtual private servers with dedicated resources",
          href: "/services/domain-hosting/web-hosting/vps-hosting",
        },
        {
          title: "Dedicated Servers",
          description: "Full server power for high-traffic websites",
          href: "/services/domain-hosting/web-hosting/dedicated-server",
        },
        {
          title: "WordPress Hosting",
          description: "Optimized hosting for WordPress websites",
          href: "/services/domain-hosting/web-hosting/wordpress-hosting",
        },
        {
          title: "Cloud Hosting",
          description: "Scalable cloud infrastructure on demand",
          href: "/services/domain-hosting/web-hosting/cloud-hosting",
        },
        {
          title: "E-Commerce Hosting",
          description: "High-performance hosting for online stores",
          href: "/services/domain-hosting/web-hosting/ecommerce-hosting",
        },
      ]}
      pricingTiers={[
        {
          name: "Starter",
          price: "AED 99/mo",
          description: "Perfect for small websites",
          features: ["10GB SSD storage", "Unlimited bandwidth", "Free SSL", "Daily backups", "cPanel access"],
        },
        {
          name: "Business",
          price: "AED 299/mo",
          description: "Growing businesses",
          features: ["50GB SSD storage", "Unlimited bandwidth", "Free SSL", "Staging environment", "Priority support"],
          popular: true,
        },
        {
          name: "Enterprise",
          price: "AED 799/mo",
          description: "High-traffic sites",
          features: ["Unlimited SSD", "Dedicated resources", "Advanced security", "Load balancing", "24/7 monitoring"],
        },
      ]}
      relatedSubServices={[
        { title: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" },
        { title: "Email Hosting", href: "/services/domain-hosting/email-hosting" },
      ]}
    />
  )
}
