import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

const portfolioItems = [
  {
    title: "Luxury Real Estate",
    category: "Photography",
    image: "/luxury-real-estate-interior-photography-modern-vil.jpg",
  },
  {
    title: "Corporate Event",
    category: "Videography",
    image: "/corporate-event-photography-gala-night-premium.jpg",
  },
  {
    title: "Product Launch",
    category: "Photography",
    image: "/product-photography-luxury-watch-jewelry-dark-back.jpg",
  },
  {
    title: "Aerial Dubai",
    category: "Drone",
    image: "/aerial-drone-shot-dubai-skyline-sunset-cinematic.jpg",
  },
  {
    title: "Brand Identity",
    category: "Branding",
    image: "/brand-identity-design-mockup-premium-elegant.jpg",
  },
  {
    title: "E-commerce Site",
    category: "Web Development",
    image: "/ecommerce-website-mockup-modern-clean-design-lapto.jpg",
  },
]

export function PortfolioSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Our Portfolio</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              We Craft Visual Strategies
              <br />
              <span className="text-primary">That Speak for Your Brand</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              At Creative Fusion LLC, we don't just take pictures — we create visual strategies that tell your story,
              elevate your brand, and drive engagement across all platforms.
            </p>
          </div>
          <Button size="lg" className="gap-2 w-fit bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Link
              key={item.title}
              href="/portfolio"
              className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary text-sm font-medium mb-2">{item.category}</p>
                  <h3 className="text-xl font-semibold text-background mb-3">{item.title}</h3>
                  <div className="flex items-center gap-2 text-background/80 text-sm">
                    <span>View Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                {item.category}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
