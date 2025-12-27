import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Logo Animation Services | Motion Graphics",
  description: "Professional logo animation and motion logo design for video intros and brand content.",
}

export default function LogoAnimationPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Logo Animation"
      subtitle="Animated Logo Design"
      description="Bring your logo to life with stunning animations that enhance brand memorability."
      heroImage="/logo-animation-motion.jpg"
      benefits={[
        "Brand memorability",
        "Video intros",
        "Social media ready",
        "Multiple formats",
        "Sound design option",
        "Quick turnaround",
      ]}
      process={[
        { step: 1, title: "Concept", description: "Define animation style" },
        { step: 2, title: "Storyboard", description: "Plan animation sequence" },
        { step: 3, title: "Animate", description: "Create the animation" },
        { step: 4, title: "Deliver", description: "Multiple formats provided" },
      ]}
      pricing={{
        startingFrom: "AED 1,500",
        includes: ["5-second animation", "3 variations", "Sound design", "Multiple formats"],
      }}
      faqs={[
        { question: "What formats do you provide?", answer: "MP4, MOV, GIF, and transparent background versions." },
        { question: "Can you add sound?", answer: "Yes, we include custom sound design in most packages." },
      ]}
      relatedCategories={[
        { title: "Video Intros", href: "/services/graphic-design/motion-graphics/video-intros" },
        { title: "Social Media Animation", href: "/services/graphic-design/motion-graphics/social-animation" },
      ]}
    />
  )
}
