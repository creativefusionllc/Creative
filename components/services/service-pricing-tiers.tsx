import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PricingTier {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
}

interface ServicePricingTiersProps {
  tiers: PricingTier[]
  brandColor?: string
}

export function ServicePricingTiers({ tiers, brandColor = "#C4D600" }: ServicePricingTiersProps) {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: brandColor }}>
            PRICING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Service Packages <span style={{ color: brandColor }}>& Pricing</span>
          </h2>
          <div className="h-1 w-24 mx-auto" style={{ backgroundColor: brandColor }} />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                tier.highlighted
                  ? "lg:scale-105 border-2 shadow-lg"
                  : "border border-gray-200 bg-white hover:-translate-y-1"
              }`}
              style={tier.highlighted ? { borderColor: brandColor, backgroundColor: "white" } : {}}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: brandColor }} />
              )}

              {/* Content */}
              <div className="p-8">
                {/* Tier Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900">{tier.price}</span>
                    {tier.period && <span className="text-gray-500 text-sm">{tier.period}</span>}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${brandColor}20` }}
                      >
                        <Check className="w-3 h-3" style={{ color: brandColor }} />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full font-semibold h-11 rounded-lg transition-all duration-300"
                  style={
                    tier.highlighted
                      ? { backgroundColor: brandColor, color: "#1C1C1C" }
                      : { borderColor: brandColor, color: brandColor }
                  }
                  variant={tier.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Need a custom package? Let's discuss your specific requirements.</p>
          <Button
            className="rounded-full font-semibold px-8 py-3"
            style={{ backgroundColor: brandColor, color: "#1C1C1C" }}
            asChild
          >
            <Link href="/contact">Request Custom Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
