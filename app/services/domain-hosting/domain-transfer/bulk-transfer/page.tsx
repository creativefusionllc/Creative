import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Layers } from "lucide-react"

export const metadata = {
  title: "Bulk Domain Transfer | Creative Fusion",
  description: "Transfer multiple domains at once with volume discounts and dedicated support.",
}

export default function BulkTransferPage() {
  return (
    <CategoryPageTemplate
      title="Bulk Domain Transfer"
      subtitle="Transfer multiple domains with volume discounts"
      description="Transfer 10+ domains at once with our bulk transfer service. Get volume discounts, dedicated support, and streamlined processing for your entire domain portfolio."
      heroIcon={<Layers className="h-8 w-8" />}
      brandColor="purple"
      parentService={{ name: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Volume Discounts", description: "Up to 30% off bulk transfers" },
        { title: "Dedicated Manager", description: "Single point of contact" },
        { title: "Batch Processing", description: "Efficient bulk handling" },
        { title: "Progress Tracking", description: "Real-time transfer status" },
        { title: "Consolidated Billing", description: "Single invoice for all domains" },
        { title: "Priority Support", description: "Fast issue resolution" },
      ]}
      process={[
        { step: 1, title: "Submit List", description: "Provide list of domains to transfer" },
        { step: 2, title: "Quote", description: "We provide volume pricing" },
        { step: 3, title: "Preparation", description: "Unlock and get auth codes" },
        { step: 4, title: "Batch Transfer", description: "We initiate all transfers" },
        { step: 5, title: "Monitoring", description: "Track progress in dashboard" },
        { step: 6, title: "Completion", description: "All domains transferred" },
      ]}
      pricing={[
        {
          name: "10-49 Domains",
          price: "10% Off",
          features: ["Volume discount", "Batch processing", "Email support", "Progress reports"],
        },
        {
          name: "50-199 Domains",
          price: "20% Off",
          features: ["Higher discount", "Dedicated manager", "Priority support", "Custom timeline"],
          isPopular: true,
        },
        {
          name: "200+ Domains",
          price: "30% Off",
          features: ["Maximum discount", "Account manager", "24/7 support", "Custom SLA"],
        },
      ]}
      faqs={[
        {
          question: "What's the minimum for bulk pricing?",
          answer: "Bulk pricing starts at 10 domains. The more domains, the higher the discount.",
        },
        {
          question: "Can I transfer different TLDs?",
          answer:
            "Yes, bulk transfer works for any mix of TLDs. We quote based on individual TLD pricing with volume discount applied.",
        },
        {
          question: "How do I provide auth codes?",
          answer: "Upload a CSV/spreadsheet with domains and auth codes, or we can guide you through getting them.",
        },
      ]}
      relatedCategories={[
        { name: "Single Transfer", href: "/services/domain-hosting/domain-transfer/single-transfer" },
        { name: "Bulk Registration", href: "/services/domain-hosting/domain-registration/bulk-registration" },
        { name: "DNS Management", href: "/services/domain-hosting/dns-management" },
      ]}
    />
  )
}
