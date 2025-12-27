import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Globe } from "lucide-react"

export const metadata = {
  title: "Multi-Domain SSL Certificates | Creative Fusion",
  description: "Secure multiple domains with a single SAN/UCC SSL certificate.",
}

export default function MultiDomainSSLPage() {
  return (
    <CategoryPageTemplate
      title="Multi-Domain SSL"
      subtitle="One certificate for multiple domains"
      description="Multi-Domain (SAN/UCC) SSL certificates secure multiple different domains with a single certificate. Ideal for businesses with multiple brands, domains, or Microsoft Exchange servers."
      heroIcon={<Globe className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Multiple Domains", description: "Secure 3-250 domains with one cert" },
        { title: "Mix & Match", description: "Different TLDs: .com, .ae, .net" },
        { title: "Single Management", description: "One certificate to renew" },
        { title: "Exchange Compatible", description: "Perfect for Microsoft Exchange/OWA" },
        { title: "Add Domains Anytime", description: "Reissue to add more domains" },
        { title: "Cost Savings", description: "Cheaper than individual certificates" },
      ]}
      process={[
        { step: 1, title: "List Domains", description: "Provide all domains to secure" },
        { step: 2, title: "Generate CSR", description: "Primary domain in CSR, others as SAN" },
        { step: 3, title: "Validation", description: "Verify each domain ownership" },
        { step: 4, title: "Certificate Issued", description: "Multi-domain SSL ready" },
        { step: 5, title: "Installation", description: "Install once, covers all domains" },
      ]}
      pricing={[
        {
          name: "DV Multi-Domain",
          price: "AED 199/year",
          features: ["3 domains included", "Add more at AED 50/each", "$10K warranty", "Quick issuance"],
        },
        {
          name: "OV Multi-Domain",
          price: "AED 599/year",
          features: ["5 domains included", "Add more at AED 100/each", "$250K warranty", "Business verified"],
          isPopular: true,
        },
        {
          name: "EV Multi-Domain",
          price: "AED 1,299/year",
          features: ["5 domains included", "Green bar all domains", "$1.5M warranty", "Maximum trust"],
        },
      ]}
      faqs={[
        {
          question: "SAN vs UCC - what's the difference?",
          answer:
            "Same thing! SAN (Subject Alternative Names) is the technical term. UCC (Unified Communications Certificate) is Microsoft's marketing name.",
        },
        {
          question: "Can I add domains later?",
          answer:
            "Yes, reissue the certificate with additional domains. Some CAs charge per additional domain, others have packages.",
        },
        {
          question: "Multi-Domain vs Wildcard?",
          answer:
            "Multi-Domain: multiple different domains (brand1.com, brand2.ae). Wildcard: unlimited subdomains of ONE domain.",
        },
      ]}
      relatedCategories={[
        { name: "DV SSL", href: "/services/domain-hosting/ssl-certificates/dv-ssl" },
        { name: "Wildcard SSL", href: "/services/domain-hosting/ssl-certificates/wildcard-ssl" },
        { name: "EV SSL", href: "/services/domain-hosting/ssl-certificates/ev-ssl" },
      ]}
    />
  )
}
