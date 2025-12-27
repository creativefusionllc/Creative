import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    title: "Emirates Luxury Properties",
    challenge:
      "A high-end real estate developer needed to showcase their premium villa collection to international buyers with limited access to physical viewings.",
    solution:
      "We created a comprehensive media package including 8K aerial drone footage, cinematic walkthrough videos, and professional interior photography with virtual tour integration.",
    result:
      "40% increase in qualified leads and 25% faster sales cycle. The content was featured in international real estate publications.",
    image: "/case-study-luxury-real-estate-emirates.jpg",
  },
  {
    title: "Tech Innovations Product Launch",
    challenge:
      "A tech startup needed to create buzz and establish credibility for their flagship product launch in a competitive market.",
    solution:
      "We developed a complete brand identity, product photography, launch video, and social media campaign with targeted digital advertising.",
    result:
      "2M+ video views, 150% social media growth, and successful launch event with 500+ attendees. Product sold out within 48 hours.",
    image: "/case-study-tech-product-launch.jpg",
  },
  {
    title: "Al Maktoum Foundation Gala",
    challenge:
      "A prestigious foundation required professional coverage and live streaming for their annual charity gala attended by VIPs and dignitaries.",
    solution:
      "Multi-camera live production with real-time streaming, professional photography, and same-day highlight reel delivery for social media.",
    result:
      "Record-breaking fundraising night with 300% increase in online donations during the live stream. Event coverage reached 1M+ viewers.",
    image: "/case-study-foundation-gala-event.jpg",
  },
]

export function CaseStudies() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Case Studies</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Success Stories That <span className="text-primary">Inspire</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover how we've helped businesses across the UAE achieve their goals through creative excellence.
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div
                className={`relative aspect-[16/10] rounded-xl overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6">{study.title}</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-primary font-semibold mb-1">The Challenge</p>
                    <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold mb-1">Our Solution</p>
                    <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold mb-1">The Result</p>
                    <p className="text-muted-foreground leading-relaxed">{study.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/contact">
              Start Your Success Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
