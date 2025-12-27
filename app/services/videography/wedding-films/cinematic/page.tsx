import { CategoryPageTemplate } from "@/components/services/category-page-template"

export const metadata = {
  title: "Cinematic Wedding Films | Wedding Films | Creative Fusion",
  description: "Movie-quality cinematic wedding films. Hollywood-style storytelling for your special day.",
}

export default function CinematicPage() {
  return (
    <CategoryPageTemplate
      title="Cinematic Wedding Films"
      subtitle="Your Love Story, Hollywood Style"
      description="Cinematic wedding films use film techniques, dramatic lighting, and storytelling to create movie-quality productions of your wedding day."
      parentService={{ name: "Videography", href: "/services/videography" }}
      subService={{ name: "Wedding Films", href: "/services/videography/wedding-films" }}
      heroImage="/cinematic-wedding-film-production.jpg"
      benefits={[
        { title: "Cinematic", description: "Movie-quality production" },
        { title: "Storytelling", description: "Narrative structure" },
        { title: "Artistic", description: "Creative vision" },
        { title: "Premium", description: "Highest production value" },
      ]}
      process={[
        { step: 1, title: "Vision", description: "Understanding your story" },
        { step: 2, title: "Planning", description: "Shot list and timeline" },
        { step: 3, title: "Filming", description: "Cinema-grade capture" },
        { step: 4, title: "Color Grade", description: "Film-look processing" },
        { step: 5, title: "Sound Design", description: "Professional audio mix" },
      ]}
      pricing={[
        {
          name: "Cinematic",
          price: "AED 12,000",
          features: ["6-8 min Film", "Cinema Cameras", "Color Grading", "Licensed Music"],
          popular: false,
        },
        {
          name: "Feature",
          price: "AED 20,000",
          features: ["10-15 min Film", "2 Videographers", "Drone", "Original Score Option"],
          popular: true,
        },
        {
          name: "Masterpiece",
          price: "AED 35,000",
          features: ["20+ min Film", "3 Videographers", "Pre-wedding Shoot", "Director's Cut"],
          popular: false,
        },
      ]}
      faqs={[
        {
          question: "What makes it cinematic?",
          answer: "Professional cinema cameras, dramatic lighting, creative angles, and film-grade color grading.",
        },
        {
          question: "Can we include drone footage?",
          answer: "Yes, aerial footage adds incredible production value to cinematic films.",
        },
      ]}
      relatedCategories={[
        { name: "Wedding Highlights", href: "/services/videography/wedding-films/highlights" },
        { name: "Drone Wedding", href: "/services/videography/wedding-films/drone-wedding" },
        { name: "Destination Weddings", href: "/services/videography/wedding-films/destination" },
      ]}
    />
  )
}
