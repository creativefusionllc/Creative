import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { ArrowRightLeft } from "lucide-react"

export const metadata = {
  title: "DNS Migration Services | Creative Fusion",
  description: "Seamless DNS migration between providers with zero downtime.",
}

export default function DNSMigrationPage() {
  return (
    <CategoryPageTemplate
      title="DNS Migration"
      subtitle="Zero-downtime DNS provider migration"
      description="Migrate your DNS from any provider to another with zero downtime. We handle the complete migration process including record transfer, verification, and cutover."
      heroIcon={<ArrowRightLeft className="h-8 w-8" />}
      brandColor="blue"
      parentService={{ name: "DNS Management", href: "/services/domain-hosting/dns-management" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Zero Downtime", description: "Seamless cutover with no disruption" },
        { title: "Complete Transfer", description: "All records migrated accurately" },
        { title: "Pre-Migration Testing", description: "Verify before switching" },
        { title: "Rollback Plan", description: "Quick rollback if needed" },
        { title: "Any Provider", description: "From/to any DNS provider" },
        { title: "Documentation", description: "Before/after DNS documentation" },
      ]}
      process={[
        { step: 1, title: "Export", description: "Export all DNS records from current provider" },
        { step: 2, title: "Setup", description: "Configure records at new provider" },
        { step: 3, title: "Verification", description: "Test new DNS before cutover" },
        { step: 4, title: "NS Update", description: "Update nameservers at registrar" },
        { step: 5, title: "Monitoring", description: "Monitor propagation and services" },
        { step: 6, title: "Cleanup", description: "Remove old DNS after confirmation" },
      ]}
      pricing={[
        {
          name: "Single Domain",
          price: "AED 149",
          features: ["One domain migration", "All record types", "Standard support", "Documentation"],
        },
        {
          name: "Multi-Domain",
          price: "AED 399",
          features: ["Up to 10 domains", "Priority migration", "24/7 support", "Rollback included"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 999",
          features: ["Unlimited domains", "Complex setups", "Dedicated manager", "SLA guarantee"],
        },
      ]}
      faqs={[
        {
          question: "How long does migration take?",
          answer:
            "Setup takes 1-2 hours. NS propagation takes up to 48 hours, but we pre-configure to minimize any impact.",
        },
        {
          question: "Will my email stop working?",
          answer: "No, we ensure MX records are identical before cutover. Email continues without interruption.",
        },
        {
          question: "What if something goes wrong?",
          answer: "We maintain rollback capability for 48 hours. Simply revert NS changes and old DNS resumes.",
        },
      ]}
      relatedCategories={[
        { name: "DNS Setup", href: "/services/domain-hosting/dns-management/dns-setup" },
        { name: "DNS Security", href: "/services/domain-hosting/dns-management/dns-security" },
        { name: "Domain Transfer", href: "/services/domain-hosting/domain-transfer" },
      ]}
    />
  )
}
