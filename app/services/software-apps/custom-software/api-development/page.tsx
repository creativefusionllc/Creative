import { CategoryPageTemplate } from "@/components/services/category-page-template"
import { Webhook } from "lucide-react"

export const metadata = {
  title: "API Development Services | Creative Fusion",
  description: "Custom REST and GraphQL API development for seamless integrations.",
}

export default function APIDevelopmentPage() {
  return (
    <CategoryPageTemplate
      title="API Development"
      subtitle="Custom APIs & microservices"
      description="Build robust, scalable APIs that power your applications and enable integrations. We develop RESTful APIs, GraphQL endpoints, and microservices architectures."
      heroIcon={<Webhook className="h-8 w-8" />}
      brandColor="indigo"
      parentService={{ name: "Custom Software", href: "/services/software-apps/custom-software" }}
      grandparentService={{ name: "Software & Apps", href: "/services/software-apps" }}
      benefits={[
        { title: "RESTful Design", description: "Industry-standard APIs" },
        { title: "GraphQL Option", description: "Flexible data queries" },
        { title: "Documentation", description: "Complete API docs" },
        { title: "Security", description: "OAuth, JWT, API keys" },
        { title: "Versioning", description: "Backward compatibility" },
        { title: "Monitoring", description: "Usage analytics" },
      ]}
      process={[
        { step: 1, title: "Design", description: "Define endpoints and schema" },
        { step: 2, title: "Development", description: "Build API logic" },
        { step: 3, title: "Documentation", description: "Swagger/OpenAPI docs" },
        { step: 4, title: "Testing", description: "Unit and integration tests" },
        { step: 5, title: "Deployment", description: "Launch with monitoring" },
      ]}
      pricing={[
        {
          name: "Simple API",
          price: "AED 8,000",
          features: ["Up to 10 endpoints", "Basic auth", "Documentation", "3-month support"],
        },
        {
          name: "Full API",
          price: "AED 25,000",
          features: ["Unlimited endpoints", "Advanced auth", "Rate limiting", "1-year support"],
          isPopular: true,
        },
        {
          name: "Microservices",
          price: "Custom",
          features: ["Multiple services", "Service mesh", "Full DevOps", "Managed service"],
        },
      ]}
      faqs={[
        {
          question: "REST vs GraphQL?",
          answer:
            "REST is simpler and widely supported. GraphQL offers flexibility for complex data needs. We help you choose.",
        },
        {
          question: "How do you handle security?",
          answer: "We implement OAuth 2.0, JWT tokens, API keys, rate limiting, and input validation.",
        },
      ]}
      relatedCategories={[
        { name: "System Integration", href: "/services/software-apps/custom-software/integrations" },
        { name: "Web Applications", href: "/services/web-development/web-applications" },
      ]}
    />
  )
}
