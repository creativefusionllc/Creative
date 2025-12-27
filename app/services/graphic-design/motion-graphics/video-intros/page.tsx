import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Video Intro Animation | Motion Graphics",
  description: "Professional video intros and outros for YouTube, corporate videos, and brand content.",
}

export default function VideoIntrosPage() {
  return (
    <CategoryPageTemplate
      breadcrumb={{
        service: { title: "Graphic Design", href: "/services/graphic-design" },
        subService: { title: "Motion Graphics", href: "/services/graphic-design/motion-graphics" },
      }}
      title="Video Intros & Outros"
      subtitle="Professional Video Branding"
      description="Create memorable video intros that establish brand presence and professionalism."
      heroImage="/video-intro-animation.jpg"
      benefits={[
        "Professional branding",
        "Memorable openings",
        "Consistent identity",
        "Multiple styles",
        "Sound included",
        "YouTube optimized",
      ]}
      process={[
        { step: 1, title: "Brief", description: "Define style and tone" },
        { step: 2, title: "Concept", description: "Create storyboard" },
        { step: 3, title: "Production", description: "Animate intro/outro" },
        { step: 4, title: "Delivery", description: "Final files provided" },
      ]}
      pricing={{
        startingFrom: "AED 2,000",
        includes: ["10-second intro", "5-second outro", "Sound design", "4K quality"],
      }}
      faqs={[
        { question: "How long should an intro be?", answer: "We recommend 5-10 seconds to maintain viewer attention." },
        {
          question: "Can you match my brand style?",
          answer: "Yes, all animations are customized to your brand guidelines.",
        },
      ]}
      relatedCategories={[
        { title: "Logo Animation", href: "/services/graphic-design/motion-graphics/logo-animation" },
        { title: "YouTube Graphics", href: "/services/graphic-design/social-media-design/youtube-graphics" },
      ]}
    />
  )
}
