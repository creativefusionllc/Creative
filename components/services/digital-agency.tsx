import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Smartphone, Settings, Server, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "Responsive, high-performance websites, e-commerce stores, landing pages, and corporate portals built with modern technologies.",
    image: "/images/ecommerce-website-mockup.jpg",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Applications",
    description:
      "Custom apps for iOS, Android, and web with seamless UX/UI design that delivers exceptional user experiences.",
    image: "/mobile-app-development-ui-ux-design-screens.jpg",
  },
  {
    icon: Settings,
    title: "Custom Software & ERP Solutions",
    description:
      "Tailored solutions for business automation, management, and CRM integration to streamline your operations.",
    image: "/erp-software-dashboard-business-solution.jpg",
  },
  {
    icon: Server,
    title: "Website Maintenance & Hosting",
    description:
      "Secure, fast, and reliable hosting, domain registration, business emails, backups, and website optimization.",
    image: "/server-hosting-data-center-technology-cloud.jpg",
  },
]

export function DigitalAgency() {
  return (
    <section id="digital" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Digital & Software Development
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Modern Solutions That <span className="text-primary">Drive Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Modern, scalable, and fully customized digital solutions for your business. We build technology that
            empowers your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-secondary/50 border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
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
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
