import { Zap, Lightbulb, Shield, Target, TrendingUp, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Brand-Boost Strategy",
    description: "From brand identity to digital execution, we deliver smart, result-driven solutions.",
  },
  {
    icon: Zap,
    title: "Full-Service Agency",
    description: "All-platform social, web & ERP solutions — everything your brand needs in one place.",
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "We craft visual strategies that speak for your brand and drive engagement across all platforms.",
  },
  {
    icon: TrendingUp,
    title: "ROI-Driven Results",
    description: "We focus on what matters most — your profit, performance, and long-term success.",
  },
  {
    icon: Users,
    title: "Best Team Members",
    description: "Our expert team brings 30+ years of combined experience to give you better quality results.",
  },
  {
    icon: Shield,
    title: "Reliable & Proven",
    description: "SHAMS licensed agency with a track record of delivering exceptional results for clients.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Why Choose Us</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              We Merge Art
              <br />
              <span className="text-primary">...with Technology</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From brand identity to digital execution, we deliver smart, result-driven solutions that boost visibility,
              attract clients, and drive consistent growth. We focus on what matters most — your profit, performance,
              and long-term success.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">40+</div>
                <div className="text-sm text-muted-foreground">Years of Experience</div>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background p-5 border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
