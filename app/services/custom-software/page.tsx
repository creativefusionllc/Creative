import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CustomSoftwarePage() {
  const subservices = [
    "Mobile App Development - Native & cross-platform applications",
    "Custom Software Development - Bespoke solutions for unique needs",
    "ERP Solutions & Business Software - Complete enterprise resource planning",
    "Enterprise & CRM Integration - Seamless system connectivity",
    "Cloud Computing - IaaS, PaaS, SaaS solutions",
    "AI & Machine Learning Solutions - Intelligent automation",
    "Cybersecurity Services - Comprehensive security frameworks",
    "Business Intelligence & Big Data - Data-driven insights",
  ]

  const benefits = [
    "Scalable architecture for business growth",
    "Future-proof technology stack",
    "24/7 support and maintenance",
    "Cloud-ready infrastructure",
    "Agile development methodology",
    "Complete documentation and training",
  ]

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-32 pb-20 bg-[#1F2937] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-[#C4D600]/20 rounded-2xl flex items-center justify-center">
                <Settings className="h-8 w-8 text-[#C4D600]" />
              </div>
              <div>
                <p className="text-[#C4D600] font-semibold text-sm uppercase tracking-wide">Digital & Software</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Custom Software & ERP Solutions</h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Developing custom, scalable software solutions and enterprise applications that automate business
              processes, enhance service delivery, and drive operational efficiency.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services Include</h2>
            <div className="h-1 w-24 bg-[#E8573F] mb-12" />

            <div className="grid md:grid-cols-2 gap-6">
              {subservices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#C4D600] transition-colors"
                >
                  <div className="w-8 h-8 bg-[#C4D600]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-[#C4D600]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{service.split(" - ")[0]}</h3>
                    <p className="text-gray-600 text-sm">{service.split(" - ")[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Software Solutions</h2>
            <div className="h-1 w-24 bg-[#E8573F] mb-12" />

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <Check className="h-5 w-5 text-[#C4D600] shrink-0" />
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#1F2937] text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build custom software that transforms your operations and drives growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#C4D600] text-gray-900 hover:bg-[#b0c200] font-semibold px-8" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
