import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const features = [
  "Brand-Boost Strategy & Design",
  "All-Platform Social, Web & ERP",
  "Experts You Trust Always",
  "ROI-Driven Measurable Results",
]

export function AboutPreviewSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="/professional-photography-studio-setup.jpg"
                    alt="Photography Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="/creative-team-brainstorming-modern-office.jpg" alt="Creative Team" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="/video-production-equipment.png" alt="Video Production" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="/web-development-team.png" alt="Web Development" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl z-10">
              <span className="text-4xl font-bold">40+</span>
              <span className="text-xs text-center">
                Years of
                <br />
                Experience
              </span>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Welcome to Creative Fusion
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              A Full-Service Media Production & Advertising Agency
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Creative Fusion, we blend innovative strategy with cutting-edge technology to elevate your brand, boost
              visibility, and drive measurable business growth. From compelling visuals to powerful digital platforms,
              we craft solutions that make an impact.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We take full ownership of your brand's success — from brand identity development and digital marketing
              strategy to photography, videography, website development, and complete ERP solutions.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
