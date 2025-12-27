import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Private Party Photography | Event Photography | Creative Fusion",
  description: "Professional photography for private parties and exclusive celebrations.",
}

export default function PrivatePartiesPage() {
  return (
    <CategoryPageTemplate
      title="Private Party Photography"
      description="Discreet and professional photography for exclusive private parties, VIP gatherings, and intimate celebrations."
      parentService={{ name: "Photography", href: "/services/photography" }}
      parentSubService={{ name: "Event Photography", href: "/services/photography/event" }}
      heroImage="/luxury-private-party-photography.jpg"
      benefits={[
        { title: "Discretion", description: "Professional and respectful approach" },
        { title: "Luxury Quality", description: "High-end aesthetic" },
        { title: "Guest Comfort", description: "Unobtrusive coverage" },
        { title: "Privacy", description: "Secure image handling" },
      ]}
      process={[
        { step: 1, title: "Consultation", description: "Understand preferences" },
        { step: 2, title: "Planning", description: "Coordinate coverage style" },
        { step: 3, title: "Coverage", description: "Discreet photography" },
        { step: 4, title: "Editing", description: "Premium retouching" },
        { step: 5, title: "Secure Delivery", description: "Private gallery" },
      ]}
      pricing={[
        {
          name: "Intimate",
          price: "AED 2,000",
          features: ["3 hours", "80 photos", "Private gallery", "Premium editing"],
        },
        {
          name: "Exclusive",
          price: "AED 4,000",
          features: ["5 hours", "150 photos", "Same-day preview", "2 photographers"],
          popular: true,
        },
        {
          name: "VIP",
          price: "AED 7,000",
          features: ["Full event", "300+ photos", "Video coverage", "Album included"],
        },
      ]}
      faqs={[
        {
          question: "How do you handle privacy?",
          answer: "All images are securely stored and only shared via private, password-protected galleries.",
        },
        {
          question: "Can guests opt out of photos?",
          answer: "Yes, we respect all guest preferences regarding photography.",
        },
      ]}
      relatedCategories={[
        { name: "Birthday Parties", href: "/services/photography/event/birthday-parties" },
        { name: "Milestone Celebrations", href: "/services/photography/event/milestone-celebrations" },
        { name: "Luxury Events", href: "/services/photography/event/luxury-events" },
      ]}
    />
  )
}
