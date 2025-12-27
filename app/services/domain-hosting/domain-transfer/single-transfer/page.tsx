import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { ArrowRightLeft } from "lucide-react"

export const metadata = {
  title: "Single Domain Transfer | Creative Fusion",
  description: "Transfer your domain to us with free 1-year extension and expert support.",
}

export default function SingleTransferPage() {
  return (
    <CategoryPageTemplate
      title="Single Domain Transfer"
      subtitle="Transfer your domain with free extension"
      description="Transfer your domain to our management with full support. Get a free 1-year extension, maintain all DNS settings, and benefit from our expert domain management services."
      heroIcon={<ArrowRightLeft className="h-8 w-8" />}
      brandColor="purple"
      parentService={{ name: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Free 1-Year Extension", description: "Transfer price includes +1 year" },
        { title: "Keep DNS Settings", description: "All records transferred intact" },
        { title: "No Downtime", description: "Seamless transfer process" },
        { title: "Expert Support", description: "We handle everything" },
        { title: "WHOIS Privacy", description: "Free privacy protection" },
        { title: "Premium DNS", description: "Fast, reliable DNS included" },
      ]}
      process={[
        { step: 1, title: "Unlock Domain", description: "Unlock at current registrar" },
        { step: 2, title: "Get Auth Code", description: "Request EPP/auth code" },
        { step: 3, title: "Initiate Transfer", description: "We start the transfer" },
        { step: 4, title: "Approve Transfer", description: "Confirm via email" },
        { step: 5, title: "Complete", description: "Domain transferred in 5-7 days" },
      ]}
      pricing={[
        {
          name: ".com Transfer",
          price: "AED 55",
          features: ["+1 year free", "WHOIS privacy", "DNS management", "Email support"],
        },
        {
          name: ".ae Transfer",
          price: "AED 199",
          features: ["+1 year free", "UAE registrar", "Full support", "Priority handling"],
          isPopular: true,
        },
        {
          name: "Other TLDs",
          price: "From AED 45",
          features: ["Price varies by TLD", "+1 year included", "Full support", "Contact for quote"],
        },
      ]}
      faqs={[
        {
          question: "How long does transfer take?",
          answer: "Most transfers complete in 5-7 days. Some TLDs are faster. We expedite where possible.",
        },
        {
          question: "Will my website go down?",
          answer: "No, DNS continues working during transfer. We ensure zero downtime.",
        },
        {
          question: "Can I transfer a recently registered domain?",
          answer:
            "Domains must be at least 60 days old to transfer (ICANN rule). Also cannot transfer within 60 days of expiry.",
        },
      ]}
      relatedCategories={[
        { name: "Bulk Transfer", href: "/services/domain-hosting/domain-transfer/bulk-transfer" },
        { name: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
        { name: "DNS Management", href: "/services/domain-hosting/dns-management" },
      ]}
    />
  )
}
