import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Building } from "lucide-react"

export const metadata = {
  title: "Registrar Change Services | Creative Fusion",
  description: "Change domain registrar with expert guidance and zero downtime.",
}

export default function RegistrarChangePage() {
  return (
    <CategoryPageTemplate
      title="Registrar Change"
      subtitle="Expert assistance changing registrars"
      description="Need to move domains from one registrar to another? We handle the complete process including unlocking, auth codes, transfer initiation, and verification with zero downtime."
      heroIcon={<Building className="h-8 w-8" />}
      brandColor="purple"
      parentService={{ name: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Full Service", description: "We handle everything" },
        { title: "Any Registrar", description: "From/to any registrar worldwide" },
        { title: "Zero Downtime", description: "No impact on website/email" },
        { title: "DNS Migration", description: "Optional DNS transfer included" },
        { title: "Documentation", description: "Complete process documentation" },
        { title: "Troubleshooting", description: "Resolve any transfer issues" },
      ]}
      process={[
        { step: 1, title: "Assessment", description: "Review current registrar setup" },
        { step: 2, title: "Preparation", description: "Unlock, disable privacy, get auth" },
        { step: 3, title: "Initiate", description: "Start transfer at new registrar" },
        { step: 4, title: "Approve", description: "Handle approval emails" },
        { step: 5, title: "Verify", description: "Confirm transfer completion" },
        { step: 6, title: "Configure", description: "Set up at new registrar" },
      ]}
      pricing={[
        {
          name: "Assisted Transfer",
          price: "AED 99",
          features: ["Guidance & support", "You execute steps", "Email support", "Single domain"],
        },
        {
          name: "Managed Transfer",
          price: "AED 199",
          features: ["We do everything", "Full service", "Priority support", "Up to 5 domains"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          features: ["Large portfolios", "Complex setups", "Dedicated manager", "Custom timeline"],
        },
      ]}
      faqs={[
        {
          question: "Why change registrars?",
          answer:
            "Better pricing, superior support, additional features, consolidation, or escaping a problematic registrar.",
        },
        {
          question: "Do I need my current registrar's help?",
          answer: "Minimally - just to unlock the domain. We handle communication if there are issues.",
        },
        {
          question: "What about domains with privacy?",
          answer: "Privacy must be temporarily disabled for transfer (WHOIS email verification). We re-enable after.",
        },
      ]}
      relatedCategories={[
        { name: "Single Transfer", href: "/services/domain-hosting/domain-transfer/single-transfer" },
        { name: "Bulk Transfer", href: "/services/domain-hosting/domain-transfer/bulk-transfer" },
        { name: "Domain Recovery", href: "/services/domain-hosting/domain-transfer/domain-recovery" },
      ]}
    />
  )
}
