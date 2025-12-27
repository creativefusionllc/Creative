import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Layers } from "lucide-react"

export const metadata = {
  title: "Wildcard SSL Certificates | Creative Fusion",
  description: "Secure unlimited subdomains with a single Wildcard SSL certificate.",
}

export default function WildcardSSLPage() {
  return (
    <CategoryPageTemplate
      title="Wildcard SSL"
      subtitle="One certificate for unlimited subdomains"
      description="Wildcard SSL certificates secure your main domain and unlimited subdomains with a single certificate. Perfect for businesses with multiple subdomains like blog, shop, app, mail, etc."
      heroIcon={<Layers className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Unlimited Subdomains", description: "*.yourdomain.com coverage" },
        { title: "Single Certificate", description: "One cert to manage and renew" },
        { title: "Cost Effective", description: "Cheaper than multiple single certs" },
        { title: "Easy Management", description: "Single expiry date to track" },
        { title: "Add Subdomains Anytime", description: "New subdomains auto-covered" },
        { title: "Same Encryption", description: "Full 256-bit encryption" },
      ]}
      process={[
        { step: 1, title: "Choose Type", description: "DV Wildcard or OV Wildcard" },
        { step: 2, title: "Generate CSR", description: "CSR with *.domain.com" },
        { step: 3, title: "Validation", description: "Domain (DV) or business (OV) verification" },
        { step: 4, title: "Certificate Issued", description: "Wildcard SSL ready" },
        { step: 5, title: "Install Everywhere", description: "Use same cert on all subdomains" },
      ]}
      pricing={[
        {
          name: "DV Wildcard",
          price: "AED 299/year",
          features: ["Unlimited subdomains", "5-minute issuance", "$50K warranty", "Domain validation only"],
        },
        {
          name: "OV Wildcard",
          price: "AED 899/year",
          features: ["Unlimited subdomains", "Business verified", "$500K warranty", "1-3 day issuance"],
          isPopular: true,
        },
        {
          name: "Multi-Domain Wildcard",
          price: "AED 1,499/year",
          features: ["Multiple *.domains", "Up to 5 wildcards", "$750K warranty", "Ultimate flexibility"],
        },
      ]}
      faqs={[
        {
          question: "What subdomains are covered?",
          answer:
            "All first-level subdomains: blog.site.com, shop.site.com, app.site.com. Does NOT cover sub.sub.site.com (need separate wildcard).",
        },
        {
          question: "Can I use on multiple servers?",
          answer: "Yes, you can install the same wildcard certificate on unlimited servers for different subdomains.",
        },
        {
          question: "Wildcard vs Multi-Domain?",
          answer:
            "Wildcard: unlimited subdomains of ONE domain. Multi-Domain: multiple different domains. Choose based on your setup.",
        },
      ]}
      relatedCategories={[
        { name: "DV SSL", href: "/services/domain-hosting/ssl-certificates/dv-ssl" },
        { name: "OV SSL", href: "/services/domain-hosting/ssl-certificates/ov-ssl" },
        { name: "Multi-Domain SSL", href: "/services/domain-hosting/ssl-certificates/multi-domain-ssl" },
      ]}
    />
  )
}
