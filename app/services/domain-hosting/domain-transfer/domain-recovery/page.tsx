import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { RefreshCw } from "lucide-react"

export const metadata = {
  title: "Domain Recovery Services | Creative Fusion",
  description: "Recover expired, stolen, or lost domains with expert domain recovery services.",
}

export default function DomainRecoveryPage() {
  return (
    <CategoryPageTemplate
      title="Domain Recovery"
      subtitle="Recover expired or lost domains"
      description="Lost access to your domain? Whether expired, stolen, or locked by a previous provider, our domain recovery experts help you regain control of your valuable domain assets."
      heroIcon={<RefreshCw className="h-8 w-8" />}
      brandColor="purple"
      parentService={{ name: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Expired Domain Recovery", description: "Recover from redemption period" },
        { title: "Stolen Domain Help", description: "UDRP and legal assistance" },
        { title: "Locked Domain Access", description: "Regain access from old providers" },
        { title: "Legal Support", description: "Documentation for disputes" },
        { title: "Negotiation", description: "Negotiate with current holders" },
        { title: "Prevention", description: "Setup to prevent future loss" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Analyze domain situation" },
        { step: 2, title: "Strategy", description: "Determine recovery approach" },
        { step: 3, title: "Action", description: "Execute recovery plan" },
        { step: 4, title: "Negotiation", description: "Handle communications/legal" },
        { step: 5, title: "Recovery", description: "Regain domain control" },
        { step: 6, title: "Protection", description: "Implement safeguards" },
      ]}
      pricing={[
        {
          name: "Expired Recovery",
          price: "AED 299+",
          features: ["Redemption period recovery", "Registrar communication", "Rush processing", "Renewal included"],
        },
        {
          name: "Access Recovery",
          price: "AED 499+",
          features: ["Account access issues", "Provider negotiation", "Documentation help", "Transfer assistance"],
          isPopular: true,
        },
        {
          name: "Dispute Resolution",
          price: "Custom",
          features: ["UDRP filing", "Legal documentation", "Trademark cases", "Expert consultation"],
        },
      ]}
      faqs={[
        {
          question: "Can you recover any expired domain?",
          answer:
            "If still in redemption period (30-45 days after expiry), usually yes with registrar fees. After that, it may go to auction.",
        },
        {
          question: "My domain was stolen, can you help?",
          answer:
            "Yes, we assist with ICANN complaints, UDRP filings, and coordination with registrars to recover hijacked domains.",
        },
        {
          question: "I lost access to my registrar account",
          answer: "We help navigate identity verification processes with registrars to regain account access.",
        },
      ]}
      relatedCategories={[
        { name: "Single Transfer", href: "/services/domain-hosting/domain-transfer/single-transfer" },
        { name: "DNS Security", href: "/services/domain-hosting/dns-management/dns-security" },
        { name: "Domain Registration", href: "/services/domain-hosting/domain-registration" },
      ]}
    />
  )
}
