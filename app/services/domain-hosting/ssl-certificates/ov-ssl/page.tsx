import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Building } from "lucide-react"

export const metadata = {
  title: "OV SSL Certificates | Creative Fusion",
  description: "Organization Validated SSL certificates with business verification for enhanced trust.",
}

export default function OVSSLPage() {
  return (
    <CategoryPageTemplate
      title="OV SSL Certificates"
      subtitle="Organization validation for business credibility"
      description="Organization Validated (OV) SSL certificates verify your business identity along with domain ownership. Display your company name in certificate details for enhanced customer trust."
      heroIcon={<Building className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Business Verification", description: "Organization name in certificate" },
        { title: "Enhanced Trust", description: "Customers can verify your business" },
        { title: "Higher Warranty", description: "Up to $1.25M warranty coverage" },
        { title: "256-bit Encryption", description: "Same strong encryption as EV" },
        { title: "Browser Trust", description: "Trusted by all major browsers" },
        { title: "1-3 Day Issuance", description: "Quick business verification" },
      ]}
      process={[
        { step: 1, title: "Application", description: "Submit business details and documents" },
        { step: 2, title: "Domain Verification", description: "Verify domain ownership" },
        { step: 3, title: "Business Verification", description: "CA verifies organization details" },
        { step: 4, title: "Phone Verification", description: "Callback to verify business" },
        { step: 5, title: "Certificate Issued", description: "OV SSL ready for installation" },
      ]}
      pricing={[
        {
          name: "Standard OV",
          price: "AED 399/year",
          features: ["Single domain", "1-3 day issuance", "$250K warranty", "Organization name in cert"],
        },
        {
          name: "Wildcard OV",
          price: "AED 899/year",
          features: ["Unlimited subdomains", "*.domain.com", "$500K warranty", "Business verified"],
          isPopular: true,
        },
        {
          name: "Multi-Domain OV",
          price: "AED 599/year",
          features: ["Up to 5 domains", "Add more at AED 100/each", "$250K warranty", "Single certificate"],
        },
      ]}
      faqs={[
        {
          question: "What documents are needed?",
          answer:
            "Business registration, government ID of authorized contact, and phone verification. We guide you through the process.",
        },
        {
          question: "Why choose OV over DV?",
          answer:
            "OV shows your verified business name in the certificate, building trust. Required for many business compliance requirements.",
        },
        {
          question: "How long for issuance?",
          answer: "Typically 1-3 business days after submitting correct documentation. We expedite the process.",
        },
      ]}
      relatedCategories={[
        { name: "DV SSL", href: "/services/domain-hosting/ssl-certificates/dv-ssl" },
        { name: "EV SSL", href: "/services/domain-hosting/ssl-certificates/ev-ssl" },
        { name: "Wildcard SSL", href: "/services/domain-hosting/ssl-certificates/wildcard-ssl" },
      ]}
    />
  )
}
