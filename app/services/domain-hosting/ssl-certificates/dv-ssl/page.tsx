import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Shield } from "lucide-react"

export const metadata = {
  title: "DV SSL Certificates | Creative Fusion",
  description: "Domain Validated SSL certificates for quick, affordable website encryption.",
}

export default function DVSSLPage() {
  return (
    <CategoryPageTemplate
      title="DV SSL Certificates"
      subtitle="Quick domain validation for basic encryption"
      description="Domain Validated (DV) SSL certificates provide essential encryption for your website. Issued within minutes after domain verification, perfect for blogs, personal sites, and small businesses."
      heroIcon={<Shield className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Quick Issuance", description: "SSL issued within 5-10 minutes" },
        { title: "Domain Validation Only", description: "Simple domain ownership verification" },
        { title: "Browser Trust", description: "Padlock icon in all browsers" },
        { title: "256-bit Encryption", description: "Industry-standard encryption" },
        { title: "Affordable", description: "Most cost-effective SSL option" },
        { title: "Auto-Renewal", description: "Never worry about expiration" },
      ]}
      process={[
        { step: 1, title: "Purchase", description: "Select DV SSL certificate" },
        { step: 2, title: "Generate CSR", description: "Create certificate signing request" },
        { step: 3, title: "Domain Verification", description: "Verify via email, DNS, or file" },
        { step: 4, title: "Certificate Issued", description: "Download SSL certificate" },
        { step: 5, title: "Installation", description: "Install on your server" },
      ]}
      pricing={[
        {
          name: "Standard DV",
          price: "AED 99/year",
          features: ["Single domain", "5-minute issuance", "$10K warranty", "Unlimited reissues"],
        },
        {
          name: "Wildcard DV",
          price: "AED 299/year",
          features: ["Unlimited subdomains", "*.domain.com coverage", "$50K warranty", "Unlimited reissues"],
          isPopular: true,
        },
        {
          name: "Multi-Domain DV",
          price: "AED 199/year",
          features: ["Up to 5 domains", "Add more at AED 50/each", "$10K warranty", "Single certificate"],
        },
      ]}
      faqs={[
        {
          question: "What's the difference between DV, OV, and EV?",
          answer:
            "DV validates domain only (quickest). OV validates organization (1-3 days). EV validates organization extensively (green bar, 1-2 weeks).",
        },
        {
          question: "Is DV SSL secure enough?",
          answer:
            "Yes, DV provides the same encryption as OV/EV. The difference is validation level, not security. Perfect for most websites.",
        },
        {
          question: "Do I need Wildcard?",
          answer:
            "Wildcard covers unlimited subdomains (blog.site.com, shop.site.com). Get it if you have multiple subdomains.",
        },
      ]}
      relatedCategories={[
        { name: "OV SSL", href: "/services/domain-hosting/ssl-certificates/ov-ssl" },
        { name: "EV SSL", href: "/services/domain-hosting/ssl-certificates/ev-ssl" },
        { name: "Wildcard SSL", href: "/services/domain-hosting/ssl-certificates/wildcard-ssl" },
      ]}
    />
  )
}
