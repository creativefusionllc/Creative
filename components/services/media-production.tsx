import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Fingerprint, Palette, Share2, Sparkles, Camera, Video, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Fingerprint,
    title: "Brand Identity & Corporate Design",
    description:
      "Logos, brand guidelines, corporate identity systems, and visual storytelling that makes your brand unforgettable.",
    image: "/images/hero-slide-brand-identity-design.jpg",
  },
  {
    icon: Palette,
    title: "Graphic & Visual Design",
    description:
      "Print and digital materials, including brochures, banners, packaging, and campaign creatives, designed for maximum impact.",
    image: "/images/graphic-design-creative-workspace-mockups.jpg",
  },
  {
    icon: Share2,
    title: "Social Media Content & Design",
    description:
      "Engaging posts, stories, reels, and campaign assets tailored to each platform to boost audience engagement.",
    image: "/images/digital-marketing-strategy.png",
  },
  {
    icon: Sparkles,
    title: "Animation & Motion Graphics",
    description:
      "2D/3D animations, explainer videos, and dynamic motion visuals for advertising, social media, and presentations.",
    image: "/motion-graphics-animation-3d-render-creative.jpg",
  },
  {
    icon: Camera,
    title: "Photography Services",
    description:
      "Professional corporate, product, jewelry, real estate, lifestyle, and event photography to showcase your brand in its best light.",
    image: "/professional-photography-studio-setup-lighting.jpg",
  },
  {
    icon: Video,
    title: "Videography & Post-Production",
    description:
      "Cinematic corporate films, commercials, product videos, real estate walkthroughs, aerial/drone footage, full editing, color grading, motion graphics, and sound design.",
    image: "/videography-production-cinema-camera-operator.jpg",
  },
]

export function MediaProduction() {
  return (
    <section id="creative" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Creative & Design Services</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Visuals That <span className="text-primary">Captivate & Inspire</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            We craft visuals that captivate, inspire, and elevate your brand. From brand identity to full-scale video
            production, we bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/contact">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
