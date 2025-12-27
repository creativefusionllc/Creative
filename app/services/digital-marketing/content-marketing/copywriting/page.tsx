import { CategoryPageTemplate } from "@/components/services/category-page-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Copywriting Services in Dubai, UAE | Creative Fusion",
  description:
    "Expert copywriting services for websites, ads, email campaigns, and marketing materials. Persuasive copy that drives conversions across Dubai and the GCC.",
}

export default function CopywritingPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: {
          name: "Digital Marketing",
          slug: "digital-marketing",
        },
        subService: {
          name: "Content Marketing",
          slug: "content-marketing",
        },
        category: "Copywriting",
      }}
      category="Copywriting"
      title="Professional Copywriting Services"
      description="Persuasive, conversion-focused copy that speaks directly to your target audience and drives measurable results for your Dubai business."
      heroImage="/copywriting-professional-content-writing-service.jpg"
      benefits={[
        {
          title: "Conversion Optimization",
          description: "Copy engineered to turn readers into customers with compelling CTAs and persuasive messaging",
        },
        {
          title: "Brand Voice Development",
          description: "Consistent, authentic voice that resonates with your audience and strengthens brand identity",
        },
        {
          title: "SEO Integration",
          description: "Strategic keyword placement that ranks well while maintaining natural, engaging readability",
        },
        {
          title: "Multi-Format Expertise",
          description: "From landing pages to email campaigns, ads to product descriptions - all formats covered",
        },
        {
          title: "Research-Driven",
          description: "Deep audience analysis and competitor research inform every word we write",
        },
        {
          title: "Fast Turnaround",
          description: "Quick delivery without compromising quality, with multiple revision rounds included",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Discovery & Research",
          description: "Understand your audience, competitors, and unique value proposition",
        },
        {
          step: 2,
          title: "Strategy Development",
          description: "Create messaging framework and outline key conversion points",
        },
        {
          step: 3,
          title: "Copywriting",
          description: "Craft persuasive, engaging copy optimized for your specific goals",
        },
        { step: 4, title: "Review & Refinement", description: "Incorporate feedback and polish copy to perfection" },
        {
          step: 5,
          title: "Final Delivery",
          description: "Deliver polished copy with usage guidelines and implementation support",
        },
      ]}
      pricing={{
        startingFrom: "AED 500",
        packages: [
          { name: "Basic", price: "AED 500", features: ["1 Page", "SEO Optimized", "2 Revisions"], popular: false },
          {
            name: "Professional",
            price: "AED 2,500",
            features: ["10 Pages", "Conversion Focus", "Unlimited Revisions"],
            popular: true,
          },
          {
            name: "Retainer",
            price: "AED 5,000/mo",
            features: ["Ongoing Copy", "All Formats", "Priority Support"],
            popular: false,
          },
        ],
      }}
      faqs={[
        {
          question: "What is the difference from content writing?",
          answer:
            "Copywriting is persuasive and conversion-focused while content writing is informational and educational.",
        },
        {
          question: "Do you write ads?",
          answer: "Yes we write copy for digital ads print ads social media ads and all marketing materials.",
        },
        {
          question: "How many revisions are included?",
          answer: "Our packages include 2-3 revisions with unlimited revisions available in premium packages.",
        },
        {
          question: "Can you match our brand voice?",
          answer:
            "Absolutely we study your existing materials and brand guidelines to maintain consistent voice across all copy.",
        },
        {
          question: "What industries do you serve?",
          answer:
            "We write for all industries including real estate technology retail healthcare finance and more across Dubai and the GCC.",
        },
        {
          question: "How long does copywriting take?",
          answer:
            "Single page copy takes 3-5 days while larger projects may take 1-2 weeks depending on scope and revisions.",
        },
      ]}
      relatedCategories={[
        {
          name: "Blog Writing",
          slug: "/services/digital-marketing/content-marketing/blog-writing",
          description: "Regular blog content",
        },
        {
          name: "SEO Content",
          slug: "/services/digital-marketing/seo/seo-content",
          description: "SEO-optimized articles",
        },
        {
          name: "Email Marketing",
          slug: "/services/digital-marketing/email-marketing",
          description: "Email campaigns",
        },
      ]}
    />
  )
}
