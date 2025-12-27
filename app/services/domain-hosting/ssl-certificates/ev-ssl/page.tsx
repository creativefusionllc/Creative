import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Award } from "lucide-react"

export const metadata = {
  title: "EV SSL Certificates | Creative Fusion",
  description: "Extended Validation SSL certificates with highest trust level and green address bar.",
}

export default function EVSSLPage() {
  return (
    <CategoryPageTemplate
      title="EV SSL Certificates"
      subtitle="Maximum trust with extended validation"
      description="Extended Validation (EV) SSL certificates provide the highest level of trust with rigorous business verification. Display your company name prominently in the browser for maximum customer confidence."
      heroIcon={<Award className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Green Address Bar", description: "Company name displayed in browser" },
        { title: "Highest Trust", description: "Most rigorous validation process" },
        { title: "Maximum Warranty", description: "Up to $2M warranty coverage" },
        { title: "Anti-Phishing", description: "Extremely difficult to fake" },
        { title: "Conversion Boost", description: "Proven to increase conversions" },
        { title: "Brand Protection", description: "Only verified businesses get EV" },
      ]}
      process={[
        { step: 1, title: "Application", description: "Submit comprehensive business documents" },
        { step: 2, title: "Domain Verification", description: "Verify domain ownership" },
        { step: 3, title: "Business Verification", description: "Verify legal, physical, operational existence" },
        { step: 4, title: "Phone Verification", description: "Callback using verified phone number" },
        { step: 5, title: "Final Review", description: "CA compliance team review" },
        { step: 6, title: "Certificate Issued", description: "EV SSL with green bar ready" },
      ]}
      pricing={[
        {
          name: "Single Domain EV",
          price: "AED 799/year",
          features: ["One domain", "Green bar display", "$1M warranty", "1-2 week issuance"],
        },
        {
          name: "Multi-Domain EV",
          price: "AED 1,299/year",
          features: ["Up to 5 domains", "Green bar all domains", "$1.5M warranty", "Single certificate"],
          isPopular: true,
        },
        {
          name: "Enterprise EV",
          price: "AED 1,999/year",
          features: ["Up to 10 domains", "Priority processing", "$2M warranty", "Dedicated support"],
        },
      ]}
      faqs={[
        {
          question: "Why is EV SSL more expensive?",
          answer:
            "EV requires extensive manual verification of your business by the CA, taking 1-2 weeks. This ensures maximum trust.",
        },
        {
          question: "Who needs EV SSL?",
          answer:
            "Banks, e-commerce, healthcare, financial services, and any business where customer trust is paramount.",
        },
        {
          question: "Is the green bar still visible?",
          answer:
            "Modern browsers show your company name when clicking the padlock. Some browsers still show green indicators for EV.",
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
