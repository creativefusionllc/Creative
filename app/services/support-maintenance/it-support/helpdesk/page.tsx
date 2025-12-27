import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "IT Helpdesk | Support & Maintenance | Creative Fusion",
  description: "Professional IT helpdesk support services in Dubai & UAE.",
}

export default function HelpdeskPage() {
  return (
    <CategoryPageTemplate
      serviceName="Support & Maintenance"
      serviceSlug="support-maintenance"
      subServiceName="IT Support"
      subServiceSlug="it-support"
      categoryName="IT Helpdesk"
      categorySlug="helpdesk"
      description="Professional IT helpdesk support providing first-line technical assistance for your team."
      features={[
        "24/7 availability",
        "Ticket management",
        "Phone support",
        "Email support",
        "Chat support",
        "Knowledge base",
      ]}
      benefits={["Quick resolution", "Reduced downtime", "Expert assistance", "Cost savings", "Employee productivity"]}
      processSteps={[
        "Ticket submission",
        "Issue triage",
        "First response",
        "Troubleshooting",
        "Resolution",
        "Follow-up",
      ]}
      brandColor="slate"
    />
  )
}
