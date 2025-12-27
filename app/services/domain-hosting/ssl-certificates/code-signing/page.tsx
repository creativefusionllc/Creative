import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { FileCode } from "lucide-react"

export const metadata = {
  title: "Code Signing Certificates | Creative Fusion",
  description: "Sign software and applications to establish trust and eliminate security warnings.",
}

export default function CodeSigningPage() {
  return (
    <CategoryPageTemplate
      title="Code Signing"
      subtitle="Sign software to establish publisher trust"
      description="Code Signing certificates authenticate your software identity and ensure code integrity. Eliminate 'Unknown Publisher' warnings and build trust with users downloading your applications."
      heroIcon={<FileCode className="h-8 w-8" />}
      brandColor="green"
      parentService={{ name: "SSL Certificates", href: "/services/domain-hosting/ssl-certificates" }}
      grandparentService={{ name: "Domain & Hosting", href: "/services/domain-hosting" }}
      benefits={[
        { title: "Publisher Identity", description: "Your company name on downloads" },
        { title: "No Warnings", description: "Eliminate 'Unknown Publisher' alerts" },
        { title: "Code Integrity", description: "Detect if code was tampered" },
        { title: "User Trust", description: "Users confident to install" },
        { title: "Platform Support", description: "Windows, Mac, Java, Adobe, Android" },
        { title: "Timestamp", description: "Signatures valid after cert expires" },
      ]}
      process={[
        { step: 1, title: "Application", description: "Submit business verification documents" },
        { step: 2, title: "Verification", description: "CA verifies organization identity" },
        { step: 3, title: "Certificate Issued", description: "Code signing certificate delivered" },
        { step: 4, title: "Sign Code", description: "Use signtool or platform tools to sign" },
        { step: 5, title: "Timestamp", description: "Apply timestamp for long-term validity" },
      ]}
      pricing={[
        {
          name: "Standard OV",
          price: "AED 999/year",
          features: ["Organization validated", "All platforms", "Unlimited signatures", "1-3 day issuance"],
        },
        {
          name: "EV Code Signing",
          price: "AED 1,999/year",
          features: ["Extended validation", "Hardware token", "SmartScreen reputation", "Microsoft trusted"],
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "AED 3,499/year",
          features: ["EV with HSM support", "CI/CD integration", "Multiple developers", "Priority support"],
        },
      ]}
      faqs={[
        {
          question: "OV vs EV Code Signing?",
          answer:
            "EV requires hardware token and provides instant Microsoft SmartScreen reputation. OV works but may show warnings until reputation builds.",
        },
        {
          question: "What can I sign?",
          answer:
            "Windows .exe, .dll, .msi, Mac apps, Java JAR, Adobe AIR, Android APK, PowerShell scripts, Office macros, and more.",
        },
        {
          question: "Why timestamp?",
          answer:
            "Timestamping ensures your signatures remain valid even after the certificate expires. Always timestamp your signatures.",
        },
      ]}
      relatedCategories={[
        { name: "EV SSL", href: "/services/domain-hosting/ssl-certificates/ev-ssl" },
        { name: "OV SSL", href: "/services/domain-hosting/ssl-certificates/ov-ssl" },
        { name: "Email Security", href: "/services/domain-hosting/email-hosting/email-security" },
      ]}
    />
  )
}
