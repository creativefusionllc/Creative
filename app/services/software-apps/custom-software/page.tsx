import { SubServicePageTemplate } from "@/components/services/sub-service-page-template"
import { Code } from "lucide-react"

export const metadata = {
  title: "Custom Software Development | Creative Fusion",
  description: "Bespoke software solutions tailored to your unique business requirements.",
}

export default function CustomSoftwarePage() {
  return (
    <SubServicePageTemplate
      title="Custom Software Development"
      subtitle="Bespoke solutions for your unique needs"
      description="We build custom software applications tailored specifically to your business processes, workflows, and requirements. From desktop applications to enterprise systems."
      heroIcon={<Code className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      features={[
        {
          title: "Desktop Applications",
          description: "Windows, Mac, Linux apps",
          href: "/services/software-apps/custom-software/desktop-apps",
        },
        {
          title: "Enterprise Software",
          description: "Large-scale business systems",
          href: "/services/software-apps/custom-software/enterprise-software",
        },
        {
          title: "Business Automation",
          description: "Workflow automation tools",
          href: "/services/software-apps/custom-software/automation",
        },
        {
          title: "System Integration",
          description: "Connect existing systems",
          href: "/services/software-apps/custom-software/integrations",
        },
        {
          title: "Legacy Modernization",
          description: "Update old systems",
          href: "/services/software-apps/custom-software/legacy-modernization",
        },
        {
          title: "API Development",
          description: "Custom APIs and microservices",
          href: "/services/software-apps/custom-software/api-development",
        },
      ]}
      pricingTiers={[
        {
          name: "Starter Project",
          price: "From AED 25,000",
          features: ["Simple application", "Basic features", "3-month development", "1 year support"],
        },
        {
          name: "Business Solution",
          price: "From AED 75,000",
          features: ["Complex application", "Multiple modules", "6-month development", "2 year support"],
          isPopular: true,
        },
        {
          name: "Enterprise System",
          price: "Custom",
          features: ["Full enterprise solution", "Unlimited modules", "Dedicated team", "Ongoing partnership"],
        },
      ]}
      faqs={[
        {
          question: "How long does custom software take?",
          answer: "Depending on complexity, typically 3-12 months from planning to launch.",
        },
        {
          question: "Do you provide source code?",
          answer: "Yes, you own all source code and intellectual property we create for you.",
        },
        {
          question: "What technologies do you use?",
          answer: "We use modern stacks including .NET, Java, Python, Node.js based on project needs.",
        },
      ]}
    />
  )
}
